# Fermor Vercel Deployment Checklist

Follow this step-by-step checklist to deploy the Fermor Next.js application to Vercel.

---

## Pre-Deployment Verification

- [x] All 11 page sections implemented in exact prompt order
- [x] Unit tests passing (`npm run test`)
- [x] Production build succeeding without TypeScript or lint errors (`npm run build`)
- [x] All URL links point strictly to real `fermor.in` slugs
- [x] Database fallback tested (works seamlessly with or without `DATABASE_URL`)

---

## Vercel Deployment Steps

### 1. Push Code to Git
Push your repository to GitHub, GitLab, or Bitbucket.

### 2. Import Project into Vercel
1. Log into your [Vercel Dashboard](https://vercel.com).
2. Click **Add New...** → **Project**.
3. Select the `fermor` repository.

### 3. Configure Environment Variables
In the Vercel project configuration, add the following environment variables under **Environment Variables**:

| Variable Key | Recommended Value / Description |
| :--- | :--- |
| `DATABASE_URL` | Neon Postgres connection URI (`postgres://...sslmode=require`) |
| `NEXT_PUBLIC_APP_URL` | Your production Vercel URL (e.g. `https://fermor.vercel.app`) |

### 4. Deploy
Click **Deploy**. Vercel will build the App Router project and generate edge static pages & route handlers.

### 5. Post-Deployment Checks
- Test live scenario sharing: move sliders on Hero Working Tape and click **"Share this working"** to verify `/s/[slug]` permalink generation.
- Test newsletter subscription: enter an email address in the final band.
- Audit mobile responsiveness at 360px width.
