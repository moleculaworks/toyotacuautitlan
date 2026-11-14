import { type SchemaTypeDefinition } from 'sanity'

import { modeloType } from './modeloType'
import { promocionType } from './promocionType'
import { configuracionType } from './configuracionType'
import { paginaFinanciamientoType } from './paginaFinanciamientoType'
import { paginaPreciosServicioType, tablaKilometradoType, tablaFrenosType } from './paginaPreciosServicioType'
import { paginaRefaccionesType } from './paginaRefaccionesType'
import { paginaSegurosType } from './paginaSegurosType'
import { paginaComonuevosType } from './paginaComonuevosType'
import { paginaContactoType } from './paginaContactoType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    modeloType,
    promocionType,
    configuracionType,
    paginaFinanciamientoType,
    tablaKilometradoType,
    tablaFrenosType,
    paginaPreciosServicioType,
    paginaRefaccionesType,
    paginaSegurosType,
    paginaComonuevosType,
    paginaContactoType,
  ],
}
