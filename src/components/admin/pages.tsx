"use client";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { deleteItem, getList, getObj, resetDemo, setObj, useDB } from "@/lib/admin/db";
import { Crud, ObjForm, type CrudCfg } from "./Crud";
import { Badge, Confirm, I, toast } from "./ui";

const SVC = ["Airport", "Local", "Outstation", "Bus/Group", "Event", "Tour"];
const EVT = ["Weddings", "Baraat & Sangeet", "Corporate & Conferences", "Concerts & Shows", "Navratri & Festivals", "Birthday & Family Parties", "Exhibitions & Trade Fairs", "Religious & Group Yatra"];
const BK_ST = ["New", "Contacted", "Confirmed", "Assigned", "Completed", "Cancelled"];
const COLORS = ["#0A2F52", "#0D4A73", "#0F6A85", "#138A90", "#06ABDB", "#F4C66B"];
const day = (n: number) => { const d = new Date(); d.setDate(d.getDate() - n); return d.toISOString().slice(0, 10); };

/* ---------------- CRUD screen configs ---------------- */
const CFG: Record<string, CrudCfg | CrudCfg[]> = {
  bookings: {
    store: "bookings", single: "booking", filters: ["status", "service", "hotel_name"], dateFilter: true,
    cols: [["id", "ID"], ["date", "Date"], ["customer_name", "Customer"], ["customer_mobile", "Mobile"], ["booking_for", "For"], ["hotel_name", "Hotel"], ["service", "Service"], ["pickup", "Pickup"], ["drop", "Drop"], ["travel_date", "Travel date"], ["travel_time", "Time"], ["passengers", "Pax"], ["vehicle", "Vehicle"], ["status", "Status", "badge"]],
    fields: [["customer_name", "Customer name"], ["customer_mobile", "Mobile"], ["booking_for", "Booking for", "select", ["Myself", "Hotel guest"]], ["hotel_name", "Hotel name"], ["service", "Service", "select", SVC], ["pickup", "Pickup"], ["drop", "Drop"], ["travel_date", "Travel date", "date"], ["travel_time", "Time", "time"], ["passengers", "Passengers", "number"], ["vehicle", "Vehicle"], ["date", "Request date", "date"], ["status", "Status", "select", BK_ST], ["notes", "Notes", "textarea"]],
    defaults: { date: day(0), status: "New", booking_for: "Myself", service: "Airport" },
    request: {
      statuses: BK_ST, mobile: "customer_mobile",
      extra: (d, set) => {
        const hired = getList("drivers").filter((x) => x.status === "Hired").map((x) => x.name);
        const drivers = hired.length ? hired : ["Ramesh Bhai", "Suresh Bhai", "Mahesh Bhai"];
        return (
          <div className="ad-fgrid">
            <div className="ad-f"><label>Assign vehicle</label><select value={d.vehicle || ""} onChange={(e) => set({ ...d, vehicle: e.target.value })}>{getList("fleet").map((v) => <option key={v.id}>{v.name}</option>)}</select></div>
            <div className="ad-f"><label>Assign driver</label><select value={d.driver || ""} onChange={(e) => set({ ...d, driver: e.target.value })}><option value="">— Select —</option>{drivers.map((n) => <option key={n}>{n}</option>)}</select></div>
          </div>
        );
      },
    },
  },
  enquiries: {
    store: "enquiries", single: "enquiry", filters: ["status"], dateFilter: true,
    cols: [["id", "ID"], ["date", "Date"], ["name", "Name"], ["mobile", "Mobile"], ["email", "Email"], ["message", "Message"], ["status", "Status", "badge"]],
    fields: [["name", "Name"], ["mobile", "Mobile"], ["email", "Email", "email"], ["date", "Date", "date"], ["message", "Message", "textarea"], ["status", "Status", "select", ["New", "Replied", "Closed"]], ["notes", "Notes", "textarea"]],
    defaults: { date: day(0), status: "New" },
    request: { statuses: ["New", "Replied", "Closed"], mobile: "mobile", email: "email" },
  },
  "event-requests": {
    store: "events", single: "event request", filters: ["event_type", "status"], dateFilter: true,
    cols: [["id", "ID"], ["date", "Received"], ["event_type", "Event type"], ["event_date", "Event date"], ["guests", "Guests"], ["vehicles_needed", "Vehicles"], ["contact_name", "Contact"], ["contact_mobile", "Mobile"], ["status", "Status", "badge"]],
    fields: [["event_type", "Event type", "select", EVT], ["event_date", "Event date", "date"], ["guests", "Guests", "number"], ["vehicles_needed", "Vehicles needed", "number"], ["contact_name", "Contact name"], ["contact_mobile", "Mobile"], ["status", "Status", "select", ["New", "Contacted", "Confirmed", "Closed"]], ["notes", "Notes", "textarea"]],
    defaults: { date: day(0), status: "New", event_type: EVT[0] },
    request: { statuses: ["New", "Contacted", "Confirmed", "Closed"], mobile: "contact_mobile" },
  },
  vendors: {
    store: "vendors", single: "vendor", filters: ["city", "vehicle_type", "status"],
    cols: [["id", "ID"], ["date", "Date"], ["owner_name", "Owner"], ["mobile", "Mobile"], ["city", "City"], ["vehicle_type", "Vehicle type"], ["vehicle_count", "No."], ["documents", "Documents"], ["status", "Status", "badge"]],
    fields: [["owner_name", "Owner name"], ["mobile", "Mobile"], ["city", "City"], ["vehicle_type", "Vehicle type", "select", ["Sedan", "SUV", "MPV", "Tempo Traveller", "Bus"]], ["vehicle_count", "Number of vehicles", "number"], ["documents", "Documents"], ["status", "Status", "select", ["New", "Verified", "Approved", "Rejected"]], ["notes", "Notes", "textarea"]],
    defaults: { date: day(0), status: "New", vehicle_type: "Sedan" },
    request: { statuses: ["New", "Verified", "Approved", "Rejected"], mobile: "mobile" },
  },
  drivers: {
    store: "drivers", single: "driver", filters: ["licence_type", "status"],
    cols: [["id", "ID"], ["date", "Date"], ["name", "Name"], ["mobile", "Mobile"], ["licence_type", "Licence"], ["experience", "Exp (yrs)"], ["languages", "Languages"], ["documents", "Documents"], ["status", "Status", "badge"]],
    fields: [["name", "Name"], ["mobile", "Mobile"], ["licence_type", "Licence type", "select", ["LMV", "HMV"]], ["experience", "Experience (years)", "number"], ["languages", "Languages"], ["documents", "Documents"], ["status", "Status", "select", ["New", "Interview", "Hired", "Rejected"]], ["notes", "Notes", "textarea"]],
    defaults: { date: day(0), status: "New", licence_type: "LMV" },
    request: { statuses: ["New", "Interview", "Hired", "Rejected"], mobile: "mobile" },
  },
  fleet: {
    store: "fleet", single: "vehicle", filters: ["category"], grid: { img: "image", title: "name", sub: "category" }, onLabel: "Shown",
    cols: [["image", "Photo", "img"], ["name", "Name"], ["category", "Category"], ["seats", "Seats"], ["tags", "Tags"], ["price", "Price"], ["order", "Order"], ["show", "Website", "bool"]],
    fields: [["name", "Vehicle name"], ["category", "Category", "select", ["Luxury car", "MPV", "SUV", "Sedan", "Tempo", "Bus/Coach", "Wedding car"]], ["seats", "Seats", "number"], ["tags", "Tags (comma separated)"], ["price", "Starting price or 'On request'"], ["link", "Booking link"], ["order", "Display order", "number"], ["show", "Show on website", "bool"], ["points", "3 bullet points (separate with |)", "textarea"], ["image", "Photos", "images"]],
    defaults: { show: true, link: "/book", category: "Sedan" },
  },
  rates: [
    { heading: "Rate per km", store: "rates", single: "rate", cols: [["vehicle_type", "Vehicle type"], ["rate", "Rate per km"]], fields: [["vehicle_type", "Vehicle type"], ["rate", "Rate range (₹)"]] },
    { heading: "Local packages", store: "packages", single: "package", cols: [["vehicle", "Vehicle"], ["package", "Package"], ["price", "Price"]], fields: [["vehicle", "Vehicle"], ["package", "Hours / km"], ["price", "Price (₹)"]] },
    { heading: "Terms & conditions", store: "terms", single: "term", cols: [["text", "Term"]], fields: [["text", "Term", "textarea"]] },
  ],
  tours: {
    store: "tours", single: "tour", grid: { img: "image", title: "title", sub: "duration" }, onLabel: "Shown",
    cols: [["image", "Cover", "img"], ["title", "Title"], ["place", "Place"], ["badge", "Badge"], ["duration", "Duration"], ["route", "Route"], ["order", "Order"], ["show", "Website", "bool"]],
    fields: [["title", "Title"], ["place", "Place"], ["badge", "Badge text"], ["duration", "Duration"], ["order", "Order", "number"], ["show", "Show on website", "bool"], ["route", "Route", "textarea"], ["highlights", "Highlights", "textarea"], ["image", "Cover image", "image"]],
    defaults: { show: true },
  },
  services: {
    heading: "Our Divisions", store: "divisions", single: "division", grid: { img: "image", title: "title", sub: "description" }, onLabel: "Shown",
    cols: [["image", "Photo", "img"], ["title", "Title"], ["description", "Description"], ["order", "Order"], ["show", "Website", "bool"]],
    fields: [["title", "Title"], ["order", "Order", "number"], ["show", "Show on website", "bool"], ["description", "Description", "textarea"], ["points", "Bullet points (separate with |)", "textarea"], ["image", "Photo", "image"]],
    defaults: { show: true },
  },
  "events-content": [
    { heading: "Event cards", store: "eventCards", single: "event card", onLabel: "Shown", cols: [["image", "Photo", "img"], ["title", "Title"], ["points", "Points"], ["show", "Website", "bool"]], fields: [["title", "Title"], ["show", "Show on website", "bool"], ["points", "3 points (separate with |)", "textarea"], ["image", "Photo", "image"]], defaults: { show: true } },
    { heading: "Gujarat map places", store: "places", single: "place", per: 20, cols: [["city", "City"], ["latitude", "Latitude"], ["longitude", "Longitude"]], fields: [["city", "City name"], ["latitude", "Latitude", "number"], ["longitude", "Longitude", "number"]] },
  ],
  partners: {
    store: "partners", single: "partner", onLabel: "Yes", offLabel: "No",
    cols: [["logo", "Logo", "img"], ["name", "Name"], ["vendors_page", "Vendors page", "bool"], ["home_strip", "Home strip", "bool"], ["order", "Order"]],
    fields: [["name", "Name"], ["order", "Order", "number"], ["vendors_page", "Show on Vendors page", "bool"], ["home_strip", "Show on Home logo strip", "bool"], ["logo", "Logo", "image"]],
  },
  careers: {
    store: "careers", single: "job", onLabel: "Open", offLabel: "Closed", filters: ["type"],
    cols: [["title", "Job title"], ["type", "Type"], ["location", "Location"], ["licence", "Licence"], ["open", "Status", "bool"]],
    fields: [["title", "Job title"], ["type", "Type", "select", ["Full time", "Part time", "Contract"]], ["location", "Location"], ["licence", "Licence needed"], ["open", "Open for applications", "bool"], ["points", "Bullet points (separate with |)", "textarea"]],
    defaults: { open: true, type: "Full time" },
  },
  users: {
    store: "users", single: "user", filters: ["role"], onLabel: "Active", offLabel: "Inactive",
    cols: [["name", "Name"], ["email", "Email"], ["role", "Role"], ["active", "Status", "bool"], ["last_login", "Last login"]],
    fields: [["name", "Name"], ["email", "Email", "email"], ["role", "Role", "select", ["Super Admin", "Manager", "Staff"]], ["active", "Active", "bool"]],
    defaults: { active: true, last_login: "—", role: "Staff" },
  },
  activity: { store: "activity", single: "entry", filters: ["user"], noAdd: true, noEdit: true, per: 15, cols: [["time", "Time"], ["user", "User"], ["action", "Action"], ["record", "Page / record"]], fields: [] },
};

