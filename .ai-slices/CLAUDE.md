# AI Dev Orchestrator - Slice Workflow

This project uses the slice-based orchestrator in `.ai-slices/`.

## Start Here

Required first step:

```text
/discover <your app idea>
/discover
```

Then plan and execute slices:

```text
/plan
/build next
/resume
/build <SLICE_ID>
/build all
/change <what changed and why>
/fix-bugs <all|next|SLICE_ID|BUG_DESCRIPTION>
/doctor
/ship
```

Use one workflow per project session.

## Public Commands

| Command | Purpose |
|---|---|
| `/discover` | Refine the app concept and maintain `docs/concept.md` |
| `/plan` | Create the shared foundation, design system, slice manifest, and slice briefs |
| `/build <next\|SLICE_ID\|all>` | Build one slice, the next ready slice, or every slice in order |
| `/resume` | Summarize slice state and give the exact next command |
| `/change <description>` | Update slice docs and mark impacted slices stale |
| `/fix-bugs <all\|next\|SLICE_ID\|BUG_DESCRIPTION>` | Stabilize the generated scaffold for the chosen scope |
| `/ship [all\|docs\|deploy]` | Run final review, documentation, deployment config, and release checks |
| `/doctor` | Audit drift across commands, docs, tests, package scripts, and template contracts |

Optional and internal:

| Command | Purpose |
|---|---|
| `/review [scope]` | Manual review of a slice or release checkpoint |
| `/checkpoint` | Short state summary for long sessions |

## Project Artifacts

| Path | Purpose |
|---|---|
| `docs/concept.md` | Shared app concept, created by `/discover` |
| `docs/foundation.md` | Shared architecture, contracts, auth, and cross-slice rules |
| `docs/design-system.md` | Shared visual system and page-level design rules |
| `docs/design-references/` | UI screenshot and image references consumed by `/plan` and `/build` when present |
| `docs/slices.md` | Slice manifest and dependency order |
| `docs/slices/<SLICE_ID>.md` | One brief per slice |
| `docs/slice-progress.md` | Slice-aware execution log |
| `docs/changes.md` | Audit trail of product changes |
| `.ai-slices/docs/reference/` | Permanent reference implementation notes |

Generated code still lands in:

- `templates/api/`
- `templates/app/`

## Default Behavior

- `/plan` replaces the old BRD, planning, architecture, and full-app design phases.
- `/build` is slice-aware and resumes from current state.
- `/ship` replaces the old docs and deployment finish phases.
- `/doctor` is the deterministic repo-health check.
- `docs/slice-progress.md` is the source of truth for ready, stale, blocked, and complete work.
- Any image in `docs/design-references/` is treated as a UI design reference during `/plan` and `/build`.
- If image references conflict with textual planning artifacts, textual artifacts win.
