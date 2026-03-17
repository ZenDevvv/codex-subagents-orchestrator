# Plan - Foundation, Design System, And Slice Manifest

Create the shared planning artifacts that make slice execution possible. This command replaces the old BRD, planning, architecture, and full-app design phases.

---

## Agent And Skills

Adopt the agent defined in `agents/software-architect.md`.

Read these skills before proceeding:

- `skills/DISCOVERY_AND_SLICE_SPEC.md`
- `skills/ARCHITECTURE_STANDARD.md`

---

## Required Input

Read `docs/concept.md` in full.

If `docs/concept.md` does not exist, stop and output:

```text
No concept found.

/plan requires docs/concept.md.
Run /discover first, then re-run /plan.
```

---

## Outputs

Generate or refresh all of the following:

- `docs/foundation.md`
- `docs/design-system.md`
- `docs/slices.md`
- `docs/slices/<SLICE_ID>.md` for every launch slice
- `docs/slice-progress.md` if it does not exist

The real project artifacts live in the root `docs/` folder, not in `.ai-slices/docs/`.

---

## Planning Rules

### 1. Foundation

Write `docs/foundation.md` using the shape defined in `DISCOVERY_AND_SLICE_SPEC.md`.

This file must include:

- shared roles and auth model
- shared data and route contracts
- error and validation conventions
- integrations and operational constraints
- cross-slice dependency map
- build rules that all slices must follow

### 2. Design System

Write `docs/design-system.md` as a lightweight shared design system.

It must include exact values or rules for:

- color palette
- typography
- spacing
- component variants
- layout patterns
- responsive behavior
- loading, empty, error, and success-state patterns

Do not turn this into a full wireframe catalog. Page-specific detail belongs in slice briefs.

### 3. Slice Manifest

Write `docs/slices.md` using the exact table schema from `DISCOVERY_AND_SLICE_SPEC.md`:

`Slice ID | Journey | Priority | Depends On | Modules | Pages | Schema Impact | Acceptance | Status`

Rules:

- each launch slice is one user-visible journey
- slice IDs use `SLICE-001` format
- dependencies must be explicit and acyclic
- keep slices small enough to build and validate independently
- set manifest `Status` to `Planned` on first generation

### 4. Slice Briefs

For each launch slice, write `docs/slices/<SLICE_ID>.md` using the defined brief template.

Each brief must include:

- goal
- user journey
- dependencies
- acceptance
- failure cases
- backend scope
- frontend scope
- data and schema impact
- design notes
- test plan
- done criteria

---

## Slice Progress Initialization

Use the canonical format in `docs/slice-progress.md`.

If the file does not exist, create it with the standard header and table.

Then log:

- `FOUNDATION | PLAN | ✅ Complete`
- one `SLICE-xxx | PLAN | ✅ Complete` row for each slice brief created

If `/plan` is re-run and shared contracts change materially:

- mark affected slice rows `⚠️ Stale`
- add concise reasons to the `Notes` column

---

## Review Gate

Before considering `/plan` complete, verify:

- every launch feature in `docs/concept.md` maps to at least one launch slice
- no slice bundles unrelated user journeys
- there are no circular dependencies
- `docs/foundation.md` and `docs/design-system.md` contain only shared rules
- every manifest row has a matching slice brief

---

## Completion Output

At the end, print:

```text
=== PLAN COMPLETE ===

Artifacts created:
- docs/foundation.md
- docs/design-system.md
- docs/slices.md
- docs/slices/<SLICE_ID>.md ...
- docs/slice-progress.md

Next recommended command:
/build next
```
