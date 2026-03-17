# Backend Implementation Standard

## Purpose

Defines how slice backend work is implemented in `templates/api/`.

## Rules

1. Shared contracts from `docs/foundation.md` are the source of truth.
2. Slice-specific additions come only from the chosen slice brief.
3. Validation schemas must match implemented data contracts exactly.
4. Auth guards must match the documented auth level on every route.
5. Register every new or changed module consistently in the API entrypoint.

## Backend Scope Per Slice

Depending on the slice, implement only what is necessary:

- model changes when `Schema Impact` is `Yes`
- validation schemas
- route definitions
- controllers or handlers
- middleware and auth guards
- seed updates if required for slice verification

## Required Checks

After backend work, run:

```text
cd templates/api
npm run build
npm test
```

Stop and fix failures before moving forward.

## Consistency Rules

- Do not invent new file structures per slice.
- Do not change shared error handling for one slice only.
- Do not widen a route contract on the frontend before the backend contract changes.
- Keep module registration and config updates synchronized with the slice output.
