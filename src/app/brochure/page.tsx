import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { PrintButton } from "@/components/PrintButton";

export const metadata: Metadata = pageMeta({
  title: "Brochure — Shital Tours & Travels",
  description: "Shital Tours & Travels brochure: our services, fleet and contact details.",
  path: "/brochure",
});

const SERVICES = ["Car Rental", "Airport Pickup & Drop", "Hotel Guest Transport", "Corporate & Business Rides", "Outstation Trips", "Bus & Tempo for Groups", "Tour Packages", "Event Transport"];
const FLEET = ["Sedan (Dzire, Etios)", "Innova Crysta", "Fortuner", "Range Rover", "Tempo Traveller", "AC Bus (35–50 seats)"];

export default function BrochurePage() {
  return (
    <>
      <section className="tours-hero th-full br-hero">
        <div className="wrap tours-hero-in">
          <div>
            <div className="eyebrow">Our Brochure</div>
            <h1>Shital Tours &amp; Travels</h1>
            <p>Everything about our services and fleet on one page. Save it as PDF or print it.</p>
            <div className="th-chips">
              <span>8+ Services</span><span>Cars to 50-seat Buses</span><span>24/7 Support</span>
            </div>
            <div className="btns"><PrintButton /></div>
          </div>
          <div className="tours-hero-ph" style={{ backgroundImage: "url(/images/fleet-showcase-2.jpg)" }} />
        </div>
      </section>

      <section className="sec br-sec">
        <div className="wrap br-sheet">
          <div className="br-head">
            <img src="/images/logo-round.jpg" alt="Shital Tours & Travels" />
            <div>
              <h2>Shital Tours &amp; Travels</h2>
              <p>Cars and buses for hotel guests, airport transfers, local journeys and group travel across Ahmedabad.</p>
            </div>
          </div>
          <div className="br-cols">
            <div><h3>Our Services</h3><ul>{SERVICES.map((s) => <li key={s}>{s}</li>)}</ul></div>
            <div><h3>Our Fleet</h3><ul>{FLEET.map((s) => <li key={s}>{s}</li>)}</ul></div>
            <div>
              <h3>Contact</h3>
              <ul>
                <li>98981 09882 / 95125 23663</li>
                <li>info@shitaltravels.com</li>
                <li>407, 4th Floor, Sahajanand Shopping Centre, Shahibaug, Ahmedabad 380004</li>
              </ul>
            </div>
          </div>
          <div className="br-ph">
            {["1", "3", "5"].map((n) => <div key={n} style={{ backgroundImage: `url(/images/fleet/gallery/${n}.jpg)` }} />)}
          </div>
          <div className="center no-print"><Link className="btn" href="/book">Book a Vehicle &rarr;</Link></div>
        </div>
      </section>
    </>
  );
}
