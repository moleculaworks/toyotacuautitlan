// Imágenes placeholder de /financiamiento. Los TEXTOS viven en Sanity (documento
// "Página: Financiamiento"); aquí solo están los archivos temporales que se
// muestran mientras no se suba una imagen real en el Studio.
// Cuando las imágenes definitivas estén en Sanity, este archivo se puede borrar
// junto con la carpeta public/images/financiamiento/.
const base = '/images/financiamiento/financiamiento-'

export const placeholders = {
  heroDesktop: `${base}hero-desktop.webp`,
  heroMobile: `${base}hero-mobile.webp`,
  planes: ['plan-tradicional', 'plan-balloon', 'plan-anualidades', 'plan-renueva'].map((n) => `${base}${n}.webp`),
  arrendamientos: ['arrendamiento-puro', 'arrendamiento-financiero'].map((n) => `${base}${n}.webp`),
}
