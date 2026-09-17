# @isdk/match-ex-schema

基于 [Ajv](https://ajv.js.org/) 的 JSON Schema 插件，服务于 [`@isdk/match-ex`](https://github.com/isdk/match-ex.js)。

导入本包即把 `AjvSchemaType` 注册为引擎的 JSON Schema 实现，JSON Schema 期望开箱即用。

## 提供的能力

- 启发式 JSON Schema 识别——`{ type: 'object', properties: { ... } }` 这类普通对象期望会按 Schema 校验（无需 `$schema` 键）。
- 通过 `$schema` 操作符和 `JsonSchemaType` 实例显式校验。
- 每个期望实例只编译一次（Ajv `compile`），并开启 `strictSchema: false` 以兼容宽松的 YAML Schema。
- 全量启用 [ajv-keywords](https://github.com/ajv-validator/ajv-keywords) 与 [ajv-formats](https://github.com/ajv-validator/ajv-formats) 的关键字/格式（`range`、`regexp`、`date-time`、`email` 等）。

## 用法

```ts
import { validate, ValidationContext } from '@isdk/match-ex'
import '@isdk/match-ex-schema'

const ctx = new ValidationContext({})

// 启发式识别
await validate(
  { name: 'Alice', age: 30 },
  {
    type: 'object',
    properties: { name: { type: 'string' }, age: { type: 'number', range: [18, 99] } },
    required: ['name'],
  },
  ctx
)

// 显式操作符
await validate(actualValue, { $schema: { type: 'string', format: 'date-time' } }, ctx)
```

## 导出

| 导出 | 说明 |
|---|---|
| `AjvSchemaType` | Ajv 实现的 `JsonSchemaType` 子类。继承自引擎的抽象基类，可作为宿主集成点（如 YAML 标签类型）。 |

如需反注册，调用 `@isdk/match-ex` 的 `setJsonSchemaType(null)`；或注册自定义实现以替换本插件。

## 依赖

`ajv`、`ajv-keywords`、`ajv-formats`——刻意不放进 `@isdk/match-ex` 核心，不做 Schema 校验的使用方就永远不会加载 Ajv。

## 许可证

MIT © Riceball Lee
