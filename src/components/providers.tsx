"use client";

import { IntroProvider } from "@/components/motion/intro-context";
import { CinematicIntroGate } from "@/components/motion/cinematic-intro";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <IntroProvider>
      <CinematicIntroGate>{children}</CinematicIntroGate>
    </IntroProvider>
  );
}
