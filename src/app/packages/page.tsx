import type { CSSProperties } from "react";
import { IndiaMap, DESTINATIONS } from "@/components/IndiaMap";
import type { Metadata } from "next";
import Link from "next/link";
import { PlaneIcon, PinIcon, RoadIcon, UsersIcon, CarIcon, HotelIcon, CalendarIcon, PhoneIcon, ChatIcon, MailIcon } from "@/components/icons";
import { BizItem, BizText } from "@/components/ui/BizLink";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Packages & Hotel Travel — Shital Tours & Travels",
  description: "Airport pickup & drop, local city travel, outstation trips and bus & group transport for hotel guests, families and groups.",
  path: "/packages",
});

export default function PackagesPage() {
  return (
    <>
      <section className="phero pk-hero" style={{"--img": "url(/images/packages-travel.png)"} as CSSProperties}>
        <div className="bg" />
        <div className="wrap">
          <h1>Packages &amp;<br />Hotel Travel</h1>
          <p>Comfortable travel solutions for hotel guests, families, business travellers and groups. We provide well-maintained vehicles with professional drivers for airport transfers, local sightseeing, outstation trips and group transport. Easy booking process and reliable service, every time.</p>
        </div>
      </section>

      <section className="sec white">
        <div className="wrap">
          <div className="center">
            <div className="eyebrow">Our Packages &amp; Services</div>
            <h2 className="sec-title sans">Travel Made Simple</h2>
            <div className="underline"></div>
            <p style={{color: "var(--muted)", maxWidth: "560px", margin: "14px auto 0", fontSize: "14px"}}>Choose from a range of travel options to suit your need. Send your details and our team will arrange a suitable vehicle and driver.</p>
          </div>

          <div className="pkg-grid">
          <div className="pkg" id="airport">
            <div className="ph" style={{backgroundImage: "url(/images/airport.png),linear-gradient(135deg,#9fb2c4,#52687e)"}}></div>
            <div>
              <div className="head"><div className="ic"><PlaneIcon /></div><div><h3>Airport Pickup &amp; Drop</h3><div className="sub">Hassle-free transfers to and from the airport</div></div></div>
              <ul><li>Share your flight details (airline, flight number, arrival/departure time).</li><li>Driver will be at the arrivals as per the flight schedule.</li><li>Assistance with luggage and comfortable transfer to hotel, home or any location in the city.</li></ul>
              <Link className="btn" href="/book?service=airport">Request This Trip &rarr;</Link>
            </div>
          </div>

          <div className="pkg" id="local">
            <div className="ph" style={{backgroundImage: "url(/images/city-heritage.png),linear-gradient(135deg,#e2b07a,#a8673a)"}}></div>
            <div>
              <div className="head"><div className="ic"><PinIcon /></div><div><h3>Local City Travel</h3><div className="sub">Day travel for sightseeing, meetings or personal work</div></div></div>
              <ul><li>Travel within the city for sightseeing, business meetings, shopping and personal work.</li><li>Flexible itinerary as per your plan.</li><li>Comfortable vehicles with experienced drivers for the full day.</li></ul>
              <Link className="btn" href="/book?service=local">Request This Trip &rarr;</Link>
            </div>
          </div>

          <div className="pkg" id="outstation">
            <div className="ph" style={{backgroundImage: "url(/images/outstation.png),linear-gradient(180deg,#bcd3e6,#c9a77a 60%,#7a6a4a)"}}></div>
            <div>
              <div className="head"><div className="ic"><RoadIcon /></div><div><h3>Outstation Travel</h3><div className="sub">Comfortable road trips to nearby and long distance destinations</div></div></div>
              <ul><li>Plan a road trip to a nearby city or any outstation destination.</li><li>Suitable for family trips, leisure travel or business visits.</li><li>Well-maintained vehicles for a safe and comfortable journey.</li></ul>
              <Link className="btn" href="/book?service=outstation">Request This Trip &rarr;</Link>
            </div>
          </div>

          <div className="pkg" id="bus">
            <div className="ph" style={{backgroundImage: "url(/images/bus.png),linear-gradient(180deg,#cfe2f0,#9fbfa0 60%,#55784a)"}}></div>
            <div>
              <div className="head"><div className="ic"><UsersIcon /></div><div><h3>Bus &amp; Group Transport</h3><div className="sub">Convenient transport for events, weddings, corporate and tours</div></div></div>
              <ul><li>Suitable for weddings, corporate events, school and college tours, family outings and large groups.</li><li>Options for small and large groups with professional drivers.</li><li>Plan your group&apos;s outstation travel as per your event needs.</li></ul>
              <Link className="btn" href="/book?service=bus">Request This Trip &rarr;</Link>
            </div>
          </div>
          </div>
        </div>
      </section>

      <section className="sec trav">
        <div className="wrap trav-in">
          <div className="trav-map"><IndiaMap /><small className="trav-credit">Map: @svg-maps/india (CC BY 4.0)</small></div>
          <div>
            <div className="eyebrow">Where We Have Travelled</div>
            <h2 className="sec-title sans" style={{ textAlign: "left" }}>From Ahmedabad to across India</h2>
            <p className="trav-lead">Our drivers have taken families, hotel guests and groups to {DESTINATIONS.length - 1}+ destinations across India. Tell us where you want to go next.</p>
            <ul className="trav-list">
              {DESTINATIONS.map(([name, state], i) => (
                <li key={name} className={i === 0 ? "home" : undefined}>
                  <PinIcon bare size={14} /> <b>{name}</b> <span>{i === 0 ? "Our base" : state}</span>
                </li>
              ))}
            </ul>
            <Link className="btn" href="/book?service=outstation">Plan Your Trip &rarr;</Link>
          </div>
        </div>
      </section>

      <section className="sec soft">
        <div className="wrap split">
          <div>
            <div className="eyebrow">For Hotel Guests</div>
            <h2 style={{fontFamily: "var(--sans)", fontWeight: "800", color: "var(--navy-d)"}}>Trusted Travel Partner for<br />Hotel Guests</h2>
            <p style={{marginBottom: "12px"}}>We work with leading hotels in Ahmedabad such as Hyatt Regency Ahmedabad and The Leela to provide reliable transportation for their guests.</p>
            <p>Hotel staff can submit a guest&apos;s travel request with the trip details. Our operations team will confirm the suitable vehicle and driver and coordinate the pickup as per the guest&apos;s schedule.</p>
            <Link className="btn mt" style={{marginTop: "18px"}} href="/book?for=hotel">Submit a Guest Request &rarr;</Link>
          </div>
          <div className="img-card ph" style={{aspectRatio: "1467/1072", minHeight: "0", backgroundSize: "cover", backgroundPosition: "center top", backgroundImage: "url(/images/hotel-chauffeur.png),linear-gradient(135deg,#3a2a14,#b98b4c 55%,#2a1d0e)"}}></div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="center"><div className="eyebrow">Common Questions</div><h2 className="sec-title sans">FAQs</h2><div className="underline"></div></div>
          <div className="faq3">
            <div><div className="ic"><CarIcon /></div><h4>Can I request a specific vehicle?</h4><p>Yes, you can request a specific vehicle. It will be arranged subject to availability.</p></div>
            <div><div className="ic"><HotelIcon /></div><h4>Can a hotel arrange a trip for a guest?</h4><p>Yes, hotel staff can submit a guest travel request with the trip details.</p></div>
            <div><div className="ic"><CalendarIcon /></div><h4>When is the booking confirmed?</h4><p>The booking is confirmed after our operations team confirms the vehicle and driver.</p></div>
          </div>
        </div>
      </section>

      <section className="sec soft" style={{padding: "40px 0"}}>
        <div className="wrap">
          <div className="center"><div className="eyebrow">Get in Touch</div><h2 className="sec-title sans">Contact Us</h2><div className="underline"></div></div>
          <div className="crow ct-cards" style={{maxWidth: "1000px", margin: "24px auto 0"}}>
            <BizItem type="phone"><div className="ic"><PhoneIcon /></div><div><b>Phone</b><BizText type="phone" /></div></BizItem>
            <BizItem type="whatsapp"><div className="ic"><ChatIcon /></div><div><b>WhatsApp</b><BizText type="whatsapp" /></div></BizItem>
            <BizItem type="email"><div className="ic"><MailIcon /></div><div><b>Email</b><BizText type="email" /></div></BizItem>
            <BizItem type="office"><div className="ic"><PinIcon /></div><div><b>Office</b><BizText type="office" /></div></BizItem>
          </div>
        </div>
      </section>
    </>
  );
}
