import fs from "fs";
import path from "path";

// Shows the logo if the file exists in public/images/partners, otherwise the initials.
export function PartnerLogo({ name, file }: { name: string; file: string }) {
  const exists = fs.existsSync(path.join(process.cwd(), "public", "images", "partners", file));
  if (exists) return <img src={`/images/partners/${file}`} alt={name} className="vn-plogo" />;
  const ini = name.split(" ").map((w) => w[0]).join("").slice(0, 3);
  return <span className="vn-pini">{ini}</span>;
}
