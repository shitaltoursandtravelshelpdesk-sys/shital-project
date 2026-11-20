import type { Metadata } from "next";
import type { ReactNode } from "react";
import { VendorForm } from "@/components/forms/VendorForm";
import { CalendarIcon, CardIcon, CarIcon, HeadsetIcon, ShieldIcon, UsersIcon } from "@/components/icons";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Become a Vendor — Shital Tours & Travels",
  description: "Attach your car, tempo traveller or bus with Shital Tours & Travels and get regular trips from hotels, corporates and tourists in Ahmedabad.",
  path: "/vendor",
});

const BENEFITS: [ReactNode, string, string][] = [
  [<CalendarIcon key="a" bare size={22} />, "Regular bookings", "Steady trips from hotel guests, corporates, tourists and groups."],
  [<CardIcon key="b" bare size={22} />, "On-time payments", "Clear rates agreed in advance and timely settlement."],
  [<UsersIcon key="c" bare size={22} />, "Bigger customer base", "Reach hotels and companies we already work with."],
  [<HeadsetIcon key="d" bare size={22} />, "Support from our team", "Our operations team handles bookings and customer calls."],
];

const STEPS = [
  ["Register", "Fill the form below with your details and vehicles."],
  ["Verification", "We check your vehicle papers, permit and insurance."],
  ["Start earning", "Get trips assigned as per your vehicle and availability."],
];


export default function VendorPage() {
  return (
    <>
      <section className="tours-hero">
        <div className="wrap tours-hero-in">
          <div>
            <div className="eyebrow">Partner with us</div>
            <h1>Become a Vendor</h1>
            <p>Own a car, tempo traveller or bus? Attach your vehicle with Shital Tours &amp; Travels and get regular trips from hotels, corporates and tourists.</p>
            <div className="th-chips">
              <span><CarIcon bare size={16} /> Cars, Tempo &amp; Buses</span>
              <span><ShieldIcon bare size={16} /> Transparent terms</span>
            </div>
            <div className="btns">
              <a className="btn" href="#vnForm">Register Now &darr;</a>
            </div>
          </div>
          <div className="vn-hero-ph" aria-hidden="true">
            <span className="vn-hero-badge"><CarIcon bare size={16} /> Our growing fleet</span>
          </div>
        </div>
      </section>

      <section className="sec white">
        <div className="wrap center">
          <div className="eyebrow">Why partner with Shital</div>
          <h2 className="sec-title">Grow your travel business with us</h2>
          <div className="vn-benefits">
            {BENEFITS.map(([ic, t, d]) => (
              <div key={t} className="why-it">
                <span className="why-ic">{ic}</span>
                <div><b>{t}</b><p>{d}</p></div>
              </div>
            ))}
          </div>

          <div className="vn-steps">
            {STEPS.map(([t, d], i) => (
              <div key={t} className="vn-step">
                <span className="vn-num">{i + 1}</span>
                <b>{t}</b>
                <p>{d}</p>
              </div>
            ))}
          </div>

          <div className="vn-req">
            <h3>What you need</h3>
            <ul>
              <li>Vehicle RC, valid insurance and PUC</li>
              <li>Tourist / commercial permit (state or all-India)</li>
              <li>Clean, well-maintained AC vehicle</li>
              <li>Experienced driver with valid licence (if driver is provided)</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="wrap" style={{ maxWidth: "1000px", paddingBottom: "48px" }}>
        <VendorForm />
      </div>
    </>
  );
}
