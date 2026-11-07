export const BIZ = {
  phone: "98765 43210",
  whatsapp: "98765 43210",
  email: "info@shitaltravels.com",
  office:
    "407, 4th Floor, Sahajanand Shopping Centre, Opp. Rajasthan High School, Aashiya House, Shahibaug, Ahmedabad, Gujarat 380004",
} as const;

export type BizKey = keyof typeof BIZ;

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shitaltravels.com";
export const SITE_NAME = "Shital Tours & Travels";
