"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) return;

    posthog.init(key, {
      api_host:
        process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com",
      // Privacy-first: no cookies, no persistent user profiles
      person_profiles: "never",
      persistence: "memory",
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: false,
    });
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
