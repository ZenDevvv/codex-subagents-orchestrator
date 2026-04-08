# Resume - Slice State Summary

Summarize the current slice workflow state and tell the user the exact next command to run.

---

## Codex Subagent Execution

- Main agent should execute this command directly.
- Do not delegate unless the progress log is unusually large and requires focused parsing.

## Required Inputs

Read these files if they exist:

- `docs/concept.md`
- `docs/foundation.md`
- `docs/design-system.md`
- `docs/slices.md`
- `docs/slice-progress.md`
- `docs/changes.md`

---

## State Derivation

Use `docs/slice-progress.md` as the execution source of truth.

### Complete slice

A slice is complete when:

- its required stages are `✅ Complete`
- none of its required stages are `⚠️ Stale` or `⛔ Blocked`

### Stale slice

A slice is stale when any of its required stages is `⚠️ Stale`.

### Ready slice

A slice is ready when:

- it is not complete
- it is not blocked by stale or incomplete dependencies
- all dependency slices are complete

### Blocked slice

A slice is blocked when:

- a required dependency is incomplete or stale
- a stage row is marked `⛔ Blocked`

---

## Output Format

Print a concise summary with:

1. Project status
2. Foundation status
3. Ready slices
4. Stale slices
5. Blocked slices
6. Complete slices
7. Ship readiness
8. Exact next command

If no slices are planned yet, recommend `/plan`.

If a slice is ready, recommend `/build next`.

If only stale slices remain, recommend the first stale slice to rebuild.

If all launch slices are complete, recommend `/ship`.
