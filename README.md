# Cozy & Caffeinated

A personal blog/photography site — autumn-and-coffee, hand-written,
unhurried. Next.js (App Router) + TypeScript + Tailwind, content in Postgres
(Neon) via Drizzle, photo uploads via Vercel Blob, a single-admin `/admin`
area gated by NextAuth.

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Create a `.env.local` (never committed — already git-ignored) with:

| Variable | Where it comes from |
|---|---|
| `DATABASE_URL` | Neon project connection string |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob store, from the project's Storage tab |
| `AUTH_SECRET` | random value — generate with `npx auth secret` |
| `ADMIN_EMAIL` | the one admin login's email |
| `ADMIN_PASSWORD_HASH` | bcrypt hash of the admin password — generate once, e.g. `node -e "console.log(require('bcryptjs').hashSync('your-password', 10))"`; the plaintext password itself is never stored anywhere |

The app won't boot correctly without all five set.

## Admin area

`/admin` manages posts, gallery photos, and the sidebar's "Right Now"
(currently reading / drinking) widget — all stored in the database, editable
without a code change or redeploy. Everything else (nav links, social
links, footer copy, the About page's bio text) is plain code in
`src/config/site.ts` and the page files themselves, changed the normal way.

Log in at [http://localhost:3000/login](http://localhost:3000/login) with
the `ADMIN_EMAIL`/password pair above.

## Commands

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run lint` — ESLint

Deploy: push to `main`; Vercel builds and deploys automatically once the
repo is linked (all five environment variables above must also be set in
the Vercel project's settings).

## TODO

- Replace the default favicon with a real one.
