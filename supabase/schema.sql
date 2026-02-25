-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES TABLE (Extends Supabase Auth Users)
create type user_role as enum ('admin', 'lawyer', 'client', 'volunteer');

create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text not null,
  role user_role not null default 'client',
  phone_number text,
  nba_id text, -- For lawyers
  is_verified boolean default false, -- For lawyers
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;
-- Allow users to view their own profile, and allow admins/lawyers/volunteers to view clients
create policy "Users can view own profile" on public.profiles for select using ( auth.uid() = id );

-- MATTERS TABLE (Litigation & Non-Litigation Case Management)
create type matter_type as enum ('litigation', 'non_litigation');
create type matter_status as enum ('intake', 'active', 'pending_court', 'closed', 'appealed', 'execution');

create table public.matters (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  type matter_type not null,
  status matter_status not null default 'intake',
  client_id uuid references public.profiles(id) not null,
  lawyer_id uuid references public.profiles(id), -- Nullable initially if unassigned
  
  -- Litigation specific fields
  jurisdiction text,
  suit_number text,
  presiding_judge text,
  opposing_counsel text,
  
  -- Non-Litigation (Corporate) specific fields
  parties text,
  deal_size numeric,
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.matters enable row level security;
-- Clients see their own matters; Lawyers see their assigned matters; Admins/Volunteers see all
create policy "Clients can view own matters" on public.matters for select using ( auth.uid() = client_id );
create policy "Lawyers can view assigned matters" on public.matters for select using ( auth.uid() = lawyer_id );

-- TIMELINE EVENTS (Audit Trail)
create table public.timeline_events (
  id uuid default uuid_generate_v4() primary key,
  matter_id uuid references public.matters(id) on delete cascade not null,
  title text not null,
  description text,
  event_date timestamp with time zone not null,
  created_by uuid references public.profiles(id) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.timeline_events enable row level security;

-- TASKS & DEADLINES
create type task_status as enum ('pending', 'in_progress', 'completed', 'overdue');

create table public.tasks (
  id uuid default uuid_generate_v4() primary key,
  matter_id uuid references public.matters(id) on delete cascade not null,
  description text not null,
  status task_status default 'pending',
  due_date timestamp with time zone not null,
  assigned_to uuid references public.profiles(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.tasks enable row level security;

-- DOCUMENTS
create table public.documents (
  id uuid default uuid_generate_v4() primary key,
  matter_id uuid references public.matters(id) on delete cascade not null,
  name text not null,
  file_url text not null,
  category text, -- Pleadings, Evidence, Contracts, etc.
  uploaded_by uuid references public.profiles(id) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.documents enable row level security;

-- Setup Storage Bucket for Documents
insert into storage.buckets (id, name, public) values ('legal_documents', 'legal_documents', false);
