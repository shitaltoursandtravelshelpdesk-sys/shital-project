"use client";
/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/navigation";

// Static demo login: any email/password opens the dashboard. Add real auth when the backend is ready.
export default function AdminLogin() {
  const router = useRouter();
  return (
    <div className="ad-login">
      <form className="ad-card" onSubmit={(e) => { e.preventDefault(); router.push("/admin/dashboard"); }}>
        <img className="ad-logo" src="/images/logo-round.jpg" alt="Shital Tours & Travels" />
        <h2>Admin Login</h2>
        <p className="ad-sub">Shital Tours &amp; Travels</p>
        <div className="ad-f"><label htmlFor="email">Email</label><input id="email" name="email" type="email" defaultValue="admin@shitaltravels.in" required /></div>
        <div className="ad-f"><label htmlFor="password">Password</label><input id="password" name="password" type="password" defaultValue="demo123" required /></div>
        <div className="ad-bar" style={{ justifyContent: "space-between" }}>
          <label className="ad-sw"><input type="checkbox" name="remember" defaultChecked /> Remember me</label>
          <a href="#" onClick={(e) => { e.preventDefault(); alert("Demo: a reset link will be emailed once the backend is connected."); }}>Forgot password?</a>
        </div>
        <button className="ad-btn" style={{ width: "100%", justifyContent: "center" }}><i className="fa-solid fa-right-to-bracket" /> Login</button>
        <p className="ad-muted" style={{ textAlign: "center", fontSize: 12, marginTop: 14 }}>Static demo · any email/password works</p>
      </form>
    </div>
  );
}
