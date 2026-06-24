import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Toyota Cuautitlán | Concesionario Oficial",
    template: "%s | Toyota Cuautitlán",
  },
  description:
    "Concesionario oficial Toyota en Cuautitlán Izcalli. Encuentra tu próximo auto, cotiza en línea y agenda tu cita de servicio.",
  metadataBase: new URL("https://toyotacuautitlan.com.mx"),
  openGraph: {
    siteName: "Toyota Cuautitlán",
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[#1A1A1A]">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
