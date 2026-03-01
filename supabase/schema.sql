-- Duo Latingo Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- Profiles (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text,
  streak int not null default 0,
  longest_streak int not null default 0,
  xp int not null default 0,
  last_practice_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)));
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Courses
create table public.courses (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  description text,
  created_at timestamptz not null default now()
);

-- Chapters
create table public.chapters (
  id uuid primary key default uuid_generate_v4(),
  course_id uuid references public.courses on delete cascade not null,
  name text not null,
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

-- Vocabulary
create table public.vocabulary (
  id uuid primary key default uuid_generate_v4(),
  chapter_id uuid references public.chapters on delete cascade not null,
  latin text not null,
  dutch text not null,
  part_of_speech text,
  gender text,
  extra_forms text,
  difficulty int not null default 1,
  created_at timestamptz not null default now()
);

-- User word progress (SM-2 spaced repetition)
create table public.user_word_progress (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users on delete cascade not null,
  vocabulary_id uuid references public.vocabulary on delete cascade not null,
  ease_factor real not null default 2.5,
  interval int not null default 0,
  repetitions int not null default 0,
  next_review timestamptz not null default now(),
  last_quality int not null default 0,
  times_correct int not null default 0,
  times_incorrect int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, vocabulary_id)
);

-- Practice sessions
create table public.practice_sessions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users on delete cascade not null,
  course_id uuid references public.courses on delete cascade not null,
  total_questions int not null default 0,
  correct_answers int not null default 0,
  xp_earned int not null default 0,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

-- Practice answers
create table public.practice_answers (
  id uuid primary key default uuid_generate_v4(),
  session_id uuid references public.practice_sessions on delete cascade not null,
  vocabulary_id uuid references public.vocabulary on delete cascade not null,
  question_type text not null,
  direction text not null,
  given_answer text not null,
  correct_answer text not null,
  is_correct boolean not null,
  quality int not null,
  created_at timestamptz not null default now()
);

-- User course enrollments
create table public.user_courses (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users on delete cascade not null,
  course_id uuid references public.courses on delete cascade not null,
  enrolled_at timestamptz not null default now(),
  unique(user_id, course_id)
);

-- Uploads
create table public.uploads (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users on delete cascade not null,
  chapter_id uuid references public.chapters on delete cascade not null,
  storage_path text not null,
  status text not null default 'pending',
  extracted_data jsonb,
  created_at timestamptz not null default now()
);

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.chapters enable row level security;
alter table public.vocabulary enable row level security;
alter table public.user_word_progress enable row level security;
alter table public.practice_sessions enable row level security;
alter table public.practice_answers enable row level security;
alter table public.user_courses enable row level security;
alter table public.uploads enable row level security;

-- Profiles: all authenticated users can read, own user can update
create policy "Authenticated users can view profiles" on public.profiles
  for select using (auth.uid() is not null);
create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Courses: all authenticated users can read, owner can write
create policy "Authenticated users can view all courses" on public.courses
  for select using (auth.uid() is not null);
create policy "Users can create courses" on public.courses
  for insert with check (auth.uid() = user_id);
create policy "Users can update own courses" on public.courses
  for update using (auth.uid() = user_id);
create policy "Users can delete own courses" on public.courses
  for delete using (auth.uid() = user_id);

-- Chapters: all authenticated users can read, owner can write
create policy "Authenticated users can view all chapters" on public.chapters
  for select using (auth.uid() is not null);
create policy "Users can create chapters" on public.chapters
  for insert with check (
    exists (select 1 from public.courses where id = chapters.course_id and user_id = auth.uid())
  );
create policy "Users can update own chapters" on public.chapters
  for update using (
    exists (select 1 from public.courses where id = chapters.course_id and user_id = auth.uid())
  );
create policy "Users can delete own chapters" on public.chapters
  for delete using (
    exists (select 1 from public.courses where id = chapters.course_id and user_id = auth.uid())
  );

