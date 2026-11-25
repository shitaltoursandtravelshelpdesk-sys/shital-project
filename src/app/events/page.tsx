import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";

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
      <section className="tours-hero vn-small ev-hero">
        <div className="wrap tours-hero-in">
          <div>
            <div className="eyebrow">Event Transport</div>
            <h1>Travel for every occasion</h1>
            <p>From weddings to corporate conferences, we handle guest transport so you can focus on the event.</p>
            <div className="btns">
              <Link className="btn" href="/book">Plan Event Transport &rarr;</Link>
            </div>
          </div>
          <div className="th-collage hotel-grid" aria-hidden="true">
            {[
              ["Weddings", "/images/events/wedding.jpg"],
              ["Conferences", "/images/events/conference.jpg"],
              ["Navratri", "/images/events/garba.jpg"],
              ["Parties", "/images/events/party.jpg"],
            ].map(([name, img]) => (
              <div key={name} className="th-ph" style={{ backgroundImage: `url(${img})` }}>
                <span>{name}</span>
              </div>
            ))}
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
