"use client";

import type { FormEvent } from "react";
import { useToast } from "@/components/ui/Toast";
import { useFormValidation } from "@/hooks/useFormValidation";

export function ContactForm() {
  const toast = useToast();
  const { validate, formProps } = useFormValidation();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!validate(form)) return toast("Please fix the highlighted fields.");
    form.reset();
    toast("Thank you! Our team will contact you shortly.");
  }

  return (
    <form className="dw-form" id="ctForm" noValidate onSubmit={onSubmit} {...formProps}>
      <h2>Send an Enquiry</h2>
      <p style={{ color: "var(--muted)", fontSize: "13.5px", marginBottom: "18px" }}>
        Tell us about your trip or question and we will call you back.
      </p>
      <div className="grid2">
        <div className="fld" data-rule="req"><label htmlFor="cname">Full name <em>*</em></label><input type="text" id="cname" name="name" placeholder="Enter your full name" /><div className="err">Please enter your full name.</div></div>
        <div className="fld" data-rule="req mobile"><label htmlFor="cmobile">Mobile number <em>*</em></label><input type="tel" id="cmobile" name="mobile" placeholder="Enter 10-digit mobile number" /><div className="err">Enter a valid 10-digit mobile number.</div></div>
        <div className="fld" data-rule="email"><label htmlFor="cemail">Email <span className="opt">(optional)</span></label><input type="email" id="cemail" name="email" placeholder="Enter your email address" /><div className="err">Enter a valid email address.</div></div>
        <div className="fld" data-rule="req">
          <label htmlFor="csub">Enquiry about <em>*</em></label>
          <select id="csub" name="subject" defaultValue="">
            <option value="">Select a topic</option>
            <option>Car rental</option><option>Bus / group travel</option><option>Hotel guest trip</option>
            <option>Airport pickup &amp; drop</option><option>Driver job</option><option>Other</option>
          </select>
          <div className="err">Please select a topic.</div>
        </div>
        <div className="fld full" data-rule="req"><label htmlFor="cmsg">Message <em>*</em></label><textarea id="cmsg" name="message" placeholder="Travel date, pickup location, number of people or any question" /><div className="err">Please write your message.</div></div>
      </div>
      <button className="btn block" type="submit" style={{ marginTop: "14px" }}>Send Enquiry</button>
    </form>
  );
}
