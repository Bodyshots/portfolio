import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { OtherConstants } from "@/constants/other";

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

function normalizeUrlSafeName(name: string) {
  let decodedName: string;
  try {
    decodedName = decodeURIComponent(name);
  } catch {
    decodedName = name;
  }

  return decodedName
    .replace(/&amp;/gi, " and ")
    .replace(/&/g, " and ")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function resolveActualNameFromUrlSafeName(
  urlSafeName: string,
  actualNames: string[],
): string | null {
  const normalizedUrlName = normalizeUrlSafeName(urlSafeName);
  const matches = actualNames.filter(
    (name) => normalizeUrlSafeName(name) === normalizedUrlName,
  );

  return matches.length === 1 ? matches[0] : null;
}

export function displayDescription(text: string, limit: number = 0) {
  return limit || text.length <= limit
    ? text
    : `${text.substring(0, limit)}...`;
}

export function capitalizeString(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getFullName() {
  return `${OtherConstants.FIRST_NAME} ${OtherConstants.LAST_NAME}`;
}
