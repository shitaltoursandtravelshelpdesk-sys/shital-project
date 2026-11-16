import Link from "next/link";
import { BIZ } from "@/lib/config";
import { BizLink } from "@/components/ui/BizLink";
import { ChatIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { Logo } from "./Logo";
import { SITE_LINKS } from "./nav";

export function Footer() {
  return (
    <footer className="ftr" id="ftr">
      <div className="wrap fwrap">
        <div className="fbrand">
          <Logo light />
          <p>
            Well-maintained cars and buses with experienced drivers for hotel guests, airport transfers, local journeys and
            group travel across Ahmedabad.
          </p>
        </div>
        <div className="cols">
          <div>
            <h5>Quick Links</h5>
            {SITE_LINKS.map(([h, t]) => (
              <Link key={h} href={h}>
                {t}
              </Link>
            ))}
          </div>
          <div>
            <h5>Get in Touch</h5>
            <span>
              <PhoneIcon /> <BizLink type="phone">{BIZ.phone}</BizLink>
            </span>
            <span>
              <ChatIcon /> <BizLink type="whatsapp">{BIZ.whatsapp}</BizLink>
            </span>
            <span>
              <MailIcon /> <BizLink type="email">{BIZ.email}</BizLink>
            </span>
            <span>
              <PinIcon /> <BizLink type="office">{BIZ.office}</BizLink>
            </span>
          </div>
        </div>
      </div>
      <div className="bottom wrap" style={{ padding: "12px 24px" }}>
        <span>&copy; {new Date().getFullYear()} Shital Tours &amp; Travels. All rights reserved.</span>
      </div>
    </footer>
  );
}
