# Build - Slice Execution

Build one slice, the next ready slice, or every slice in dependency order. This is the main execution command for the slice workflow.

---

## Agent And Skills

Adopt the agent defined in `agents/fullstack-builder.md`.

Read these skills before proceeding:

- `skills/ARCHITECTURE_STANDARD.md`
- `skills/BACKEND_IMPLEMENTATION_STANDARD.md`
- `skills/FRONTEND_IMPLEMENTATION_STANDARD.md`
- `skills/QA_STANDARD.md`

---

## Required Inputs

Read these files before proceeding:

- `docs/concept.md`
- `docs/foundation.md`
- `docs/design-system.md`
- `docs/slices.md`
- `docs/slice-progress.md`

If any of `docs/foundation.md`, `docs/design-system.md`, or `docs/slices.md` is missing, stop and output:

```text
Missing planning artifacts.

Run /plan before /build.
```

---

## Parse Scope

`$ARGUMENTS` must resolve to one of:

- `next`
- `all`
- a specific `SLICE-xxx`

Default to `next` if no argument is provided.

### `next`

Select the first slice that is:

- listed in `docs/slices.md`
- not fully complete in `docs/slice-progress.md`
- not blocked by incomplete or stale dependencies

### `all`

Build all slices in manifest order, but only when each slice becomes dependency-ready. Stop on the first blocking failure.

### Specific slice

Build only that slice. If dependencies are not complete, mark the slice blocked and stop.

---

## Progress Rules

Use `docs/slice-progress.md` as the canonical state log.

Recommended status values:

- `🚧 In Progress`
- `✅ Complete`
- `⚠️ Stale`
- `⛔ Blocked`
- `⏭️ Skipped`

Before starting a stage, update or add the row as `🚧 In Progress`.

Only mark a stage `✅ Complete` after concrete artifacts exist and required checks pass.

---

## Per-Slice Execution

For each selected slice:

1. Read `docs/slices/<SLICE_ID>.md`
2. Confirm all dependency slices are complete and not stale
3. Update `docs/slices.md` status for the slice to `In Progress`
4. Execute only the stages required by the slice

### Stage A - `SCHEMA`

Run this stage only when the slice brief says `Data And Schema Impact: Yes`.

Tasks:

- update shared models or prisma files as needed
- update seed data or bootstrap data if the slice requires it
- keep changes aligned with `docs/foundation.md`

Checks:

```text
cd templates/api
npm install
npm run build
```

If the slice has no schema impact, log `⏭️ Skipped` for `SCHEMA`.

### Stage B - `BACKEND`

Implement only the backend scope described in the slice brief:

- validation
- routes
- controllers
- middleware
- registration
- backend smoke, integration, and unit coverage for the slice

Checks:

```text
cd templates/api
npm run build
npm run test:tdd
```

### Stage C - `FRONTEND`

Implement only the frontend scope described in the slice brief:

- copied contracts and types
- services and hooks
- pages and components
- loading, empty, error, and populated states
- route registration

Checks:

```text
cd templates/app
npm install
npm run typecheck
npm run build
```

### Stage D - `MOCKED_TESTS`

Create or update mocked slice verification tagged with `@slice-mocked`.

Checks:

```text
cd templates/app
npm run typecheck
npm run build
 npm run test:mocked
```

### Stage E - `LIVE_TESTS`

Create or update live slice verification tagged with `@slice-live`.

Use live integration coverage whenever the slice changes real backend behavior or an authenticated mutation flow.

Checks:

```text
cd templates/app
npm run typecheck
npm run build
 npm run test:live
```

### Stage F - `REVIEW`

Run a targeted internal review when one of these is true:

- this is the first launch slice
- the slice changes auth or shared contracts
- a failing pattern appears likely to repeat

If no targeted review is needed, skip the stage with `⏭️ Skipped`.

---

## Failure Rules

If any required check fails:

1. stop the current slice
2. mark the active stage `⛔ Blocked`
3. leave downstream stages untouched
4. stop the run if building `all`

Do not mark a slice complete when a required stage is blocked or stale.

---

## Slice Completion

A slice is complete only when:

- all required stages are `✅ Complete`
- no required stage is `⚠️ Stale` or `⛔ Blocked`
- the slice brief acceptance is satisfied

When complete:

- update `docs/slices.md` status to `Complete`
- print the next recommended command

---

## Completion Output

For a successful run, print:

```text
=== BUILD COMPLETE ===

Built scope: <scope>
Completed slices: ...
Blocked slices: ...
Next recommended command:
/resume
```
