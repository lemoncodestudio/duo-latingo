-- Migration: Add user_courses enrollment table and open read policies
-- Run this in Supabase SQL Editor on an existing database

-- 1. Create user_courses table
create table if not exists public.user_courses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  course_id uuid references public.courses on delete cascade not null,
  enrolled_at timestamptz not null default now(),
  unique(user_id, course_id)
);

alter table public.user_courses enable row level security;

-- 2. RLS policies for user_courses
create policy "Users can view own enrollments" on public.user_courses
  for select using (auth.uid() = user_id);
create policy "Users can enroll themselves" on public.user_courses
  for insert with check (auth.uid() = user_id);
create policy "Users can unenroll themselves" on public.user_courses
  for delete using (auth.uid() = user_id);

-- 3. Open SELECT policies (drop old owner-only, create new all-authenticated)
drop policy if exists "Users can view own profile" on public.profiles;
create policy "Authenticated users can view profiles" on public.profiles
  for select using (auth.uid() is not null);

drop policy if exists "Users can view own courses" on public.courses;
create policy "Authenticated users can view all courses" on public.courses
  for select using (auth.uid() is not null);

drop policy if exists "Users can view chapters of own courses" on public.chapters;
create policy "Authenticated users can view all chapters" on public.chapters
  for select using (auth.uid() is not null);

drop policy if exists "Users can view vocabulary of own courses" on public.vocabulary;
create policy "Authenticated users can view all vocabulary" on public.vocabulary
  for select using (auth.uid() is not null);

-- 4. Indexes
create index if not exists idx_user_courses_user on public.user_courses(user_id);
create index if not exists idx_user_courses_course on public.user_courses(course_id);

-- 5. Backfill: auto-enroll existing course owners
insert into public.user_courses (user_id, course_id)
select user_id, id from public.courses
on conflict do nothing;
