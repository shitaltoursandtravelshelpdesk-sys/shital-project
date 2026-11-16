"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { FareSummary } from "@/components/booking/FareBreakdown";
import { CalendarIcon, CardIcon, CarIcon, FileIcon, HeadsetIcon, PinIcon, PlaneIcon, UserIcon, UsersIcon } from "@/components/icons";
import { useToast } from "@/components/ui/Toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { BIZ } from "@/lib/config";
import { SERVICE_TITLE } from "@/lib/fare";
import { fmtDate, fmtTime } from "@/lib/format";
import { telHref } from "@/lib/links";
import { KEYS } from "@/lib/storage";
import type { ConfirmedBooking } from "@/types";

function downloadItinerary(b: ConfirmedBooking) {
  const f = b.fare;
  const txt = `SHITAL TOURS & TRAVELS — ITINERARY\n\nBooking ID: ${b.id}\nName: ${b.name}\nMobile: ${b.mobile}\n\nPickup: ${b.pickup}\nDrop: ${b.drop}\nDate & time: ${fmtDate(b.date)} at ${fmtTime(b.time)}\nTrip type: ${b.tripType} (${f.d} day${f.d > 1 ? "s" : ""})\nPassengers: ${b.passengers}\nVehicle: ${f.v.name}\n\nVehicle rental: Rs ${f.rental}\nTolls & parking: Rs ${f.tolls}\nDriver allowance: Rs ${f.allowance}\nTotal: Rs ${f.total}\n\nPayment: ${b.payment === "now" ? "Paid online" : "Pay later"}\nSupport: ${BIZ.phone}\n`;
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([txt], { type: "text/plain" }));
  a.download = `Shital-${b.id}-itinerary.txt`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

export function ConfirmedView() {
  const toast = useToast();
  const { value: b, ready } = useLocalStorage<ConfirmedBooking>(KEYS.confirmed);

  if (!ready) {
    return (
      <main className="wrap" id="cfMain">
        <div style={{ padding: "80px 0", textAlign: "center", color: "var(--muted)" }}>Loading your booking…</div>
      </main>
    );
  }

  if (!b) {
    return (
      <main className="wrap" id="cfMain">
        <div className="card center" style={{ margin: "60px auto", maxWidth: "520px" }}>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "24px" }}>No confirmed booking yet</h2>
          <p style={{ color: "var(--muted)", margin: "10px 0 20px" }}>
            Submit a booking request and confirm it on the review page to see your confirmation here.
          </p>
          <Link className="btn" href="/book">Request a Vehicle</Link>
        </div>
      </main>
    );
  }

  const f = b.fare;
  const cells: [ReactNode, string, ReactNode][] = [
    [<PlaneIcon key="i" />, "Pickup location", b.pickup],
    [<CalendarIcon key="i" />, "Date & time", <>{fmtDate(b.date, { weekday: "long", day: "numeric", month: "short", year: "numeric" })}<br />at {fmtTime(b.time)}</>],
    [<PinIcon key="i" />, "Drop-off location", b.drop],
    ["⇄", "Trip type", `${b.tripType}${f.d > 1 ? ` · ${f.d} days` : ""}`],
    [<UsersIcon key="i" />, "Passengers", b.passengers],
    [<CardIcon key="i" />, "Payment", b.payment === "now" ? "Paid online" : "Pay later"],
  ];

  return (
    <main className="wrap" id="cfMain">
      <div className="cf-head">
        <div className="l">
          <div className="ok">&#10003;</div>
          <div>
            <h1 id="cfTitle">Your {SERVICE_TITLE[b.service] || "trip"} is confirmed</h1>
            <p>Thank you for choosing Shital Tours &amp; Travels. We look forward to serving you.</p>
          </div>
        </div>
        <div className="bid">Booking ID<b id="cfId">{b.id}</b></div>
      </div>

      <div className="cf-grid">
        <div className="col">
          <div className="card">
            <div className="ch"><h2>Trip summary</h2><Link href="/book?edit=1">Edit</Link></div>
            <div className="cells" id="cfCells">
              {cells.map(([i, k, v]) => (
                <div className="c" key={k}>
                  <span className="i">{i}</span>
                  <span><small>{k}</small>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="veh">
              <div>
                <div className="ch" style={{ justifyContent: "flex-start", gap: "10px" }}>
                  <span style={{ color: "var(--navy)" }}><CarIcon /></span><h2>Vehicle</h2>
                </div>
                <div className="car">
                  <div className="car-img" />
                  <div id="cfVeh" style={{ display: "flex", flexDirection: "column" }}>
                    <b style={{ fontFamily: "var(--serif)", fontSize: "17px" }}>{f.v.name}</b>
                    <span style={{ color: "var(--muted)", fontSize: "13px" }}>{f.v.desc}</span>
                  </div>
                </div>
              </div>
              <div className="drv">
                <span><UserIcon /> Driver assignment</span>
                <b>Driver details will appear before pickup.</b>
                We will share your driver&apos;s name and contact number closer to your pickup time.
              </div>
            </div>
          </div>
          <div className="card">
            <div className="ch" style={{ justifyContent: "flex-start", gap: "10px" }}>
              <span style={{ color: "var(--navy)" }}><FileIcon /></span><h2>Fare breakdown</h2>
            </div>
            <FareSummary b={b} f={f} />
          </div>
        </div>

        <div className="col">
          <div className="hotel-img ph" />
          <div className="card">
            <div className="ch"><h2>Booking status</h2></div>
            <div className="status">
              <div className="s on"><i>&#10003;</i>Confirmed</div>
              <div className="s"><i></i>Driver<br />assigned</div>
              <div className="s"><i></i>On the way</div>
              <div className="s"><i></i>Completed</div>
            </div>
            <button
              className="btn teal block"
              id="trackBtn"
              type="button"
              style={{ padding: "13px" }}
              onClick={() => toast("Tracking will be available once a driver is assigned to " + b.id + ".")}
            >
              <PinIcon /> Track booking &rarr;
            </button>
            <button
              className="btn ghost block mt"
              id="itinBtn"
              type="button"
              style={{ padding: "13px", color: "var(--teal)", borderColor: "var(--teal)" }}
              onClick={() => downloadItinerary(b)}
            >
              <FileIcon /> Download itinerary &rarr;
            </button>
            <a className="link-btn" id="supportBtn" href={telHref()}>
              <HeadsetIcon /> Contact support
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
