import { Krub, Allura } from "next/font/google";

import "@/styles/globals.scss";

export const metadata = {
  title: "CMS Turftiptster",
  description: "Panel de gestión de Turftipster",
};

const krub = Krub({
  weight: ["200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-krub"
});

const allura = Allura({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-allura"
});

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${krub.variable} ${allura.variable}`}>
      <body>{children}</body>
    </html>
  );
}
