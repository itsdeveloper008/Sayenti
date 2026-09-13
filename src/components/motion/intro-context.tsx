"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type IntroContextValue = {
  introComplete: boolean;
  setIntroComplete: (v: boolean) => void;
};

const IntroContext = createContext<IntroContextValue | null>(null);

export function IntroProvider({ children }: { children: ReactNode }) {
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) setIntroComplete(true);
  }, []);

  const value = useMemo(
    () => ({ introComplete, setIntroComplete }),
    [introComplete]
  );

  return (
    <IntroContext.Provider value={value}>{children}</IntroContext.Provider>
  );
}

export function useIntro() {
  const ctx = useContext(IntroContext);
  if (!ctx) {
    return { introComplete: true, setIntroComplete: () => undefined };
  }
  return ctx;
}
