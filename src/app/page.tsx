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
      <section className="hero">
        <div className="bg" />
        <div className="wrap">
          <h1>Your journey, handled with care</h1>
          <p>Cars and buses for hotel guests, airport transfers, local journeys and group travel.</p>
          <div className="btns">
            <Link className="btn" href="/book">Request a Vehicle &rarr;</Link>
            <Link className="btn ghost" href="/services">Our Services</Link>
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
