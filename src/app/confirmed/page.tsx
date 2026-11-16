import type { Metadata } from "next";
import { ConfirmedView } from "@/components/booking/ConfirmedView";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Booking confirmed — Shital Tours & Travels",
    description: "Your Shital Tours & Travels booking confirmation, fare breakdown and itinerary.",
    path: "/confirmed",
  }),
  robots: { index: false },
};

export default function ConfirmedPage() {
  return (
    <>
      <style>{"body{background:#fbfcfd}"}</style>
      <ConfirmedView />
    </>
  );
}
