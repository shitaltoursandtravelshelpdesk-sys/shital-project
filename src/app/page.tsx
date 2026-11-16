import type { Metadata } from "next";
import Link from "next/link";
import { PhoneIcon, ChatIcon, MailIcon, PinIcon } from "@/components/icons";
import { BizItem, BizText } from "@/components/ui/BizLink";
import { pageMeta } from "@/lib/seo";
import { EnquiryButton } from "@/components/ui/EnquiryButton";

export const metadata: Metadata = pageMeta({
  title: "Shital Tours & Travels — Your journey, handled with care",
  description: "Cars and buses for hotel guests, airport transfers, local journeys and group travel in Ahmedabad.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <section className="hero2">
        <div className="hero2-bg" />
        <div className="wrap hero2-in">
          <h1>
            <span>Travel in comfort</span>
            <span className="outline">with Shital</span>
          </h1>
          <p>Cars and buses for hotel guests, airport transfers, local journeys and group travel across Ahmedabad.</p>
          <div className="btns">
            <Link className="btn" href="/book">Request a Vehicle &rarr;</Link>
            <Link className="btn ghost light" href="/fleet">View Our Fleet</Link>
          </div>
        </div>
      </section>

      <section className="lookfor">
        <div className="wrap">
          <div className="lookfor-card">
            <div className="why-head">
              <h2>Why travel with Shital?</h2>
              <Link className="btn" href="/book">Book Your Ride &rarr;</Link>
            </div>
            <div className="why-grid">
              {[
                ["🕒", "24/7 Available", "Early flights or late check-ins, we are ready any time."],
                ["🧑‍✈️", "Experienced Drivers", "Courteous, verified drivers who know every route."],
                ["✨", "Clean Vehicles", "Well-maintained, sanitised cars and buses on every trip."],
                ["📍", "On-time Pickup", "Punctual pickups from hotels, homes and airports."],
              ].map(([ic, t, d]) => (
                <div key={t} className="why-it">
                  <span className="why-ic">{ic}</span>
                  <div><b>{t}</b><p>{d}</p></div>
                </div>
              ))}
            </div>
            <div className="why-links">
              <span>Popular:</span>
              <Link href="/services">Airport Transfer</Link>
              <Link href="/services">Hotel Guest Pickup</Link>
              <Link href="/packages">Tour Packages</Link>
              <Link href="/services">Outstation Trips</Link>
              <Link href="/fleet">Bus &amp; Tempo for Groups</Link>
            </div>
          </div>
        </div>
      </section>
      
      <section className="sec" id="about">
        <div className="wrap split about">
          <div className="img-card ph" style={{backgroundImage: "url(/images/fleet-sunset.png),linear-gradient(160deg,#f6c58a,#c97b4a 45%,#3d5a78)"}}></div>
          <div>
            <div className="eyebrow">About Shital Tours &amp; Travels</div>
            <h2>Reliable transport for<br />a smoother travel experience</h2>
            <p>Shital Tours &amp; Travels provides well-maintained cars and buses for hotel guests, airport transfers, local journeys and group travel across Ahmedabad and nearby destinations. Our experienced and courteous drivers focus on safe, comfortable and timely travel, so you can enjoy a hassle-free journey.</p>
          </div>
        </div>
      </section>
      
      <section className="sec soft" id="contact" style={{paddingBottom: "40px"}}>
        <div className="wrap center">
          <div className="eyebrow">Contact Our Team</div>
          <h2 className="sec-title">We&apos;re here to help with your travel plans</h2>
          <div className="contact4">
            <BizItem type="phone"><div className="ic"><PhoneIcon /></div><b>Phone</b><BizText type="phone" /></BizItem>
            <BizItem type="whatsapp"><div className="ic"><ChatIcon /></div><b>WhatsApp</b><BizText type="whatsapp" /></BizItem>
            <BizItem type="email"><div className="ic"><MailIcon /></div><b>Email</b><BizText type="email" /></BizItem>
            <BizItem type="office"><div className="ic"><PinIcon /></div><b>Office</b><BizText type="office" /></BizItem>
          </div>
          <EnquiryButton />
        </div>
      </section>
    </>
  );
}
