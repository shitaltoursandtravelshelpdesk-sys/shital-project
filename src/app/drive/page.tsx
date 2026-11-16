import type { Metadata } from "next";
import { DriverForm } from "@/components/forms/DriverForm";
import { ChatIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { BizItem, BizText } from "@/components/ui/BizLink";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Drive With Us — Shital Tours & Travels",
  description: "Apply for a driver role with Shital Tours & Travels in Ahmedabad.",
  path: "/drive",
});

export default function DrivePage() {
  return (
    <div className="wrap" style={{ maxWidth: "1000px" }}>
      <section className="dw-top">
        <div>
          <h1>Drive With Us</h1>
          <p style={{ color: "var(--muted)" }}>Apply for a driver role with Shital Tours &amp; Travels.</p>
          <div className="dw-h">What you will do</div>
          <ul className="dots">
            <li>Guest pickup from airports, railway stations, hotels and other locations.</li>
            <li>Meet and assist foreign guests.</li>
            <li>Local sightseeing tours and outstation trips.</li>
            <li>Maintain vehicle condition and ensure a safe and comfortable journey for our guests.</li>
          </ul>
          <div className="dw-h">What to bring</div>
          <ul className="dots">
            <li>Valid driving licence (LMV/HMV as applicable).</li>
            <li>Relevant driving experience (particularly for local and tourist routes).</li>
            <li>Ability to communicate in English/Hindi or a local Indian language.</li>
            <li>Good communication skills, a friendly attitude and a professional appearance.</li>
          </ul>
        </div>
        <div className="dw-img ph" />
      </section>

      <DriverForm />

      <section style={{ borderTop: "1px solid var(--line)", marginTop: "30px", padding: "26px 0 36px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 800, color: "var(--navy-d)" }}>Contact our team about driver roles</h2>
        <p style={{ color: "var(--muted)", fontSize: "13px" }}>If you have any questions, you can reach us using the details below.</p>
        <div className="crow ct-cards">
          <BizItem type="phone"><div className="ic solid"><PhoneIcon /></div><div><b>Phone</b><BizText type="phone" /></div></BizItem>
          <BizItem type="whatsapp"><div className="ic solid"><ChatIcon /></div><div><b>WhatsApp</b><BizText type="whatsapp" /></div></BizItem>
          <BizItem type="email"><div className="ic solid"><MailIcon /></div><div><b>Email</b><BizText type="email" /></div></BizItem>
          <BizItem type="office"><div className="ic solid"><PinIcon /></div><div><b>Office</b><BizText type="office" /></div></BizItem>
        </div>
      </section>
    </div>
  );
}
