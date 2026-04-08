# Discovery And Slice Spec

## Purpose

This skill defines how the slice workflow turns an app idea into:

- a refined concept
- a shared foundation
- a shared design system
- a slice manifest
- one brief per slice

It replaces the old split between BRD, planning, and full-app design.

## Core Rules

1. The shared concept lives in `docs/concept.md`.
2. Launch scope must be expressed as user-visible journeys, not a flat module list.
3. A slice must represent one coherent outcome a user can complete and observe.
4. Every launch slice must be independently buildable once its dependencies are complete.
5. Do not create slices that bundle unrelated journeys only because they share a module.
6. Non-launch ideas belong in secondary or out-of-scope sections, not in slice briefs.

## `docs/concept.md` Structure

Use this structure:

```markdown
# App Concept

> Last updated: YYYY-MM-DD - Run N of /discover

## Overview
- **App name:** ...
- **One-line description:** ...
- **Problem solved:** ...

## Users & Roles
...

## Core Features - Must Have (Launch)
...

## Secondary Features - Should Have
...

## Explicit Out of Scope
...

## Monetization
...

## Required Integrations
...

## Technical Constraints
...

## Technical Stack
- **Backend:** ...
- **Frontend:** ...
- **Hosting/Deployment target:** ...
- **Existing tech constraints:** ...

## Design Preferences
...

## Open Questions
...
```

## Slice Definition Rules

A valid slice:

- starts with a user or actor
- ends with a visible outcome
- may span multiple modules and pages
- has explicit dependencies on prior slices only when necessary
- contains its own acceptance, failure cases, and test expectations

Prefer slices like:

- "visitor signs in and reaches the dashboard"
- "manager creates a project and sees it in the list"
- "admin invites a teammate and the invite is accepted"

Avoid slices like:

- "AUTH module"
- "database setup"
- "frontend pages"

## `docs/foundation.md` Structure

`/plan` must generate a shared foundation with:

```markdown
# Product Foundation

## Product Summary
## Launch Scope
## Roles And Permissions
## Shared Auth Model
## Shared Data And Domain Model
## Shared API Contract
## Error And Validation Contract
## Cross-Slice Dependency Map
## Integrations And External Services
## Operational Constraints
## Build Rules
```

This file is for shared contracts only. Per-slice specifics belong in slice briefs.

## `docs/design-system.md` Structure

`/plan` must generate a lightweight but exact shared design system:

```markdown
# Design System

## Visual Direction
## Color Palette
## Typography
## Spacing
## Components And Variants
## Layout Patterns
## Responsive Rules
## State Patterns
## Accessibility Rules
## Design Reference Usage
```

All image files in `docs/design-references/` are UI design references when present.
`Design Reference Usage` should state whether references were found and which visual signals were adopted.

This file should not become a full app-wide wireframe catalog. Slice-specific page detail belongs in slice briefs.

## `docs/slices.md` Structure

The slice manifest must use this table:

```markdown
# Slice Manifest

| Slice ID | Journey | Priority | Depends On | Modules | Pages | Schema Impact | Acceptance | Status |
|----------|---------|----------|------------|---------|-------|---------------|------------|--------|
| SLICE-001 | ... | Launch | - | AUTH, DASHBOARD | LoginPage, DashboardPage | No | Sign in succeeds and dashboard loads | Planned |
```

Rules:

1. `Slice ID` format is `SLICE-001`, `SLICE-002`, and so on.
2. `Depends On` must list slice IDs or `-`.
3. `Schema Impact` is `Yes` or `No`.
4. `Status` is plan-level status, such as `Planned`, `In Progress`, `Complete`, or `Stale`.
5. Every launch slice in the manifest must have a matching brief in `docs/slices/`.

## `docs/slices/<SLICE_ID>.md` Structure

Each slice brief must follow this structure:

```markdown
# SLICE-001 - Slice Title

## Goal
## User Journey
## Dependencies
## Acceptance
## Failure Cases
## Backend Scope
## Frontend Scope
## Data And Schema Impact
## Design Notes
## Test Plan
## Done Criteria
```

## Planning Defaults

- Keep the number of launch slices small enough to reason about.
- Prefer 5-12 launch slices for a typical app unless the concept is very large.
- Treat foundational auth, navigation, and first useful dashboard experience as early slices.
- Use dependency order that preserves working demos, not only technical layering.
