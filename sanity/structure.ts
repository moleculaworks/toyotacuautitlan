import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Toyota Cuautitlán')
    .items([
      S.documentTypeListItem('modelo').title('Modelos'),
      S.documentTypeListItem('promocion').title('Promociones'),
      S.divider(),
      S.documentTypeListItem('configuracion').title('Configuración del sitio'),
    ])