/* ---------------- custom screens ---------------- */
function LineChart({ data, labels }: { data: number[]; labels: string[] }) {
  const W = 600, H = 200, max = Math.max(1, ...data), sx = (i: number) => 30 + (i * (W - 40)) / (data.length - 1), sy = (v: number) => H - 25 - (v / max) * (H - 45);
  const pts = data.map((v, i) => `${sx(i)},${sy(v)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="ad-chart">
      {[0, max].map((v) => <g key={v}><line x1={30} x2={W - 10} y1={sy(v)} y2={sy(v)} stroke="#eee" /><text x={4} y={sy(v) + 4}>{v}</text></g>)}
      <polygon points={`${sx(0)},${sy(0)} ${pts} ${sx(data.length - 1)},${sy(0)}`} fill="rgba(5,130,179,.12)" />
      <polyline points={pts} fill="none" stroke="#0582B3" strokeWidth={2.5} />
      {data.map((v, i) => <circle key={i} cx={sx(i)} cy={sy(v)} r={3} fill="#0582B3"><title>{labels[i]}: {v}</title></circle>)}
      {labels.map((l, i) => i % 5 === 0 && <text key={l} x={sx(i)} y={H - 6} textAnchor="middle">{l}</text>)}
    </svg>
  );
}
function Donut({ data, labels }: { data: number[]; labels: string[] }) {
  const total = data.reduce((a, b) => a + b, 0) || 1; let acc = 0;
  return (
    <div>
      <svg viewBox="0 0 42 42" className="ad-donut">
        {data.map((v, i) => { const off = 25 - acc; acc += (v / total) * 100; return <circle key={i} cx={21} cy={21} r={15.9} fill="none" stroke={COLORS[i % 6]} strokeWidth={7} strokeDasharray={`${(v / total) * 100} ${100 - (v / total) * 100}`} strokeDashoffset={off}><title>{labels[i]}: {v}</title></circle>; })}
        <text x={21} y={23} textAnchor="middle" fontSize={6} fontWeight={700} fill="#0A2F52">{total}</text>
      </svg>
      <div className="ad-legend">{labels.map((l, i) => <span key={l}><i style={{ background: COLORS[i % 6] }} />{l} ({data[i]})</span>)}</div>
    </div>
  );
}

function Dashboard() {
  useDB();
  const b = getList("bookings"), today = day(0), wk = day(7);
  const stats: [string, number, string, string][] = [
    ["calendar-plus", b.filter((x) => x.date === today).length, "New bookings today", "bookings"],
    ["hourglass-half", b.filter((x) => ["New", "Contacted"].includes(x.status)).length, "Pending bookings", "bookings"],
    ["circle-check", b.filter((x) => x.status === "Confirmed" && x.date >= wk).length, "Confirmed this week", "bookings"],
    ["champagne-glasses", getList("events").filter((x) => x.status === "New").length, "Event requests", "event-requests"],
    ["handshake", getList("vendors").filter((x) => x.status === "New").length, "Vendor applications", "vendors"],
    ["id-card", getList("drivers").filter((x) => x.status === "New").length, "Driver applications", "drivers"],
    ["envelope", getList("enquiries").filter((x) => x.status === "New").length, "New enquiries", "enquiries"],
  ];
  const days = [...Array(30)].map((_, i) => day(29 - i));
  return (
    <>
      <div className="ad-grid ad-stats">
        {stats.map(([ic, n, l, h]) => (
          <Link key={l} href={`/admin/${h}`} className="ad-card ad-stat"><I n={ic} /><div><b>{n}</b><span>{l}</span></div></Link>
        ))}
      </div>
      <div className="ad-grid ad-two" style={{ marginTop: 16 }}>
        <div className="ad-card"><h3>Bookings – last 30 days</h3><LineChart data={days.map((d) => b.filter((x) => x.date === d).length)} labels={days.map((d) => d.slice(5))} /></div>
        <div className="ad-card"><h3>By service</h3><Donut data={SVC.map((s) => b.filter((x) => x.service === s).length)} labels={SVC} /></div>
      </div>
      <div className="ad-grid ad-half" style={{ marginTop: 16 }}>
        <div className="ad-card"><h3>Latest booking requests</h3><div className="ad-tbl"><table><tbody>
          {b.slice(0, 5).map((x) => <tr key={x.id}><td><b>{x.id}</b></td><td>{x.customer_name}</td><td>{x.service}</td><td><Badge v={x.status} /></td><td><Link className="ad-btn ghost sm" href="/admin/bookings">Open</Link></td></tr>)}
        </tbody></table></div></div>
        <div className="ad-card"><h3>Latest enquiries</h3><div className="ad-tbl"><table><tbody>
          {getList("enquiries").slice(0, 5).map((x) => <tr key={x.id}><td>{x.name}</td><td className="ad-muted">{String(x.message).slice(0, 34)}…</td><td><Badge v={x.status} /></td><td><a className="ad-btn ghost sm" target="_blank" rel="noreferrer" href={`https://wa.me/${String(x.mobile).replace(/\D/g, "")}`}><I n="whatsapp" b /></a></td></tr>)}
        </tbody></table></div></div>
      </div>
    </>
  );
}

