# QA Standard

## Purpose

Defines behavioral verification for slice builds.

## Principles

1. Test behavior, not implementation details.
2. Trace tests back to slice acceptance and failure cases.
3. Separate mocked verification from live integration.
4. Cover auth boundaries wherever a slice changes protected behavior.

## Mocked Verification

Use mocked UI tests for fast slice validation.

Rules:

- tag mocked tests with `@slice-mocked`
- assert on visible outcomes and user actions
- cover loading, empty, error, and populated states
- stub only what is necessary for the slice under test

Run:

```text
cd templates/app
npm run typecheck
npm run build
npm run test:mocked
```

## Live Verification

Use live integration tests when the slice changes real backend behavior.

Rules:

- tag live tests with `@slice-live`
- do not stub core app API traffic
- cover authenticated mutations when the slice introduces them
- verify the outcome is visible in the next read step
- gate live runs behind explicit environment setup when the backend is optional in local development

Run:

```text
cd templates/app
npm run typecheck
npm run build
npm run test:live
```

## Review Focus

Prioritize findings about:

- missing acceptance coverage
- auth or permission drift
- brittle mocks that hide real issues
- missing error-path verification
