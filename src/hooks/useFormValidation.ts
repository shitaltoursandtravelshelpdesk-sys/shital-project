"use client";

import { useCallback, type FormEvent } from "react";

const MOBILE = /^[6-9]\d{9}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FILE_EXT = /\.(pdf|jpe?g|png)$/i;
const MAX_FILE = 5 * 1024 * 1024;

/** Rules on data-rule of each .fld: req, mobile, email, future, file. Same logic as the old validate(). */
export function validateForm(form: HTMLFormElement): boolean {
  let ok = true;
  let first: HTMLElement | null = null;
  form.querySelectorAll<HTMLElement>(".fld[data-rule]").forEach((f) => {
    const rule = f.dataset.rule ?? "";
    const input = f.querySelector<HTMLInputElement>("input:not([type=radio]),select,textarea");
    const radio = f.querySelector("input[type=radio]");
    let v: string | number | undefined;
    if (radio) v = f.querySelector<HTMLInputElement>("input[type=radio]:checked")?.value;
    else if (input) v = input.type === "file" ? (input.files?.length ?? 0) : input.value.trim();

    let bad = false;
    if (rule.includes("req") && !v) bad = true;
    if (!bad && v && rule.includes("mobile") &&
      !MOBILE.test(String(v).replace(/[\s+-]/g, "").replace(/^91(?=\d{10}$)/, ""))) bad = true;
    if (!bad && v && rule.includes("email") && !EMAIL.test(String(v))) bad = true;
    if (!bad && v && rule.includes("future")) {
      const d = new Date(v + "T00:00");
      const t = new Date();
      t.setHours(0, 0, 0, 0);
      if (d < t) bad = true;
    }
    if (!bad && rule.includes("file") && input?.files?.[0]) {
      const fl = input.files[0];
      if (!FILE_EXT.test(fl.name) || fl.size > MAX_FILE) bad = true;
    }
    f.classList.toggle("bad", bad);
    if (bad) {
      ok = false;
      first = first ?? f;
    }
  });
  (first as HTMLElement | null)?.scrollIntoView({ behavior: "smooth", block: "center" });
  return ok;
}

/** Clear .bad on the field being edited */
function clearBad(e: FormEvent<HTMLFormElement>) {
  const f = (e.target as HTMLElement).closest(".fld.bad");
  if (f) f.classList.remove("bad");
}

export function useFormValidation() {
  const validate = useCallback((form: HTMLFormElement) => validateForm(form), []);
  /** spread on <form>: clears errors on input/change */
  const formProps = { onInput: clearBad, onChange: clearBad };
  return { validate, formProps };
}