function Media() {
  useDB();
  const [folder, setFolder] = useState("All"), [q, setQ] = useState(""), [up, setUp] = useState("Fleet"), [del, setDel] = useState<string | null>(null);
  const folders = ["All", "Fleet", "Events", "Team", "Awards", "Heroes", "Partners"];
  const list = getList("media").filter((m) => (folder === "All" || m.folder === folder) && m.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="ad-card">
      <div className="ad-tabs">{folders.map((f) => <button key={f} className={f === folder ? "on" : ""} onClick={() => setFolder(f)}>{f}</button>)}</div>
      <div className="ad-bar">
        <input className="ad-grow" placeholder="Search images…" value={q} onChange={(e) => setQ(e.target.value)} />
        <select value={up} onChange={(e) => setUp(e.target.value)}>{folders.slice(1).map((f) => <option key={f}>{f}</option>)}</select>
        <label className="ad-btn sm"><I n="upload" /> Upload<input type="file" accept="image/*" multiple hidden onChange={(e) => {
          [...(e.target.files || [])].forEach((file) => getList("media").unshift({ id: "MD" + Date.now() + Math.random().toString(36).slice(2, 5), folder: up, url: URL.createObjectURL(file), name: `${file.name} (${Math.round(file.size / 1024)} KB)` }));
          setObj("media", getList("media")); toast("Preview added (not uploaded)");
        }} /></label>
      </div>
      {list.length ? (
        <div className="ad-vgrid">{list.map((m) => (
          <div className="ad-vcard" key={m.id}>
            <div className="ad-ph" style={{ backgroundImage: `url('${m.url}')` }} />
            <div className="ad-in"><b className="ad-ell">{m.name}</b><small>{m.folder}</small>
              <div className="ad-acts" style={{ marginTop: 8 }}>
                <button title="Copy URL" onClick={() => { navigator.clipboard?.writeText(m.url); toast("URL copied"); }}><I n="copy" /></button>
                <button title="Delete" onClick={() => setDel(m.id)}><I n="trash-can" /></button>
              </div>
            </div>
          </div>
        ))}</div>
      ) : <div className="ad-empty">No images</div>}
      {del && <Confirm msg="Delete this image?" onClose={() => setDel(null)} onYes={() => deleteItem("media", del)} />}
    </div>
  );
}

