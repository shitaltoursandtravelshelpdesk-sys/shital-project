import india from "@svg-maps/india";

/**
 * Places we have taken guests to. Edit this list to add/remove destinations:
 * [name, state, longitude, latitude]
 */
export const DESTINATIONS: [string, string, number, number][] = [
  ["Ahmedabad", "Gujarat", 72.57, 23.03],
  ["Dwarka", "Gujarat", 68.97, 22.24],
  ["Somnath", "Gujarat", 70.4, 20.89],
  ["Statue of Unity", "Gujarat", 73.72, 21.84],
  ["Rann of Kutch", "Gujarat", 69.67, 23.25],
  ["Udaipur", "Rajasthan", 73.71, 24.58],
  ["Mount Abu", "Rajasthan", 72.71, 24.59],
  ["Jaipur", "Rajasthan", 75.79, 26.91],
  ["Delhi", "Delhi", 77.21, 28.61],
  ["Agra", "Uttar Pradesh", 78.01, 27.18],
  ["Shimla", "Himachal Pradesh", 77.17, 31.1],
  ["Manali", "Himachal Pradesh", 77.19, 32.24],
  ["Mumbai", "Maharashtra", 72.88, 19.08],
  ["Shirdi", "Maharashtra", 74.48, 19.77],
  ["Goa", "Goa", 74.0, 15.35],
  // North
  ["Srinagar", "Jammu and Kashmir", 74.8, 34.08],
  ["Amritsar", "Punjab", 74.87, 31.63],
  ["Rishikesh", "Uttarakhand", 78.27, 30.09],
  ["Varanasi", "Uttar Pradesh", 82.97, 25.32],
  // Central
  ["Ujjain", "Madhya Pradesh", 75.78, 23.18],
  ["Khajuraho", "Madhya Pradesh", 79.92, 24.85],
  // East & North-East
  ["Kolkata", "West Bengal", 88.36, 22.57],
  ["Puri", "Odisha", 85.83, 19.81],
  ["Darjeeling", "West Bengal", 88.26, 27.04],
  ["Gangtok", "Sikkim", 88.61, 27.33],
  ["Shillong", "Meghalaya", 91.89, 25.58],
  ["Guwahati", "Assam", 91.74, 26.14],
  // South
  ["Hyderabad", "Telangana", 78.49, 17.39],
  ["Bengaluru", "Karnataka", 77.59, 12.97],
  ["Mysuru", "Karnataka", 76.64, 12.3],
  ["Chennai", "Tamil Nadu", 80.27, 13.08],
  ["Tirupati", "Andhra Pradesh", 79.42, 13.63],
  ["Munnar", "Kerala", 77.06, 10.09],
  ["Kanyakumari", "Tamil Nadu", 77.54, 8.08],
];

const HOME = DESTINATIONS[0];

// The @svg-maps/india paths are in a Mercator projection; these constants
// were calibrated against Delhi and Goa in the map's 612x696 viewBox.
const K = 20.8;
const merc = (lat: number) => (Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360)) * 180) / Math.PI;
const project = (lon: number, lat: number) => ({
  x: 122 + K * (lon - 74.0),
  y: 512 - K * (merc(lat) - merc(15.35)),
});

export function IndiaMap() {
  const visitedStates = new Set(DESTINATIONS.map((d) => d[1]));
  const home = project(HOME[2], HOME[3]);
  return (
    <svg viewBox={india.viewBox} className="india-map" role="img" aria-label="Map of India showing places we have travelled to">
      {(india.locations as { id: string; name: string; path: string }[]).map((s) => (
        <path key={s.id} d={s.path} className={visitedStates.has(s.name) ? "st on" : "st"}>
          <title>{s.name}</title>
        </path>
      ))}
      {DESTINATIONS.slice(1).map(([name, , lon, lat]) => {
        const p = project(lon, lat);
        const mx = (home.x + p.x) / 2;
        const my = Math.min(home.y, p.y) - 30;
        return <path key={`r-${name}`} className="route" d={`M${home.x},${home.y} Q${mx},${my} ${p.x},${p.y}`} />;
      })}
      {DESTINATIONS.map(([name, , lon, lat], i) => {
        const p = project(lon, lat);
        return (
          <g key={name} className={i === 0 ? "pin home" : "pin"} transform={`translate(${p.x} ${p.y})`}>
            <circle r={i === 0 ? 9 : 6} className="pulse" />
            <circle r={i === 0 ? 6 : 4} className="dot" />
            <title>{name}</title>
          </g>
        );
      })}
    </svg>
  );
}
