-- Waitlist signups. Applied by hand in the Neon SQL editor on the `main`
-- (live) branch; the `dev` branch was created from main afterwards.
create table waitlist (
  id          bigint generated always as identity primary key,
  name        text not null,
  phone       text not null unique, -- E.164, +1XXXXXXXXXX
  service     text not null default 'General',
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);
