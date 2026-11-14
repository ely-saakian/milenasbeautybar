"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { INSTAGRAM_URL } from "@/lib/constants";
import { GENERAL_SERVICE, NAME_MAX, type SignupField } from "@/lib/waitlist";
import { useWaitlistSignup, type SignupState } from "./use-waitlist-signup";

type WaitlistFormProps = {
  /** From the clicked Book link; sent with the signup, never shown as a field. */
  service: string;
  /** Close the surface (the Done button on the success state). */
  onDone: () => void;
};

const fieldClass =
  "h-12 w-full rounded-xl border bg-card px-3.5 text-[15px] text-espresso placeholder:text-espresso/50 transition-[border-color] duration-150 ease-out focus:outline-2 focus:outline-offset-1 focus:outline-espresso";

/**
 * The waitlist form and its result, independent of the surface it sits in
 * (desktop modal now, mobile sheet later). Heading id: "waitlist-title".
 */
export function WaitlistForm({ service, onDone }: WaitlistFormProps) {
  const { state, submit, clearFieldError } = useWaitlistSignup(service);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  // Set on each submit and used up by its result: if that comes back invalid,
  // focus the first bad field once its message has rendered (so it's announced
  // with it). Later edits to the fields don't move focus.
  const focusOnResult = useRef(false);

  useEffect(() => {
    if (!focusOnResult.current) return;
    if (state.status === "idle" || state.status === "submitting") return;
    focusOnResult.current = false;
    if (state.status === "invalid") {
      (state.fields.name ? nameRef : phoneRef).current?.focus();
    }
  }, [state]);

  if (isDone(state)) return <SignupDone result={state} onDone={onDone} />;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    focusOnResult.current = true;
    const website = new FormData(e.currentTarget).get("website");
    void submit({
      name,
      phone,
      website: typeof website === "string" ? website : "",
    });
  };

  return (
    <SignupFormView
      state={state}
      name={name}
      phone={phone}
      onNameChange={(value) => {
        setName(value);
        clearFieldError("name");
      }}
      onPhoneChange={(value) => {
        setPhone(value);
        clearFieldError("phone");
      }}
      onSubmit={handleSubmit}
      nameRef={nameRef}
      phoneRef={phoneRef}
    />
  );
}

type DoneState = Extract<SignupState, { status: "created" | "already_listed" }>;

function isDone(state: SignupState): state is DoneState {
  return state.status === "created" || state.status === "already_listed";
}

type SignupFormViewProps = {
  /** The two final states show SignupDone instead. */
  state: Exclude<SignupState, DoneState>;
  name: string;
  phone: string;
  onNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  nameRef?: RefObject<HTMLInputElement | null>;
  phoneRef?: RefObject<HTMLInputElement | null>;
};

/**
 * The form as it looks in each state, with what the visitor typed. Validation
 * messages are our own (noValidate), the same text the server sends, shown
 * under each field and linked to it with aria-invalid + aria-describedby.
 */
export function SignupFormView({
  state,
  name,
  phone,
  onNameChange,
  onPhoneChange,
  onSubmit,
  nameRef,
  phoneRef,
}: SignupFormViewProps) {
  const submitting = state.status === "submitting";
  const fields = state.status === "invalid" ? state.fields : {};

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

      <form
        id="waitlist-form"
        noValidate
        onSubmit={onSubmit}
        className="flex flex-col gap-4"
      >
        <Honeypot />
        <Field field="name" label="Name" error={fields.name}>
          {(controlProps) => (
            <input
              ref={nameRef}
              name="name"
              type="text"
              autoComplete="name"
              placeholder="First and last name"
              required
              maxLength={NAME_MAX}
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              data-autofocus
              {...controlProps}
            />
          )}
        </Field>
        <Field field="phone" label="Mobile number" error={fields.phone}>
          {(controlProps) => (
            <input
              ref={phoneRef}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder="(253) 555-0147"
              required
              value={phone}
              onChange={(e) => onPhoneChange(e.target.value)}
              {...controlProps}
              className={`${controlProps.className} tabular-nums`}
            />
          )}
        </Field>

        {state.status === "error" && <SubmitFailed />}

        {/* aria-disabled rather than disabled while sending, so focus stays on
            the button (and "Try again" is focused if it fails). The hook's
            in-flight guard is what stops a second send. */}
        <button
          type="submit"
          aria-disabled={submitting || undefined}
          className="inline-flex h-[52px] items-center justify-center gap-2.5 rounded-full bg-espresso text-[15px] font-medium text-cream hover:bg-espresso-soft active:scale-[0.97] aria-disabled:cursor-default aria-disabled:opacity-75 aria-disabled:hover:bg-espresso aria-disabled:active:scale-100 transition-[background-color,opacity,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:active:scale-100 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-espresso"
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
          <span>
            {submitting
              ? "Adding you…"
              : state.status === "error"
                ? "Try again"
                : "Join the waitlist"}
          </span>
        </button>
        <p className="text-center text-xs text-espresso/70">
          Your number is only used to contact you about booking.
        </p>
      </form>
    </div>
  );
}

