import type { Metadata } from "next";
import Link from "next/link";
import { MailIcon, PinIcon, CalendarIcon, CarIcon, PlaneIcon, HotelIcon, RoadIcon, BusIcon, HeadsetIcon, UserIcon, ShieldIcon, StarIcon } from "@/components/icons";
import type { ReactNode } from "react";
import { pageMeta } from "@/lib/seo";
import { ClientLogos } from "@/components/ClientLogos";

const WHY: [ReactNode, string, string][] = [
  [<HeadsetIcon key="a" bare size={22} />, "24/7 Available", "Early flights or late check-ins, we are ready any time."],
  [<UserIcon key="b" bare size={22} />, "Experienced Drivers", "Courteous, verified drivers who know every route."],
  [<ShieldIcon key="c" bare size={22} />, "Clean Vehicles", "Well-maintained, sanitised cars and buses on every trip."],
  [<PinIcon key="d" bare size={22} />, "On-time Pickup", "Punctual pickups from hotels, homes and airports."],
];

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
          <p>Your Journey, Our Responsibility &ndash; reliable car, bus and commercial vehicle rental in Ahmedabad since 2004.</p>
          <div className="hero-badges">
            <span><b>Since 2004</b></span>
            <span><b>12</b> National Tourism Awards</span>
            <span><b>Corporate</b> transport experts</span>
          </div>
          <div className="btns">
            <Link className="btn" href="/book"><CalendarIcon /> Request a Vehicle &rarr;</Link>
            <Link className="btn ghost light" href="/fleet"><CarIcon /> View Our Fleet</Link>
            <Link className="btn ghost light" href="/contact"><MailIcon /> Send an Enquiry &rarr;</Link>
          </div>
        </div>
      </section>

      <section className="lookfor">
        <div className="wrap">
          <div className="lookfor-card">
            <div className="why-head">
              <h2><StarIcon /> Why travel with Shital?</h2>
              <Link className="btn" href="/book"><CarIcon /> Book Your Ride &rarr;</Link>
            </div>
            <div className="pop-grid">
              {[
                ["Airport Transfer", "/services", "/images/airport.png", <PlaneIcon key="p" bare size={18} />],
                ["Hotel Guest Pickup", "/services", "/images/hotel-car.png", <HotelIcon key="h" bare size={18} />],
                ["Tour Packages", "/packages", "/images/packages-hero.png", <PinIcon key="t" bare size={18} />],
                ["Outstation Trips", "/services", "/images/outstation.png", <RoadIcon key="o" bare size={18} />],
                ["Bus & Tempo for Groups", "/fleet", "/images/bus.png", <BusIcon key="b" bare size={18} />],
              ].map(([t, href, img, icon]) => (
                <Link key={t as string} href={href as string} className="pop-it">
                  <span className="pop-img" style={{ backgroundImage: `url(${img})` }} />
                  <span className="pop-ic">{icon}</span>
                  <b>{t} &rarr;</b>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <ClientLogos />


      <section className="sec" id="about">
        <div className="wrap split about">
          <div className="img-card ph about-img" style={{backgroundImage: "url(/images/about-india.png),linear-gradient(160deg,#f6c58a,#c97b4a 45%,#3d5a78)"}}></div>
          <div>
            <div className="eyebrow">About Shital Tours &amp; Travels</div>
            <h2>Reliable transport for<br />a smoother travel experience</h2>
            <p>Shital Tours &amp; Travels provides well-maintained cars and buses for hotel guests, airport transfers, local journeys and group travel across Ahmedabad and nearby destinations. Our experienced and courteous drivers focus on safe, comfortable and timely travel, so you can enjoy a hassle-free journey.</p>
            <Link className="btn ab-more" href="/about">View More &rarr;</Link>
          </div>
        </div>
      </section>
      
      <section className="sec soft" id="contact" style={{paddingBottom: "40px"}}>
        <div className="wrap center">
          <div className="why-marquee" aria-label="Why travel with Shital">
            <div className="why-track">
              {[...WHY, ...WHY].map(([ic, t, d], i) => (
                <div key={i} className="why-it" aria-hidden={i >= WHY.length}>
                  <span className="why-ic">{ic}</span>
                  <div><b>{t}</b><p>{d}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
