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
  { id: "maybach", photos: 6, name: "Mercedes-Maybach S-Class", tags: ["4 seats", "Ultra luxury", "Chauffeur"], points: ["Top-end luxury for VIPs, weddings and corporate guests.", "Rear executive seats with entertainment screens.", "Chauffeur in formal attire."], price: "", book: "/book" },
  { id: "vellfire", photos: 6, name: "Toyota Vellfire", tags: ["6–7 seats", "Luxury MPV", "Captain seats"], points: ["Lounge-style captain seats for VIP travel.", "Ideal for airport and hotel transfers.", "Quiet, spacious cabin."], price: "", book: "/book" },
  { id: "alphard", photos: 3, name: "Toyota Alphard", tags: ["6–7 seats", "Luxury MPV", "AC"], points: ["Premium MPV for executives and families.", "Recliner captain seats.", "Great for long-distance comfort."], price: "", book: "/book" },
  { id: "bmw7", photos: 4, name: "BMW 7 Series", tags: ["4 seats", "Luxury sedan", "AC"], points: ["Luxury sedan for corporate and VIP guests.", "Smooth and quiet on highways.", "Chauffeur-driven."], price: "", book: "/book" },
  { id: "bmwx5", photos: 3, name: "BMW X5", tags: ["5 seats", "Luxury SUV", "AC"], points: ["Luxury SUV for city and outstation trips.", "Comfortable for 1–4 passengers.", "Good boot space."], price: "", book: "/book" },
  { id: "bmw5", photos: 3, name: "BMW 5 Series", tags: ["4 seats", "Premium sedan", "AC"], points: ["Premium sedan for business travel.", "Airport and hotel transfers.", "Chauffeur-driven."], price: "", book: "/book" },
  { id: "carnival", photos: 3, name: "Kia Carnival", tags: ["7 seats", "Premium MPV", "AC"], points: ["Spacious premium MPV for families and groups.", "Captain seats with easy sliding doors.", "Room for luggage."], price: "", book: "/book" },
  { id: "hycross", photos: 4, name: "Toyota Innova Hycross", tags: ["7 seats", "AC", "Hybrid"], points: ["New-generation Innova for families and corporates.", "Comfortable seats and smooth ride.", "Great for airport and outstation trips."], price: "", book: "/book" },
  { id: "volvobus", photos: 4, name: "Volvo Mini Coach", tags: ["20–27 seats", "AC", "Group travel"], points: ["Comfortable coach for corporate and tour groups.", "Reclining seats.", "Experienced bus drivers."], price: "", book: "/book?service=bus" },
  { id: "coach", photos: 5, name: "Luxury Coach (Mercedes)", tags: ["35–49 seats", "AC", "Luxury"], points: ["Premium seats with mood lighting.", "For weddings, events and long tours.", "Overhead racks and large luggage space."], price: "", book: "/book?service=bus" },
  { id: "touristbus", photos: 3, name: "Tourist Coach", tags: ["35–45 seats", "AC", "Group travel"], points: ["Ideal for school, college and group tours.", "Reclining seats.", "Large luggage space."], price: "", book: "/book?service=bus" },
  { id: "vintage", photos: 4, name: "Vintage Wedding Car", tags: ["2 seats", "Open-top", "Decorated"], points: ["Classic car for the groom's entry and baraat.", "Floral decoration available.", "Perfect for wedding photos."], price: "", book: "/book" },
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
export const GALLERY_COUNT = 24;
