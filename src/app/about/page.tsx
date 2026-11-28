import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About Us — Shital Tours & Travels",
  description:
    "Established in 2004, Shital Tours & Travels is a car, bus and commercial vehicle rental company in Ahmedabad and winner of 12 National Tourism Awards.",
  path: "/about",
});

const AWARD_YEARS = ["2003", "2004", "2005", "2006", "2007", "2008", "2010", "2011", "2012", "2013", "2015", "2022"];

const FACILITIES = [
  "Fully air-conditioned",
  "LCD screen",
  "PA system",
  "Air suspension",
  "Mobile charging point on every seat",
  "Comfortable reclining seats",
  "Chiller box",
];

export default function AboutPage() {
  return (
    <>
      <section className="tours-hero th-full ab-hero">
        <div className="wrap tours-hero-in">
          <div>
            <div className="eyebrow">About Us &middot; Since 2004</div>
            <h1>Your Journey, Our Responsibility</h1>
            <p>Reliable car, bus and commercial vehicle rental in Ahmedabad, Gujarat, since 2004.</p>
            <div className="th-chips">
              <span>Since 2004</span>
              <span>12 National Tourism Awards</span>
              <span>Cars, Buses &amp; Commercial Vehicles</span>
            </div>
            <div className="btns">
              <Link className="btn" href="/book">Book a Vehicle &rarr;</Link>
            </div>
          </div>
          <div className="tours-hero-ph" style={{ backgroundImage: "url(/images/about-team.jpg)" }} />
        </div>
      </section>

      <section className="sec ab-sec">
        <div className="wrap ab-history">
          <div>
            <div className="eyebrow">Our History</div>
            <h2 className="sec-title">Your trusted partner for car, bus &amp; commercial vehicle rental</h2>
            <p>
              Established in 2004, Shital Tours &amp; Travels is a leading car, bus and commercial vehicle rental service
              provider based in Ahmedabad, Gujarat. We provide reliable, comfortable and affordable transportation for
              individuals, corporate clients, businesses and organisations.
            </p>
            <p>
              Whether you need a local taxi for city sightseeing, an outstation vehicle for a weekend getaway, a round-trip
              taxi for a business meeting, an airport pickup and drop, or vehicles for corporate and industrial
              transportation, we have the right solution for you.
            </p>
            <p>
              With a large fleet of well-maintained vehicles, experienced professional drivers and a commitment to customer
              satisfaction, we make every journey safe, convenient and hassle-free. We don&apos;t just provide vehicles &ndash; we
              deliver dependable travel solutions built on trust, safety and on-time service.
            </p>
          </div>
          <div className="ab-stats">
            <div><b>2004</b><span>Established</span></div>
            <div><b>12</b><span>National Tourism Awards</span></div>
            <div><b>6</b><span>Service divisions</span></div>
            <div><b>24/7</b><span>Cab with driver</span></div>
          </div>
        </div>
      </section>

      <section className="sec ab-awards">
        <div className="wrap center">
          <div className="eyebrow">Accolades &amp; Achievements</div>
          <h2 className="sec-title">Winner of 12 National Tourism Awards</h2>
          <p className="ab-lead">
            We take pride in customer satisfaction and care for corporate clients, individual travellers and foreign
            tourists. For our promotion of foreign tourist arrivals, Shital Tours &amp; Travels has won the National Tourism
            Award twelve times.
          </p>
          <div className="ab-years">
            {AWARD_YEARS.map((y) => (
              <span key={y}>{y}</span>
            ))}
          </div>
          <div className="ab-photos">
            <img src="/images/about-award-1.jpg" alt="Shital Tours & Travels team receiving an award" />
            <img src="/images/about-award-2.jpg" alt="Shital Tours & Travels receiving recognition" />
          </div>
          <div className="ab-extra">
            <div><b>Special Scroll of Honour</b><span>2010</span></div>
            <div><b>Highest Earning of Foreign Exchange</b><span>Award</span></div>
          </div>
        </div>
      </section>

      <section className="sec ab-sec">
        <div className="wrap ab-two">
          <div className="ab-box">
            <h3>Our Commitment</h3>
            <p>
              We are committed to dependable, safe and comfortable transportation through well-maintained vehicles,
              experienced professional drivers and customer-focused service. With our experience in the transportation
              industry, we aim to build long-term relationships through reliability, efficiency and service excellence.
            </p>
            <p><b>Shital Tours &amp; Travels &ndash; Your Complete Transportation Partner Since 2004.</b></p>
          </div>
          <div className="ab-box">
            <h3>Bus Facilities</h3>
            <ul className="ab-fac">
              {FACILITIES.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="sec ab-sec ab-group">
        <div className="wrap center">
          <div className="eyebrow">Group Travel in Ahmedabad</div>
          <h2 className="sec-title">Why groups choose bus rental</h2>
          <p className="ab-lead">
            Ahmedabad, the largest city in Gujarat, is known for its culture, historic landmarks and growing business
            sector. Every year thousands of people visit for tourism, weddings, corporate meetings and educational trips.
            Coordinating many vehicles for a large group can lead to delays, confusion and higher costs. With a bus,
            everyone travels together in one vehicle, making the journey more organised and comfortable.
          </p>
          <Link className="btn" href="/book">Plan Group Travel &rarr;</Link>
        </div>
      </section>
    </>
  );
}
