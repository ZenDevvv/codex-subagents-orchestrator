# Discover - App Concept Refinement

Refine the product concept before any slice planning begins. This command maintains the shared `docs/concept.md` file used by the rest of the workflow.

---

## Agent And Skill

Adopt the agent defined in `agents/business-analyst.md`.

Read `skills/DISCOVERY_AND_SLICE_SPEC.md` and follow its concept rules exactly.

---

## Modes

| Invocation | Mode | Behavior |
|---|---|---|
| `/discover <idea>` | Seed + Refine | Add new input, update `docs/concept.md`, and ask targeted follow-up questions |
| `/discover` | Refine Only | Read `docs/concept.md`, identify gaps or contradictions, and ask follow-up questions |

If `$ARGUMENTS` is empty and `docs/concept.md` does not exist, stop and output:

```text
No concept found.

Run /discover <your app idea> first to seed the concept.
```

---

## Gap Analysis

Before asking questions, read the current concept and identify what is clear vs unclear across:

1. Users and roles
2. Core problem and value
3. Launch features
4. Secondary features
5. Required integrations
6. Technical constraints
7. Design preferences
8. Stack and hosting preferences

Prioritize unresolved gaps that would change slice boundaries or dependencies.

---

## Draft First

Before asking any new questions:

1. Create or update `docs/concept.md` with everything already known.
2. Preserve confirmed content.
3. If new input contradicts confirmed content, flag it explicitly and ask the user which version is correct.
4. Never silently overwrite confirmed scope.

Use the concept structure from `DISCOVERY_AND_SLICE_SPEC.md`.

---

## Questions

Ask 2-4 focused follow-up questions only when they materially affect:

- launch scope
- slice boundaries
- auth or role complexity
- critical integrations
- design direction

Prefer specific, answerable questions over open-ended brainstorming.

---

## Completion

After incorporating answers:

1. Update `docs/concept.md`
2. Remove resolved items from `## Open Questions`
3. Output a readiness summary with:
   - what is clear
   - what is still vague
   - whether the project is ready for `/plan`

If there are no meaningful gaps left, end with:

```text
=== CONCEPT COMPLETE ===

The concept is ready for slice planning.

Next step:
/plan
```
