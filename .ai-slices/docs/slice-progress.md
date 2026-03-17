# Slice Progress Tracker

<!--
Canonical logging spec for the slice workflow.

1) If this file does not exist, create it with the standard header/table below.
2) Every row uses exactly 5 columns:
   | Scope | Stage | Status | Timestamp | Notes |
3) Timestamp format is local datetime: YYYY-MM-DD HH:mm:ss
4) Valid Scope values:
   - FOUNDATION
   - SLICE-xxx
   - SHIP
5) Valid Stage values:
   - PLAN
   - SCHEMA
   - BACKEND
   - FRONTEND
   - MOCKED_TESTS
   - LIVE_TESTS
   - REVIEW
   - SHIP
6) Recommended Status values:
   - ✅ Complete
   - ⚠️ Stale
   - 🚧 In Progress
   - ⛔ Blocked
   - ⏭️ Skipped
7) Update matching rows when a completed stage becomes stale.
-->

| Scope | Stage | Status | Timestamp | Notes |
|-------|-------|--------|-----------|-------|
