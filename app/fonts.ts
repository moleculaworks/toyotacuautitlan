import localFont from 'next/font/local'

// Fuente de marca — pendiente confirmar licencia web antes del lanzamiento
// (nota del handoff). Centralizada aquí para aplicarse a todo el sitio desde
// app/layout.tsx — antes solo se cargaba dentro de la página del Corolla.
export const toyotaType = localFont({
  src: [
    { path: './fonts/ToyotaType-Book.ttf', weight: '400', style: 'normal' },
    { path: './fonts/ToyotaType-BookIt.ttf', weight: '400', style: 'italic' },
    { path: './fonts/ToyotaType-Semibold.ttf', weight: '600', style: 'normal' },
    { path: './fonts/ToyotaType-SemiboldIt.ttf', weight: '600', style: 'italic' },
    { path: './fonts/ToyotaType-Black.ttf', weight: '900', style: 'normal' },
    { path: './fonts/ToyotaType-BlackIt.ttf', weight: '900', style: 'italic' },
  ],
  display: 'swap',
})
