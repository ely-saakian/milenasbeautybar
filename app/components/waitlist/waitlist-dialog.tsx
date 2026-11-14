"use client";

import {
  useEffect,
  useRef,
  type MouseEvent,
  type PointerEvent,
  type SyntheticEvent,
} from "react";
import { useKeyboardAvoidance } from "./use-keyboard-avoidance";
import { useSheetDrag } from "./use-sheet-drag";
import { WaitlistForm } from "./waitlist-form";

/** Shared by both surfaces; each adds its own layout and shape. */
const surfaceClass =
  "waitlist-dialog bg-card p-0 text-espresso shadow-espresso/20";

/** Inline styles a swipe or the keyboard lift may have left on the sheet. */
function clearSheetStyles(dialog: HTMLDialogElement) {
  for (const prop of [
    "transform",
    "transition",
    "bottom",
    "maxHeight",
  ] as const) {
    dialog.style[prop] = "";
  }
}

/** Longest the exit can take before we close anyway (exit is ~180ms). */
const EXIT_FALLBACK_MS = 300;

/** "modal" is the centred desktop dialog; "sheet" the mobile bottom sheet. */
export type WaitlistSurface = "modal" | "sheet";

type WaitlistDialogProps = {
  open: boolean;
  /** Which surface to show the form in. Defaults to the modal. */
  variant?: WaitlistSurface;
  service: string;
  /** Changes on every open; remounts the form so each visit starts fresh. */
  session: number;
  /** Ask to close (Escape, backdrop, close button, Done). */
  onClose: () => void;
  /** Called once the exit animation has finished and the dialog is closed. */
  onClosed: () => void;
};

/**
 * The surface for the waitlist form: a native <dialog> opened with
 * showModal(), so the page behind is inert, focus stays inside and Escape
 * closes it. Both surfaces share that open/close logic and differ in layout
 * and motion (CSS in globals.css):
 *
 * - "modal" (desktop): centred, enters with a short scale + fade and leaves
 *   faster (`.waitlist-dialog`).
 * - "sheet" (phones): pinned to the bottom, slides up with the drawer curve,
 *   has a grab handle that swipes it closed (`.waitlist-sheet`), and lifts
 *   above the on-screen keyboard.
 *
 * Reduced motion only fades either one. The form itself (WaitlistForm)
 * doesn't know which surface it's in.
 */
export function WaitlistDialog({
  open,
  variant = "modal",
  service,
  session,
  onClose,
  onClosed,
}: WaitlistDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isSheet = variant === "sheet";
  const dragHandlers = useSheetDrag(ref, onClose);
  useKeyboardAvoidance(ref, scrollRef, isSheet);
  const pressedBackdrop = useRef(false);
  const onClosedRef = useRef(onClosed);
  useEffect(() => {
    onClosedRef.current = onClosed;
  }, [onClosed]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    if (open) {
      delete dialog.dataset.state;
      if (!dialog.open) dialog.showModal();
      dialog.querySelector<HTMLElement>("[data-autofocus]")?.focus();
      return;
    }

    if (!dialog.open) return;
    dialog.dataset.state = "closing";
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      dialog.removeEventListener("animationend", onEnd);
      clearTimeout(timer);
      delete dialog.dataset.state;
      clearSheetStyles(dialog);
      dialog.close();
      onClosedRef.current();
    };
    const onEnd = (e: AnimationEvent) => {
      if (e.target === dialog && !e.pseudoElement) finish();
    };
    dialog.addEventListener("animationend", onEnd);
    const timer = setTimeout(finish, EXIT_FALLBACK_MS);
    return () => {
      // Reopened mid-exit: stay open and drop the pending close.
      done = true;
      dialog.removeEventListener("animationend", onEnd);
      clearTimeout(timer);
    };
  }, [open]);

  // Switched to the modal while open (e.g. rotated): drop swipe leftovers.
  useEffect(() => {
    if (!isSheet && ref.current) clearSheetStyles(ref.current);
  }, [isSheet]);

  // Escape: animate out instead of the browser's instant close.
  const handleCancel = (e: SyntheticEvent<HTMLDialogElement>) => {
    e.preventDefault();
    onClose();
  };

  // A close we didn't start (e.g. the browser forcing it): keep state in sync.
  const handleNativeClose = () => {
    if (open) {
      onClose();
      onClosedRef.current();
    }
  };

  // Clicks on the backdrop land on the <dialog> itself, since the panel fills
  // it. Require the press to start there too, so a text selection dragged out
  // of a field doesn't close the form.
  const handlePointerDown = (e: PointerEvent<HTMLDialogElement>) => {
    pressedBackdrop.current = e.target === e.currentTarget;
  };
  const handleClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (pressedBackdrop.current && e.target === e.currentTarget) onClose();
    pressedBackdrop.current = false;
  };

  const closeButton = (className: string) => (
    <button
      type="button"
      aria-label="Close"
      onClick={onClose}
      className={`${className} inline-flex size-11 items-center justify-center rounded-full text-espresso/70 hover:bg-cream-soft hover:text-espresso active:scale-[0.97] transition-[background-color,color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-espresso`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    </button>
  );
  const form = session > 0 && (
    <WaitlistForm key={session} service={service} onDone={onClose} />
  );

  return (
    <dialog
      ref={ref}
      aria-labelledby="waitlist-title"
      onCancel={handleCancel}
      onClose={handleNativeClose}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      className={
        isSheet
          ? `${surfaceClass} waitlist-sheet fixed inset-x-0 top-auto bottom-0 m-0 w-full max-w-none max-h-[calc(100dvh-0.75rem)] open:flex flex-col overflow-hidden rounded-t-3xl shadow-[0_-12px_40px]`
          : `${surfaceClass} m-auto w-[480px] max-w-[calc(100%-2rem)] max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain rounded-3xl shadow-2xl`
      }
    >
      {isSheet ? (
        <>
          {/* The drag zone: a full-width strip with the grab handle. It owns
              vertical touches (touch-action: none) so a swipe moves the sheet,
              not the page; the fields below scroll and select as usual. */}
          <div
            data-sheet-handle
            {...dragHandlers}
            className="relative h-11 shrink-0 cursor-grab touch-none select-none active:cursor-grabbing"
          >
            <span
              aria-hidden="true"
              className="absolute top-3 left-1/2 h-[5px] w-10 -translate-x-1/2 rounded-full bg-espresso/20"
            />
            {closeButton("absolute top-1.5 right-2.5")}
          </div>
          <div
            ref={scrollRef}
            className="relative min-h-0 overflow-y-auto overscroll-contain px-[22px] pb-[calc(1.75rem+env(safe-area-inset-bottom))]"
          >
            {form}
          </div>
        </>
      ) : (
        <div className="relative px-6 pt-9 pb-8 sm:px-9">
          {closeButton("absolute top-4 right-4")}
          {form}
        </div>
      )}
    </dialog>
  );
}
