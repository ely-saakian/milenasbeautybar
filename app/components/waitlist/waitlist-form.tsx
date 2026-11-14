"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { GENERAL_SERVICE, NAME_MAX } from "@/lib/waitlist";
import { useWaitlistSignup, type SignupState } from "./use-waitlist-signup";

type WaitlistFormProps = {
  /** From the clicked Book link; sent with the signup, never shown as a field. */
  service: string;
  /** Close the surface (the Done button on the success state). */
  onDone: () => void;
};

const fieldClass =
  "h-12 w-full rounded-xl border border-espresso/25 bg-card px-3.5 text-[15px] text-espresso placeholder:text-espresso/50 transition-[border-color] duration-150 ease-out focus:outline-2 focus:outline-offset-1 focus:outline-espresso";

/**
 * The waitlist form and its result, independent of the surface it sits in
 * (desktop modal now, mobile sheet later). Heading id: "waitlist-title".
 */
export function WaitlistForm({ service, onDone }: WaitlistFormProps) {
  const { state, submit } = useWaitlistSignup(service);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  if (state.status === "created" || state.status === "already_listed") {
    // already_listed gets its own copy in a later slice; until then it's the
    // same truthful "you're on the list".
    return <SignupSuccess result={state} onDone={onDone} />;
  }

  const submitting = state.status === "submitting";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void submit({ name, phone });
  };

  return (
    <div className="flex flex-col gap-[22px]">
      <div className="flex flex-col gap-2.5 pr-8">
        <p className="flex items-center gap-2.5 text-xs uppercase tracking-[0.22em] text-espresso/70">
          <span aria-hidden className="h-px w-7 bg-espresso/40" />
          Booking paused
        </p>
        <h2
          id="waitlist-title"
          className="font-serif text-[40px] font-medium leading-[1.05] text-balance text-espresso"
        >
          Join the <span className="italic">waitlist</span>
        </h2>
        <p className="text-[15px] leading-relaxed text-espresso/75">
          I&apos;m taking a little time off with my new baby. Leave your name
          and number and I&apos;ll text you first when booking reopens.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="waitlist-name" className="text-[13px] font-medium">
            Name
          </label>
          <input
            id="waitlist-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="First and last name"
            required
            maxLength={NAME_MAX}
            value={name}
            onChange={(e) => setName(e.target.value)}
            data-autofocus
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="waitlist-phone" className="text-[13px] font-medium">
            Mobile number
          </label>
          <input
            id="waitlist-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder="(253) 555-0147"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`${fieldClass} tabular-nums`}
          />
        </div>

        <SubmitProblem state={state} />

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex h-[52px] items-center justify-center gap-2.5 rounded-full bg-espresso text-[15px] font-medium text-cream hover:bg-espresso-soft active:scale-[0.97] disabled:cursor-default disabled:opacity-75 disabled:active:scale-100 transition-[background-color,opacity,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:active:scale-100 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-espresso"
        >
          {submitting && (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
              className="animate-spin [animation-duration:700ms]"
            >
              <path d="M21 12a9 9 0 1 1-6.2-8.56" />
            </svg>
          )}
          <span>{submitting ? "Adding you…" : "Join the waitlist"}</span>
        </button>
        <p className="text-center text-xs text-espresso/70">
          Your number is only used to contact you about booking.
        </p>
      </form>
    </div>
  );
}

/**
 * A minimal, always-safe message when a submit didn't go through. The proper
 * per-field messages and retry copy come in the response-states slice.
 */
function SubmitProblem({ state }: { state: SignupState }) {
  if (state.status !== "invalid" && state.status !== "error") return null;
  const message =
    state.status === "invalid"
      ? Object.values(state.fields).join(" ") ||
        "Please check your details and try again."
      : "Something went wrong on my end. Please try again in a minute, or message me on Instagram.";
  return (
    <p
      role="alert"
      className="waitlist-fade rounded-xl bg-destructive/10 px-3.5 py-3 text-[13px] leading-normal text-destructive"
    >
      {message}
    </p>
  );
}

function SignupSuccess({
  result,
  onDone,
}: {
  result: Extract<SignupState, { status: "created" | "already_listed" }>;
  onDone: () => void;
}) {
  // The submit button just unmounted; keep focus in the dialog on Done. The
  // role="status" region announces the message itself.
  const doneRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    doneRef.current?.focus({ preventScroll: true });
  }, []);

  const forService =
    result.service && result.service !== GENERAL_SERVICE
      ? ` for your ${result.service}`
      : "";
  return (
    <div
      role="status"
      className="flex flex-col items-center gap-4 px-2 pt-6 pb-2 text-center"
    >
      <div className="waitlist-pop flex size-[72px] items-center justify-center rounded-full bg-cream text-espresso">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      </div>
      <h2
        id="waitlist-title"
        className="waitlist-rise font-serif text-[38px] font-medium leading-[1.1] text-balance text-espresso"
      >
        You&apos;re on the list
        {result.firstName ? (
          <>
            , <span className="italic">{result.firstName}</span>
          </>
        ) : null}
      </h2>
      <p className="waitlist-rise waitlist-rise-late max-w-[340px] text-[15px] leading-relaxed text-espresso/75">
        I&apos;ll text{" "}
        <strong className="whitespace-nowrap font-semibold text-espresso tabular-nums">
          {result.phone}
        </strong>{" "}
        as soon as booking reopens{forService}.
      </p>
      <p className="waitlist-rise waitlist-rise-late mt-1 font-serif text-[22px] italic">
        Milena
      </p>
      <button
        ref={doneRef}
        type="button"
        onClick={onDone}
        className="waitlist-rise waitlist-rise-late mt-2 h-12 rounded-full border border-espresso/25 px-7 text-sm font-medium text-espresso hover:bg-cream-soft active:scale-[0.97] transition-[background-color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:active:scale-100 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-espresso"
      >
        Done
      </button>
    </div>
  );
}
