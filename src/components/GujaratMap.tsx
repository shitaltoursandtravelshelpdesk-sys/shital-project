import india from "@svg-maps/india";

/**
 * Gujarat places we cover. Edit this list to add/remove cities:
 * [name, longitude, latitude]
 */
export const GUJARAT_PLACES: [string, number, number][] = [
  ["Ahmedabad", 72.57, 23.03],
  ["Gandhinagar", 72.64, 23.22],
  ["Vadodara", 73.18, 22.31],
  ["Surat", 72.83, 21.17],
  ["Rajkot", 70.8, 22.3],
  ["Jamnagar", 70.06, 22.47],
  ["Dwarka", 68.97, 22.24],
  ["Somnath", 70.4, 20.89],
  ["Junagadh", 70.46, 21.52],
  ["Bhuj", 69.67, 23.25],
  ["Statue of Unity", 73.72, 21.84],
  ["Ambaji", 72.85, 24.33],
  ["Diu", 70.98, 20.71],
  ["Saputara", 73.75, 20.58],
];

// Same projection as IndiaMap (calibrated for the @svg-maps/india viewBox).
const K = 20.8;
const merc = (lat: number) => (Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360)) * 180) / Math.PI;
const project = (lon: number, lat: number) => ({
  x: 122 + K * (lon - 74.0),
  y: 512 - K * (merc(lat) - merc(15.35)),
});

export function GujaratMap() {
  const states = india.locations as { id: string; name: string; path: string }[];
  const home = project(GUJARAT_PLACES[0][1], GUJARAT_PLACES[0][2]);
  return (
    <svg viewBox="-8 294 150 124" className="india-map guj-map" role="img" aria-label="Map of Gujarat showing places we cover">
      {states.map((s) => (
        <path key={s.id} d={s.path} className={s.name === "Gujarat" ? "st on" : "st"} />
      ))}
      {GUJARAT_PLACES.slice(1).map(([name, lon, lat]) => {
        const p = project(lon, lat);
        const mx = (home.x + p.x) / 2;
        const my = Math.min(home.y, p.y) - 8;
        return <path key={`r-${name}`} className="route" d={`M${home.x},${home.y} Q${mx},${my} ${p.x},${p.y}`} />;
      })}
      {GUJARAT_PLACES.map(([name, lon, lat], i) => {
        const p = project(lon, lat);
        return (
          <g key={name} className={i === 0 ? "pin home" : "pin"} transform={`translate(${p.x} ${p.y})`}>
            <circle r={i === 0 ? 2.6 : 1.8} className="pulse" />
            <circle r={i === 0 ? 1.8 : 1.2} className="dot" />
            <text className="guj-lbl" y={i === 0 ? 6 : -3}>{name}</text>
          </g>
        );
      })}
    </svg>
  );
}
