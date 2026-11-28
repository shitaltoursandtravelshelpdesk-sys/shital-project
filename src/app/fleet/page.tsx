import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { FleetGallery } from "@/components/fleet/FleetGallery";
import { GALLERY_COUNT } from "@/components/fleet/data";

export const metadata: Metadata = pageMeta({
  title: "Our Fleet — Shital Tours & Travels",
  description: "See our cars, tempo travellers and buses, inside and out.",
  path: "/fleet",
});

export default function FleetPage() {
  return (
    <>
      <section className="tours-hero th-full br-hero">
        <div className="wrap tours-hero-in">
          <div>
            <div className="eyebrow">Our Fleet</div>
            <h1>Cars, MPVs &amp; Coaches</h1>
            <p>From Maybach and Vellfire to tempo travellers and 50-seat coaches, every vehicle comes with a professional driver.</p>
            <div className="th-chips">
              <span>Luxury Cars</span><span>MPVs &amp; SUVs</span><span>Buses &amp; Coaches</span>
            </div>
            <div className="btns"><a className="btn" href="/book">Book a Vehicle &rarr;</a></div>
          </div>
          <div className="tours-hero-ph" style={{ backgroundImage: "url(/images/fleet-showcase.jpg)" }} />
        </div>
      </section>

      <section className="sec soft">
        <div className="wrap center">
          <div className="eyebrow">Our Fleet</div>
          <h2 className="sec-title">See our vehicles, inside and out</h2>
          <p style={{color: "var(--muted)", maxWidth: "600px", margin: "0 auto"}}>Tap a photo to view it larger. Use the arrows to see all photos.</p>
          <FleetGallery />
        </div>
      </section>

      <section className="sec">
        <div className="wrap center">
          <div className="eyebrow">Gallery</div>
          <h2 className="sec-title">Our fleet &amp; team</h2>
          <div className="fgal">
            {Array.from({ length: GALLERY_COUNT }, (_, n) => (
              <a key={n} href={`/images/fleet/gallery/${n + 1}.jpg`} target="_blank" rel="noopener">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/images/fleet/gallery/${n + 1}.jpg`} alt={`Shital Tours fleet photo ${n + 1}`} loading="lazy" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
