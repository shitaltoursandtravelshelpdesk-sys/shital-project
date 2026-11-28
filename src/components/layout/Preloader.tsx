"use client";

import { useEffect, useRef, useState } from "react";

// Full-screen loader: logo + car driving across the road.
// The car starts with the first paint (pure CSS); when it leaves the screen the loader fades out.
export function Preloader() {
  const carRef = useRef<HTMLDivElement>(null);
  const [hide, setHide] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const done = () => setHide(true);
    // The CSS animation may already be running (or finished) before React loads,
    // so wait on the animation itself instead of the React event.
    const anim = carRef.current?.getAnimations?.()[0];
    if (anim) anim.finished.then(done, done);
    else done();
    const t = setTimeout(done, 5000); // fallback
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!hide) return;
    const t = setTimeout(() => setGone(true), 400);
    return () => clearTimeout(t);
  }, [hide]);

  if (gone) return null;
  return (
    <div className={`pl${hide ? " pl-out" : ""}`} aria-hidden="true">
      <img className="pl-logo" src="/images/logo-round.jpg" alt="" />
      <div className="pl-road">
        <div ref={carRef} className="pl-car pl-go">
          <img src="/images/loader-car-logo.png" alt="" />
        </div>
      </div>
    </div>
  );
}
