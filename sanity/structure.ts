import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Toyota Cuautitlán')
    .items([
      S.documentTypeListItem('modelo').title('Modelos'),
      S.documentTypeListItem('promocion').title('Promociones'),
      S.divider(),
      // Páginas de sección: un solo documento por página (sin lista, no se pueden duplicar)
      S.listItem()
        .title('Página: Financiamiento')
        .id('paginaFinanciamiento')
        .child(S.document().schemaType('paginaFinanciamiento').documentId('paginaFinanciamiento')),
      S.listItem()
        .title('Página: Precios de servicio')
        .id('paginaPreciosServicio')
        .child(S.document().schemaType('paginaPreciosServicio').documentId('paginaPreciosServicio')),
      S.listItem()
        .title('Página: Refacciones')
        .id('paginaRefacciones')
        .child(S.document().schemaType('paginaRefacciones').documentId('paginaRefacciones')),
      S.divider(),
      S.documentTypeListItem('configuracion').title('Configuración del sitio'),
    ])
