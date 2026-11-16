import { NextResponse, type NextRequest } from "next/server";
import { getTrips, getTripsByDriver } from "@/lib/trips";

export const dynamic = "force-dynamic";

const HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Cache-Control": "no-store",
};

/** GET /api/trips                       -> all trips
 *  GET /api/trips?driverPhone=98xxxxxxxx -> trips for one driver */
export async function GET(req: NextRequest) {
  const phone = req.nextUrl.searchParams.get("driverPhone");
  const trips = phone ? await getTripsByDriver(phone) : await getTrips();
  return NextResponse.json(trips, { headers: HEADERS });
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: HEADERS });
}
