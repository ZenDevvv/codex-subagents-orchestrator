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
