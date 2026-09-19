// Inyecta un bloque JSON-LD (Schema.org) en la página. El escape de "<"
// evita que un valor de texto (ej. venido de Sanity) pudiera cerrar el
// <script> antes de tiempo.
export default function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