-- Vocabulary: all authenticated users can read, owner can write
create policy "Authenticated users can view all vocabulary" on public.vocabulary
  for select using (auth.uid() is not null);
create policy "Users can create vocabulary" on public.vocabulary
  for insert with check (
    exists (
      select 1 from public.chapters c
      join public.courses co on co.id = c.course_id
      where c.id = vocabulary.chapter_id and co.user_id = auth.uid()
    )
  );
create policy "Users can update own vocabulary" on public.vocabulary
  for update using (
    exists (
      select 1 from public.chapters c
      join public.courses co on co.id = c.course_id
      where c.id = vocabulary.chapter_id and co.user_id = auth.uid()
    )
  );
create policy "Users can delete own vocabulary" on public.vocabulary
  for delete using (
    exists (
      select 1 from public.chapters c
      join public.courses co on co.id = c.course_id
      where c.id = vocabulary.chapter_id and co.user_id = auth.uid()
    )
  );

-- User courses: users can manage own enrollments
create policy "Users can view own enrollments" on public.user_courses
  for select using (auth.uid() = user_id);
create policy "Users can enroll themselves" on public.user_courses
  for insert with check (auth.uid() = user_id);
create policy "Users can unenroll themselves" on public.user_courses
  for delete using (auth.uid() = user_id);

-- User word progress: users can CRUD own progress
create policy "Users can view own progress" on public.user_word_progress
  for select using (auth.uid() = user_id);
create policy "Users can create own progress" on public.user_word_progress
  for insert with check (auth.uid() = user_id);
create policy "Users can update own progress" on public.user_word_progress
  for update using (auth.uid() = user_id);

-- Practice sessions: users can CRUD own sessions
create policy "Users can view own sessions" on public.practice_sessions
  for select using (auth.uid() = user_id);
create policy "Users can create sessions" on public.practice_sessions
  for insert with check (auth.uid() = user_id);
create policy "Users can update own sessions" on public.practice_sessions
  for update using (auth.uid() = user_id);

-- Practice answers: users can view/create own answers
create policy "Users can view own answers" on public.practice_answers
  for select using (
    exists (select 1 from public.practice_sessions where id = practice_answers.session_id and user_id = auth.uid())
  );
create policy "Users can create answers" on public.practice_answers
  for insert with check (
    exists (select 1 from public.practice_sessions where id = practice_answers.session_id and user_id = auth.uid())
  );

-- Uploads: users can CRUD own uploads
create policy "Users can view own uploads" on public.uploads
  for select using (auth.uid() = user_id);
create policy "Users can create uploads" on public.uploads
  for insert with check (auth.uid() = user_id);
create policy "Users can update own uploads" on public.uploads
  for update using (auth.uid() = user_id);

-- Create storage bucket for uploads
insert into storage.buckets (id, name, public)
values ('uploads', 'uploads', false)
on conflict do nothing;

-- Storage policies
create policy "Users can upload files" on storage.objects
  for insert with check (
    bucket_id = 'uploads' and auth.uid()::text = (storage.foldername(name))[1]
  );
create policy "Users can view own files" on storage.objects
  for select using (
    bucket_id = 'uploads' and auth.uid()::text = (storage.foldername(name))[1]
  );

-- Indexes for performance
create index idx_vocabulary_chapter on public.vocabulary(chapter_id);
create index idx_chapters_course on public.chapters(course_id);
create index idx_user_word_progress_user on public.user_word_progress(user_id);
create index idx_user_word_progress_next_review on public.user_word_progress(user_id, next_review);
create index idx_practice_sessions_user on public.practice_sessions(user_id);
create index idx_practice_answers_session on public.practice_answers(session_id);
create index idx_uploads_chapter on public.uploads(chapter_id);
create index idx_user_courses_user on public.user_courses(user_id);
create index idx_user_courses_course on public.user_courses(course_id);

-- Backfill: auto-enroll existing course owners
insert into public.user_courses (user_id, course_id)
select user_id, id from public.courses
on conflict do nothing;
