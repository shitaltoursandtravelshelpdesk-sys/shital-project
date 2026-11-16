"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { FareBreakdown } from "@/components/booking/FareBreakdown";
import { SummaryRows } from "@/components/booking/SummaryRows";
import { CalendarIcon, InfoIcon, LockIcon, MailIcon, PhoneIcon, PinIcon, UserIcon } from "@/components/icons";
import { useToast } from "@/components/ui/Toast";
import { useFormValidation } from "@/hooks/useFormValidation";
import { fare, newBookingId } from "@/lib/fare";
import { getItem, KEYS, setItem } from "@/lib/storage";
import type { Booking, ConfirmedBooking } from "@/types";

export function ReviewForm() {
  const router = useRouter();
  const toast = useToast();
  const { validate, formProps } = useFormValidation();
  const [b, setB] = useState<Booking | null>(null);
  const [ready, setReady] = useState(false);
  const [payment, setPayment] = useState<"now" | "later">("now");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const saved = getItem<Booking>(KEYS.booking);
    if (!saved) {
      router.replace("/book");
      return;
    }
    setB(saved);
    setReady(true);
  }, [router]);

  const f = useMemo(() => (b ? fare(b) : null), [b]);

  if (!ready || !b || !f) {
    return (
      <div className="wrap" style={{ padding: "80px 0", textAlign: "center", color: "var(--muted)" }}>
        Loading your booking…
      </div>
    );
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!validate(form) || !b || !f) return toast("Please complete your contact details.");
    setBusy(true);
    const val = (n: string) => (form.elements.namedItem(n) as HTMLInputElement).value.trim();
    const updated: Booking = { ...b, name: val("name"), email: val("email"), mobile: val("mobile"), instructions: val("instructions"), payment };
    const confirmed: ConfirmedBooking = { ...updated, id: newBookingId(), fare: f, confirmedAt: Date.now() };
    setItem(KEYS.booking, updated);
    setItem(KEYS.confirmed, confirmed);
    // send the order to the server so it shows in the driver app
    fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(confirmed) })
      .then((r) => {
        if (!r.ok) throw new Error();
        router.replace("/confirmed");
      })
      .catch(() => {
        setBusy(false);
        toast("Could not send your booking. Please check your internet and try again.");
      });
  }

  return (
    <form className="wrap" id="rvForm" noValidate onSubmit={onSubmit} {...formProps}>
      <div className="rv-head">
        <div>
          <h1>Review your booking</h1>
          <p>Please review your trip details, add your contact information and choose a payment option to confirm.</p>
        </div>
        <div className="stepper">
          <Link className="s" href="/book?edit=1"><span className="d">&#10003;</span>Trip details</Link>
          <Link className="s" href="/book?edit=1"><span className="d">&#10003;</span>Select car</Link>
          <div className="s cur"><span className="d">3</span>Review &amp; pay</div>
        </div>
      </div>

      <div className="rv-grid">
        <div className="col">
          <div className="card">
            <div className="ch"><h2>Contact details</h2><small>We will share booking updates on these details.</small></div>
            <div className="grid3">
              <div className="fld" data-rule="req">
                <label htmlFor="name">Full name <em>*</em></label>
                <div className="iw"><span><UserIcon /></span><input type="text" id="name" name="name" placeholder="Enter your full name" defaultValue={b.name || ""} /></div>
                <div className="err">Please enter your full name.</div>
              </div>
              <div className="fld" data-rule="req email">
                <label htmlFor="email">Email address <em>*</em></label>
                <div className="iw"><span><MailIcon /></span><input type="email" id="email" name="email" placeholder="Enter your email address" defaultValue={b.email || ""} /></div>
                <div className="err">Enter a valid email address.</div>
              </div>
              <div className="fld" data-rule="req mobile">
                <label htmlFor="mobile">Mobile number <em>*</em></label>
                <div className="iw"><span><PhoneIcon /></span><input type="tel" id="mobile" name="mobile" placeholder="Enter 10-digit mobile number" defaultValue={b.mobile || ""} /></div>
                <div className="err">Enter a valid 10-digit mobile number.</div>
              </div>
              <div className="fld full">
                <label htmlFor="instructions">Pickup instructions <span className="opt">(optional)</span></label>
                <div className="iw"><span><PinIcon /></span><input type="text" id="instructions" name="instructions" placeholder="Flight number, terminal, pickup point or any special instructions" defaultValue={b.instructions || ""} /></div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="ch"><h2>Fare estimate</h2></div>
            <FareBreakdown b={b} f={f} />
            <div className="cancel">
              <span style={{ fontSize: "18px", color: "var(--navy)" }}><InfoIcon /></span>
              <div>
                <b>Cancellation terms</b><br />
                Free cancellation up to 48 hours before pickup. Cancellations within 48 hours may attract charges.<br />
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toast("Cancellations within 48 hours of pickup may attract up to one day's rental charge.");
                  }}
                >
                  View full cancellation policy &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card">
            <div className="ch"><h2>Trip summary</h2><Link href="/book?edit=1">Edit</Link></div>
            <div className="sum"><SummaryRows b={b} f={f} /><div className="car-img" /></div>
          </div>

          <div className="card">
            <div className="ch"><h2>Payment option</h2></div>
            <label className={payment === "now" ? "pay sel" : "pay"} onClick={() => setPayment("now")}>
              <input type="radio" name="payment" value="now" checked={payment === "now"} onChange={() => setPayment("now")} />
              <div><b>Pay now <span>(recommended)</span></b><span>Secure online payment to confirm your booking instantly.</span></div>
            </label>
            <label className={payment === "later" ? "pay sel" : "pay"} onClick={() => setPayment("later")}>
              <input type="radio" name="payment" value="later" checked={payment === "later"} onChange={() => setPayment("later")} />
              <div><b>Pay later / request confirmation</b><span>We will hold your booking and share payment instructions. Your booking will be confirmed after payment.</span></div>
            </label>
            <button className="btn teal block" id="confirmBtn" type="submit" disabled={busy} style={{ padding: "14px", fontSize: "16px", marginTop: "6px" }}>
              {busy ? "Processing…" : <><CalendarIcon /> Confirm booking &rarr;</>}
            </button>
            <div className="secure" id="secureNote" style={{ visibility: payment === "now" ? "visible" : "hidden" }}>
              <LockIcon /> You will be redirected to a secure payment page.
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
