"use client";

import {
  useEffect,
  useRef,
  type MouseEvent,
  type PointerEvent,
  type SyntheticEvent,
} from "react";
import { WaitlistForm } from "./waitlist-form";

/** Longest the exit can take before we close anyway (exit is ~180ms). */
const EXIT_FALLBACK_MS = 300;

type WaitlistDialogProps = {
  open: boolean;
  service: string;
  /** Changes on every open; remounts the form so each visit starts fresh. */
  session: number;
  /** Ask to close (Escape, backdrop, close button, Done). */
  onClose: () => void;
  /** Called once the exit animation has finished and the dialog is closed. */
  onClosed: () => void;
};

/**
 * The desktop surface for the waitlist form: a centred native <dialog> opened
 * with showModal(), so the page behind is inert and focus stays inside. It
 * enters with a short scale + fade and leaves faster (CSS in globals.css,
 * `.waitlist-dialog`); reduced motion only fades.
 *
 * The form itself (WaitlistForm) doesn't know which surface it's in, so a
 * mobile bottom sheet can host the same form.
 */
export function WaitlistDialog({
  open,
  service,
  session,
  onClose,
  onClosed,
}: WaitlistDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
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

  return (
    <dialog
      ref={ref}
      aria-labelledby="waitlist-title"
      onCancel={handleCancel}
      onClose={handleNativeClose}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      className="waitlist-dialog m-auto w-[480px] max-w-[calc(100%-2rem)] max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain rounded-3xl bg-card p-0 text-espresso shadow-2xl shadow-espresso/20"
    >
      <div className="relative px-6 pt-9 pb-8 sm:px-9">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 inline-flex size-11 items-center justify-center rounded-full text-espresso/70 hover:bg-cream-soft hover:text-espresso active:scale-[0.97] transition-[background-color,color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-espresso"
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
        {session > 0 && (
          <WaitlistForm key={session} service={service} onDone={onClose} />
        )}
      </div>
    </dialog>
  );
}
