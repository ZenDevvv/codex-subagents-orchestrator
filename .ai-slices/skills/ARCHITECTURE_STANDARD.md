# Architecture Standard

## Purpose

Defines the shared technical contracts that all slices must follow.

## Rules

1. Every route has an explicit auth level.
2. Every error response follows one shape.
3. Route naming, module naming, and schema naming stay consistent across slices.
4. Shared models live in the foundation; slice briefs only extend or consume them.
5. Avoid contract duplication across slice briefs.

## Auth Levels

Use one of:

- `public`
- `authenticated`
- `role:<ROLE_NAME>`
- `system`

Document auth level per route in `docs/foundation.md`.

## Error Shape

Use one standard shape:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "fields": {
      "fieldName": "Optional field-level error"
    }
  },
  "requestId": "optional-request-id"
}
```

## Route Conventions

- Use resource-oriented paths.
- Keep collection routes plural.
- Keep custom actions explicit.
- Document request and response contracts at the route-map level before implementation.

## Model Conventions

- Shared IDs and ownership fields must be consistent across slices.
- Relations must name both sides explicitly.
- Common audit fields should be standardized across models.
- Indexes must be called out for foreign keys and frequent query paths.

## Caching

Only add caching when a slice or foundation explicitly requires it.

When used, document:

- cache scope
- TTL
- invalidation trigger

## Review Focus

When reviewing, prioritize:

- auth drift
- route drift
- inconsistent validation or error shapes
- missing indexes or pagination
