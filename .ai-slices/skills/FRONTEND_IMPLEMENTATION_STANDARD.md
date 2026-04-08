# Frontend Implementation Standard

## Purpose

Defines how slice frontend work is implemented in `templates/app/`.

## Rules

1. Shared API contracts are copied from backend or foundation definitions; they are not rewritten from memory.
2. Shared design rules come from `docs/design-system.md`.
3. Image files in `docs/design-references/` are UI design references when present.
4. Slice-specific page details come from the chosen slice brief.
5. Pages must handle loading, empty, error, and populated states where applicable.
6. Shared components and hook patterns must stay consistent across slices.

## Frontend Scope Per Slice

Implement only the frontend artifacts the slice needs:

- copied validation or type contracts
- endpoint config or service functions
- custom hooks
- pages
- slice-specific shared UI components
- supporting display helpers

## Required Checks

After frontend work, run:

```text
cd templates/app
npm run typecheck
npm run build
```

Stop and fix failures before moving forward.

## UI Rules

- Follow the shared design system exactly.
- Use `docs/design-references/` as visual guidance when images exist.
- If image references conflict with textual planning artifacts, textual artifacts win.
- Prefer reusable components over page-local one-offs.
- Do not fetch data directly in page components when a slice hook or service pattern exists.
- Keep route registration consistent with the foundation route map.
