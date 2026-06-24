import { type SchemaTypeDefinition } from 'sanity'

import { modeloType } from './modeloType'
import { promocionType } from './promocionType'
import { configuracionType } from './configuracionType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [modeloType, promocionType, configuracionType],
}
