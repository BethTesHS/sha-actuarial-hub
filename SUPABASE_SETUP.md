# Supabase setup — SHA Actuarial Hub

This project uses a **dedicated Supabase project** (separate from KAFS). Schema is versioned under `supabase/migrations/`.

## 1. Create the SHA project

1. [Supabase Dashboard](https://supabase.com/dashboard) → **New project**.
2. Note the **Project URL** and **anon public** key for `.env`.

## 2. Apply database migrations

Install [Supabase CLI](https://supabase.com/docs/guides/cli), then from this folder:

```bash
supabase login
supabase link --project-ref YOUR_SHA_PROJECT_REF
npm run db:push
```

Or paste the SQL files in `supabase/migrations/` into the SQL Editor (in order).

## 3. Auth URL configuration

**Authentication → URL configuration**

- **Site URL:** `http://localhost:5173`
- **Redirect URLs:**
  - `http://localhost:5173/auth/callback`
  - `http://localhost:5173/reset-password`

**Email templates:** Reset password link should pass recovery tokens, e.g.  
`{{ .SiteURL }}/reset-password#access_token={{ .Token }}&refresh_token={{ .RefreshToken }}&type=recovery`

Enable the **Email** provider.

## 4. Storage buckets

Migrations create:

| Bucket | Public | Notes |
|--------|--------|--------|
| `Training Modules` | Yes | Course PDFs/XLSX — copy from KAFS (see below) |
| `submissions` | No | Assignment uploads (starts empty) |
| `avatars` | No | Profile images (starts empty) |

### Copy training files from KAFS

Set service-role keys in **sha-actuarial-hub** `.env` (see `.env.example`), then from that folder:

```bash
npm run storage:copy-training
```

The script loads `.env` automatically (plain `node` does not). Run the command from `sha-actuarial-hub`, not from `kafs-training-module`.

**Resume (default):** Re-running skips files already on SHA (same size). Large uploads resume via TUS state in `.tus-uploads/`. To force a full re-upload, set `COPY_FRESH=true` in `.env`.

This copies **modules 1–9** only (top-level folders such as `Module 1_Data Clean Up`, …, `Module 9_FCR`) from KAFS `Training Modules` → SHA `Training Modules`. User data, other modules, and submissions are **not** copied.

To change which folders are copied, edit `DEFAULT_MODULE_FOLDERS` in `scripts/copy-training-storage.mjs`, or set `COPY_MODULE_FOLDERS` in `.env` as a comma-separated list.

**Large files (>50 MB):** Run migration `20250519000004_increase_training_modules_file_limit.sql` (or SQL below) so the bucket allows up to 500 MB. The copy script uses resumable uploads automatically for large objects.

```sql
update storage.buckets set file_size_limit = 524288000 where id = 'Training Modules';
```

## 5. Frontend environment

```bash
cp .env.example .env
# Edit VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
npm install
npm run dev
```

## 6. First admin user

After sign-up, promote a user in SQL Editor:

```sql
update public.profiles
set role = 'admin', verification_status = 'approved'
where email = 'your-admin@example.com';
```

Super admin UI: `/superadmin/login` (uses same Supabase auth; requires `profiles.role = 'admin'`).
