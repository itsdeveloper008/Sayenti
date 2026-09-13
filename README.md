# Sayenti

Ultra-modern marketing site for Sayenti - a UK Managed Security Service Provider.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4 + shadcn/ui
- Framer Motion
- Firebase Firestore (risk review form)
- lucide-react

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Copy `.env.example` → `.env.local` and fill Firebase keys for production form submissions.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_FIREBASE_*` | Client Firebase config; writes to `riskReviews` collection |
| `NEXT_PUBLIC_CALENDLY_URL` | Optional calendar embed on `/risk-review` |

Without Firebase env vars, the risk review form still validates and succeeds in development (submissions are logged to the console).

### Firestore

Create a collection `riskReviews` and allow authenticated/admin reads with create-only from the web, or use security rules appropriate for your project. Example create-only rule (tighten before production):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /riskReviews/{id} {
      allow create: if request.resource.data.keys().hasAll([
        'name', 'company', 'email', 'phone', 'companySize', 'painPoint'
      ]);
      allow read, update, delete: if false;
    }
  }
}
```

## Scripts

- `npm run dev` - local development
- `npm run build` - production build
- `npm run start` - serve production build
- `npm run lint` - ESLint

## Site map

- `/` - Homepage
- `/about` · `/services` · `/services/[slug]` · `/approach` · `/partners` · `/clients` · `/clients/[slug]`
- `/risk-review` - primary conversion form
- `/privacy` · `/terms` - placeholder legal pages
