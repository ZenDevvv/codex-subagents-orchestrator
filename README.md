# AI Dev Orchestrator V2

Standalone vertical-slicing orchestrator packaged with generated-workflow docs and starter frontend/backend templates.

This repository keeps:

- orchestrator prompts and guidance under `.ai-slices/`
- generated workflow artifacts under `docs/`
- starter applications under `templates/`

## What This Is

V2 replaces a long phase chain with user-visible feature slices.

The intended workflow is:

1. refine the app concept
2. plan shared contracts and slice order
3. build one dependency-safe slice at a time
4. stabilize slice failures where they appear
5. ship docs and deployment output after launch slices are complete

This package now includes a permanent reference slice:

- register
- sign in
- reach a protected dashboard
- sign out

The reference slice exists to prove that the orchestrator, templates, and tests stay aligned.

## Command Surface

The orchestrator prompts live in `.ai-slices/.claude/commands/`.

Public commands:

| Command | Purpose |
|---|---|
| `/discover` | Refine `docs/concept.md` |
| `/plan` | Generate `docs/foundation.md`, `docs/design-system.md`, `docs/slices.md`, and slice briefs |
| `/build <next|SLICE_ID|all>` | Build one slice, the next ready slice, or all slices in order |
| `/resume` | Report ready, stale, blocked, and complete slices with the exact next command |
| `/change <description>` | Update slice docs and mark impacted slices stale |
| `/fix-bugs <all|next|SLICE_ID>` | Stabilize the chosen slice scope |
| `/ship [all|docs|deploy]` | Run final review, documentation, deployment config, and release checks |
| `/doctor` | Audit repo drift across commands, docs, tests, package scripts, and template contracts |

Optional support commands:

| Command | Purpose |
|---|---|
| `/review [scope]` | Manual review of a slice or the ship checkpoint |
| `/checkpoint` | Short progress snapshot for long sessions |

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

Use one workflow per project session. Do not mix this slice workflow with the legacy phase-based orchestrator from the original project.

## Project Layout

```text
ai-dev-orchestrator-v2/
|-- .ai-slices/               # standalone vertical-slicing orchestrator
|-- docs/                     # generated workflow artifacts
|-- templates/
|   |-- api/                  # backend starter template
|   `-- app/                  # frontend starter template
|-- README.md
|-- CHANGELOG.md
`-- .gitignore
```

### `.ai-slices/`

Contains:

- `CLAUDE.md`
- `.claude/commands/`
- `agents/`
- `skills/`
- `scripts/doctor.mjs`
- permanent reference docs for the workflow

### `docs/`

Contains the project artifacts maintained by the workflow:

- `concept.md`
- `foundation.md`
- `design-system.md`
- `slices.md`
- `slice-progress.md`
- `changes.md`
- `slices/SLICE_TEMPLATE.md`

### `templates/`

Generated code lands directly in:

- `templates/api/`
- `templates/app/`

The current starter proves one canonical slice in code and tests:

- `templates/app/app/routes/auth/register.tsx`
- `templates/app/app/routes/auth/login.tsx`
- `templates/app/app/routes/dashboard.tsx`
- `templates/api/app/auth/`
- `templates/app/tests/e2e/auth-mocked.spec.ts`
- `templates/app/tests/e2e/auth-live.spec.ts`

## Slice State Model

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

## Packaging Notes

- This folder is intentionally standalone and ready to move into its own repository.
- There is no top-level `.claude/` folder in V2.
- Template copies are cleaned of local and generated artifacts such as `node_modules`, Playwright reports, caches, and test-result output.
- `/doctor` is the deterministic repo-health command for ongoing maintenance.
