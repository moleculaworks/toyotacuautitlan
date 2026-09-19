import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { toyotaType } from "./fonts";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getModelos, getConfiguracion } from "@/lib/sanity/queries";
import { SITE_URL } from "@/lib/site";
import { buildAutoDealerJsonLd } from "@/lib/structured-data";
import JsonLd from "@/components/JsonLd";

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
  metadataBase: new URL(SITE_URL),
  openGraph: {
    siteName: "Toyota Cuautitlán",
    locale: "es_MX",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const modelos = await getModelos();
  const configuracion = await getConfiguracion();

  return (
    <html lang="es-MX" className={`${geist.variable} h-full antialiased`}>
      <body className={`${toyotaType.className} min-h-full flex flex-col bg-background text-foreground`}>
        <JsonLd data={buildAutoDealerJsonLd(configuracion)} />
        <Navbar modelos={modelos} />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
