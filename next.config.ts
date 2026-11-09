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
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
