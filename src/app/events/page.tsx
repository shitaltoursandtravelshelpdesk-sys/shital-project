import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { GujaratMap, GUJARAT_PLACES } from "@/components/GujaratMap";
import { PinIcon } from "@/components/icons";

export const metadata: Metadata = pageMeta({
  title: "Event Transport — Shital Tours & Travels",
  description: "Cars, tempo travellers and buses for weddings, corporate events, conferences and family functions in Ahmedabad.",
  path: "/events",
});

// Event types shown on the page: [title, image, points]
const EVENTS: [string, string, string[]][] = [
  ["Weddings", "/images/events/wedding.jpg", ["Decorated cars for the bride and groom.", "Buses and tempo travellers for guests.", "Pickups from hotels, station and airport."]],
  ["Baraat & Sangeet", "/images/events/baraat.jpg", ["Vintage and luxury cars for the baraat.", "Guest transport to and from the venue.", "Drivers on standby till late night."]],
  ["Corporate Events & Conferences", "/images/events/conference.jpg", ["Delegate pickups from airport and hotels.", "Shuttle between venue and hotel.", "Monthly billing for companies."]],
  ["Concerts & Shows", "/images/events/concert.jpg", ["Group travel to concerts and live shows.", "Pickup and safe drop after the event.", "Tempo travellers and buses for big groups."]],
  ["Navratri & Festivals", "/images/events/garba.jpg", ["Night pickups for garba and festivals.", "Safe drop for families and groups.", "Cars and buses for the full season."]],
  ["Birthday & Family Parties", "/images/events/party.jpg", ["Guest pickup and drop for parties.", "Cars for family functions and get-togethers.", "Booking for a few hours or a full day."]],
  ["Exhibitions & Trade Fairs", "/images/events/expo.jpg", ["Daily transport for staff and visitors.", "Cars on standby for VIP guests.", "Timings as per the event schedule."]],
  ["Religious & Group Yatra", "/images/tours/ambaji.jpg", ["Buses for temple tours and yatras.", "Experienced drivers for long routes.", "Comfortable seating for families."]],
];

export default function EventsPage() {
  return (
    <>

      <section className="trav ev-map">
        <div className="wrap">
          <div className="ev-map-head">
            <div className="eyebrow">Event Transport</div>
            <h1>Travel for every occasion</h1>
            <p>From weddings to corporate conferences, we handle guest transport so you can focus on the event.</p>
          </div>
          <div className="ev-map-row">
          <GujaratMap />
          <ul className="trav-list ev-list">
            {GUJARAT_PLACES.map(([name], i) => (
              <li key={name} className={i === 0 ? "home" : undefined}>
                <PinIcon bare size={14} /> <b>{name}</b> <span>{i === 0 ? "Our base" : "Gujarat"}</span>
              </li>
            ))}
          </ul>
          </div>
        </div>
      </section>

      <section className="sec ev-sec">
        <div className="wrap center">
          <div className="eyebrow">What we cover</div>
          <h2 className="sec-title">Events we manage</h2>
          <div className="ev-grid">
            {EVENTS.map(([t, img, pts]) => (
              <div key={t} className="ev-card">
                <div className="ev-ph" style={{ backgroundImage: `url(${img})` }} />
                <div className="ev-body">
                  <h3>{t}</h3>
                  <ul>{pts.map((p) => <li key={p}>{p}</li>)}</ul>
                  <Link className="btn ev-btn" href={`/book?event=${encodeURIComponent(t)}`}>Book Now &rarr;</Link>
                </div>
              </div>
            ))}
          </div>
          <Link className="btn" style={{ marginTop: "28px" }} href="/contact">Get a Quote &rarr;</Link>
        </div>
      </section>
    </>
  );
}
