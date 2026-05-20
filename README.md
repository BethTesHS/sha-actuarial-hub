# SHA Actuarial Hub

Actuarial training platform (functional parity with KAFS Training Module) with **SHA** branding and a **dedicated Supabase** backend.

## Quick start

1. Copy `.env.example` → `.env` and set Supabase + optional Gemini keys.
2. Follow [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) to create the project, run migrations, and copy training files from KAFS.
3. `npm install` → `npm run dev` → open `http://localhost:5173`

## Routes

| Path | Description |
|------|-------------|
| `/` | Public landing |
| `/SHAAuth` | Sign in / sign up |
| `/SHADashboard` | Main hub (after login) |
| `/SHAmodules` or `/modules` | Module gallery |
| `/modules/:id` | Module content, quizzes, assignments |
| `/superadmin/login` | Admin console |

## Stack

React 19, Vite, Tailwind, Supabase (auth, Postgres, storage), Gemini (client-side AI quiz grading).
