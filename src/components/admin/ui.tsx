/* eslint-disable @typescript-eslint/no-explicit-any, @next/next/no-img-element */
"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* ---------- toast ---------- */
let showToast: (m: string) => void = () => {};
export const toast = (m: string) => showToast(m);
export function Toaster() {
  const [msg, setMsg] = useState(""), [on, setOn] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => {
    showToast = (m) => { setMsg(m); setOn(true); clearTimeout(t.current); t.current = setTimeout(() => setOn(false), 2200); };
  }, []);
  return <div className={`ad-toast${on ? " show" : ""}`}>{msg}</div>;
}

export const Badge = ({ v }: { v: any }) => <span className={`ad-badge b-${String(v).replace(/\s/g, "")}`}>{String(v)}</span>;
export const I = ({ n, b }: { n: string; b?: boolean }) => <i className={`${b ? "fa-brands" : "fa-solid"} fa-${n}`} />;

/* ---------- drawer ---------- */
export function Drawer({ title, onClose, onSave, children, extra }: { title: string; onClose: () => void; onSave?: () => void; children: ReactNode; extra?: ReactNode }) {
  const [open, setOpen] = useState(false);
  useEffect(() => { requestAnimationFrame(() => setOpen(true)); }, []);
  return (
    <>
      <div className="ad-dbg open" onClick={onClose} />
      <aside className={`ad-drawer${open ? " open" : ""}`}>
        <header><h3>{title}</h3><button onClick={onClose}>&times;</button></header>
        <div className="ad-dbody">{children}</div>
        <footer>
          {extra}
          <button className="ad-btn ghost" onClick={onClose}>Close</button>
          {onSave && <button className="ad-btn" onClick={onSave}><I n="check" /> Save</button>}
        </footer>
      </aside>
    </>
  );
}

export function Confirm({ msg, onYes, onClose }: { msg: string; onYes: () => void; onClose: () => void }) {
  return (
    <div className="ad-modal" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="ad-box">
        <h3><I n="triangle-exclamation" /> Are you sure?</h3>
        <p className="ad-muted">{msg}</p>
        <div className="row">
          <button className="ad-btn ghost" onClick={onClose}>Cancel</button>
          <button className="ad-btn red" onClick={() => { onYes(); onClose(); }}>Delete</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- image uploader (preview only) ---------- */
export function Uploader({ value, onChange, multi }: { value: any; onChange: (v: any) => void; multi?: boolean }) {
  const list: string[] = Array.isArray(value) ? value : value ? [value] : [];
  const drag = useRef<number | null>(null);
  const set = (l: string[]) => onChange(multi ? l : l[0] || "");
  return (
    <div>
      <label className="ad-up">
        <I n="cloud-arrow-up" /> Click to choose {multi ? "images" : "an image"} (preview only)
        <input type="file" accept="image/*" multiple={multi} hidden onChange={(e) => {
          const urls = [...(e.target.files || [])].map((f) => URL.createObjectURL(f));
          set(multi ? [...list, ...urls] : urls);
        }} />
      </label>
      <div className="ad-prev">
        {list.map((u, i) => (
          <div key={u + i} draggable className={i === 0 ? "cover" : ""} style={{ backgroundImage: `url('${u}')` }}
            onClick={() => set([u, ...list.filter((_, k) => k !== i)])}
            onDragStart={() => (drag.current = i)} onDragOver={(e) => e.preventDefault()}
            onDrop={() => { const from = drag.current; if (from == null || from === i) return; const l = [...list]; const [m] = l.splice(from, 1); l.splice(i, 0, m); set(l); }}>
            <button type="button" onClick={(e) => { e.stopPropagation(); set(list.filter((_, k) => k !== i)); }}>&times;</button>
          </div>
        ))}
      </div>
      {multi && <small className="ad-muted">Drag to reorder · first image = cover · click an image to make it cover</small>}
    </div>
  );
}

/* ---------- form fields: [key, label, type?, options?] ---------- */
export type Field = [string, string, string?, string[]?];
export function FieldInput({ f, val, set }: { f: Field; val: any; set: (v: any) => void }) {
  const [k, label, type = "text", opts] = f;
  const id = "f_" + k;
  if (type === "bool")
    return <div className="ad-f"><label className="ad-sw"><input type="checkbox" id={id} name={k} checked={!!val} onChange={(e) => set(e.target.checked)} /> {label}</label></div>;
  let inp: ReactNode;
  if (type === "select") inp = <select id={id} name={k} value={val ?? ""} onChange={(e) => set(e.target.value)}>{opts!.map((o) => <option key={o}>{o}</option>)}</select>;
  else if (type === "textarea") inp = <textarea id={id} name={k} rows={3} value={val ?? ""} onChange={(e) => set(e.target.value)} />;
  else if (type === "image" || type === "images") inp = <Uploader value={val} onChange={set} multi={type === "images"} />;
  else inp = <input id={id} name={k} type={type} value={val ?? ""} onChange={(e) => set(type === "number" ? Number(e.target.value) : e.target.value)} />;
  return <div className={`ad-f${["textarea", "image", "images"].includes(type) ? " full" : ""}`}><label htmlFor={id}>{label}</label>{inp}</div>;
}
export function FormFields({ fields, data, setData }: { fields: Field[]; data: any; setData: (d: any) => void }) {
  return (
    <div className="ad-fgrid">
      {fields.map((f) => <FieldInput key={f[0]} f={f} val={data[f[0]]} set={(v) => setData({ ...data, [f[0]]: v })} />)}
    </div>
  );
}

export function downloadCSV(name: string, cols: Field[], rows: any[]) {
  const line = (a: any[]) => a.map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`).join(",");
  const csv = [line(cols.map((c) => c[1])), ...rows.map((r) => line(cols.map((c) => r[c[0]])))].join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  a.download = name + ".csv"; a.click();
}

export const contactLinks = (mobile?: string, email?: string) => {
  const m = String(mobile || "").replace(/\D/g, "");
  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
      <a className="ad-btn sm" href={`tel:+${m}`}><I n="phone" /> Call</a>
      <a className="ad-btn sm wa" target="_blank" rel="noreferrer" href={`https://wa.me/${m}`}><I n="whatsapp" b /> WhatsApp</a>
      {email && <a className="ad-btn ghost sm" href={`mailto:${email}`}><I n="envelope" /> Email</a>}
    </div>
  );
};

export const Img = ({ src, className }: { src?: any; className: string }) => {
  const s = Array.isArray(src) ? src[0] : src;
  return s ? <img className={className} src={s} alt="" /> : <span className={className} style={{ display: "inline-block" }} />;
};
