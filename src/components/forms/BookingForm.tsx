"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormValidation } from "@/hooks/useFormValidation";
import { useToast } from "@/components/ui/Toast";
import { SERVICE_PRESET } from "@/lib/fare";
import { isoLocal } from "@/lib/format";
import { getItem, KEYS, setItem } from "@/lib/storage";
import type { Booking } from "@/types";

/** Write values into named form controls (radios get checked, others get value) */
function fill(form: HTMLFormElement, values: Partial<Record<string, string>>) {
  Object.entries(values).forEach(([k, v]) => {
    form.querySelectorAll<HTMLInputElement>(`[name="${k}"]`).forEach((el) => {
      if (el.type === "radio") el.checked = el.value === v;
      else el.value = v ?? "";
    });
  });
}

export function BookingForm() {
  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const params = useSearchParams();
  const toast = useToast();
  const { validate, formProps } = useFormValidation();
  const [custom, setCustom] = useState(false);
  const [notesLen, setNotesLen] = useState(0);
  const [minDate, setMinDate] = useState<string>();

  // prefill: ?edit=1 restores the last booking, ?service= and ?for=hotel set presets
  useEffect(() => {
    const form = ref.current;
    if (!form) return;
    setMinDate(isoLocal(new Date()));
    const prev = getItem<Booking>(KEYS.booking);
    const svc = params.get("service");
    if (prev && params.get("edit")) fill(form, prev as unknown as Record<string, string>);
    if (svc) {
      fill(form, { service: svc });
      const preset = SERVICE_PRESET[svc];
      const notes = form.elements.namedItem("notes") as HTMLTextAreaElement;
      if (preset && !notes.value) notes.value = `Service: ${preset}. `;
      if (svc === "bus") fill(form, { vehicle: "Bus" });
      if (svc === "outstation") fill(form, { tripType: "Round trip" });
    }
    if (params.get("for") === "hotel") fill(form, { bookingFor: "Hotel guest" });
    sync(form);
  }, [params]);

  function sync(form: HTMLFormElement) {
    const on = (form.querySelector<HTMLInputElement>("[name=duration]:checked")?.value ?? "") === "Custom";
    setCustom(on);
    if (!on) form.querySelector("#customDays")?.closest(".fld")?.classList.remove("bad");
    setNotesLen((form.elements.namedItem("notes") as HTMLTextAreaElement).value.length);
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!validate(form)) return toast("Please fix the highlighted fields.");
    const b = Object.fromEntries(new FormData(form).entries()) as unknown as Booking;
    b.service = b.service || "outstation";
    setItem(KEYS.booking, b);
    router.push("/review");
  }

  return (
    <form
      className="card"
      id="reqForm"
      noValidate
      ref={ref}
      onSubmit={onSubmit}
      onInput={(e) => {
        formProps.onInput(e);
        sync(e.currentTarget);
      }}
      onChange={(e) => {
        formProps.onChange(e);
        sync(e.currentTarget);
      }}
    >
      <input type="hidden" name="service" defaultValue="" />
      <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>Trip Details</h2>
      <div className="grid2">
        <div className="fld full" data-rule="req">
          <span className="lbl">Booking for <em>*</em></span>
          <div className="radios">
            <label><input type="radio" name="bookingFor" value="Myself" defaultChecked /> Myself</label>
            <label><input type="radio" name="bookingFor" value="Hotel guest" /> Hotel guest</label>
          </div>
        </div>

        <div className="fld" data-rule="req">
          <label htmlFor="name">Full name <em>*</em></label>
          <input type="text" id="name" name="name" placeholder="Enter your full name" autoComplete="name" />
          <div className="err">Please enter your full name.</div>
        </div>
        <div className="fld" data-rule="req mobile">
          <label htmlFor="mobile">Mobile number <em>*</em></label>
          <input type="tel" id="mobile" name="mobile" placeholder="Enter your mobile number" autoComplete="tel" />
          <div className="err">Enter a valid 10-digit mobile number.</div>
        </div>

        <div className="fld full" data-rule="email">
          <label htmlFor="email">Email <span className="opt">(optional)</span></label>
          <input type="email" id="email" name="email" placeholder="Enter your email address" autoComplete="email" />
          <div className="err">Enter a valid email address.</div>
        </div>

        <div className="fld" data-rule="req">
          <label htmlFor="pickup">Pickup location <em>*</em></label>
          <input type="text" id="pickup" name="pickup" placeholder="Enter pickup location" />
          <div className="err">Please enter a pickup location.</div>
        </div>
        <div className="fld" data-rule="req">
          <label htmlFor="drop">Drop location <em>*</em></label>
          <input type="text" id="drop" name="drop" placeholder="Enter drop location" />
          <div className="err">Please enter a drop location.</div>
        </div>

        <div className="fld" data-rule="req future">
          <label htmlFor="date">Pickup date <em>*</em></label>
          <input type="date" id="date" name="date" min={minDate} />
          <div className="err">Choose today or a future date.</div>
        </div>
        <div className="fld" data-rule="req">
          <label htmlFor="time">Pickup time <em>*</em></label>
          <input type="time" id="time" name="time" />
          <div className="err">Please select a pickup time.</div>
        </div>

        <div className="fld" data-rule="req">
          <span className="lbl">Trip type <em>*</em></span>
          <div className="radios">
            <label><input type="radio" name="tripType" value="One-way" defaultChecked /> One-way</label>
            <label><input type="radio" name="tripType" value="Round trip" /> Round trip</label>
          </div>
        </div>
        <div className="fld" data-rule="">
          <span className="lbl">Duration <em>*</em></span>
          <div className="radios">
            <label><input type="radio" name="duration" value="1" defaultChecked /> 1 day</label>
            <label><input type="radio" name="duration" value="2" /> 2 days</label>
            <label><input type="radio" name="duration" value="Custom" /> Custom</label>
          </div>
          <div className="fld" data-rule={custom ? "req" : ""}>
            <input
              type="number"
              id="customDays"
              name="customDays"
              min="1"
              max="30"
              placeholder="Number of days"
              style={{ marginTop: "8px", display: custom ? "block" : "none" }}
            />
            <div className="err">Enter the number of days.</div>
          </div>
        </div>

        <div className="fld" data-rule="req">
          <span className="lbl">Vehicle <em>*</em></span>
          <div className="radios">
            <label><input type="radio" name="vehicle" value="Car" defaultChecked /> Car</label>
            <label><input type="radio" name="vehicle" value="Bus" /> Bus</label>
            <label><input type="radio" name="vehicle" value="Not sure" /> Not sure</label>
          </div>
        </div>
        <div className="fld" data-rule="req">
          <label htmlFor="passengers">Number of passengers <em>*</em></label>
          <select id="passengers" name="passengers" defaultValue="">
            <option value="">Select number of passengers</option>
            <option>1</option><option>2</option><option>3</option><option>4</option><option>5</option>
            <option>6</option><option>7</option><option>8–12</option><option>13–17</option>
            <option>18–30</option><option>30+</option>
          </select>
          <div className="err">Please select the number of passengers.</div>
        </div>

        <div className="fld full">
          <label htmlFor="notes">Additional stops / special requests <span className="opt">(optional)</span></label>
          <textarea
            id="notes"
            name="notes"
            maxLength={500}
            placeholder="Tell us about additional stops, special requests or any other details..."
          />
          <div className="count" id="notesCount">{notesLen}/500</div>
        </div>
      </div>
      <button className="btn" type="submit" style={{ marginTop: "8px", padding: "12px 40px" }}>
        Submit Booking Request &rsaquo;
      </button>
      <div className="hint">Submitting a request does not confirm a booking.</div>
    </form>
  );
}
