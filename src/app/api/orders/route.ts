import { NextResponse, type NextRequest } from "next/server";
import { addOrder, listOrders, toOrder, updateOrderStatus, type OrderStatus } from "@/lib/orders";
import type { ConfirmedBooking } from "@/types";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cache-Control": "no-store",
};

const STATUSES: OrderStatus[] = ["Pending Acceptance", "Accepted", "Declined", "In Progress", "Completed"];

/** GET /api/orders -> all website orders (newest first) */
export async function GET() {
  return NextResponse.json(await listOrders(), { headers: HEADERS });
}

/** POST /api/orders  body: ConfirmedBooking -> saves a new order */
export async function POST(req: NextRequest) {
  try {
    const b = (await req.json()) as ConfirmedBooking;
    if (!b?.id || !b.pickup || !b.mobile) {
      return NextResponse.json({ error: "Missing booking details" }, { status: 400, headers: HEADERS });
    }
    return NextResponse.json(await addOrder(toOrder(b)), { status: 201, headers: HEADERS });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400, headers: HEADERS });
  }
}

/** PATCH /api/orders  body: { id, status } -> driver app updates status */
export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = (await req.json()) as { id?: string; status?: OrderStatus };
    if (!id || !status || !STATUSES.includes(status)) {
      return NextResponse.json({ error: "id and valid status required" }, { status: 400, headers: HEADERS });
    }
    const o = await updateOrderStatus(id, status);
    if (!o) return NextResponse.json({ error: "Order not found" }, { status: 404, headers: HEADERS });
    return NextResponse.json(o, { headers: HEADERS });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400, headers: HEADERS });
  }
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: HEADERS });
}
