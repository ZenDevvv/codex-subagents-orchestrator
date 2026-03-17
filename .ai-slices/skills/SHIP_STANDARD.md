# Ship Standard

## Purpose

Defines the final release pass once launch slices are complete.

## Ship Preconditions

Before shipping:

1. All launch slices are `✅ Complete` in `docs/slice-progress.md`.
2. No required slice is `⚠️ Stale` or `⛔ Blocked`.
3. Core backend and frontend checks pass.

## Ship Outputs

`/ship` should produce:

- final review summary
- root README updates if needed
- API and onboarding documentation
- environment templates
- deployment configuration
- release checklist

## Deployment Rules

- no secrets in source-controlled config
- pin runtime versions
- include health checks
- document required environment variables
- make local and deployment commands explicit

## Documentation Rules

- document only implemented launch features
- keep setup instructions executable
- reflect real routes, env vars, and scripts

## Final Review Focus

Prioritize:

- stale scope or contract drift
- missing env files or deployment prerequisites
- launch-blocking auth, data, or runtime issues
