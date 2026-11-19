import { useId, type CSSProperties, type ReactNode } from "react";

export interface IconProps {
  /** width/height, default 1.1em */
  size?: string | number;
  strokeWidth?: number;
  /** omit the inline vertical-align style (icons used at a fixed pixel size) */
  bare?: boolean;
  /** fill instead of stroke (WhatsApp logo) */
  filled?: boolean;
  style?: CSSProperties;
  className?: string;
}

const inline: CSSProperties = { verticalAlign: "-.15em" };

function Svg({ size: rawSize = "1.4em", strokeWidth = 1.8, bare, filled, style, className, children }: IconProps & { children: ReactNode }) {
  // all icons drawn ~25% larger than the original line icons
  const size = typeof rawSize === "number" ? Math.round(rawSize * 1.25) : rawSize;
  return filled ? (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} style={style}>
      {children}
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style ?? (bare ? undefined : inline)}
    >
      {children}
    </svg>
  );
}


/* Solid (filled) icon style. Contact-type icons get a small car badge in the
   bottom-right corner so every icon carries the travel theme. */
const CAR_D = "M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.670 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z";

function WithCar({ children }: { children: ReactNode }) {
  const id = useId();
  return (
    <>
      <mask id={id}>
        <rect width="24" height="24" fill="#fff" />
        <circle cx="18" cy="18" r="6.6" fill="#000" />
      </mask>
      <g mask={`url(#${id})`}>
        <g transform="scale(.9)">{children}</g>
      </g>
      <circle cx="18" cy="18" r="5.4" />
      <path d={CAR_D} fill="var(--icon-badge, #fff)" transform="translate(14.25 14.1) scale(.4)" />
    </>
  );
}

export const ClipboardIcon = (p: IconProps) => (
  <Svg filled {...p}>
    <WithCar><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" /></WithCar>
  </Svg>
);

export const CalendarIcon = (p: IconProps) => (
  <Svg filled {...p}>
    <WithCar><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" /></WithCar>
  </Svg>
);

export const CarIcon = (p: IconProps) => (
  <Svg filled {...p}>
    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.670 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
  </Svg>
);

export const PhoneIcon = (p: IconProps) => (
  <Svg filled {...p}>
    <WithCar><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.590 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></WithCar>
  </Svg>
);

export const ChatIcon = (p: IconProps) => (
  <Svg filled {...p}>
    <WithCar><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" /></WithCar>
  </Svg>
);

export const MailIcon = (p: IconProps) => (
  <Svg filled {...p}>
    <WithCar><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></WithCar>
  </Svg>
);

export const HotelIcon = (p: IconProps) => (
  <Svg filled {...p}>
    <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z" />
  </Svg>
);

export const BusIcon = (p: IconProps) => (
  <Svg filled {...p}>
    <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z" />
  </Svg>
);

export const CardIcon = (p: IconProps) => (
  <Svg filled {...p}>
    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
  </Svg>
);

export const ShieldIcon = (p: IconProps) => (
  <Svg filled {...p}>
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
  </Svg>
);

export const StarIcon = (p: IconProps) => (
  <Svg filled {...p}>
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </Svg>
);

export const UserIcon = (p: IconProps) => (
  <Svg filled {...p}>
    <WithCar><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></WithCar>
  </Svg>
);

export const FileIcon = (p: IconProps) => (
  <Svg filled {...p}>
    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
  </Svg>
);

export const PinIcon = ({ size, ...p }: IconProps) => (
  // drawn larger than other icons so the car inside stays readable
  <Svg filled size={typeof size === "number" ? size * 1.4 : size ?? "1.8em"} {...p}>
    {/* location pin with a car inside */}
    <path
      fillRule="evenodd"
      d="M12 .8a8.7 8.7 0 0 0-8.7 8.7C3.3 15.6 12 23.2 12 23.2s8.7-7.6 8.7-13.7A8.7 8.7 0 0 0 12 .8z
         M18.2 9.5a6.2 6.2 0 1 1-12.4 0 6.2 6.2 0 1 1 12.4 0z
         M9.9 6.2h4.2c.4 0 .7.2.8.6l.7 1.9h.6c.3 0 .5.2.5.5s-.2.5-.5.5h-.2c.2.2.3.5.3.8v2.1c0 .3-.2.5-.5.5h-.4v.7c0 .3-.2.5-.5.5h-.6c-.3 0-.5-.2-.5-.5v-.7h-3.6v.7c0 .3-.2.5-.5.5h-.6c-.3 0-.5-.2-.5-.5v-.7h-.4c-.3 0-.5-.2-.5-.5v-2.1c0-.3.1-.6.3-.8h-.2c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h.6l.7-1.9c.1-.4.4-.6.8-.6z
         M10.1 7.1l-.6 1.6h5l-.6-1.6z
         M9 10.4h1.4v.9H9z M13.6 10.4H15v.9h-1.4z"
    />
  </Svg>
);


export const HeadsetIcon = (p: IconProps) => (
  <Svg filled {...p}>
    <WithCar><path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.130-7 7-7s7 3.13 7 7v2h-4v8h4v1h-7v2h6c1.66 0 3-1.34 3-3V10c0-4.97-4.03-9-9-9z" /></WithCar>
  </Svg>
);

export const PlaneIcon = (p: IconProps) => (
  <Svg filled {...p}>
    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
  </Svg>
);

export const RoadIcon = (p: IconProps) => (
  <Svg filled {...p}>
    <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" />
  </Svg>
);

export const UsersIcon = (p: IconProps) => (
  <Svg filled {...p}>
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </Svg>
);

export const InfoIcon = (p: IconProps) => (
  <Svg filled {...p}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
  </Svg>
);

export const LockIcon = (p: IconProps) => (
  <Svg filled {...p}>
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
  </Svg>
);

export const WhatsAppIcon = (p: IconProps) => (
  <Svg filled {...p}>
    <WithCar>
    <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4C2.7 15.6 2.2 13.8 2.2 12 2.2 6.6 6.6 2.2 12 2.2c2.6 0 5.1 1 6.9 2.9 1.8 1.8 2.9 4.3 2.9 6.9 0 5.4-4.4 9.8-9.8 9.8zM20.5 3.5C18.2 1.2 15.2 0 12 0 5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.8 1 3.8 1.5 5.8 1.5 6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.4z" />
    </WithCar>
  </Svg>
);
