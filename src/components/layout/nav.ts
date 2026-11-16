export const SITE_LINKS: [href: string, label: string][] = [
  ["/", "Home"],
  ["/services", "Services"],
  ["/packages", "Packages & Hotels"],
  ["/book", "Book a Vehicle"],
  ["/fleet", "Our Fleet"],
  ["/drive", "Drive With Us"],
  ["/careers", "Careers"],
  ["/contact", "Contact"],
];

export const BOOKING_LINKS: [href: string, label: string][] = [
  ["/", "Home"],
  ["/packages#airport", "Airport Transfers"],
  ["/packages#local", "City Tours"],
  ["/packages#outstation", "Outstation"],
  ["/packages#bus", "Fleet"],
  ["/#about", "About Us"],
];

/** Pages that use the booking header and hide the mobile quick bar */
export const BOOKING_PAGES = ["/review", "/confirmed"];
