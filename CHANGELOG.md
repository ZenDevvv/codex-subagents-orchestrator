# Changelog

All notable changes to AI Dev Orchestrator V2 are documented here.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
Versioning: [Semantic Versioning](https://semver.org/)

---

## [Unreleased]

### Added
- Standalone `ai-dev-orchestrator-v2/` project packaging for the vertical-slicing workflow.
- `.ai-slices/` orchestrator with slice-aware commands, agents, skills, and reference docs.
- Root `docs/` placeholders for slice workflow artifacts and design references.
- Clean starter `templates/` copy without local/generated artifacts.
- Permanent auth-and-dashboard reference slice in the starter templates.
- `/doctor` command plus deterministic audit script for repo drift checks.
- Backend auth contract tests and mocked/live Playwright reference coverage.
- Codex subagent workflow contract at `.ai-slices/docs/codex-subagent-workflow.md`.

### Changed
- `/fix-bugs` command interface now accepts bug descriptions in addition to `all`, `next`, and `SLICE_ID`.
- `/plan` and `/build` now explicitly consume images in `docs/design-references/` as UI references when present.
- Added precedence rule: textual planning artifacts win when image references conflict with `foundation`, `design-system`, or slice brief requirements.
- Migrated command prompt surface from the legacy command directory to `.ai-slices/.codex/commands/`.
- Replaced the legacy orchestrator guide with `.ai-slices/CODEX.md` as the codex-native workflow guide.
- Updated doctor drift checks to enforce Codex command-surface parity and reject legacy Claude references.

### Notes
- V2 is intentionally separate from the original `ai-dev-orchestrator` project.
- The root project remains the classic phase-based orchestrator.

---

## [0.1.0] - 2026-03-17

### Added
- Initial standalone packaging of the vertical-slicing orchestrator.
- Command surface:
  - `/discover`
  - `/plan`
  - `/build <next|SLICE_ID|all>`
  - `/resume`
  - `/change <description>`
  - `/fix-bugs <all|next|SLICE_ID>`
  - `/ship [all|docs|deploy]`
- Slice workflow docs and templates under `.ai-slices/`.
- Root docs placeholders and clean backend/frontend starter templates.