function PageTabs({ render }: { render: (p: string) => ReactNode }) {
  const [cur, setCur] = useState("Home");
  return (
    <>
      <div className="ad-tabs">{(getObj("pageNames") as string[]).map((p) => <button key={p} className={p === cur ? "on" : ""} onClick={() => setCur(p)}>{p}</button>)}</div>
      <div key={cur}>{render(cur)}</div>
    </>
  );
}

function Pages() {
  const p = getObj("pages")["About Us"];
  if (!p.award_years) {
    Object.assign(p, {
      award_years: "2003, 2004, 2005, 2006, 2007, 2008, 2010, 2011, 2012, 2013, 2015, 2022",
      stats: "Since 2004 | 12 National Tourism Awards | 6 divisions | 24/7",
      facilities: "Fully air-conditioned\nLCD screen\nPA system\nAir suspension\nMobile charging point on every seat\nComfortable reclining seats\nChiller box",
      award_photos: ["/images/about-award-1.jpg", "/images/about-award-2.jpg"],
    });
  }
  return (
    <PageTabs render={(cur) => (
      <>
        <ObjForm title={cur + " — content"} objKey="pages" sub={cur} fields={[["hero_label", "Hero label"], ["heading", "Heading"], ["button_text", "Button text"], ["button_link", "Button link"], ["paragraph", "Paragraph", "textarea"], ["body", "Main text blocks", "textarea"], ["hero_image", "Hero image", "image"]]} />
        {cur === "About Us" && <ObjForm title="About Us — extras" objKey="pages" sub={cur} fields={[["stats", "Stats (separate with |)"], ["award_years", "Award years (comma separated)"], ["history", "History text", "textarea"], ["facilities", "Facilities (one per line)", "textarea"], ["commitment", "Commitment text", "textarea"], ["award_photos", "Award photos", "images"]]} />}
      </>
    )} />
  );
}

