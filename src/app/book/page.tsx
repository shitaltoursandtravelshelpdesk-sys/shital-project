import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingForm } from "@/components/forms/BookingForm";
import { CalendarIcon, CarIcon, ChatIcon, ClipboardIcon, HotelIcon, MailIcon, PhoneIcon } from "@/components/icons";
import { BizItem, BizText } from "@/components/ui/BizLink";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Request a Vehicle — Shital Tours & Travels",
  description: "Tell us when and where you need to travel. Our team will review your request and confirm a vehicle and driver.",
  path: "/book",
});

export default function BookPage() {
  return (
    <>
      <section className="phero" style={{ "--img": "url(/images/request-hero.png)" } as CSSProperties}>
        <div className="bg" />
        <div className="wrap">
          <div className="crumb">Safe journeys &middot; Comfortable rides &middot; With the experts</div>
          <h1>Request a Vehicle</h1>
          <p>Tell us when and where you need to travel. Our team will review your request and confirm a vehicle and driver.</p>
        </div>
      </section>

      <div className="wrap req-layout">
        <Suspense fallback={<div className="card" id="reqForm" />}>
          <BookingForm />
        </Suspense>

        <aside className="next">
          <h3>What happens next?</h3>
          <div className="s"><div className="n">1</div><div className="i"><ClipboardIcon /></div><div><b>Our team reviews your request</b><p>We check your travel details and requirements.</p></div></div>
          <div className="s"><div className="n">2</div><div className="i"><CalendarIcon /></div><div><b>Confirms availability and details</b><p>We will get in touch to confirm the vehicle, driver and other details.</p></div></div>
          <div className="s"><div className="n">3</div><div className="i"><CarIcon /></div><div><b>Assigns car or bus and driver</b><p>Once confirmed, we will assign a suitable vehicle and driver for your trip.</p></div></div>
          <div className="notice"><div className="i">i</div><div><b>Submitting a request does not confirm a booking.</b>Our team will contact you to confirm availability and share the details.</div></div>
          <div className="scenic ph" />
        </aside>
      </div>

      <div className="wrap">
        <div className="card help">
          <h3 style={{ fontSize: "20px" }}>Need help booking?</h3>
          <p style={{ color: "var(--muted)", fontSize: "13px" }}>Our team is here to assist you with vehicle options, routes and special requests.</p>
          <div className="crow">
            <BizItem type="phone"><div className="ic"><PhoneIcon /></div><div><b>Phone</b><BizText type="phone" /></div></BizItem>
            <BizItem type="whatsapp"><div className="ic"><ChatIcon /></div><div><b>WhatsApp</b><BizText type="whatsapp" /></div></BizItem>
            <BizItem type="email"><div className="ic"><MailIcon /></div><div><b>Email</b><BizText type="email" /></div></BizItem>
          </div>
          <div className="hotelnote">
            <div className="ic" style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#d4f1fb", display: "grid", placeItems: "center" }}><HotelIcon /></div>
            <div><b>Hotel staff can also request transport for hotel guests.</b><br /><span style={{ color: "var(--muted)" }}>If you are a hotel representative, you can submit a request or email on behalf of your guests.</span></div>
          </div>
        </div>
      </div>
    </>
  );
}
