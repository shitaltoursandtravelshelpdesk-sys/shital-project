/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
// Static admin data store (browser localStorage, seeded from mock.ts).
// BACKEND LATER: replace these functions with fetch() calls to your API.
import { useEffect, useState } from "react";
import { makeMock } from "./mock";

const KEY = "shital_admin_v1";
let db: any = null;
const subs = new Set<() => void>();

function load() {
  if (db) return db;
  try { db = JSON.parse(localStorage.getItem(KEY) || "null"); } catch { db = null; }
  if (!db) db = makeMock();
  return db;
}
function persist() {
  try { localStorage.setItem(KEY, JSON.stringify(db)); } catch {}
  subs.forEach((f) => f());
}
const now = () => new Date().toISOString().slice(0, 16).replace("T", " ");
function log(action: string, record: string) {
  load().activity?.unshift({ id: "AC" + Date.now(), time: now(), user: "Admin", action, record });
}

/** GET /api/{store} */
export const getList = (store: string): any[] => load()[store] || [];
/** POST or PUT /api/{store}/{id} */
export function saveItem(store: string, item: any) {
  const list = getList(store), i = list.findIndex((x) => x.id === item.id);
  if (i >= 0) list[i] = item;
  else { item.id = item.id || store.slice(0, 2).toUpperCase() + Date.now().toString().slice(-6); list.unshift(item); }
  load()[store] = list; log((i >= 0 ? "Updated " : "Added ") + store, item.id); persist();
}
/** DELETE /api/{store}/{id} */
export function deleteItem(store: string, id: string) {
  load()[store] = getList(store).filter((x) => x.id !== id); log("Deleted " + store, id); persist();
}
/** GET /api/{key} */
export const getObj = (key: string): any => load()[key];
/** PUT /api/{key} */
export function setObj(key: string, value: any) { load()[key] = value; log("Updated " + key, ""); persist(); }
export function resetDemo() { try { localStorage.removeItem(KEY); } catch {} db = null; persist(); }
export const nowStamp = now;

/** Re-render the component whenever data changes. */
export function useDB() {
  const [, set] = useState(0);
  useEffect(() => { const f = () => set((x) => x + 1); subs.add(f); return () => { subs.delete(f); }; }, []);
}
