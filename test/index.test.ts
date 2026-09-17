import { describe, it, expect } from 'vitest'
import {
  validate,
  ValidationContext,
  getJsonSchemaType,
} from '@isdk/match-ex'
// Importing the package registers the Ajv implementation into the core registry.
import '@isdk/match-ex-schema'
import { AjvSchemaType } from '@isdk/match-ex-schema'
// The engine formats string expectations through the template registry (the
// context's `data` defaults to `{}`), so any real host needs a template
// implementation as well — just like consumers of this plugin will have.
import '@isdk/match-ex-template'

describe('@isdk/match-ex-schema', () => {
  it('registers AjvSchemaType into the core registry on import', () => {
    expect(getJsonSchemaType()).toBe(AjvSchemaType)
  })

  it('validates JSON Schemas through the core validate()', async () => {
    const schema = {
      type: 'object',
      properties: { a: { type: 'number' } },
    }
    const ok = await validate({ a: 1 }, schema, new ValidationContext({}))
    expect(ok.pass).toBe(true)

    const bad = await validate(
      { a: 'nope' },
      schema,
      new ValidationContext({})
    )
    expect(bad.pass).toBe(false)
  })

  it('creates schema instances for direct use', () => {
    expect(AjvSchemaType.create({ type: 'string' })).toBeDefined()
  })
})
