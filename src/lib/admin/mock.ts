/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-explicit-any */
// @ts-nocheck
// Dummy data for the static admin panel. Replace with API data later (see db.ts).
export function makeMock(): any {
  const names = ["Rahul Patel","Priya Shah","Amit Desai","Neha Mehta","Kunal Joshi","Riya Trivedi","Vikas Sharma","Pooja Parmar","Harsh Modi","Sneha Rana","Jay Bhatt","Kavya Pandya","Manish Chauhan","Dhruvi Vyas","Rohan Thakkar","Isha Soni","Nirav Gohil","Mitali Dave","Arjun Rathod","Komal Solanki","Yash Panchal","Hetal Prajapati","Sagar Jadeja","Bhavna Raval","Deep Kapadia"];
  const areas = ["SG Highway","Navrangpura","Satellite","Bopal","Prahlad Nagar","Maninagar","Vastrapur","Paldi","Chandkheda","Thaltej"];
  const hotels = ["","","The Leela Gandhinagar","Crowne Plaza","ITC Narmada","Hyatt Ahmedabad","Fortune Landmark",""];
  const services = ["Airport","Local","Outstation","Bus/Group","Event","Tour"];
  const vehicles = ["Toyota Innova Crysta","Mercedes-Maybach S-Class","Toyota Vellfire","Kia Carnival","Tempo Traveller","Volvo Mini Coach","BMW 7 Series","Toyota Fortuner"];
  const drops = ["Ahmedabad Airport","Dwarka","Statue of Unity","Udaipur","Somnath","Rajkot","Gandhinagar","Vadodara","Ambaji","Mumbai"];
  const bStatus = ["New","Contacted","Confirmed","Assigned","Completed","Cancelled"];
  const pick = (a, i) => a[i % a.length];
  const day = (n) => { const d = new Date(); d.setDate(d.getDate() - n); return d.toISOString().slice(0, 10); };
  const fut = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };
  const mob = (i) => "+91 98" + String(25000000 + i * 734191).slice(0, 8);

  const bookings = names.map((n, i) => ({
    id: "BK" + (1001 + i), date: day(Math.floor((i * i) / 22) % 30), customer_name: n, customer_mobile: mob(i),
    booking_for: hotels[i % 8] ? "Hotel guest" : "Myself", hotel_name: hotels[i % 8],
    service: pick(services, i), pickup: pick(areas, i) + ", Ahmedabad", drop: pick(drops, i + 3),
    travel_date: fut((i % 12) + 1), travel_time: (8 + (i % 10)) + ":00", passengers: 2 + (i % 30),
    vehicle: pick(vehicles, i), driver: "", status: i < 5 ? "New" : pick(bStatus, i), notes: "",
  }));

  const enquiries = names.slice(0, 10).map((n, i) => ({
    id: "EQ" + (201 + i), date: day(i * 2), name: n, mobile: mob(i + 40),
    email: n.toLowerCase().replace(" ", ".") + "@example.com",
    message: pick(["Need a car for airport drop tomorrow.","Rates for Tempo Traveller to Dwarka?","Wedding cars for 3 days in December.","Corporate monthly cab contract.","Bus for school picnic, 45 students."], i),
    status: pick(["New","Replied","Closed"], i), notes: "",
  }));

  const evTypes = ["Weddings","Baraat & Sangeet","Corporate & Conferences","Concerts & Shows","Navratri & Festivals","Birthday & Family Parties","Exhibitions & Trade Fairs","Religious & Group Yatra"];
  const events = evTypes.map((t, i) => ({
    id: "EV" + (301 + i), date: day(i * 3), event_type: t, event_date: fut(10 + i * 5),
    guests: 50 + i * 40, vehicles_needed: 2 + i, contact_name: names[i + 5], contact_mobile: mob(i + 60),
    status: pick(["New","Contacted","Confirmed","Closed"], i), notes: "",
  }));

  const vendors = names.slice(10, 18).map((n, i) => ({
    id: "VN" + (401 + i), date: day(i * 3), owner_name: n, mobile: mob(i + 80),
    city: pick(["Ahmedabad","Vadodara","Surat","Rajkot","Gandhinagar"], i),
    vehicle_type: pick(["Sedan","SUV","Tempo Traveller","Bus","MPV"], i), vehicle_count: 1 + i,
    documents: "RC, Insurance, Permit", status: pick(["New","Verified","Approved","Rejected"], i), notes: "",
  }));

  const drivers = names.slice(12, 22).map((n, i) => ({
    id: "DR" + (501 + i), date: day(i * 2), name: n, mobile: mob(i + 100),
    licence_type: i % 3 ? "LMV" : "HMV", experience: 2 + i, languages: "Gujarati, Hindi" + (i % 2 ? ", English" : ""),
    documents: "Licence, Aadhaar", status: pick(["New","Interview","Hired","Rejected"], i), notes: "",
  }));

  const fleetList = [
    ["Mercedes-Maybach S-Class","Luxury car",4,"maybach"],["Toyota Vellfire","MPV",6,"vellfire"],["Toyota Alphard","MPV",6,"alphard"],
    ["BMW 7 Series","Luxury car",4,"bmw7"],["BMW X5","SUV",4,"bmwx5"],["BMW 5 Series","Sedan",4,"bmw5"],
    ["Kia Carnival","MPV",7,"carnival"],["Toyota Innova Hycross","MPV",7,"hycross"],["Toyota Innova Crysta","MPV",7,""],
    ["Toyota Fortuner","SUV",7,""],["Force Urbania / Tempo Traveller","Tempo",17,""],["Volvo Mini Coach","Bus/Coach",27,"volvobus"],
    ["Luxury Coach (Mercedes)","Bus/Coach",45,"coach"],["Tourist Coach","Bus/Coach",49,"touristbus"],["Vintage Wedding Car","Wedding car",2,"vintage"],
  ];
  const fleet = fleetList.map(([name, cat, seats, f], i) => ({
    id: "VH" + (601 + i), name, category: cat, seats, tags: cat === "Luxury car" ? "VIP, Chauffeur" : "AC",
    points: "Professional driver | Well maintained | 24/7 support", price: i < 3 ? "On request" : "₹" + (12 + i) + "/km",
    image: f ? "/images/fleet/" + f + "/1.jpg" : "", show: true, order: i + 1,
  }));

  const rates = [
    ["Hatchback","₹11–12"],["Sedan","₹12–14"],["Ertiga","₹15–17"],["Innova Crysta","₹18–22"],
    ["Tempo 12 seater","₹22–26"],["Tempo 17 seater","₹22–30"],["Mini Bus 20–27","₹28–38"],["AC Bus 35–49","₹35–45"],
  ].map(([v, r], i) => ({ id: "RT" + (i + 1), vehicle_type: v, rate: r }));

  const packages = [
    ["Sedan","8 hrs / 80 km","₹2,200"],["Innova Crysta","8 hrs / 80 km","₹3,200"],["Tempo Traveller","8 hrs / 80 km","₹4,500"],["Sedan","4 hrs / 40 km","₹1,200"],
  ].map(([v, p, pr], i) => ({ id: "PK" + (i + 1), vehicle: v, package: p, price: pr }));

  const terms = ["Toll, parking and state tax extra.","Driver allowance ₹300 per day.","Night charge ₹300 after 10 PM.","Minimum 250 km per day for outstation.","Km and time counted garage to garage."]
    .map((t, i) => ({ id: "TC" + (i + 1), text: t }));

  const tours = [
    ["Dwarkadhish Temple","Dwarka","Pilgrimage","2N/3D","Ahmedabad – Dwarka – Bet Dwarka"],
    ["Statue of Unity","Kevadia","Popular","1N/2D","Ahmedabad – Kevadia"],
    ["White Rann","Kutch","Rann Utsav","2N/3D","Ahmedabad – Bhuj – Dhordo"],
    ["City Palace Udaipur","Udaipur","Heritage","2N/3D","Ahmedabad – Udaipur"],
    ["Taj Mahal","Agra","Weekend","3N/4D","Ahmedabad – Agra"],
    ["Ambaji Temple","Ambaji","Pilgrimage","Day trip","Ahmedabad – Ambaji"],
  ].map(([t, p, b, d, r], i) => ({ id: "TR" + (i + 1), title: t, place: p, badge: b, duration: d, route: r, highlights: "", show: true, order: i + 1 }));

  const divisions = [
    ["Car Rental","car"],["Bus Rental","bus"],["Corporate Transportation","corporate-pickup"],["Commercial Vehicle Rental","commercial"],
    ["Airport & Outstation","airport"],["Industrial & Oilfield","industrial"],["Weddings","wedding"],
  ].map(([t, img], i) => ({ id: "DV" + (i + 1), title: t, description: "", points: "", image: img === "corporate-pickup" ? "/images/corporate-pickup.jpg" : "/images/divisions/" + img + ".jpg", show: true, order: i + 1 }));

  const eventCards = evTypes.map((t, i) => ({ id: "EC" + (i + 1), title: t, points: "", image: "", show: true }));

  const places = [["Ahmedabad",23.03,72.57],["Gandhinagar",23.22,72.64],["Vadodara",22.31,73.18],["Surat",21.17,72.83],["Rajkot",22.3,70.8],["Jamnagar",22.47,70.06],["Dwarka",22.24,68.97],["Somnath",20.89,70.4],["Junagadh",21.52,70.46],["Bhuj",23.25,69.67],["Statue of Unity",21.84,73.72],["Ambaji",24.33,72.85],["Diu",20.71,70.98],["Saputara",20.58,73.75]]
    .map(([c, la, lo], i) => ({ id: "PL" + (i + 1), city: c, latitude: la, longitude: lo }));

  const partners = ["Adani Group","Ratnamani","The Leela Gandhinagar","ONGC","Torrent","Gandhinagar Railway","Crowne Plaza","ITC Hotels","Hyatt Ahmedabad","Fortune Landmark"]
    .map((n, i) => ({ id: "PT" + (i + 1), name: n, logo: "", vendors_page: true, home_strip: i < 8, order: i + 1 }));

  const media = [
    ["Heroes","/images/about-team.jpg"],["Heroes","/images/fleet-showcase.jpg"],["Heroes","/images/fleet-showcase-2.jpg"],["Heroes","/images/fleet-dusk.jpg"],
    ["Awards","/images/about-award-1.jpg"],["Awards","/images/about-award-2.jpg"],["Fleet","/images/fleet/maybach/1.jpg"],["Fleet","/images/fleet/vellfire/1.jpg"],
    ["Fleet","/images/fleet/coach/1.jpg"],["Fleet","/images/fleet/vintage/1.jpg"],["Events","/images/events/wedding.jpg"],["Events","/images/events/baraat.jpg"],
    ["Team","/images/careers-driver.jpg"],["Team","/images/driver-real.jpg"],
  ].map(([f, u], i) => ({ id: "MD" + (i + 1), folder: f, url: u, name: u.split("/").pop() }));

  const careers = [
    ["Car Driver (LMV)","Full time","Ahmedabad","LMV"],["Bus Driver (HMV)","Full time","Ahmedabad","HMV"],
    ["Booking Executive","Full time","Ahmedabad office","—"],["Fleet Supervisor","Full time","Ahmedabad","—"],
  ].map(([t, ty, l, lic], i) => ({ id: "JB" + (i + 1), title: t, type: ty, location: l, licence: lic, points: "", open: true }));

  const users = [
    ["Admin","admin@shitaltravels.in","Super Admin"],["Booking Manager","manager@shitaltravels.in","Manager"],["Desk Staff","staff@shitaltravels.in","Staff"],
  ].map(([n, e, r], i) => ({ id: "US" + (i + 1), name: n, email: e, role: r, active: true, last_login: day(i) }));

  const activity = Array.from({ length: 20 }, (_, i) => ({
    id: "AC" + (i + 1), time: day(Math.floor(i / 2)) + " " + (9 + (i % 9)) + ":1" + (i % 6),
    user: pick(["Admin","Booking Manager","Desk Staff"], i),
    action: pick(["Updated status","Added vehicle","Edited page","Replied enquiry","Deleted image","Assigned driver"], i),
    record: pick(["BK1003","Fleet: BMW X5","Page: Home","EQ204","Media: old.jpg","BK1007"], i),
  }));

  const settings = {
    company_name: "Shital Tours & Travels", phone: "+91 98250 00000", phone2: "", whatsapp: "+91 98250 00000",
    email: "info@shitaltravels.in", address: "Ahmedabad, Gujarat, India", map_link: "",
    instagram: "#", facebook: "#", x: "#", linkedin: "#", show_rates: true, loader: true, notify_email: true, notify_whatsapp: false,
  };

  const pageNames = ["Home","About Us","Services","Packages","Tours","Events","Brochure","Vendors","Book a Vehicle","Our Fleet","Drive With Us","Careers","Contact"];
  const pages = {};
  pageNames.forEach((p) => (pages[p] = { hero_label: p, heading: p, paragraph: "", hero_image: "", button_text: "Book a Vehicle", button_link: "/book", body: "", meta_title: p + " — Shital Tours & Travels", meta_description: "" }));
  pages["About Us"].heading = "Your Journey, Our Responsibility";
  pages["About Us"].hero_image = "/images/about-team.jpg";

  const brochure = { pdf: "shital-brochure.pdf", services: "Car Rental\nBus Rental\nCorporate Transport\nAirport & Outstation\nWeddings", fleet: "Maybach, Vellfire, BMW, Innova, Tempo, Coaches", contact: "+91 98250 00000 · info@shitaltravels.in" };

  const profile = { name: "Admin", email: "admin@shitaltravels.in", mobile: "+91 98250 00000" };
  return { profile, bookings, enquiries, events, vendors, drivers, fleet, rates, packages, terms, tours, divisions, eventCards, places, partners, media, careers, users, activity, settings, pages, brochure, pageNames };
}
