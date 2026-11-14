This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Waitlist

While booking is paused, every Book button on the site opens a waitlist form
(name, phone, service). Signups are saved to a database so Milena can text
everyone when booking reopens.

### Where the list lives

A Neon Postgres database, `milenasbeautybar-waitlist`, connected to the site
through **Vercel → Storage**. It has two branches:

- `main`: the live list. The live site saves here.
- `dev`: a copy for local development and tests.

### Reading the list

1. In Vercel, open **Storage**, pick `milenasbeautybar-waitlist`, then **Open in Neon**.
2. In Neon, open the **SQL Editor** and make sure the branch is `main`.
3. Run:

   ```sql
   select name, phone, service, created_at from waitlist order by created_at;
   ```

4. To save it as a spreadsheet, use the export/download button on the results
   and choose CSV.

### Cleaning up test signups

When testing a preview deployment, sign up with a name starting with `TEST`.
To delete those rows afterwards (SQL Editor, branch `main`):

```sql
delete from waitlist where name like 'TEST%';
```

### Switching booking back to Acuity

In TinaCMS (`/admin`), open **Booking**, set **Mode** to **Acuity**, and save.
Tina commits the change to `main` and Vercel redeploys; a couple of minutes
later every Book button goes straight to Acuity again and the banner's
"Join the waitlist" link is gone. Set it back to **Waitlist** to undo. The
Acuity links themselves are unchanged (in the code, and in each service and
review in TinaCMS).

### After booking reopens

Once everyone on the list has been texted, delete the data in the Neon SQL
Editor on `main`:

```sql
delete from waitlist;
```

or remove the table entirely with `drop table waitlist;` (do the same on `dev`).

### Spam protection

- A hidden "website" field (a honeypot): bots that fill it in get a fake
  success and nothing is saved.
- `/api/waitlist` only accepts posts from this site's own addresses
  (`lib/origin.ts`).
- A Vercel Firewall rule (set in the Vercel dashboard, not in code) allows
  5 requests per minute per IP to `/api/waitlist`.

### For developers

- **Local setup:** copy `.env.example` to `.env.local` and set `DATABASE_URL`
  to the Neon `dev` branch's pooled connection string. Never commit it.
- **Tests:** `npm test`. The database tests (`db/waitlist-schema.test.ts`,
  `app/api/waitlist/route.db.test.ts`) run against `dev` when `DATABASE_URL`
  is set and are skipped otherwise.
- **Schema changes:** add a new file in `db/migrations/` (e.g.
  `0002_….sql`) and apply it by hand in the Neon SQL Editor, first on `main`,
  then on `dev`.
- **Code:** the form is `app/components/waitlist/`, the endpoint is
  `app/api/waitlist/route.ts`, and the booking switch is
  `lib/get-booking-mode.ts` plus `app/components/booking-mode-provider.tsx`
  (content in `content/booking/booking.md`).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
