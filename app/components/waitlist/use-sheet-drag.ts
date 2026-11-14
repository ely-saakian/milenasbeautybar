"use client";

import { useRef, type PointerEvent, type RefObject } from "react";
import { dragOffset, shouldDismiss } from "./sheet-gesture";

/**
 * The drawer curve: fast out of the gate, long gentle settle (iOS sheets).
 * Same curve and duration as the sheet's enter animation in globals.css.
 */
const DRAWER_EASE = "cubic-bezier(0.32, 0.72, 0, 1)";
const SNAP_BACK = `transform 260ms ${DRAWER_EASE}`;

type Drag = {
  pointerId: number;
  startY: number;
  startTime: number;
  sheetHeight: number;
  /** Reduced motion: the sheet doesn't follow; a swipe still closes it. */
  follow: boolean;
};

/**
 * Swipe-down-to-close for the mobile sheet. Spread the returned handlers on
 * the drag zone (handle bar); the sheet element follows the finger via an
 * inline transform, then either closes (past a distance or on a flick) or
 * springs back. Extra pointers are ignored while a drag is in progress.
 */
export function useSheetDrag(
  sheetRef: RefObject<HTMLElement | null>,
  onDismiss: () => void
) {
  const drag = useRef<Drag | null>(null);

  const onPointerDown = (e: PointerEvent<HTMLElement>) => {
    if (drag.current || !e.isPrimary || e.button !== 0) return;
    // The close button lives in the bar too; let it be a plain button.
    if ((e.target as Element).closest("button, a, input")) return;
    const sheet = sheetRef.current;
    if (!sheet) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      return; // The pointer is already gone (e.g. lifted mid-event).
    }
    const follow = !window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    drag.current = {
      pointerId: e.pointerId,
      startY: e.clientY,
      startTime: performance.now(),
      sheetHeight: sheet.getBoundingClientRect().height,
      follow,
    };
    if (follow) sheet.style.transition = "none";
  };

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const d = drag.current;
    const sheet = sheetRef.current;
    if (!d || e.pointerId !== d.pointerId || !sheet || !d.follow) return;
    const offset = dragOffset(e.clientY - d.startY);
    sheet.style.transform = `translate3d(0, ${offset}px, 0)`;
  };

  const end = (e: PointerEvent<HTMLElement>, cancelled: boolean) => {
    const d = drag.current;
    if (!d || e.pointerId !== d.pointerId) return;
    drag.current = null;
    const sheet = sheetRef.current;
    if (!sheet) return;
    const dismiss =
      !cancelled &&
      shouldDismiss({
        distance: e.clientY - d.startY,
        elapsedMs: performance.now() - d.startTime,
        sheetHeight: d.sheetHeight,
      });
    if (dismiss) {
      // The exit animation starts from wherever the finger left the sheet.
      onDismiss();
      return;
    }
    sheet.style.transition = SNAP_BACK;
    sheet.style.transform = "";
  };

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp: (e: PointerEvent<HTMLElement>) => end(e, false),
    onPointerCancel: (e: PointerEvent<HTMLElement>) => end(e, true),
    // Capture lost without an up/cancel (e.g. the dialog closed mid-drag):
    // spring back and free the drag, or later presses would be ignored.
    onLostPointerCapture: (e: PointerEvent<HTMLElement>) => end(e, true),
  };
}
