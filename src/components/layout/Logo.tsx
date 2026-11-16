import Link from "next/link";
import Image from "next/image";

export function Logo({ light }: { light?: boolean }) {
  return (
    <Link href="/" className={light ? "logo light" : "logo"} aria-label="Shital Tours & Travels home">
      <Image src="/images/logo.png" alt="Shital Tours & Travels" width={1562} height={914} priority={!light} style={{ width: "auto" }} />
    </Link>
  );
}
