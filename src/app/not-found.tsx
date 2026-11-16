import Link from "next/link";

export default function NotFound() {
  return (
    <main className="wrap">
      <div className="card center" style={{ margin: "60px auto", maxWidth: "520px" }}>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: "24px" }}>Page not found</h2>
        <p style={{ color: "var(--muted)", margin: "10px 0 20px" }}>The page you are looking for does not exist or has moved.</p>
        <Link className="btn" href="/">Back to Home</Link>
      </div>
    </main>
  );
}
