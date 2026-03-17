# Change - Update Scope And Propagate Staleness

Use this command whenever requirements, shared contracts, or shared design rules change after planning.

---

## Agents And Skills

Adopt the agent defined in `agents/business-analyst.md`, then switch to `agents/software-architect.md` for shared-contract and stale-propagation decisions.

Read these skills before proceeding:

- `skills/DISCOVERY_AND_SLICE_SPEC.md`
- `skills/ARCHITECTURE_STANDARD.md`

---

## Required Inputs

Read these files before proceeding:

- `docs/concept.md`
- `docs/foundation.md`
- `docs/design-system.md`
- `docs/slices.md`
- `docs/slice-progress.md`
- `docs/changes.md` if it exists

The user input is: `$ARGUMENTS`

If the change description is ambiguous, ask for clarification before editing any docs.

---

## Step 1 - Update Source Docs

Apply the change to the appropriate artifacts:

- update `docs/concept.md` if product intent changed
- update `docs/foundation.md` if shared auth, shared routes, shared models, or shared operational rules changed
- update `docs/design-system.md` if shared design rules changed
- update `docs/slices.md` if slice order, dependencies, or status assumptions changed
- update every impacted `docs/slices/<SLICE_ID>.md`

Preserve stable `SLICE-xxx` IDs whenever possible. Only introduce new IDs when adding net-new slices.

---

## Step 2 - Determine Stale Propagation

Use these rules:

- Slice brief change:
  - mark that slice stale
  - mark dependent slices stale if contracts changed
- Shared design-system change:
  - mark all slices with frontend pages stale
- Foundation, auth, or route-contract change:
  - mark all affected slices stale
  - mark dependent slices stale
- Schema-impacting change:
  - mark the edited slice stale
  - mark slices depending on its models or API contracts stale
- Ship-only change:
  - do not stale completed feature slices unless runtime requirements changed

Update `docs/slice-progress.md` by turning matching `✅ Complete` rows into `⚠️ Stale` with a concise reason and timestamp.

If the change impacts final release behavior, also mark `SHIP` rows stale.

---

## Step 3 - Log The Change

Append a new entry to `docs/changes.md`:

```markdown
## CHG-xxx - YYYY-MM-DD

**Trigger:** ...
**Change:** ...
**Reason:** ...
**Foundation impact:** ...
**Slices updated:** ...
**Stale propagation:** ...
**Recommended next command:** ...
```

---

## Step 4 - Output Impact Report

Print:

- what changed
- which docs were updated
- which slices became stale
- which slices remain unaffected
- the exact next build command to run

Do not implement code changes in this command.
