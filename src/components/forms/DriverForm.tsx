"use client";

import { useState, type FormEvent } from "react";
import { useToast } from "@/components/ui/Toast";
import { useFormValidation } from "@/hooks/useFormValidation";
import { getItem, KEYS, setItem } from "@/lib/storage";
import type { DriverApplication } from "@/types";

export function DriverForm() {
  const toast = useToast();
  const { validate, formProps } = useFormValidation();
  const [fileName, setFileName] = useState("No file chosen");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!validate(form)) return toast("Please fix the highlighted fields.");
    const file = (form.elements.namedItem("licence") as HTMLInputElement).files?.[0];
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, FormDataEntryValue>;
    delete data.licence;
    const app = { ...(data as Record<string, string>), licenceFile: file?.name ?? "", appliedOn: new Date().toISOString() } as DriverApplication;
    const apps = getItem<DriverApplication[]>(KEYS.driverApps) ?? [];
    apps.push(app);
    setItem(KEYS.driverApps, apps);
    form.reset();
    setFileName("No file chosen");
    toast("Application submitted. Our team will get in touch if you are shortlisted.");
  }

  return (
    <form className="dw-form" id="dwForm" noValidate onSubmit={onSubmit} {...formProps}>
      <h2>Apply Now</h2>
      <p style={{ color: "var(--muted)", fontSize: "13.5px", marginBottom: "18px" }}>
        Please fill out the form below. Our team will review your application and get in touch if you are shortlisted.
      </p>
      <div className="grid2">
        <div className="fld" data-rule="req"><label htmlFor="dname">Full name <em>*</em></label><input type="text" id="dname" name="name" placeholder="Enter your full name" /><div className="err">Please enter your full name.</div></div>
        <div className="fld" data-rule="req mobile"><label htmlFor="dmobile">Mobile number <em>*</em></label><input type="tel" id="dmobile" name="mobile" placeholder="Enter your mobile number" /><div className="err">Enter a valid 10-digit mobile number.</div></div>
        <div className="fld" data-rule="email"><label htmlFor="demail">Email <span className="opt">(optional)</span></label><input type="email" id="demail" name="email" placeholder="Enter your email address" /><div className="err">Enter a valid email address.</div></div>
        <div className="fld" data-rule="req"><label htmlFor="dcity">City <em>*</em></label><input type="text" id="dcity" name="city" placeholder="Enter your city" /><div className="err">Please enter your city.</div></div>
        <div className="fld" data-rule="req"><label htmlFor="dlic">Driving licence number <em>*</em></label><input type="text" id="dlic" name="licenceNo" placeholder="Enter your driving licence number" /><div className="err">Please enter your licence number.</div></div>
        <div className="fld" data-rule="req">
          <span className="lbl">Vehicle experience <em>*</em></span>
          <div className="radios">
            <label><input type="radio" name="experience" value="Car" /> Car</label>
            <label><input type="radio" name="experience" value="Bus" /> Bus</label>
            <label><input type="radio" name="experience" value="Both" /> Both</label>
          </div>
          <div className="err">Please select your vehicle experience.</div>
        </div>
        <div className="fld" data-rule="req">
          <label htmlFor="dyears">Years of driving experience <em>*</em></label>
          <select id="dyears" name="years" defaultValue="">
            <option value="">Select years of experience</option>
            <option>Less than 1 year</option><option>1–2 years</option><option>3–5 years</option>
            <option>6–10 years</option><option>More than 10 years</option>
          </select>
          <div className="err">Please select your experience.</div>
        </div>
        <div className="fld" data-rule="req file">
          <span className="lbl">Upload driving licence <em>*</em></span>
          <div className="file">
            <label className="btn" htmlFor="licence">Choose File</label>
            <span id="fileName">{fileName}</span>
            <input
              type="file"
              id="licence"
              name="licence"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "No file chosen")}
            />
          </div>
          <div className="hint">Accepted formats: JPG, PNG, PDF (Max size 5MB)</div>
          <div className="err">Upload a JPG, PNG or PDF under 5MB.</div>
        </div>
        <div className="fld full"><label htmlFor="dwork">Brief work experience <span className="opt">(optional)</span></label><textarea id="dwork" name="work" placeholder="Tell us about your work or driving experience, types of vehicles, routes etc." /></div>
      </div>
      <button className="btn block" type="submit" style={{ marginTop: "14px" }}>Submit Application</button>
      <p className="hint center">Our team will review your application and get in touch if you are shortlisted.</p>
    </form>
  );
}
