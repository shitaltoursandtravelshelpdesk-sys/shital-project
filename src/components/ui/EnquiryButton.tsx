"use client";

import { useRouter } from "next/navigation";

export function EnquiryButton() {
  const router = useRouter();
  return (
    <button className="btn" id="enqBtn" onClick={() => router.push("/contact")}>
      Send an enquiry &rarr;
    </button>
  );
}
