# App Template

Frontend starter for the slice workflow. Built with React Router v7, TypeScript, Tailwind CSS, and shadcn/ui.

## Stack

- React Router v7
- TypeScript
- Tailwind CSS + shadcn/ui
- TanStack Query
- Zod for copied contracts
- Fetch-based shared API client
- Playwright for end-to-end checks

## Current Reference Slice

The starter now ships one canonical auth slice:

- public landing page
- register page
- login page
- protected dashboard
- logout flow

Core files:

- `app/routes/landing.tsx`
- `app/routes/auth/register.tsx`
- `app/routes/auth/login.tsx`
- `app/routes/dashboard.tsx`
- `app/context/auth/auth-provider.tsx`
- `tests/e2e/auth-mocked.spec.ts`
- `tests/e2e/auth-live.spec.ts`

## Quick Start

```bash
npm install
npm run dev
```

Set the API base URL with `VITE_BASE_URL` when needed. By default the app targets `http://localhost:3000/api`.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the React Router dev server |
| `npm run dev:e2e` | Start the frontend on the fixed Playwright port |
| `npm run build` | Build for production |
| `npm run start` | Start the production server |
| `npm run typecheck` | Run route type generation and TypeScript checks |
| `npm run lint` | Run ESLint |
| `npm run frontend:check` | Run typecheck and production build |
| `npm run test:e2e` | Run Playwright E2E tests |
| `npm run test:smoke` | Run the Playwright smoke suite |
| `npm run test:mocked` | Run mocked slice coverage |
| `npm run test:live` | Run live slice coverage |

## Playwright Conventions

Use slice tags, not legacy phase tags:

```bash
# Mocked slice coverage
npm run test:mocked

# Live integration coverage
E2E_ENABLE_LIVE=1 npm run test:live
```

The live test expects:

- `E2E_ENABLE_LIVE=1`
- an available backend at `http://127.0.0.1:3000` by default, or `E2E_API_BASE_URL`

Without that flag, the live test skips cleanly by design.
