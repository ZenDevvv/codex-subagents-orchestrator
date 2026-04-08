# API Template

Backend starter for the slice workflow. Built with TypeScript, Express 5, Prisma for MongoDB, and Zod.

## Stack

- Node.js + TypeScript
- Express 5
- Prisma ORM (MongoDB)
- Zod for request validation
- Redis for optional caching
- Swagger/OpenAPI docs
- Mocha for backend tests

## Registered Modules

The starter currently wires these modules in `index.ts`:

- `auth`
- `user`
- `person`
- `notification`
- `template`

Other folders in `app/` should be treated as scaffold until they are explicitly registered.

## Canonical Auth Slice

The permanent reference slice uses these backend contracts:

- `POST /api/auth/register`
  - body: `firstName`, `lastName`, `email`, `userName`, `password`
  - server assigns `role: "user"`
- `POST /api/auth/login`
  - body: `identifier`, `password`
- `POST /api/auth/logout`
- `GET /api/user/current`

## Quick Start

```bash
npm install
```

Create `.env`:

```env
PORT=3000
DATABASE_URL=mongodb://localhost:27017/your-db
JWT_SECRET=replace_with_secure_secret
REDIS_URL=redis://localhost:6379
CORS_ORIGINS=http://localhost:5173
CORS_CREDENTIALS=true
```

Run locally:

```bash
npm run prisma-generate
npm run dev
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Bundle the API with webpack |
| `npm run test` | Run Mocha contract tests |
| `npm run lint` | Run ESLint |
| `npm run export-docs` | Generate OpenAPI and Postman output |
| `npm run prisma-generate` | Generate Prisma client |

## Reference Files

- `app/auth/`
- `app/user/`
- `zod/auth.zod.ts`
- `tests/auth-contract.spec.ts`

## Docker

```bash
docker compose up -d --build
```

See `docs/DOCKER_SETUP.md` for deployment details.
