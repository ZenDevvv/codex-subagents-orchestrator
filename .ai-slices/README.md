# AI Dev Orchestrator - Vertical Slicing Workflow

This package contains the standalone orchestrator used by the repository.

## What This Is

The slice workflow turns a rough app idea into a production-ready scaffold by:

1. refining the concept in `docs/concept.md`
2. planning shared contracts and slice order
3. building one dependency-safe slice at a time
4. stabilizing failures by slice
5. shipping docs and deployment output after launch slices are complete

This repo also ships one permanent reference slice: register, sign in, reach a protected dashboard, and sign out.

## Command Set

### Core Commands

| Command | What it does |
|---|---|
| `/discover <idea>` | Seeds and refines `docs/concept.md` |
| `/plan` | Generates `foundation.md`, `design-system.md`, `slices.md`, and per-slice briefs |
| `/build <next|SLICE_ID|all>` | Builds the next ready slice, one named slice, or all slices in dependency order |
| `/resume` | Reports ready, blocked, stale, and complete slices with the next command |
| `/change <description>` | Updates slice docs and marks impacted slices stale |
| `/fix-bugs <all|next|SLICE_ID|BUG_DESCRIPTION>` | Runs the stabilization loop for the chosen scope |
| `/ship [all|docs|deploy]` | Produces final docs, deployment config, and release checks |
| `/doctor` | Runs deterministic repo drift checks for commands, docs, tests, package scripts, and template contracts |

### Optional Commands

| Command | What it does |
|---|---|
| `/review [scope]` | Manual review of a slice or the ship checkpoint |
| `/checkpoint` | Short state summary for long sessions |

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
/doctor
/build all
/ship
```

Use one workflow per project session.

## Slice Model

A slice is a user-visible feature journey that can span:

- backend models or routes
- frontend hooks or services
- one or more pages
- mocked behavioral tests
- live integration coverage

Examples:

- `SLICE-001` - visitor signs in and lands on the dashboard
- `SLICE-002` - manager creates a project and sees it in the project list
- `SLICE-003` - finance user exports a report and downloads the file

Slices are tracked in `docs/slices.md` and expanded in `docs/slices/<SLICE_ID>.md`.

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
| `.ai-slices/docs/reference/` | Permanent reference implementation notes |

Code generation targets stay the same:

- `templates/api/`
- `templates/app/`

## Internal Build Stages

`/build` still works through internal stages:

1. `SCHEMA`
2. `BACKEND`
3. `FRONTEND`
4. `MOCKED_TESTS`
5. `LIVE_TESTS`
6. `REVIEW`

These stages are logged in `docs/slice-progress.md`.

## State Model

`docs/slice-progress.md` is the canonical execution log.

| Scope | Stage | Meaning |
|---|---|---|
| `FOUNDATION` | `PLAN` | Shared planning outputs are ready |
| `SLICE-xxx` | `SCHEMA`, `BACKEND`, `FRONTEND`, `MOCKED_TESTS`, `LIVE_TESTS`, `REVIEW` | Slice stage state |
| `SHIP` | `REVIEW`, `SHIP` | Release readiness and final output state |

Recommended status values:

- `Complete`
- `Stale`
- `In Progress`
- `Blocked`
- `Skipped`

## Stale Propagation

The workflow marks work stale at the slice level instead of the phase level.

- slice brief contract change:
  - stale that slice
  - stale dependent slices when shared contracts changed
- shared design-system change:
  - stale every slice with frontend pages
- shared foundation or auth change:
  - stale affected slices and dependent slices
- schema-impacting change:
  - stale the edited slice and slices that depend on its models or API contracts
- ship-only change:
  - keep completed feature slices intact unless runtime requirements changed
