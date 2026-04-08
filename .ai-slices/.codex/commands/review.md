# Review - Targeted Slice Or Release Review

Run a manual review on a specific slice or on release readiness.

---

## Codex Subagent Execution

- Main agent owns severity ranking and final findings.
- Optional delegation: one `explorer` subagent for evidence collection in targeted code areas.
- Any delegated task must use the handoff contract in `.ai-slices/docs/codex-subagent-workflow.md`.

## Agent

Adopt the agent defined in `agents/software-architect.md`.

Also use the QA lens from `agents/qa-engineer.md` for test and behavior findings.

---

## Inputs

Read:

- `docs/foundation.md`
- `docs/design-system.md`
- `docs/slices.md`
- `docs/slice-progress.md`
- relevant `docs/slices/<SLICE_ID>.md`
- relevant code under `templates/api/` and `templates/app/`

`$ARGUMENTS` may be:

- a specific `SLICE-xxx`
- `ship`
- empty, in which case infer the highest-risk ready checkpoint

---

## Review Focus

Prioritize findings about:

- auth or permission gaps
- contract drift between backend and frontend
- missing slice acceptance coverage
- stale design-system or foundation assumptions in code
- high-risk runtime or deployment issues for ship readiness

Present findings first, ordered by severity, with file references when possible.

If no findings are discovered, say so explicitly and note any residual testing gaps.
