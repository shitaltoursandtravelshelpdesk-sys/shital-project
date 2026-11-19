import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CalendarIcon, CarIcon, PinIcon, StarIcon, PhoneIcon } from "@/components/icons";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Ready-Made Tour Packages — Shital Tours & Travels",
  description: "Ready-made road trip packages from Ahmedabad: Gujarat Darshan, Statue of Unity, Rann of Kutch, Rajasthan, Golden Triangle and Himachal, with car or bus and driver.",
  path: "/tours",
});

type Tour = {
  id: string;
  name: string;
  tag: string;
  days: number;
  img: string;
  route: string[];
  vehicles: string;
  highlights: string[];
  plan: string[];
};

// Edit this list to change the packages shown on the page.
const TOURS: Tour[] = [
  {
    id: "gujarat-darshan",
    name: "Gujarat Darshan",
    tag: "Most popular",
    days: 5,
    img: "/images/fleet/innova/2.jpg",
    route: ["Ahmedabad", "Dwarka", "Somnath", "Sasan Gir", "Ahmedabad"],
    vehicles: "Sedan · Innova · Tempo Traveller",
    highlights: ["Dwarkadhish Temple & Bet Dwarka", "Somnath Jyotirlinga & evening aarti", "Gir National Park safari"],
    plan: [
      "Ahmedabad to Dwarka, evening darshan at Dwarkadhish Temple.",
      "Bet Dwarka, Nageshwar Jyotirlinga and Rukmini Temple.",
      "Dwarka to Somnath via Porbandar (Kirti Mandir).",
      "Somnath darshan, then drive to Sasan Gir for the safari.",
      "Return drive from Gir to Ahmedabad.",
    ],
  },
  {
    id: "statue-of-unity",
    name: "Statue of Unity Getaway",
    tag: "Weekend trip",
    days: 2,
    img: "/images/fleet/suv/1.jpg",
    route: ["Ahmedabad", "Kevadia", "Ahmedabad"],
    vehicles: "Sedan · SUV · Innova",
    highlights: ["Statue of Unity viewing gallery", "Valley of Flowers & laser show", "Sardar Sarovar Dam"],
    plan: [
      "Ahmedabad to Kevadia, Statue of Unity visit and evening laser show.",
      "Sardar Sarovar Dam, Jungle Safari, then return to Ahmedabad.",
    ],
  },
  {
    id: "rann-of-kutch",
    name: "Rann of Kutch",
    tag: "White desert",
    days: 3,
    img: "/images/fleet/fortuner/2.jpg",
    route: ["Ahmedabad", "Bhuj", "Dhordo", "Ahmedabad"],
    vehicles: "SUV · Innova · Tempo Traveller",
    highlights: ["Sunset & full moon at the White Rann", "Kalo Dungar viewpoint", "Bhuj handicraft villages"],
    plan: [
      "Ahmedabad to Bhuj, Aina Mahal and Prag Mahal.",
      "Craft villages, Kalo Dungar, sunset at the White Rann.",
      "Return drive from Dhordo to Ahmedabad.",
    ],
  },
  {
    id: "royal-rajasthan",
    name: "Royal Rajasthan",
    tag: "Forts & palaces",
    days: 6,
    img: "/images/fleet/innova/5.jpg",
    route: ["Ahmedabad", "Udaipur", "Mount Abu", "Jodhpur", "Jaipur"],
    vehicles: "Innova · SUV · Tempo Traveller",
    highlights: ["City Palace & Lake Pichola, Udaipur", "Mehrangarh Fort, Jodhpur", "Amber Fort & Hawa Mahal, Jaipur"],
    plan: [
      "Ahmedabad to Udaipur, evening boat ride on Lake Pichola.",
      "Udaipur sightseeing: City Palace, Saheliyon ki Bari.",
      "Udaipur to Mount Abu, Dilwara Temples and Nakki Lake.",
      "Mount Abu to Jodhpur, Mehrangarh Fort.",
      "Jodhpur to Jaipur, evening at local markets.",
      "Jaipur sightseeing, then drop at Jaipur or return to Ahmedabad.",
    ],
  },
  {
    id: "golden-triangle",
    name: "Golden Triangle",
    tag: "Delhi · Agra · Jaipur",
    days: 6,
    img: "/images/fleet/rangerover/2.jpg",
    route: ["Delhi", "Agra", "Jaipur", "Delhi"],
    vehicles: "Sedan · Innova · Luxury",
    highlights: ["Taj Mahal at sunrise", "Qutub Minar & India Gate", "Amber Fort, Jaipur"],
    plan: [
      "Pickup at Delhi airport or station, city tour.",
      "Old & New Delhi sightseeing.",
      "Delhi to Agra, Agra Fort and Mehtab Bagh.",
      "Taj Mahal at sunrise, Fatehpur Sikri, drive to Jaipur.",
      "Jaipur sightseeing.",
      "Jaipur to Delhi, drop at airport or station.",
    ],
  },
  {
    id: "group-pilgrimage",
    name: "Group Pilgrimage by Bus",
    tag: "For groups & societies",
    days: 4,
    img: "/images/fleet/bus/2.jpg",
    route: ["Ahmedabad", "Ambaji", "Shamlaji", "Dakor", "Ahmedabad"],
    vehicles: "Tempo Traveller · Mini Bus · Bus",
    highlights: ["Ambaji Shaktipeeth", "Shamlaji Vishnu Temple", "Ranchhodraiji Temple, Dakor"],
    plan: [
      "Ahmedabad to Ambaji, darshan and Gabbar Hill.",
      "Ambaji to Shamlaji.",
      "Shamlaji to Dakor, Ranchhodraiji Temple darshan.",
      "Return to Ahmedabad.",
    ],
  },
];

