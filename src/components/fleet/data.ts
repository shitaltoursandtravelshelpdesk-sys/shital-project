/* Add or edit vehicles here. Photos go in public/images/fleet/<id>/1.jpg, 2.jpg ...
   "photos" = how many photos that folder has. */
export interface FleetVehicle {
  id: string;
  photos: number;
  name: string;
  tags: string[];
  points: string[];
  price: string;
  book: string;
}

export const FLEET: FleetVehicle[] = [
  { id: "innova", photos: 6, name: "Toyota Innova Crysta", tags: ["6–7 seats", "AC", "Luggage space"], points: ["Ideal for families, airport and outstation trips.", "Captain seats with ample legroom.", "Room for 3–4 large bags."], price: "₹6,000", book: "/book" },
  { id: "fortuner", photos: 5, name: "Toyota Fortuner", tags: ["7 seats", "AC", "Premium SUV"], points: ["Premium SUV for VIP and corporate travel.", "Powerful and comfortable on highways.", "Great for outstation trips."], price: "", book: "/book" },
  { id: "suv", photos: 5, name: "Premium SUV", tags: ["5 seats", "AC", "SUV"], points: ["Stylish SUV for city and outstation travel.", "Comfortable for 1–4 passengers.", "Good boot space."], price: "", book: "/book" },
  { id: "mpv", photos: 4, name: "Electric MPV", tags: ["6–7 seats", "AC", "Electric"], points: ["Quiet, smooth electric ride.", "Spacious cabin for families.", "Eco-friendly city travel."], price: "", book: "/book" },
  { id: "rangerover", photos: 4, name: "Range Rover (Wedding Car)", tags: ["4 seats", "Luxury", "Decorated"], points: ["Luxury car for weddings and special events.", "Decoration available on request.", "Chauffeur in formal attire."], price: "", book: "/book" },
  { id: "tempo", photos: 3, name: "Force Urbania / Tempo Traveller", tags: ["12–17 seats", "AC", "Pushback seats"], points: ["Perfect for group tours and weddings.", "Pushback seats and music system.", "Luggage carrier at the back."], price: "₹11,000", book: "/book?service=bus" },
  { id: "bus", photos: 7, name: "Tourist Bus", tags: ["26–45 seats", "AC", "Group travel"], points: ["For corporate events and large groups.", "Reclining seats and overhead racks.", "Experienced bus drivers."], price: "", book: "/book?service=bus" },
];

export const photoSrc = (v: FleetVehicle, n: number) => `/images/fleet/${v.id}/${n + 1}.jpg`;

/* Fleet line-up & team photos: public/images/fleet/gallery/1.jpg ... */
export const GALLERY_COUNT = 13;
