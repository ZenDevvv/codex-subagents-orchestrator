# Fix Bugs - Slice-Aware Stabilization

Run a targeted stabilization loop for the selected slice scope.

---

## Agent And Skills

Adopt the agent defined in `agents/fullstack-builder.md`.

Read these skills before proceeding:

- `skills/BACKEND_IMPLEMENTATION_STANDARD.md`
- `skills/FRONTEND_IMPLEMENTATION_STANDARD.md`
- `skills/QA_STANDARD.md`

---

## Scope

`$ARGUMENTS` may be:

- `all`
- `next`
- a specific `SLICE-xxx`

If no argument is provided, default to `next`.

Resolve `next` using the same ready-slice rules as `/build`.

---

## Required Inputs

Read:

- `docs/foundation.md`
- `docs/design-system.md`
- `docs/slices.md`
- `docs/slice-progress.md`
- the relevant `docs/slices/<SLICE_ID>.md`

---

## Stabilization Pipeline

For each selected slice, run checks in this order and stop on the first failure:

1. `templates/api`: `npm run build`
2. `templates/api`: `npm test`
3. `templates/app`: `npm run typecheck`
4. `templates/app`: `npm run build`
5. `templates/app`: `npm run test:e2e -- --grep @slice-mocked`
6. `templates/app`: `npm run test:e2e -- --grep @slice-live`

Apply the smallest targeted patch that fixes the failure, then rerun the failed check before continuing.

If a slice does not yet require a live stage, skip step 6 with a clear note.

---

## Progress Updates

When a failed stage is repaired:

- mark the relevant scope/stage row back to `✅ Complete`
- note that it was stabilized by `/fix-bugs`

If a blocker remains:

- mark the relevant scope/stage row `⛔ Blocked`
- record the blocker clearly in `Notes`

---

## Completion Output

Print:

- fixed scope
- checks that were rerun
- remaining blockers, if any
- exact next command
