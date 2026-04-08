# Fix Bugs - Slice-Aware Stabilization

Run a targeted stabilization loop for the selected scope.

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
- a bug description (`BUG_DESCRIPTION`)

If no argument is provided, default to `next`.

Resolve `next` using the same ready-slice rules as `/build`.

---

## Scope Resolution

Resolve `$ARGUMENTS` in this order:

1. exact `all`
2. exact `next`
3. explicit `SLICE-xxx`
4. otherwise treat the input as `BUG_DESCRIPTION`

When resolving `BUG_DESCRIPTION`:

1. Build a candidate list from launch slices in `docs/slices.md`.
2. Score each slice using evidence from:
   - journey, modules, pages, acceptance in `docs/slices.md`
   - goal, user journey, acceptance, failure cases, backend/frontend scope in `docs/slices/<SLICE_ID>.md`
   - recent stale or blocked notes in `docs/slice-progress.md`
3. Rank candidates by relevance score.

Auto-select the top slice only when confidence is high:

- top candidate has meaningful evidence
- top score is clearly higher than the second candidate

If confidence is low or multiple slices are tied:

- do not run stabilization
- output the top 2-3 candidate slices with one-line reasons
- provide exact follow-up commands (`/fix-bugs SLICE-xxx`) for each candidate
- ask the user to pick one slice

Never fallback from ambiguous bug text to `next` or `all`.

---

## Required Inputs

Read:

- `docs/foundation.md`
- `docs/design-system.md`
- `docs/slices.md`
- `docs/slice-progress.md`
- relevant `docs/slices/<SLICE_ID>.md` files used for scope resolution

---

## Stabilization Pipeline

For each selected slice, run checks in this order and stop on the first failure:

1. `templates/api`: `npm run build`
2. `templates/api`: `npm test`
3. `templates/app`: `npm run typecheck`
4. `templates/app`: `npm run build`
5. `templates/app`: `npm run test:e2e:mocked`
6. `templates/app`: `npm run test:e2e:live`

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
- how the scope was resolved (`next`, explicit `SLICE-xxx`, or `BUG_DESCRIPTION`)
- checks that were rerun
- remaining blockers, if any
- exact next command
