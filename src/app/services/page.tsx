import type { Metadata } from "next";
import Link from "next/link";
import { CarIcon, BusIcon, HotelIcon, PlaneIcon, UsersIcon } from "@/components/icons";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Our Services — Shital Tours & Travels",
  description: "Car rental, bus and group travel, hotel guest trips and airport pickup & drop in Ahmedabad.",
  path: "/services",
});

const DIVISIONS: [string, string, string[]][] = [
  ["Car Rental", "Economy, premium and luxury cars for individuals, families, business travellers and companies.", ["Economy & sedan cars", "SUV & premium cars", "Luxury vehicle rentals", "Local & outstation car rentals", "Airport transfers"]],
  ["Bus Rental", "Group transport for tourism, corporate events, schools and colleges, weddings and special occasions.", ["Mini bus rentals", "Tempo traveller rentals", "Force Urbania rentals", "Standard bus rentals", "Luxury bus & coach rentals"]],
  ["Corporate Transportation", "Organised transport for companies, multinational organisations, offices and businesses.", ["Employee pickup & drop", "Executive transportation", "Corporate daily transportation", "Staff & guest transportation", "Dedicated corporate vehicles"]],
  ["Commercial Vehicle Rental", "Flexible hiring for businesses, organisations, industries and long-term needs.", ["Monthly vehicle hiring", "Fixed-basis vehicle deployment", "Long-term contract hiring", "Commercial car & bus rentals", "Goods carrier & utility vehicles"]],
  ["Airport & Outstation Travel", "Dependable transport for local travel, airport transfers, business trips and outstation journeys.", ["Airport pickup & drop", "Railway station transfers", "Local city travel", "One-way & round-trip rentals", "Outstation tours & packages"]],
  ["Industrial & Oilfield Transportation", "Dedicated transport for industries, oilfield operations, project sites and infrastructure.", ["Industrial employee transportation", "Oilfield staff transportation", "Project-based vehicle deployment", "Dedicated car & bus services", "Customised contract transportation", "Long-term industrial vehicle hiring"]],
  ["Weddings", "Cars and buses for weddings, baraat and guest transport.", ["Decorated cars for the couple", "Luxury cars for the baraat", "Buses & tempo travellers for guests"]],
];

export default function ServicesPage() {
  return (
    <>
      <section className="sec soft svc-top">
        <div className="wrap center">
          <div className="eyebrow">Our Services</div>
          <h2 className="sec-title">Travel solutions for every need</h2>
          <div className="svc4 svc5">
            <div className="it"><div className="ic"><CarIcon /></div><h3>Car Rental</h3><p>Comfortable cars for local travel, outstation trips and custom itineraries.</p></div>
            <div className="it"><div className="ic"><BusIcon /></div><h3>Bus &amp; Group Travel</h3><p>Buses for corporate groups, weddings, educational tours and other group travel.</p></div>
            <div className="it"><div className="ic"><UsersIcon /></div><h3>Business Rides</h3><p>Daily office commute, client pickups and business trips for companies, with monthly billing.</p></div>
            <div className="it"><div className="ic"><HotelIcon /></div><h3>Hotel Guest Trips</h3><p>Dedicated transport for hotel guests, sightseeing and local travel around the city.</p></div>
            <div className="it"><div className="ic"><PlaneIcon /></div><h3>Airport Pickup &amp; Drop</h3><p>Timely and reliable transfers to and from Ahmedabad Airport for individuals and groups.</p></div>
          </div>
        </div>
      </section>
      

      <section className="sec ab-sec">
        <div className="wrap center">
          <div className="eyebrow">Our Divisions</div>
          <h2 className="sec-title">Complete transportation solutions under one roof</h2>
          <p className="ab-lead">We provide car, bus and commercial vehicle rental for individuals, companies, industries and institutions &ndash; for local, outstation, employee, tourism and industrial travel.</p>
          <div className="dv-grid">
            {DIVISIONS.map(([t, d, items]) => (
              <div key={t} className="dv-card">
                <h3>{t}</h3>
                <p>{d}</p>
                <ul>{items.map((i) => <li key={i}>{i}</li>)}</ul>
              </div>
            ))}
          </div>
          <Link className="btn" style={{ marginTop: "26px" }} href="/rates">View Rate Card &rarr;</Link>
        </div>
      </section>

      <section className="sec">
        <div className="wrap center">
          <div className="eyebrow">How Booking Works</div>
          <h2 className="sec-title">Get on the road in three simple steps</h2>
          <div className="steps3" style={{textAlign: "left"}}>
            <div className="st"><div className="n">1</div><div><h4>Request</h4><p>Tell us your travel date, pick-up details and vehicle requirement through our form, phone or WhatsApp.</p></div></div>
            <div className="arr">&rarr;</div>
            <div className="st"><div className="n">2</div><div><h4>Team confirms</h4><p>Our team will check availability and confirm the details with you.</p></div></div>
            <div className="arr">&rarr;</div>
            <div className="st"><div className="n">3</div><div><h4>Driver arrives</h4><p>Our experienced driver arrives on time for a safe and comfortable journey.</p></div></div>
          </div>
        </div>
      </section>
      
      <section className="hotel-band">
        <div className="ph" />
        <div className="txt">
          <div className="eyebrow">Hotel Travel</div>
          <h2>Trusted transport for hotel guests</h2>
          <p>We provide transport for guests staying at leading hotels in Ahmedabad, including Hyatt Regency and The Leela, as well as other hotels across the city. From airport transfers to local sightseeing and group travel, we ensure a comfortable and well-managed travel experience.</p>
          <Link className="btn ghost" href="/packages">Explore Packages &rarr;</Link>
        </div>
      </section>
      
    </>
  );
}
