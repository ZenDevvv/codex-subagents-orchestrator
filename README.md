# AI Dev Orchestrator V2

Vertical-slicing version of AI Dev Orchestrator, packaged as a standalone project that can be moved into its own repository.

This project keeps the orchestrator under `.ai-slices/`, generated workflow artifacts under `docs/`, and starter application templates under `templates/`.

---

## What This Is

V2 replaces the long numbered phase chain with feature-journey slices.

The workflow is:

1. refine the app concept
2. plan the shared foundation and slice manifest
3. build one dependency-safe slice at a time
4. stabilize failures by slice
5. ship docs and deployment config after launch slices are complete

A slice is one user-visible outcome, such as:

- visitor signs up, signs in, and reaches the dashboard
- manager creates a project and sees it in the project list
- finance user exports a report and downloads the file

---

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

Optional support commands:

| Command | Purpose |
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

Use one workflow per project session. Do not mix this slice workflow with the legacy phase-based orchestrator from the original project.

---

## Project Layout

```text
ai-dev-orchestrator-v2/
├── .ai-slices/               # standalone vertical-slicing orchestrator
├── docs/                     # generated workflow artifacts
├── templates/
│   ├── api/                  # backend starter template
│   └── app/                  # frontend starter template
├── README.md
├── CHANGELOG.md
└── .gitignore
```

### `.ai-slices/`

Contains:

- `CLAUDE.md`
- `.claude/commands/`
- `agents/`
- `skills/`
- reference docs for the workflow

### `docs/`

Contains the project artifacts maintained by the workflow:

- `concept.md`
- `foundation.md`
- `design-system.md`
- `slices.md`
- `slice-progress.md`
- `changes.md`
- `slices/SLICE_TEMPLATE.md`
- `design-references/`

### `templates/`

Generated code still lands directly in:

- `templates/api/`
- `templates/app/`

---

## Slice State Model

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

## Packaging Notes

- This folder is intentionally standalone and ready to be moved into its own repository.
- There is no top-level `.claude/` folder in v2.
- Template copies are cleaned of local/generated artifacts such as `node_modules`, Playwright reports, caches, and test-result output.
- The original root project is left unchanged and remains the classic orchestrator.
