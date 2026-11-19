import type { Metadata } from "next";
import Link from "next/link";
import { CarIcon, BusIcon, HotelIcon, PlaneIcon, UsersIcon } from "@/components/icons";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Our Services — Shital Tours & Travels",
  description: "Car rental, bus and group travel, hotel guest trips and airport pickup & drop in Ahmedabad.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <section className="sec soft">
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
