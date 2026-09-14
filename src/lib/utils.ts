import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Capitalise the first letter of every word. Leaves the rest of each word
 * untouched so acronyms and hyphenated terms (NHS-adjacent, SD-WAN) survive.
 */
export function titleCase(text: string) {
  return text.replace(/(^|\s)(\p{Ll})/gu, (_, sep: string, ch: string) =>
    `${sep}${ch.toUpperCase()}`
  );
}
