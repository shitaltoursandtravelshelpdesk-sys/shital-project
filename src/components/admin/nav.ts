// Admin sidebar menu: [slug, label, Font Awesome icon]
export const NAV: [string, [string, string, string][]][] = [
  ["Overview", [["dashboard", "Dashboard", "gauge-high"]]],
  ["Requests", [["bookings", "Booking Requests", "calendar-check"], ["enquiries", "Enquiries", "envelope"], ["event-requests", "Event Requests", "champagne-glasses"], ["vendors", "Vendor Applications", "handshake"], ["drivers", "Driver Applications", "id-card"]]],
  ["Website", [["fleet", "Fleet", "car"], ["rates", "Rate Card", "indian-rupee-sign"], ["tours", "Tour Packages", "map-location-dot"], ["services", "Services & Divisions", "briefcase"], ["events-content", "Events Content", "calendar-days"], ["partners", "Partners & Clients", "building"], ["media", "Media Library", "images"], ["pages", "Page Content", "file-lines"], ["careers", "Job Openings", "user-tie"], ["brochure", "Brochure", "book-open"]]],
  ["System", [["settings", "Settings", "gear"], ["users", "Users & Roles", "users"], ["activity", "Activity Log", "clock-rotate-left"]]],
];
export const ALL_PAGES = [...NAV.flatMap((g) => g[1].map((n) => n[0])), "profile"];
