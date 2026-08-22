// Pide a la CDN de Sanity una versión redimensionada de la imagen, en vez de
// servir el asset original completo. Evita descargar más resolución de la
// que realmente se muestra (relevante sobre todo para el visor 360°, donde
// se cargan 16 imágenes por color).
export function sanityImgWidth(url: string, width: number, quality = 80) {
  return `${url}?w=${width}&auto=format&q=${quality}`
}