export default function ToursPage() {
  return (
    <>
      <section className="phero" style={{ "--img": "url(/images/fleet/gallery/5.jpg)" } as CSSProperties}>
        <div className="bg" />
        <div className="wrap">
          <div className="crumb">Ready-made trips &middot; Car or bus with driver &middot; From Ahmedabad</div>
          <h1>Tour Packages</h1>
          <p>Pick a ready-made trip and we will handle the vehicle, driver and route. Every package can be changed to suit your dates and group size.</p>
        </div>
      </section>

      <section className="sec white">
        <div className="wrap">
          <div className="tour-grid">
            {TOURS.map((t) => (
              <article key={t.id} className="tour" id={t.id}>
                <div className="tour-ph" style={{ backgroundImage: `url(${t.img})` }}>
                  <span className="tour-tag">{t.tag}</span>
                  <span className="tour-days"><CalendarIcon /> {t.days} {t.days === 1 ? "Day" : "Days"}</span>
                </div>
                <div className="tour-body">
                  <h3>{t.name}</h3>
                  <div className="tour-route"><PinIcon bare size={13} /> {t.route.join(" → ")}</div>
                  <ul className="tour-hl">
                    {t.highlights.map((h) => (
                      <li key={h}><StarIcon bare size={12} /> {h}</li>
                    ))}
                  </ul>
                  <details className="tour-plan">
                    <summary>Day-wise plan</summary>
                    <ol>
                      {t.plan.map((p, i) => (
                        <li key={i}><b>Day {i + 1}</b> {p}</li>
                      ))}
                    </ol>
                  </details>
                  <div className="tour-veh"><CarIcon /> {t.vehicles}</div>
                  <div className="tour-foot">
                    <span className="tour-price">Price on request</span>
                    <Link className="btn" href={`/book?service=outstation&tour=${t.id}`}>Book This Tour &rarr;</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="tour-custom">
            <div>
              <h3>Want a different trip?</h3>
              <p>Tell us where you want to go. We will plan the route, vehicle and stops for you.</p>
            </div>
            <div className="btns">
              <Link className="btn" href="/book?service=outstation">Plan a Custom Trip &rarr;</Link>
              <Link className="btn ghost" href="/contact"><PhoneIcon /> Talk to Us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
