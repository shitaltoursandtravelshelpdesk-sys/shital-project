"use client";

export function PrintButton() {
  return <button type="button" className="btn" onClick={() => window.print()}>Download / Print &darr;</button>;
}
