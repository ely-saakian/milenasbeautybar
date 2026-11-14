"use client";

import { useCallback, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { formatUsPhone } from "@/lib/phone";
import {
  firstName,
  type FieldErrors,
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
 * the next open). invalid and error keep what was typed.
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

/**
 * POST a signup and read the result. Every outcome comes back as a
 * SignupResponse: anything unexpected (network failure, a non-JSON body, an
 * unknown status such as a 429 from the firewall) becomes `{ status: "error" }`.
 */
export async function submitSignup(
  request: SignupRequest
): Promise<SignupResponse> {
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
      case "invalid":
        return {
          status: "invalid",
          fields: (body as { fields?: FieldErrors }).fields ?? {},
        };
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
    async (values: { name: string; phone: string }) => {
      if (inFlight.current) return;
      inFlight.current = true;
      setState({ status: "submitting" });

      const result = await submitSignup({
        name: values.name,
        phone: values.phone,
        service,
        website: "",
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

  return { state, submit };
}
