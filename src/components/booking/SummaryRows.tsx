import type { ReactNode } from "react";
import { CalendarIcon, CarIcon, PinIcon, PlaneIcon, UsersIcon } from "@/components/icons";
import { fmtDate, fmtTime, isoLocal } from "@/lib/format";
import type { Booking, Fare } from "@/types";

/** Trip summary rows on the review page */
export function SummaryRows({ b, f }: { b: Booking; f: Fare }) {
  const end = new Date(b.date + "T00:00");
  end.setDate(end.getDate() + f.d - 1);
  const endIso = isoLocal(end);
  const dateTxt = f.d > 1 ? `${fmtDate(b.date)} – ${fmtDate(endIso)}` : `${fmtDate(b.date)}, ${fmtTime(b.time)}`;
  const dayTxt =
    f.d > 1
      ? `${f.d} days (${fmtDate(b.date, { weekday: "short" })} – ${fmtDate(endIso, { weekday: "short" })})`
      : fmtDate(b.date, { weekday: "long" });
  const route: ReactNode =
    b.tripType === "Round trip" ? (
      <>
        {b.pickup} → {b.drop}
        <br />→ {b.pickup}
      </>
    ) : (
      `${b.pickup} → ${b.drop}`
    );

  const rows: [ReactNode, string, ReactNode][] = [
    [<PlaneIcon key="i" />, "Trip type", b.tripType],
    [<CalendarIcon key="i" />, "Travel dates", <>{dateTxt}<small>{dayTxt}</small></>],
    [<PinIcon key="i" />, "Route", route],
    [<UsersIcon key="i" />, "Passengers", b.passengers],
    [<CarIcon key="i" />, "Vehicle", <>{f.v.name}<small>{f.v.desc}</small></>],
  ];

  return (
    <div id="sumRows">
      {rows.map(([i, k, v]) => (
        <div className="r" key={k}>
          <span>{i}</span>
          <span className="k">{k}</span>
          <span>{v}</span>
        </div>
      ))}
    </div>
  );
}
