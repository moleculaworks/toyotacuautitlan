import type { NextConfig } from "next";

// Cabeceras de seguridad básicas para todas las rutas. Vercel ya agrega
// Strict-Transport-Security. No se incluye Content-Security-Policy a propósito:
// puede bloquear imágenes, scripts o el /studio si queda mal escrita; si se agrega
// después, primero en modo Report-Only.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), payment=()" },
];

const nextConfig: NextConfig = {
  // No anunciar el framework en la cabecera X-Powered-By.
  poweredByHeader: false,
  images: {
    // 75 es el valor por defecto (todo el sitio); 85 se usa solo en el hero de las páginas
    // de sección (SectionHero), que lleva fotos con personas y necesita más calidad.
    qualities: [75, 85],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  // La sección se llamaba /servicio y pasó a /postventa (10 nov 2026): se conservan los enlaces
  // viejos (permanentes) por si alguien guardó o compartió alguno.
  async redirects() {
    return [{ source: "/servicio/:path*", destination: "/postventa/:path*", permanent: true }];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
