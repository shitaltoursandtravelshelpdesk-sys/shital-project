import type { Metadata } from "next";
import Link from "next/link";
import { CarIcon, BusIcon, HotelIcon } from "@/components/icons";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Careers — Shital Tours & Travels",
  description: "Shital Tours & Travels is hiring experienced car and bus drivers in Ahmedabad.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <section className="sec soft">
        <div className="wrap split">
          <div>
            <div className="eyebrow">Careers</div>
            <h2>Join our team of<br />professional drivers</h2>
            <p>Shital Tours &amp; Travels is hiring experienced car and bus drivers in Ahmedabad. Drive hotel guests, airport transfers, local tours and outstation trips with a trusted travel company.</p>
            <Link className="btn mt" style={{marginTop: "18px"}} href="/drive#dwForm">Apply Now &rarr;</Link>
          </div>
          <div className="img-card ph" style={{minHeight: "460px", backgroundSize: "cover", backgroundPosition: "center 12%", backgroundImage: "url(/images/driver.png),linear-gradient(135deg,#3d5a78,#9fb2c4)"}}></div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap center">
          <div className="eyebrow">Open Positions</div>
          <h2 className="sec-title">Driver roles available</h2>
          <div className="jobs">
            <div className="job">
              <h3><span className="jic"><CarIcon size={"22"} bare /></span>Car Driver</h3>
              <div className="tags"><span>Full-time</span><span>Ahmedabad</span><span>LMV licence</span></div>
              <ul><li>Airport, hotel and railway station pickups.</li><li>Local sightseeing and outstation trips.</li><li>1+ year driving experience.</li></ul>
              <Link className="btn block" href="/drive#dwForm">Apply &rarr;</Link>
            </div>
            <div className="job">
              <h3><span className="jic"><BusIcon size={"22"} bare /></span>Bus / Tempo Traveller Driver</h3>
              <div className="tags"><span>Full-time</span><span>Ahmedabad</span><span>HMV licence</span></div>
              <ul><li>Group, wedding and corporate travel.</li><li>School, college and family tours.</li><li>3+ years heavy vehicle experience.</li></ul>
              <Link className="btn block" href="/drive#dwForm">Apply &rarr;</Link>
            </div>
            <div className="job">
              <h3><span className="jic"><HotelIcon size={"22"} bare /></span>Hotel Chauffeur</h3>
              <div className="tags"><span>Full-time</span><span>Ahmedabad</span><span>English preferred</span></div>
              <ul><li>Dedicated driver for hotel and foreign guests.</li><li>Professional appearance and polite manner.</li><li>Basic English communication.</li></ul>
              <Link className="btn block" href="/drive#dwForm">Apply &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sec soft">
        <div className="wrap center">
          <Link className="btn" href="/drive#dwForm">Apply for a Driver Role &rarr;</Link>
        </div>
      </section>
    </>
  );
}
