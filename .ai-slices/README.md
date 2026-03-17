# AI Dev Orchestrator - Vertical Slicing Workflow

This project packages a standalone orchestrator in `.ai-slices/` that plans and builds a product through feature-journey slices instead of a long numbered phase chain.

---

## What This Is

The slice workflow turns a rough app idea into a production-ready scaffold by:

1. Refining the concept in `docs/concept.md`
2. Planning the shared foundation and slice order
3. Building one dependency-safe slice at a time
4. Stabilizing failures as they appear
5. Shipping docs and deployment output after launch slices are complete

This keeps large apps manageable because the orchestrator works on user-visible feature journeys instead of forcing the entire app through one global build gate.

---

## Command Set

### Core Commands

| Command | What it does |
|---|---|
| `/discover <idea>` | Seeds and refines `docs/concept.md` |
| `/plan` | Generates `foundation.md`, `design-system.md`, `slices.md`, and per-slice briefs |
| `/build next` | Builds the next ready slice from the manifest |
| `/build <SLICE_ID>` | Builds one named slice |
| `/build all` | Builds all slices in dependency order |
| `/resume` | Reports ready, blocked, stale, and complete slices with the next command |
| `/change <description>` | Updates slice docs and marks impacted slices stale |
| `/fix-bugs <all|next|SLICE_ID>` | Runs the stabilization loop for the chosen scope |
| `/ship [all|docs|deploy]` | Produces final docs, deployment config, and release checks |

### Optional Commands

| Command | What it does |
|---|---|
| `/review [scope]` | Manual review of a slice or the ship checkpoint |
| `/checkpoint` | Short progress snapshot for long sessions |

---

## Recommended Flow

```text
/discover <your app idea>
/discover
/plan
/build next
/resume
/build next
/change <if requirements shift>
/fix-bugs next
/build all
/ship
```

Use one workflow per project session.

---

## Slice Model

A slice is a user-visible feature journey that can span:

- backend models or routes
- frontend hooks or services
- one or more pages
- mocked behavioral tests
- live integration coverage

Examples:

- `SLICE-001` - visitor signs up, signs in, and lands on the dashboard
- `SLICE-002` - manager creates a project and sees it in the project list
- `SLICE-003` - finance user exports a report and downloads the file

Slices are tracked in `docs/slices.md` and expanded in `docs/slices/<SLICE_ID>.md`.

---

## Generated Artifacts

| Path | Description |
|---|---|
| `docs/concept.md` | Shared concept and constraints |
| `docs/foundation.md` | Shared data, route, auth, and operational contracts |
| `docs/design-system.md` | Shared visual system plus reusable page rules |
| `docs/slices.md` | Slice manifest with dependencies and status |
| `docs/slices/<SLICE_ID>.md` | One build brief per slice |
| `docs/slice-progress.md` | Execution log by scope and stage |
| `docs/changes.md` | Change log and stale propagation audit trail |

Code generation targets stay the same:

- `templates/api/`
- `templates/app/`

---

## Internal Build Stages

`/build` hides the old numbered phases, but it still works through internal stages:

1. `SCHEMA` - only when the slice changes data models
2. `BACKEND` - API contracts, validation, routes, controllers, middleware
3. `FRONTEND` - copied contracts, services, hooks, pages, states
4. `MOCKED_TESTS` - behavioral frontend checks
5. `LIVE_TESTS` - live-backend integration checks
6. `REVIEW` - targeted review when risk or drift justifies it

These stages are logged in `docs/slice-progress.md`.

---

## State Model

`docs/slice-progress.md` is the canonical execution log.

| Scope | Stage | Meaning |
|---|---|---|
| `FOUNDATION` | `PLAN` | Shared planning outputs are ready |
| `SLICE-xxx` | `SCHEMA`, `BACKEND`, `FRONTEND`, `MOCKED_TESTS`, `LIVE_TESTS`, `REVIEW` | Slice stage state |
| `SHIP` | `REVIEW`, `SHIP` | Release readiness and final output state |

Recommended status values:

- `✅ Complete`
- `⚠️ Stale`
- `🚧 In Progress`
- `⛔ Blocked`
- `⏭️ Skipped`

---

## Stale Propagation

The slice workflow marks work stale at the slice level instead of the phase level.

- Slice brief contract change:
  - stale that slice
  - stale dependent slices when shared contracts changed
- Shared design-system change:
  - stale every slice with frontend pages
- Shared foundation or auth change:
  - stale affected slices and any dependent slices
- Schema-impacting change:
  - stale the edited slice and slices that depend on its models or API contracts
- Ship-only change:
  - keep completed feature slices intact unless runtime requirements changed

---

## Packaged Orchestrator

This project ships the slice workflow under:

- `.ai-slices/`

There is no top-level workspace `.claude/` folder in this standalone package.
