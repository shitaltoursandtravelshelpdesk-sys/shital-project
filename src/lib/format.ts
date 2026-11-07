export const inr = (n: number | string): string => "₹" + Number(n).toLocaleString("en-IN");

/** yyyy-mm-dd in local time */
export const isoLocal = (d: Date): string =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export const fmtDate = (iso: string | undefined, opts?: Intl.DateTimeFormatOptions): string =>
  iso
    ? new Date(iso + "T00:00").toLocaleDateString("en-GB", opts ?? { day: "numeric", month: "short", year: "numeric" })
    : "—";

/** "14:30" -> "2:30 PM" */
export const fmtTime = (t: string | undefined): string => {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
};

/** "Ahmedabad Airport, Gujarat" -> "Ahmedabad Airport" */
export const short = (s: string): string => s.split(",")[0];
