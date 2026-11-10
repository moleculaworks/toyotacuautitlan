// Formato de precios de la sección Servicio: "$2,195" (los montos son en pesos mexicanos,
// M.N., y el encabezado de cada tabla lo dice). Un precio también puede ser un texto
// ("Consultar") si en Sanity se llena `precioTexto`.
export function formatoPrecio(n: number | null | undefined): string {
  return `$${(n ?? 0).toLocaleString('es-MX')}`
}

// Id de ancla a partir de un texto: "Servicio de frenos" -> "servicio-de-frenos".
export function anclaDe(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
