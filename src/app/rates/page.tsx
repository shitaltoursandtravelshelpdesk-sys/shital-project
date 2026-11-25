import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Rate Card — Shital Tours & Travels",
  description: "Indicative per-km rates and local packages for cars, tempo travellers and buses in Ahmedabad.",
  path: "/rates",
});

const PER_KM: [string, string][] = [
  ["Hatchback – WagonR", "₹11–12"],
  ["Sedan – Swift Dzire / Etios", "₹12–14"],
  ["SUV – Ertiga", "₹15–17"],
  ["Premium SUV – Innova Crysta", "₹18–22"],
  ["Tempo Traveller – 12 seater", "₹22–26"],
  ["Tempo Traveller – 17 seater", "₹22–30"],
  ["Mini Bus – 20–27 seater", "₹28–38"],
  ["AC Bus – 35–49 seater", "₹35–45"],
];

const PACKAGES: [string, string, string][] = [
  ["Sedan", "4 hours / 40 km", "₹1,500"],
  ["Sedan", "8 hours / 80 km", "₹2,700"],
  ["Ertiga", "8 hours / 80 km", "₹3,500"],
  ["Innova Crysta", "8 hours / 80 km", "₹4,500"],
  ["Tempo Traveller", "8 hours / 80 km", "₹5,000–7,000"],
  ["35–49 seater bus", "Full-day duty", "₹12,000–18,000"],
];

const TERMS = [
  "Duty hours and kilometres will be as mutually agreed.",
  "Extra hours and extra kilometres will be charged as per the agreed rate.",
  "Toll, parking, permits and other trip expenses will be charged as specified in the quotation.",
  "GST will be charged as applicable and as stated in the final quotation.",
  "Monthly billing and payment terms will be agreed before deployment.",
  "Vehicle deployment is subject to availability and written confirmation.",
];

export default function RatesPage() {
  return (
    <>
      <section className="tours-hero vn-small ev-hero">
        <div className="wrap tours-hero-in">
          <div>
            <div className="eyebrow">Rate Card</div>
            <h1>Car &amp; Bus Rental Rates</h1>
            <p>Indicative Ahmedabad rates for cabs with driver. Your final quotation depends on route, vehicle, kilometres, duty hours and duration.</p>
            <div className="btns">
              <Link className="btn" href="/contact">Get a Quotation &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sec ev-sec">
        <div className="wrap rt-grid">
          <div className="rt-card">
            <h2>Rate per km</h2>
            <table className="rt-table">
              <thead><tr><th>Vehicle type</th><th>Rate per km</th></tr></thead>
              <tbody>
                {PER_KM.map(([v, r]) => (
                  <tr key={v}><td>{v}</td><td>{r}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rt-card">
            <h2>Local packages (Ahmedabad city)</h2>
            <table className="rt-table">
              <thead><tr><th>Vehicle</th><th>Package</th><th>Price</th></tr></thead>
              <tbody>
                {PACKAGES.map(([v, p, r]) => (
                  <tr key={v + p}><td>{v}</td><td>{p}</td><td>{r}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="wrap">
          <div className="rt-card rt-terms">
            <h2>Commercial terms &amp; conditions</h2>
            <ol>
              {TERMS.map((t) => <li key={t}>{t}</li>)}
            </ol>
            <p className="rt-note">Rates are indicative and may change. Please contact us for a confirmed quotation.</p>
          </div>
        </div>
      </section>
    </>
  );
}