function Settings() {
  return (
    <>
      <ObjForm title="Business details" objKey="settings" fields={[["company_name", "Company name"], ["phone", "Phone"], ["phone2", "Phone 2"], ["whatsapp", "WhatsApp number"], ["email", "Email", "email"], ["map_link", "Google Maps link"], ["address", "Address", "textarea"]]} />
      <ObjForm title="Social links" objKey="settings" fields={[["instagram", "Instagram"], ["facebook", "Facebook"], ["x", "X (Twitter)"], ["linkedin", "LinkedIn"]]} />
      <ObjForm title="Website & notifications" objKey="settings" fields={[["loader", "Show website loader (car animation)", "bool"], ["notify_email", "Email alert on new form", "bool"], ["notify_whatsapp", "WhatsApp alert on new form", "bool"]]} />
      <h3 style={{ margin: "8px 0 10px" }}>SEO per page</h3>
      <PageTabs render={(cur) => <ObjForm title={"SEO — " + cur} objKey="pages" sub={cur} fields={[["meta_title", "Meta title"], ["meta_description", "Meta description", "textarea"], ["share_image", "Share image", "image"]]} />} />
      <div className="ad-card"><h3>Demo data</h3><p className="ad-muted">Reset all changes back to the sample data.</p>
        <button className="ad-btn red" onClick={() => { resetDemo(); toast("Demo data restored"); }}><I n="rotate" /> Reset demo data</button></div>
    </>
  );
}

