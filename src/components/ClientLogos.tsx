import fs from "node:fs";
import path from "node:path";

/**
 * "Our Clients" logo strip. Shows every image in public/images/client/,
 * so adding a logo is just dropping a file into that folder.
 * Images smaller than 60px are skipped (favicons / tiny icons).
 */
const DIR = path.join(process.cwd(), "public", "images", "client");
const EXT = /\.(svg|png|jpe?g|webp)$/i;

/**
 * Clients without a logo file yet: shown as a text wordmark.
 * `match` is checked against logo file names; once a matching file is added
 * to the folder, the text version disappears automatically.
 */
const TEXT_CLIENTS: { name: string; sub?: string; match: RegExp }[] = [
  { name: "HYATT", sub: "Ahmedabad", match: /hyatt/i },
  { name: "Fortune Landmark", sub: "Member ITC Hotels' Group", match: /fortune/i },
];

function pngWidth(file: string): number | null {
  try {
    const buf = fs.readFileSync(file);
    if (buf.toString("ascii", 1, 4) !== "PNG") return null;
    return buf.readUInt32BE(16);
  } catch {
    return null;
  }
}

export function ClientLogos() {
  let files: string[] = [];
  try {
    files = fs
      .readdirSync(DIR)
      .filter((f) => EXT.test(f))
      .filter((f) => {
        const w = /\.png$/i.test(f) ? pngWidth(path.join(DIR, f)) : null;
        return w === null || w >= 60;
      })
      .sort();
  } catch {
    return null;
  }
  const textClients = TEXT_CLIENTS.filter((c) => !files.some((f) => c.match.test(f)));
  if (!files.length && !textClients.length) return null;

  return (
    <section className="sec white clients">
      <div className="wrap center">
        <div className="eyebrow">Trusted By</div>
        <h2 className="sec-title">Our Clients</h2>
        <div className="client-marquee">
          <div className="client-track">
            {/* rendered 4x (two identical halves) so the loop is seamless even with few logos */}
            {[0, 1, 2, 3].map((copy) => (
              <div key={copy} className="client-set" aria-hidden={copy > 0}>
                {files.map((f) => (
                  <div key={f} className="client-logo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/images/client/${f}`} alt={copy === 0 ? f.replace(EXT, "").replace(/[-_]/g, " ") : ""} loading="lazy" />
                  </div>
                ))}
                {textClients.map((c) => (
                  <div key={c.name} className="client-logo client-text">
                    <b>{c.name}</b>
                    {c.sub && <small>{c.sub}</small>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
