-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New query).
-- Tracks per-user word usage for the Free plan quota.

create table if not exists public.usage (
  user_id      uuid primary key references auth.users (id) on delete cascade,
  words_used   integer     not null default 0,
  period_start date        not null default date_trunc('month', now())::date,
  updated_at   timestamptz not null default now()
);

alter table public.usage enable row level security;

-- Users may read their own usage row (so the UI can show remaining quota).
drop policy if exists "read own usage" on public.usage;
create policy "read own usage"
  on public.usage
  for select
  using (auth.uid() = user_id);

-- Writes are performed by the server using the service-role key, which bypasses
-- RLS — so no insert/update policies are granted to regular users on purpose.