/**
 * Spam trap: a "Website" field people never see or reach (off-screen, out of
 * the tab order, hidden from screen readers) but form-filling bots do. It's
 * uncontrolled; WaitlistForm reads it on submit and the server fakes a success
 * for anything in it. Positioned off-screen rather than display:none, which
 * some bots know to skip.
 */
function Honeypot() {
  return (
    <div
      aria-hidden="true"
      className="absolute -left-[10000px] top-0 size-px overflow-hidden"
    >
      <label htmlFor="waitlist-website">Website</label>
      <input
        id="waitlist-website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        // Browsers and password managers may autofill a "Website" field
        // despite autoComplete="off"; these ask the common managers not to.
        data-1p-ignore
        data-lpignore="true"
        data-bwignore
        data-form-type="other"
      />
    </div>
  );
}

/** What Field gives its input: its id, styling and error links. */
type FieldControlProps = {
  id: string;
  className: string;
  "aria-invalid"?: true;
  "aria-describedby"?: string;
};

/** A labelled input with its message underneath when it's invalid. */
function Field({
  field,
  label,
  error,
  children,
}: {
  field: SignupField;
  label: string;
  error: string | undefined;
  children: (props: FieldControlProps) => ReactNode;
}) {
  const id = `waitlist-${field}`;
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[13px] font-medium">
        {label}
      </label>
      {children(
        error
          ? {
              id,
              className: `${fieldClass} border-destructive`,
              "aria-invalid": true,
              "aria-describedby": errorId,
            }
          : { id, className: `${fieldClass} border-espresso/25` }
      )}
      {error && (
        <p
          id={errorId}
          className="waitlist-fade text-[13px] leading-normal text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  );
}

/** 429, 500 or a network failure: what was typed stays, and they can retry. */
function SubmitFailed() {
  return (
    <div
      role="alert"
      className="waitlist-fade flex items-start gap-2.5 rounded-xl bg-destructive/10 px-3.5 py-3 text-[13px] leading-normal text-destructive"
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
        className="mt-px shrink-0"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7.5v5.5M12 16.5v.01" />
      </svg>
      <span>
        Something went wrong on my end. Please try again in a minute, or message
        me on{" "}
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline underline-offset-2"
        >
          Instagram
        </a>
        .
      </span>
    </div>
  );
}

/**
 * The final state of a visit: a new signup (created) or a phone that was
 * already saved (already_listed). Only echoes what this visitor typed; never
 * anything stored for that phone.
 */
export function SignupDone({
  result,
  onDone,
}: {
  result: DoneState;
  onDone: () => void;
}) {
  // The submit button just unmounted; keep focus in the dialog on Done. The
  // role="status" region announces the message itself.
  const doneRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    doneRef.current?.focus({ preventScroll: true });
  }, []);

  const phone = (
    <strong className="whitespace-nowrap font-semibold text-espresso tabular-nums">
      {result.phone}
    </strong>
  );
  const forService =
    result.service && result.service !== GENERAL_SERVICE
      ? ` for your ${result.service}`
      : "";
  const alreadyListed = result.status === "already_listed";

  return (
    <div
      role="status"
      className="flex flex-col items-center gap-4 px-2 pt-6 pb-2 text-center"
    >
      <div className="waitlist-pop flex size-[72px] items-center justify-center rounded-full bg-cream text-espresso">
        <svg
          width={alreadyListed ? 30 : 32}
          height={alreadyListed ? 30 : 32}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {alreadyListed ? (
            <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
          ) : (
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          )}
        </svg>
      </div>
      <h2
        id="waitlist-title"
        className="waitlist-rise font-serif text-[38px] font-medium leading-[1.1] text-balance text-espresso"
      >
        {alreadyListed ? (
          <>
            You&apos;re already <span className="italic">on the list</span>
          </>
        ) : (
          <>
            You&apos;re on the list
            {result.firstName ? (
              <>
                , <span className="italic">{result.firstName}</span>
              </>
            ) : null}
          </>
        )}
      </h2>
      <p className="waitlist-rise waitlist-rise-late max-w-[340px] text-[15px] leading-relaxed text-espresso/75">
        {alreadyListed ? (
          <>{phone} is already saved. No need to do anything else.</>
        ) : (
          <>
            I&apos;ll text {phone} as soon as booking reopens{forService}.
          </>
        )}
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
