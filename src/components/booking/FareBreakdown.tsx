import { inr, short } from "@/lib/format";
import type { Booking, Fare } from "@/types";

const s = (n: number) => (n > 1 ? "s" : "");

/** Detailed fare estimate (review page) */
export function FareBreakdown({ b, f }: { b: Booking; f: Fare }) {
  return (
    <div id="fareRows">
      <div className="fare-row">
        <span>
          Car rental ({f.v.name})
          <small>
            {short(b.pickup)} {b.tripType === "Round trip" ? "↔" : "→"} {short(b.drop)} ({f.d} day{s(f.d)})
          </small>
        </span>
        <span>{inr(f.rental)}</span>
      </div>
      <div className="fare-row">
        <span>
          Tolls and parking <span style={{ color: "var(--muted)" }}>(estimated)</span>
          <small>State tolls, parking and entry fees</small>
        </span>
        <span>{inr(f.tolls)}</span>
      </div>
      <div className="fare-row">
        <span>
          Driver allowance<small>Driver charges for {f.d} day{s(f.d)}</small>
        </span>
        <span>{inr(f.allowance)}</span>
      </div>
      <div className="fare-row tot">
        <span>Total estimated fare</span>
        <b>{inr(f.total)}</b>
      </div>
    </div>
  );
}

/** Compact fare (confirmed page) */
export function FareSummary({ b, f }: { b: Booking; f: Fare }) {
  return (
    <div id="cfFare">
      <div className="fare-row">
        <span style={{ color: "var(--muted)" }}>
          Vehicle rental ({short(b.pickup)} to {short(b.drop)})
        </span>
        <span>{inr(f.rental)}</span>
      </div>
      <div className="fare-row">
        <span style={{ color: "var(--muted)" }}>Tolls, parking and driver allowance</span>
        <span>{inr(f.tolls + f.allowance)}</span>
      </div>
      <div className="fare-row tot" style={{ fontSize: "15px" }}>
        <span>Total fare</span>
        <b style={{ fontSize: "17px" }}>{inr(f.total)}</b>
      </div>
    </div>
  );
}
