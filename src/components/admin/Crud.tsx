/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, type ReactNode } from "react";
import { deleteItem, getList, getObj, nowStamp, saveItem, setObj, useDB } from "@/lib/admin/db";
import { Badge, Confirm, Drawer, FormFields, I, Img, contactLinks, downloadCSV, toast, type Field } from "./ui";

export type CrudCfg = {
  store: string;
  single: string;
  heading?: string;
  cols: Field[]; // [key, label, "badge" | "bool" | "img"]
  fields: Field[];
  filters?: string[];
  dateFilter?: boolean;
  per?: number;
  grid?: { img: string; title: string; sub: string };
  onLabel?: string;
  offLabel?: string;
  defaults?: Record<string, any>;
  noAdd?: boolean;
  noEdit?: boolean;
  request?: { statuses: string[]; mobile: string; email?: string; extra?: (d: any, set: (d: any) => void) => ReactNode };
};

export function Crud({ cfg }: { cfg: CrudCfg }) {
  useDB();
  const [q, setQ] = useState(""), [f, setF] = useState<Record<string, string>>({});
  const [from, setFrom] = useState(""), [to, setTo] = useState("");
  const [sort, setSort] = useState<string | null>(null), [dir, setDir] = useState(1);
  const [page, setPage] = useState(1), [view, setView] = useState<"table" | "grid">("table");
  const [edit, setEdit] = useState<any>(null), [isNew, setIsNew] = useState(false);
  const [viewing, setViewing] = useState<any>(null), [del, setDel] = useState<any>(null);
  const per = cfg.per || 10;

  const src = getList(cfg.store);
  let rows = src.filter((x) => !q || JSON.stringify(x).toLowerCase().includes(q.toLowerCase()));
  Object.entries(f).forEach(([k, v]) => { if (v) rows = rows.filter((x) => String(x[k]) === v); });
  if (from) rows = rows.filter((x) => x.date >= from);
  if (to) rows = rows.filter((x) => x.date <= to);
  if (sort) rows = [...rows].sort((a, b) => (a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0) * dir);
  const pages = Math.max(1, Math.ceil(rows.length / per));
  const pg = Math.min(page, pages);
  const list = rows.slice((pg - 1) * per, pg * per);

  const cell = (r: any, [k, , t]: Field) => {
    const v = r[k];
    if (t === "badge") return <Badge v={v} />;
    if (t === "bool") return <Badge v={v ? cfg.onLabel || "Active" : cfg.offLabel || "Hidden"} />;
    if (t === "img") return <Img className="ad-thumb" src={v} />;
    return String(v ?? "");
  };
  const acts = (r: any) => (
    <div className="ad-acts">
      {cfg.request && <button title="View" onClick={() => setViewing({ ...r })}><I n="eye" /></button>}
      {!cfg.noEdit && <button title="Edit" onClick={() => { setIsNew(false); setEdit({ ...r }); }}><I n="pen-to-square" /></button>}
      {!cfg.noEdit && <button title="Delete" onClick={() => setDel(r)}><I n="trash-can" /></button>}
    </div>
  );

  return (
    <div className="ad-card" style={{ marginBottom: 18 }}>
      {cfg.heading && <h3>{cfg.heading}</h3>}
      <div className="ad-bar">
        <input className="ad-grow" placeholder="Search…" value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} />
        {(cfg.filters || []).map((k) => {
          const opts = [...new Set(src.map((x) => x[k]).filter((v) => v !== "" && v != null))];
          const lbl = (cfg.cols.find((c) => c[0] === k) || [k, k])[1];
          return (
            <select key={k} value={f[k] || ""} onChange={(e) => { setF({ ...f, [k]: e.target.value }); setPage(1); }}>
              <option value="">All {lbl}</option>
              {opts.map((o) => <option key={String(o)}>{String(o)}</option>)}
            </select>
          );
        })}
        {cfg.dateFilter && <><input type="date" title="From" value={from} onChange={(e) => setFrom(e.target.value)} /><input type="date" title="To" value={to} onChange={(e) => setTo(e.target.value)} /></>}
        {cfg.grid && <button className="ad-btn ghost sm" onClick={() => setView(view === "table" ? "grid" : "table")}><I n={view === "table" ? "grip" : "list"} /> {view === "table" ? "Grid" : "Table"}</button>}
        <button className="ad-btn ghost sm" onClick={() => downloadCSV(cfg.store, cfg.cols, rows)}><I n="file-csv" /> Export CSV</button>
        {!cfg.noAdd && <button className="ad-btn sm" onClick={() => { setIsNew(true); setEdit({ ...(cfg.defaults || {}) }); }}><I n="plus" /> Add</button>}
      </div>

      {!list.length ? (
        <div className="ad-empty"><I n="folder-open" /><p>No records found.</p></div>
      ) : view === "grid" && cfg.grid ? (
        <div className="ad-vgrid">
          {list.map((r) => (
            <div className="ad-vcard" key={r.id}>
              <Img className="ad-ph" src={r[cfg.grid!.img]} />
              <div className="ad-in"><b>{r[cfg.grid!.title]}</b><small>{r[cfg.grid!.sub]}</small><div style={{ marginTop: 8 }}>{acts(r)}</div></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="ad-tbl">
          <table>
            <thead><tr>{cfg.cols.map((c) => (
              <th key={c[0]} onClick={() => { setDir(sort === c[0] ? -dir : 1); setSort(c[0]); }}>{c[1]}{sort === c[0] ? (dir > 0 ? " ▲" : " ▼") : ""}</th>
            ))}<th /></tr></thead>
            <tbody>{list.map((r) => <tr key={r.id}>{cfg.cols.map((c) => <td key={c[0]}>{cell(r, c)}</td>)}<td>{acts(r)}</td></tr>)}</tbody>
          </table>
        </div>
      )}

      <div className="ad-pager">
        <span>{rows.length} records</span>
        <div>
          <button className="ad-btn ghost sm" disabled={pg < 2} onClick={() => setPage(pg - 1)}>‹ Prev</button>
          <span style={{ padding: 6 }}>Page {pg} / {pages}</span>
          <button className="ad-btn ghost sm" disabled={pg >= pages} onClick={() => setPage(pg + 1)}>Next ›</button>
        </div>
      </div>

      {edit && (
        <Drawer title={(isNew ? "Add " : "Edit ") + cfg.single} onClose={() => setEdit(null)}
          onSave={() => { saveItem(cfg.store, edit); toast(cfg.single + " saved"); setEdit(null); }}>
          <FormFields fields={cfg.fields} data={edit} setData={setEdit} />
        </Drawer>
      )}

      {viewing && cfg.request && (
        <Drawer title={viewing.id} onClose={() => setViewing(null)} onSave={() => {
          const old = src.find((x) => x.id === viewing.id) || {};
          const o = { ...viewing };
          if (o.status !== old.status) o.history = [...(old.history || [{ at: old.date, s: old.status }]), { at: nowStamp(), s: o.status }];
          saveItem(cfg.store, o); toast("Updated"); setViewing(null);
        }}>
          {contactLinks(viewing[cfg.request.mobile], cfg.request.email ? viewing[cfg.request.email] : undefined)}
          <div className="ad-fgrid">
            {Object.entries(viewing).filter(([k]) => !["notes", "history", "id", "status", "vehicle", "driver"].includes(k)).map(([k, v]) => (
              <div className="ad-f" key={k}><label>{k.replace(/_/g, " ")}</label><div>{String(v ?? "") || "—"}</div></div>
            ))}
          </div>
          <div className="ad-f"><label>Status</label>
            <select value={viewing.status} onChange={(e) => setViewing({ ...viewing, status: e.target.value })}>
              {cfg.request.statuses.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          {cfg.request.extra?.(viewing, setViewing)}
          <div className="ad-f"><label>Internal notes</label><textarea rows={3} value={viewing.notes || ""} onChange={(e) => setViewing({ ...viewing, notes: e.target.value })} /></div>
          <div className="ad-f"><label>Status history</label>
            <div className="ad-tl">{(viewing.history || [{ at: viewing.date, s: "New" }]).map((h: any, i: number) => <div key={i}><b>{h.s}</b> · {h.at}</div>)}</div>
          </div>
        </Drawer>
      )}

      {del && <Confirm msg={`Delete ${cfg.single} ${del.id}?`} onClose={() => setDel(null)} onYes={() => { deleteItem(cfg.store, del.id); toast("Deleted"); }} />}
    </div>
  );
}

/** Form bound to one stored object (settings, page content...). `sub` = key inside that object. */
export function ObjForm({ title, objKey, sub, fields, children }: { title: string; objKey: string; sub?: string; fields: Field[]; children?: ReactNode }) {
  const base = getObj(objKey) || {};
  const [data, setData] = useState<any>(() => ({ ...(sub ? base[sub] || {} : base) }));
  return (
    <div className="ad-card" style={{ marginBottom: 18 }}>
      <h3>{title}</h3>
      {children}
      <FormFields fields={fields} data={data} setData={setData} />
      <button className="ad-btn" onClick={() => {
        const cur = getObj(objKey) || {};
        setObj(objKey, sub ? { ...cur, [sub]: data } : { ...cur, ...data });
        toast("Saved");
      }}><I n="check" /> Save changes</button>
    </div>
  );
}
