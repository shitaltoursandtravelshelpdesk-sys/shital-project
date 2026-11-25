"use client";

import { useEffect, useState } from "react";

// Full-screen loader shown on first visit: logo, a car driving on a road, then fades out after 2s.
export function Preloader() {
  const [hide, setHide] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHide(true), 2000);
    const t2 = setTimeout(() => setGone(true), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (gone) return null;
  return (
    <div className={`pl${hide ? " pl-out" : ""}`} aria-hidden="true">
      <img className="pl-logo" src="/images/logo-round.jpg" alt="" />
      <div className="pl-road">
        <img className="pl-car" src="/images/loader-car.svg" alt="" />
      </div>
    </div>
  );
}
