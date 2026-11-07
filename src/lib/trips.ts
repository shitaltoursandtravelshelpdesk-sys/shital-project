import type { Trip } from "@/types";
import trips from "@/data/trips.json";

/** Data access for driver trips. Swap this JSON import for a database query later. */
const normalise = (p: string) => p.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "");

export async function getTrips(): Promise<Trip[]> {
  return trips as Trip[];
}

export async function getTripsByDriver(driverPhone: string): Promise<Trip[]> {
  const want = normalise(driverPhone);
  return (await getTrips()).filter((t) => normalise(t.driverPhone) === want);
}
