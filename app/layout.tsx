import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { toyotaType } from "./fonts";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getModelos, getConfiguracion } from "@/lib/sanity/queries";
import { SITE_URL } from "@/lib/site";
import { datosContacto } from "@/lib/contacto";
import { buildAutoDealerJsonLd } from "@/lib/structured-data";
import JsonLd from "@/components/JsonLd";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// La imagen para compartir necesita una dirección absoluta que EXISTA hoy. El dominio final
// (SITE_URL) todavía no apunta a este sitio, así que se usa el dominio de producción de Vercel
// (la variable cambia sola al dominio propio cuando se conecte) o, si no está disponible, la
// URL temporal. No usar SITE_URL aquí hasta el lanzamiento.
const IMAGEN_COMPARTIR_URL = `${
  process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://toyotacuautitlan.vercel.app"
}/images/toyota-cuautitlan-compartir.jpg`;

// Respaldo de regeneración: TODAS las páginas que cuelgan de este layout (modelos, inicio, provisionales,
// Planes y Arrendamientos, Precios de servicio, Refacciones...) se regeneran como mínimo cada hora. El
// cambio normal llega en segundos por el aviso de Sanity (app/api/revalidate); esto solo cubre el caso
// de que un aviso fallara. Es el ÚNICO lugar donde se declara: las páginas no llevan su propio valor.
export const revalidate = 3600;

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
    // Imagen para compartir el sitio (WhatsApp, Facebook, iMessage...). Las páginas de modelo
    // definen la suya (foto de tarjeta del modelo); el resto hereda esta.
    images: [
      {
        url: IMAGEN_COMPARTIR_URL,
        width: 1200,
        height: 630,
        alt: "Toyota Cuautitlán, concesionario oficial. Pasión por servir.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const modelos = await getModelos();
  const contacto = datosContacto(await getConfiguracion());

  return (
    <html lang="es-MX" className={`${geist.variable} h-full antialiased`}>
      <body className={`${toyotaType.className} min-h-full flex flex-col bg-background text-foreground`}>
        <JsonLd data={buildAutoDealerJsonLd(contacto)} />
        <Navbar modelos={modelos} contacto={contacto} />
        <main className="flex-1 pt-16 xl:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
