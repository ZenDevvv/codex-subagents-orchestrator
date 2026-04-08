# Codex Subagent Workflow

This document defines how the slice workflow uses Codex subagents.

## Delegation Model

- Main agent always owns critical-path decisions, final artifact edits, and status transitions.
- Use subagents only for bounded work with explicit write ownership.
- Prefer `explorer` for read-heavy discovery and `worker` for implementation patches.
- Do not delegate unresolved product or architecture decisions.

## Command Policy

| Command | Main Agent Responsibility | Allowed Subagent Pattern |
|---|---|---|
| `/discover` | finalize concept edits and open questions | optional single `explorer` for gap analysis |
| `/plan` | finalize foundation, design system, slice boundaries, dependency map | optional single `explorer` for traceability checks |
| `/build` | select scope, enforce stage order, merge outputs, run gates, update progress state | parallel `worker` agents only with disjoint ownership (`templates/api/**`, `templates/app/**`, tests) |
| `/resume` | derive ready/stale/blocked/complete state and exact next command | no delegation by default |
| `/change` | finalize doc updates and stale propagation | optional single `explorer` for impact scan |
| `/fix-bugs` | resolve scope token/description and choose stabilization order | one `worker` by default; parallel workers only for disjoint failures |
| `/review` | severity ranking and final findings report | optional single `explorer` for evidence collection |
| `/ship` | enforce ship preconditions and final blocker calls | optional explorers for docs/env and deploy drift checks |
| `/doctor` | run deterministic doctor script and interpret results | optional single `explorer` to group fixes from failures |
| `/checkpoint` | short state snapshot | no delegation |

## Delegated Task Handoff Contract

Every delegated task should include:

```markdown
scope: <slice/stage/goal>
owned_paths:
  - <path or glob>
inputs:
  - <doc/code artifacts to read first>
acceptance_checks:
  - <exact command(s) or verification condition(s)>
done_definition:
  - <what must be true before returning>
report_format:
  - changed_files: [...]
  - summary: <short outcome>
  - blockers: <none or list>
```

## Ownership Rules

- Do not overlap `owned_paths` across concurrent `worker` tasks.
- Workers must not revert edits outside their owned paths.
- Main agent is responsible for conflict resolution and final integration.

## Defaults

- If delegation value is low, execute locally in the main agent.
- If command state is ambiguous, stop delegation and resolve ambiguity in the main agent first.
