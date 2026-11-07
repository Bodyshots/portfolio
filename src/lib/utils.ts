import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function htmlEscape(text: string) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function normTitleHTMLEscape(text: string) {
  return htmlEscape(text.toLowerCase().replace(/\s+/g, "-"));
}

export function displayDescription(text: string, limit: number = 0) {
  return limit || text.length <= limit
    ? text
    : `${text.substring(0, limit)}...`;
}

export function capitalizeString(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
