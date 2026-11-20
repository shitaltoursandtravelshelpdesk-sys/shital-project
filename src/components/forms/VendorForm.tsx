"use client";

import type { FormEvent } from "react";
import { useToast } from "@/components/ui/Toast";
import { useFormValidation } from "@/hooks/useFormValidation";

const VEHICLES = ["Sedan", "SUV", "Innova / MPV", "Luxury car", "Tempo Traveller", "Mini bus", "Bus"];

export function VendorForm() {
  const toast = useToast();
  const { validate, formProps } = useFormValidation();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!validate(form)) return toast("Please fix the highlighted fields.");
    form.reset();
    toast("Thank you! Our vendor team will contact you shortly.");
  }

  return (
    <form className="dw-form" id="vnForm" noValidate onSubmit={onSubmit} {...formProps}>
      <h2>Register as a Vendor</h2>
      <p style={{ fontSize: "13.5px", marginBottom: "18px" }}>
        Share your details and vehicles. Our team will call you to complete the partnership.
      </p>
      <div className="grid2">
        <div className="fld" data-rule="req"><label htmlFor="vname">Owner / contact name <em>*</em></label><input type="text" id="vname" name="name" placeholder="Enter your full name" /><div className="err">Please enter your name.</div></div>
        <div className="fld"><label htmlFor="vcompany">Company / agency name <span className="opt">(optional)</span></label><input type="text" id="vcompany" name="company" placeholder="Enter your company name" /></div>
        <div className="fld" data-rule="req mobile"><label htmlFor="vmobile">Mobile number <em>*</em></label><input type="tel" id="vmobile" name="mobile" placeholder="Enter 10-digit mobile number" /><div className="err">Enter a valid 10-digit mobile number.</div></div>
        <div className="fld" data-rule="email"><label htmlFor="vemail">Email <span className="opt">(optional)</span></label><input type="email" id="vemail" name="email" placeholder="Enter your email address" /><div className="err">Enter a valid email address.</div></div>
        <div className="fld" data-rule="req"><label htmlFor="vcity">City <em>*</em></label><input type="text" id="vcity" name="city" placeholder="Enter your city" /><div className="err">Please enter your city.</div></div>
        <div className="fld" data-rule="req">
          <label htmlFor="vcount">Number of vehicles <em>*</em></label>
          <select id="vcount" name="count" defaultValue="">
            <option value="">Select</option>
            <option>1</option><option>2 – 5</option><option>6 – 10</option><option>11 – 25</option><option>25+</option>
          </select>
          <div className="err">Please select number of vehicles.</div>
        </div>
        <div className="fld full">
          <span className="lbl">Vehicle types you can provide</span>
          <div className="vn-checks">
            {VEHICLES.map((v) => (
              <label key={v}><input type="checkbox" name="types" value={v} /> {v}</label>
            ))}
          </div>
        </div>
        <div className="fld full"><label htmlFor="vmsg">Anything else <span className="opt">(optional)</span></label><textarea id="vmsg" name="message" placeholder="Vehicle models, permits (all-India / state), AC, driver available or not, etc." /></div>
      </div>
      <button className="btn block" type="submit" style={{ marginTop: "14px" }}>Submit Registration</button>
    </form>
  );
}
