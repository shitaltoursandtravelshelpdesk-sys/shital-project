import { BIZ, type BizKey } from "./config";

const digits = (s: string) => s.replace(/\D/g, "");

export function bizHref(k: BizKey): string {
  switch (k) {
    case "phone":
      return `tel:+91${digits(BIZ.phone)}`;
    case "whatsapp":
      return `https://wa.me/91${digits(BIZ.whatsapp)}?text=${encodeURIComponent(
        "Hi Shital Tours & Travels, I would like to enquire about a trip."
      )}`;
    case "email":
      return `mailto:${BIZ.email}`;
    case "office":
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BIZ.office)}`;
  }
}

/** Opens in a new tab (WhatsApp, Maps) */
export const isExternal = (k: BizKey) => k === "whatsapp" || k === "office";

/** Plain tel: link used in the booking header and the "Contact support" button */
export const telHref = () => `tel:${BIZ.phone.replace(/\s/g, "")}`;
/** Mobile quick bar links */
export const mbarTel = () => `tel:+91${digits(BIZ.phone)}`;
export const mbarWa = () => `https://wa.me/91${digits(BIZ.whatsapp)}`;
