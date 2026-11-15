"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { GENERAL_SERVICE } from "@/lib/waitlist";
import { useMediaQuery } from "./use-media-query";
import { WaitlistDialog } from "./waitlist-dialog";
import { isWaitlistHash, urlWithoutWaitlistHash } from "./waitlist-hash";

/** Phones get the bottom sheet; matches Tailwind's `sm` breakpoint. */
const SHEET_QUERY = "(max-width: 639px)";

export type OpenWaitlistOptions = {
  /** The service the visitor wants, e.g. "Lash Lift". Defaults to "General". */
  service?: string;
  /** Where focus goes back to when the form closes (usually the clicked link). */
  trigger?: HTMLElement | null;
};

export type WaitlistContextValue = {
  openWaitlist: (options?: OpenWaitlistOptions) => void;
  closeWaitlist: () => void;
};

const WaitlistContext = createContext<WaitlistContextValue | null>(null);

/**
 * Opens the waitlist form from anywhere on the site. Null outside the provider,
 * in which case Book links just behave as plain links.
 */
export function useWaitlist(): WaitlistContextValue | null {
  return useContext(WaitlistContext);
}

/**
 * Mounted once in the root layout. Owns whether the waitlist form is open and
 * for which service, and renders the one form surface for the whole site: a
 * centred modal, or a bottom sheet on phones.
 *
 * Also opens the form for the shareable #waitlist link, on page load or when
 * the hash changes to it, and clears that hash again when the form closes.
 */
export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState(GENERAL_SERVICE);
  // Bumped on every open so each visit starts with a fresh form.
  const [session, setSession] = useState(0);
  const triggerRef = useRef<HTMLElement | null>(null);
  // Mirrors `open` for the hash listener, so a repeat #waitlist doesn't
  // restart a form that's already showing.
  const openRef = useRef(false);
  const showSheet = useMediaQuery(SHEET_QUERY);

  const openWaitlist = useCallback((options: OpenWaitlistOptions = {}) => {
    openRef.current = true;
    triggerRef.current = options.trigger ?? null;
    setService(options.service?.trim() || GENERAL_SERVICE);
    setSession((n) => n + 1);
    setOpen(true);
  }, []);

  const closeWaitlist = useCallback(() => {
    openRef.current = false;
    setOpen(false);
  }, []);

  // #waitlist opens the form. Runs after hydration, so the dialog is mounted
  // and showModal() works. Only native hash changes are seen: a plain
  // <a href="#waitlist"> works, a next/link to it (pushState) would not.
  useEffect(() => {
    const openFromHash = () => {
      if (isWaitlistHash(window.location.hash) && !openRef.current) {
        openWaitlist();
      }
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [openWaitlist]);

  const handleClosed = useCallback(() => {
    const url = urlWithoutWaitlistHash(window.location);
    if (url !== null) window.history.replaceState(null, "", url);

    const trigger = triggerRef.current;
    triggerRef.current = null;
    if (trigger?.isConnected) trigger.focus({ preventScroll: true });
  }, []);

  const value = useMemo(
    () => ({ openWaitlist, closeWaitlist }),
    [openWaitlist, closeWaitlist]
  );

  return (
    <WaitlistContext.Provider value={value}>
      {children}
      <WaitlistDialog
        open={open}
        variant={showSheet ? "sheet" : "modal"}
        service={service}
        session={session}
        onClose={closeWaitlist}
        onClosed={handleClosed}
      />
    </WaitlistContext.Provider>
  );
}
