import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { ChatIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { BizItem, BizText } from "@/components/ui/BizLink";
import { bizHref } from "@/lib/links";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact Us — Shital Tours & Travels",
  description: "Call, WhatsApp or send us a message. Our team will get back to you as soon as possible.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="ct-hero">
        <div className="wrap">
          <div className="eyebrow">Contact Us</div>
          <h1>We&apos;re here to help<br />with your travel plans</h1>
          <p>Call, WhatsApp or send us a message. Our team will get back to you as soon as possible.</p>
          <div className="ct-btns">
            <a className="btn" href="#ctForm">Send an Enquiry &rarr;</a>
            <a className="btn ghost" id="ctCall" href={bizHref("phone")}>Call Us Now</a>
          </div>
        </div>
      </section>

      <div className="wrap" style={{ maxWidth: "1000px" }}>
        <section style={{ padding: "26px 0 10px" }}>
          <div className="crow ct-cards">
            <BizItem type="phone"><div className="ic solid"><PhoneIcon /></div><div><b>Phone</b><BizText type="phone" /></div></BizItem>
            <BizItem type="whatsapp"><div className="ic solid"><ChatIcon /></div><div><b>WhatsApp</b><BizText type="whatsapp" /></div></BizItem>
            <BizItem type="email"><div className="ic solid"><MailIcon /></div><div><b>Email</b><BizText type="email" /></div></BizItem>
            <BizItem type="office"><div className="ic solid"><PinIcon /></div><div><b>Office</b><BizText type="office" /></div></BizItem>
          </div>
        </section>

        <ContactForm />

        <section style={{ padding: "30px 0 40px" }}>
          <iframe
            title="Office location"
            src="https://www.google.com/maps?q=Sahajanand+Shopping+Centre,+Shahibaug,+Ahmedabad,+Gujarat+380004&output=embed"
            style={{ width: "100%", height: "320px", border: 0, borderRadius: "12px" }}
            loading="lazy"
          />
        </section>
      </div>
    </>
  );
}
