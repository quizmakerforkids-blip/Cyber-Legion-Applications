create extension if not exists "pgcrypto";

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  application_role text not null default 'Unspecified',
  roblox_username text not null,
  discord_username text not null,
  answers jsonb not null,
  status text not null default 'Pending',
  tracking_code text not null default encode(gen_random_bytes(12), 'hex'),
  created_at timestamptz not null default now()
);

alter table public.applications
add column if not exists application_role text not null default 'Unspecified';

alter table public.applications
add column if not exists status text not null default 'Pending';

alter table public.applications
add column if not exists tracking_code text not null default encode(gen_random_bytes(12), 'hex');

alter table public.applications enable row level security;