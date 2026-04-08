# Doctor - Repo Drift Audit

Audit orchestrator docs, template contracts, and test conventions for drift.

---

## Required Inputs

Read these files before proceeding:

- `README.md`
- `.ai-slices/README.md`
- `.ai-slices/CLAUDE.md`
- `templates/api/README.md`
- `templates/app/README.md`
- `.ai-slices/docs/reference/`

---

## Execution

Run:

```text
node .ai-slices/scripts/doctor.mjs
```

---

## What To Check

The script is the deterministic source of truth for:

- command-surface parity
- command file existence
- legacy phase-tag drift
- slice tag coverage
- broken package script file references
- backend README module drift
- auth contract drift
- markdown encoding corruption
- placeholder drift in permanent reference docs

---

## Output

If the script fails:

1. Report findings ordered by severity.
2. Include exact file paths.
3. State the smallest credible fix path.

If the script passes, print a concise clean-health summary and recommend the next workflow command based on the current repo state.
