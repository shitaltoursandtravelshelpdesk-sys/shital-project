/** Safe localStorage helpers. Call only from useEffect or event handlers (browser only). */
export const KEYS = {
  booking: "shital_booking",
  confirmed: "shital_confirmed",
  driverApps: "shital_driver_apps",
} as const;

export function getItem<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function setItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or blocked */
  }
}
