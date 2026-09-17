/**
 * Ajv-backed JSON Schema plugin for `@isdk/match-ex`.
 *
 * Importing this package registers `AjvSchemaType` as the concrete
 * `JsonSchemaType` implementation in the engine's registry:
 *
 * ```ts
 * import '@isdk/match-ex-schema'
 * ```
 *
 * The class is also exported for host integration — e.g. `YamlTypeJsonSchema`
 * in `@isdk/ai-test-runner` extends it to add a YAML tag identity.
 */
import { setJsonSchemaType } from '@isdk/match-ex'
import { AjvSchemaType } from './ajv-schema.js'

export * from './ajv-schema.js'

setJsonSchemaType(AjvSchemaType)
