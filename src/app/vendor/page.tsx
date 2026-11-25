import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PartnerLogo } from "@/components/PartnerLogo";
import { VendorForm } from "@/components/forms/VendorForm";
import { CarIcon, HeadsetIcon, PinIcon, ShieldIcon, UserIcon } from "@/components/icons";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Become a Vendor — Shital Tours & Travels",
  description: "Attach your car, tempo traveller or bus with Shital Tours & Travels and get regular trips from hotels, corporates and tourists in Ahmedabad.",
  path: "/vendor",
});

const BENEFITS: [ReactNode, string, string][] = [
  [<PinIcon key="a" bare size={22} />, "Regular bookings", "Steady trips from hotel guests, corporates, tourists and groups."],
  [<ShieldIcon key="b" bare size={22} />, "On-time payments", "Clear rates agreed in advance and timely settlement."],
  [<UserIcon key="c" bare size={22} />, "Bigger customer base", "Reach hotels and companies we already work with."],
  [<HeadsetIcon key="d" bare size={22} />, "Support from our team", "Our operations team handles bookings and customer calls."],
];



// Partner names shown on the page. Add or remove names here.
// Put each logo in public/images/partners/ with the file name given here.
const PARTNERS: [string, string][] = [
  ["Adani Group", "adani.png"],
  ["Ratnamani", "ratnamani.png"],
  ["The Leela Gandhinagar", "leela.png"],
  ["ONGC", "ongc.png"],
  ["Torrent", "torrent.png"],
  ["Gandhinagar Railway", "gandhinagar-railway.png"],
  ["Crowne Plaza", "crowne-plaza.svg"],
  ["ITC Hotels", "club-itc.png"],
  ["Hyatt Ahmedabad", "hyatt.png"],
  ["Fortune Landmark", "fortune.png"],
];

export default function VendorPage() {
  return (
    <>
      <section className="tours-hero vn-small">
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
          <div className="th-collage hotel-grid" aria-hidden="true">
            {[
              ["Hyatt Ahmedabad", "/images/hotels/hyatt.png"],
              ["ITC Narmada", "/images/hotels/itc-narmada.png"],
              ["Fortune Landmark", "/images/hotels/fortune-landmark.png"],
              ["Crowne Plaza", "/images/hotels/crowne-plaza.png"],
            ].map(([name, img]) => (
              <div key={name} className="th-ph" style={{ backgroundImage: `url(${img})` }}>
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec white vn-why">
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
        </div>
      </section>

      <section className="sec vn-partners">
        <div className="wrap center">
          <div className="eyebrow">Our Partners</div>
          <h2 className="sec-title">Trusted by leading companies</h2>
          <div className="vn-pgrid">
            {PARTNERS.map(([n, f]) => (
              <div key={n} className="vn-p">
                <PartnerLogo name={n} file={f} />
                <span>{n}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="wrap" style={{ maxWidth: "1000px", paddingBottom: "48px" }}>
        <VendorForm />
      </div>
    </>
  );
}
