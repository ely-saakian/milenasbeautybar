"use client";

import { useEffect, type RefObject } from "react";

/** Gap kept between the sheet's top and the top of the visible area (px). */
const TOP_GAP = 12;
/** Less covered than this (px) is browser-chrome wobble, not a keyboard. */
const KEYBOARD_MIN_HEIGHT = 80;
/** Room left under the submit button when it's scrolled into view (px). */
const SUBMIT_MARGIN = 16;

/**
 * Keeps an open bottom sheet above the on-screen keyboard. Mobile browsers
 * shrink only the visual viewport when the keyboard opens, so a `bottom: 0`
 * sheet would sit behind it: this lifts the sheet to the visible bottom edge,
 * caps its height to what's visible, and scrolls the sheet's content so the
 * submit button is in view.
 *
 * Runs for as long as the surface is a sheet, and applies only while the
 * dialog is open, so the lift holds through the exit animation. The dialog
 * clears the inline styles once it has closed.
 */
export function useKeyboardAvoidance(
  sheetRef: RefObject<HTMLDialogElement | null>,
  scrollRef: RefObject<HTMLElement | null>,
  active: boolean
) {
  useEffect(() => {
    const vv = window.visualViewport;
    const sheet = sheetRef.current;
    if (!active || !vv || !sheet) return;

    let keyboardOpen = false;
    let frame = 0;
    const update = () => {
      // innerHeight is the layout viewport that `position: fixed` follows
      // (it tracks the iOS toolbar, but not the keyboard).
      const covered = Math.max(
        0,
        window.innerHeight - vv.height - vv.offsetTop
      );
      const opened = sheet.open && covered > KEYBOARD_MIN_HEIGHT;
      if (opened) {
        sheet.style.bottom = `${covered}px`;
        sheet.style.maxHeight = `${vv.height - TOP_GAP}px`;
        if (!keyboardOpen) {
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(revealSubmit);
        }
      } else if (keyboardOpen) {
        sheet.style.bottom = "";
        sheet.style.maxHeight = "";
      }
      keyboardOpen = opened;
    };
    // Scroll only the sheet's own content (scrollIntoView would also move
    // the locked page behind it).
    const revealSubmit = () => {
      const scroller = scrollRef.current;
      const submit = scroller?.querySelector('[type="submit"]');
      if (!scroller || !submit) return;
      const overflow =
        submit.getBoundingClientRect().bottom -
        scroller.getBoundingClientRect().bottom +
        SUBMIT_MARGIN;
      if (overflow > 0) scroller.scrollTop += overflow;
    };

    update();
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    return () => {
      cancelAnimationFrame(frame);
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
      // No longer a sheet (e.g. rotated to the modal): drop the lift.
      sheet.style.bottom = "";
      sheet.style.maxHeight = "";
    };
  }, [sheetRef, scrollRef, active]);
}
