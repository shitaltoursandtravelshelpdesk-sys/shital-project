import { promises as fs } from "fs";
import path from "path";
import type { ConfirmedBooking } from "@/types";

/**
 * Orders store — for now a JSON file on the server (web/data/orders.json).
 * To move to a real database later, only change readAll / writeAll below.
 */
const FILE = path.join(process.cwd(), "data", "orders.json");

export type OrderStatus = "Pending Acceptance" | "Accepted" | "Declined" | "In Progress" | "Completed";

/** Shape the driver app understands (matches driver/src/types Booking). */
export interface Order {
  id: string;
  bookingNo: string;
  date: string;
  title: string;
  type: string;
  customer: string;
  pickupTime: string;
  pickup: { name: string; address: string; lat: number; lng: number };
  drop: { name: string; address: string; lat: number; lng: number };
  vehicle: { model: string; number: string };
  passengers: number;
  guestName: string;
  guestPhone: string;
  driverName: string;
  assignedBy: string;
  assignedByPhone: string;
  specialInstructions: string;
  amount: number;
  merchant: string;
  upiId: string;
  status: OrderStatus;
  isNew: boolean;
  createdAt: number;
}

async function readAll(): Promise<Order[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8")) as Order[];
  } catch {
    return [];
  }
}

async function writeAll(orders: Order[]): Promise<void> {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(orders, null, 2), "utf8");
}

const SERVICE: Record<string, string> = {
  airport: "Airport Transfer",
  local: "Local City Travel",
  outstation: "Outstation Trip",
  bus: "Bus / Group Travel",
};

function fmtDate(d: string): string {
  const t = new Date(d);
  return isNaN(t.getTime())
    ? d
    : t.toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "short", year: "numeric" });
}

function fmtTime(t: string): string {
  const m = /^(\d{1,2}):(\d{2})/.exec(t);
  if (!m) return t;
  const h = +m[1];
  return `${((h + 11) % 12) + 1}:${m[2]} ${h < 12 ? "AM" : "PM"}`;
}

// no geocoding yet: default map position = Ahmedabad centre
const place = (s: string) => ({ name: s.split(",")[0].trim() || s, address: s, lat: 23.0225, lng: 72.5714 });

export function toOrder(b: ConfirmedBooking): Order {
  return {
    id: b.id,
    bookingNo: b.id,
    date: fmtDate(b.date),
    title: place(b.pickup).name,
    type: SERVICE[b.service] ?? b.service ?? "Trip",
    customer: b.bookingFor || b.name,
    pickupTime: fmtTime(b.time),
    pickup: place(b.pickup),
    drop: place(b.drop),
    vehicle: { model: b.fare?.v?.name ?? b.vehicle, number: "To be assigned" },
    passengers: Number(b.passengers) || 1,
    guestName: b.name,
    guestPhone: b.mobile ? `+91${b.mobile.replace(/\D/g, "").slice(-10)}` : "",
    driverName: "",
    assignedBy: "Website Booking",
    assignedByPhone: "",
    specialInstructions: [b.notes, b.instructions].filter(Boolean).join(" · ") || "N/A",
    amount: Math.round(b.fare?.total ?? 0),
    merchant: "Shital Tours & Travels",
    upiId: "shitaltours@upi",
    status: "Pending Acceptance",
    isNew: true,
    createdAt: b.confirmedAt ?? Date.now(),
  };
}

export async function listOrders(): Promise<Order[]> {
  return (await readAll()).sort((a, b) => b.createdAt - a.createdAt);
}

export async function addOrder(o: Order): Promise<Order> {
  const all = await readAll();
  if (!all.some((x) => x.id === o.id)) all.push(o);
  await writeAll(all);
  return o;
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<Order | null> {
  const all = await readAll();
  const o = all.find((x) => x.id === id);
  if (!o) return null;
  o.status = status;
  o.isNew = false;
  await writeAll(all);
  return o;
}
