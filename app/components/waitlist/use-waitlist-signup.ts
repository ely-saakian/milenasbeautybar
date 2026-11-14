"use client";

import { useCallback, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { formatUsPhone } from "@/lib/phone";
import {
  firstName,
  parseSignup,
  type FieldErrors,
  type SignupField,
  type SignupRequest,
  type SignupResponse,
} from "@/lib/waitlist";

/**
 * The form's state machine:
 *
 *   idle ──submit──▶ submitting ──▶ created | already_listed | invalid | error
 *   invalid | error ──submit──▶ submitting
 *
 * created and already_listed are final for this visit (the form remounts on
 * the next open). invalid and error keep what was typed. A field's message
 * clears as soon as the visitor edits that field; when none are left the form
 * is back to idle.
 */
export type SignupState =
  | { status: "idle" }
  | { status: "submitting" }
  | {
      status: "created" | "already_listed";
      firstName: string;
      /** Formatted for display, e.g. "(253) 555-0147". */
      phone: string;
      service: string;
    }
  | { status: "invalid"; fields: FieldErrors }
  | { status: "error" };

const ENDPOINT = "/api/waitlist";

/** Keep only the messages the form knows how to show, under its own fields. */
function fieldErrors(value: unknown): FieldErrors {
  const raw = (value && typeof value === "object" ? value : {}) as Record<
    string,
    unknown
  >;
  const fields: FieldErrors = {};
  for (const field of ["name", "phone"] as const) {
    if (typeof raw[field] === "string" && raw[field])
      fields[field] = raw[field];
  }
  return fields;
}

/**
 * Check a signup in the browser, then POST it and read the result. An invalid
 * signup is answered locally with the same messages the server would send, and
 * nothing is sent. Every other outcome comes back as a SignupResponse: anything
 * unexpected (network failure, a non-JSON body, an unknown status such as a 429
 * from the firewall, a 403 "forbidden" from the origin check, or an "invalid"
 * with no field to point at) becomes `{ status: "error" }`.
 */
export async function submitSignup(
  request: SignupRequest
): Promise<SignupResponse> {
  const checked = parseSignup(request);
  if (!checked.ok) return { status: "invalid", fields: checked.fields };

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(request),
    });
    const body = (await res.json()) as Partial<SignupResponse>;
    switch (body.status) {
      case "created":
      case "already_listed":
        return { status: body.status };
      case "invalid": {
        const fields = fieldErrors((body as { fields?: unknown }).fields);
        return Object.keys(fields).length > 0
          ? { status: "invalid", fields }
          : { status: "error" };
      }
      default:
        return { status: "error" };
    }
  } catch {
    return { status: "error" };
  }
}

export function useWaitlistSignup(service: string) {
  const [state, setState] = useState<SignupState>({ status: "idle" });
  // A ref as well as state, so a double click can't send twice before re-render.
  const inFlight = useRef(false);

  const submit = useCallback(
    async (values: Omit<SignupRequest, "service">) => {
      if (inFlight.current) return;
      inFlight.current = true;
      setState({ status: "submitting" });

      const result = await submitSignup({
        name: values.name,
        phone: values.phone,
        service,
        website: values.website,
      });

      inFlight.current = false;
      if (result.status === "created" || result.status === "already_listed") {
        // Only the service goes to analytics: never the name or phone.
        trackEvent("waitlist_signup", { service });
        setState({
          status: result.status,
          firstName: firstName(values.name),
          phone: formatUsPhone(values.phone),
          service,
        });
      } else {
        setState(result);
      }
    },
    [service]
  );

  /** The visitor is fixing `field`: drop its message. */
  const clearFieldError = useCallback((field: SignupField) => {
    setState((current) => {
      if (current.status !== "invalid" || !current.fields[field])
        return current;
      const fields = { ...current.fields };
      delete fields[field];
      return Object.keys(fields).length > 0
        ? { status: "invalid", fields }
        : { status: "idle" };
    });
  }, []);

  return { state, submit, clearFieldError };
}
