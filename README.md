# @isdk/match-ex-schema

Ajv-backed JSON Schema plugin for [`@isdk/match-ex`](https://github.com/isdk/match-ex.js).

Importing this package registers `AjvSchemaType` as the engine's JSON Schema implementation, so JSON Schema expectations validate out of the box.

## What it enables

- Heuristic JSON Schema detection — plain-object expectations like `{ type: 'object', properties: { ... } }` are validated as schemas (no `$schema` key needed).
- Explicit validation via the `$schema` operator and `JsonSchemaType` instances.
- Compiled once per expectation instance (Ajv `compile`), with `strictSchema: false` for YAML-friendly schemas.
- All [ajv-keywords](https://github.com/ajv-validator/ajv-keywords) and [ajv-formats](https://github.com/ajv-validator/ajv-formats) keywords/formats enabled (`range`, `regexp`, `date-time`, `email`, ...).

## Usage

```ts
import { validate, ValidationContext } from '@isdk/match-ex'
import '@isdk/match-ex-schema'

const ctx = new ValidationContext({})

// Heuristic detection
await validate(
  { name: 'Alice', age: 30 },
  {
    type: 'object',
    properties: { name: { type: 'string' }, age: { type: 'number', range: [18, 99] } },
    required: ['name'],
  },
  ctx
)

// Explicit operator
await validate(actualValue, { $schema: { type: 'string', format: 'date-time' } }, ctx)
```

## Exports

| Export | Description |
|---|---|
| `AjvSchemaType` | The Ajv-backed `JsonSchemaType` subclass. Extends the engine's abstract base; usable as a host integration point (e.g. YAML tag types). |

Unregister by calling `setJsonSchemaType(null)` from `@isdk/match-ex`, or register a custom implementation to replace this one.

## Dependencies

`ajv`, `ajv-keywords`, `ajv-formats` — deliberately kept out of the `@isdk/match-ex` core so consumers that never validate schemas never load Ajv.

## License

MIT © Riceball Lee
