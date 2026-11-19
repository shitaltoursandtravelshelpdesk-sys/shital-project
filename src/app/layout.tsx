import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4, Montserrat, Archivo_Black, Exo_2 } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBar } from "@/components/layout/MobileBar";
import { ToastProvider } from "@/components/ui/Toast";
import { SITE_NAME, SITE_URL } from "@/lib/config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const heading = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

// headings
const archivo = Archivo_Black({ subsets: ["latin"], weight: "400", variable: "--font-archivo", display: "swap" });
// body / content text
const exo = Exo_2({ subsets: ["latin"], variable: "--font-exo", display: "swap" });

const serif = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s — ${SITE_NAME}` },
  description: "Cars and buses for hotel guests, airport transfers, local journeys and group travel in Ahmedabad.",
  icons: { icon: "/images/logo.png", apple: "/images/logo.png" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${serif.variable} ${heading.variable} ${archivo.variable} ${exo.variable}`}>
      <head>
        {/* BBH Bogle (short headings / eyebrows) is not in next/font yet, so load it from Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=BBH+Bogle&display=swap" />
      </head>
      <body>
        <ToastProvider>
          <Header />
          {children}
          <Footer />
          <MobileBar />
        </ToastProvider>
      </body>
    </html>
  );
}