function Brochure() {
  const [name, setName] = useState("");
  return (
    <ObjForm key={name} title="Brochure" objKey="brochure" fields={[["pdf", "Current PDF file name"], ["services", "Services list (one per line)", "textarea"], ["fleet", "Fleet list", "textarea"], ["contact", "Contact block", "textarea"]]}>
      <div className="ad-f"><label>Upload brochure PDF (preview name only)</label>
        <input type="file" accept="application/pdf" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setObj("brochure", { ...getObj("brochure"), pdf: f.name }); setName(f.name); toast("PDF selected: " + f.name); } }} />
      </div>
    </ObjForm>
  );
}

function Profile() {
  const [pw, setPw] = useState({ a: "", b: "", c: "" });
  return (
    <>
      <ObjForm title="My profile" objKey="profile" fields={[["name", "Name"], ["email", "Email", "email"], ["mobile", "Mobile"], ["avatar", "Photo", "image"]]} />
      <div className="ad-card"><h3>Change password</h3>
        <div className="ad-fgrid">
          <div className="ad-f"><label>Current password</label><input type="password" value={pw.a} onChange={(e) => setPw({ ...pw, a: e.target.value })} /></div><div />
          <div className="ad-f"><label>New password</label><input type="password" value={pw.b} onChange={(e) => setPw({ ...pw, b: e.target.value })} /></div>
          <div className="ad-f"><label>Confirm new password</label><input type="password" value={pw.c} onChange={(e) => setPw({ ...pw, c: e.target.value })} /></div>
        </div>
        <button className="ad-btn" onClick={() => { if (pw.b.length < 6) return toast("Password must be 6+ characters"); if (pw.b !== pw.c) return toast("Passwords do not match"); toast("Password updated (demo)"); setPw({ a: "", b: "", c: "" }); }}>Update password</button>
      </div>
    </>
  );
}

function Rates() {
  return (
    <>
      <ObjForm title="Rate card visibility" objKey="settings" fields={[["show_rates", "Show rate card on website", "bool"]]} />
      {(CFG.rates as CrudCfg[]).map((c) => <Crud key={c.store} cfg={c} />)}
    </>
  );
}

const CUSTOM: Record<string, () => ReactNode> = { dashboard: Dashboard, media: Media, pages: Pages, settings: Settings, brochure: Brochure, profile: Profile, rates: Rates };

export function AdminScreen({ page }: { page: string }) {
  const C = CUSTOM[page];
  if (C) return <C />;
  const cfg = CFG[page];
  if (!cfg) return <div className="ad-card ad-empty">Page not found</div>;
  return <>{(Array.isArray(cfg) ? cfg : [cfg]).map((c) => <Crud key={page + c.store} cfg={c} />)}</>;
}

