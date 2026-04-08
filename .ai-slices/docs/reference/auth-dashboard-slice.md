# Reference Slice - Auth And Dashboard

This document is the permanent reference implementation for the canonical slice used by this repo.

## Scope

- Public landing page explains the reference slice and links to register and login.
- `POST /api/auth/register` accepts the minimal public signup contract:
  - `firstName`
  - `lastName`
  - `email`
  - `userName`
  - `password`
- `POST /api/auth/login` accepts:
  - `identifier`
  - `password`
- `GET /api/user/current` bootstraps protected frontend state.
- `/dashboard` renders only when an authenticated user is present.
- Sign out clears local session state and returns the user to `/login`.

## Template Files

- Frontend routes:
  - `templates/app/app/routes/landing.tsx`
  - `templates/app/app/routes/auth/register.tsx`
  - `templates/app/app/routes/auth/login.tsx`
  - `templates/app/app/routes/dashboard.tsx`
- Frontend state and services:
  - `templates/app/app/context/auth/auth-provider.tsx`
  - `templates/app/app/services/auth-service.ts`
  - `templates/app/app/services/user-service.ts`
- Backend contract:
  - `templates/api/zod/auth.zod.ts`
  - `templates/api/app/auth/auth.controller.ts`
  - `templates/api/app/auth/auth.router.ts`
- Verification:
  - `templates/api/tests/auth-contract.spec.ts`
  - `templates/app/tests/e2e/auth-mocked.spec.ts`
  - `templates/app/tests/e2e/auth-live.spec.ts`

## Expected Slice Stages

- `SCHEMA`: skipped for the reference slice
- `BACKEND`: complete when public auth and current-user contracts match the slice doc
- `FRONTEND`: complete when register, login, dashboard, and logout are reachable and visible
- `MOCKED_TESTS`: complete when the mocked Playwright flow passes with `@slice-mocked`
- `LIVE_TESTS`: complete when the live Playwright flow passes with `@slice-live` and a real backend is available
- `REVIEW`: run when auth or shared contract changes are introduced

## Acceptance

- Registration does not expose role selection.
- Login accepts email or username through `identifier`.
- Protected routing depends on session bootstrap, not hard-coded redirects from public pages.
- The dashboard visibly confirms the authenticated user and the purpose of `/doctor`.
