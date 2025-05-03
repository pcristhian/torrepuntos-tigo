import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TorrePuntos - Tigo",
  description: "Marcador de ganadores",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <title>TorrePuntos - Tigo</title>
        <meta httpEquiv="Content-Language" content="es" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
