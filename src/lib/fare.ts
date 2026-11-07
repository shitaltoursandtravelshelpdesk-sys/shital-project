import type { Booking, Fare, Vehicle, VehicleKey } from "@/types";

export const VEHICLES: Record<VehicleKey, Vehicle> = {
  Car: { name: "Innova Crysta", desc: "Spacious and comfortable for outstation travel", rate: 6000 },
  Bus: { name: "Tempo Traveller (17 Seater)", desc: "Ideal for group and family travel", rate: 11000 },
  "Not sure": { name: "Innova Crysta", desc: "Our team will confirm the best vehicle for your group", rate: 6000 },
};

export const TOLL_PER_DAY = 300;
export const TOLL_PER_DAY_ROUND = 600;
export const DRIVER_ALLOWANCE_PER_DAY = 800;

export function tripDays(b: Pick<Booking, "duration" | "customDays">): number {
  return b.duration === "Custom"
    ? Math.max(1, parseInt(b.customDays ?? "", 10) || 1)
    : parseInt(b.duration, 10) || 1;
}

export function fare(b: Booking): Fare {
  const v = VEHICLES[b.vehicle as VehicleKey] ?? VEHICLES.Car;
  const d = tripDays(b);
  const rental = v.rate * d;
  const tolls = (b.tripType === "Round trip" ? TOLL_PER_DAY_ROUND : TOLL_PER_DAY) * d;
  const allowance = DRIVER_ALLOWANCE_PER_DAY * d;
  return { v, d, rental, tolls, allowance, total: rental + tolls + allowance };
}

export const SERVICE_TITLE: Record<string, string> = {
  airport: "airport pickup",
  local: "city trip",
  outstation: "outstation trip",
  bus: "group transport",
};

export const SERVICE_PRESET: Record<string, string> = {
  airport: "Airport Pickup & Drop",
  local: "Local City Travel",
  outstation: "Outstation Travel",
  bus: "Bus & Group Transport",
};

export const newBookingId = () => "BK-" + (1000 + Math.floor(Math.random() * 9000));
