import type { Metadata } from "next";
import { ReviewForm } from "@/components/forms/ReviewForm";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Review your booking — Shital Tours & Travels",
    description: "Review your trip details, add your contact information and choose a payment option to confirm.",
    path: "/review",
  }),
  robots: { index: false },
};

export default function ReviewPage() {
  return (
    <>
      <style>{"body{background:#fbfcfd}"}</style>
      <ReviewForm />
    </>
  );
}
