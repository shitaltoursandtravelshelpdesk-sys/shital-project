import type { Metadata } from "next";
import "./admin.css";

export const metadata: Metadata = {
  title: "Admin Panel",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="ad">
      {/* Font Awesome icons for the admin panel */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" precedence="default" />
      {children}
    </div>
  );
}
