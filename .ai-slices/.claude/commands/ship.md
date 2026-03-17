# Ship - Final Review, Docs, And Deployment

Finalize the project once launch slices are complete.

---

## Agent And Skill

Adopt the agent defined in `agents/release-engineer.md`.

Read `skills/SHIP_STANDARD.md` before proceeding.

---

## Parse Scope

`$ARGUMENTS` may be:

- `all`
- `docs`
- `deploy`

If omitted, default to `all`.

---

## Required Inputs

Read these files before proceeding:

- `docs/foundation.md`
- `docs/design-system.md`
- `docs/slices.md`
- `docs/slice-progress.md`
- `docs/changes.md` if it exists

Also inspect the generated project under:

- `templates/api/`
- `templates/app/`

---

## Preconditions

Before shipping:

1. All launch slices in `docs/slices.md` must be complete.
2. `docs/slice-progress.md` must contain no required launch-slice rows marked `⚠️ Stale` or `⛔ Blocked`.
3. If preconditions fail, stop and tell the user which slices still need work.

---

## Ship Tasks

### Final Review

For `all`, always perform a final release review:

- auth continuity
- API contract drift
- stale docs or env assumptions
- missing deploy prerequisites
- launch-blocking test or runtime risks

Log:

- `SHIP | REVIEW | ✅ Complete` if ready
- or `SHIP | REVIEW | ⛔ Blocked` if blockers remain

### Docs Scope

When scope is `all` or `docs`, generate or refresh:

- project `README.md`
- API documentation
- onboarding or setup guide
- environment variable documentation
- release checklist

### Deploy Scope

When scope is `all` or `deploy`, generate or refresh:

- Dockerfiles
- Docker Compose
- CI/CD config
- `.env.example` files
- health checks and deploy notes

---

## Progress Updates

When the selected ship scope succeeds, log:

- `SHIP | SHIP | ✅ Complete`

If a blocker remains, log:

- `SHIP | SHIP | ⛔ Blocked`

with the blocker reason.

---

## Completion Output

Print:

- ship scope completed
- blockers found or cleared
- generated release artifacts
- next verification steps for the user
