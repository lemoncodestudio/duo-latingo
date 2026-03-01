export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          streak: number;
          longest_streak: number;
          xp: number;
          last_practice_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          streak?: number;
          longest_streak?: number;
          xp?: number;
          last_practice_date?: string | null;
        };
        Update: {
          display_name?: string | null;
          streak?: number;
          longest_streak?: number;
          xp?: number;
          last_practice_date?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      courses: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          description?: string | null;
        };
        Update: {
          name?: string;
          description?: string | null;
        };
        Relationships: [];
      };
      chapters: {
        Row: {
          id: string;
          course_id: string;
          name: string;
          order_index: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          course_id: string;
          name: string;
          order_index?: number;
        };
        Update: {
          name?: string;
          order_index?: number;
        };
        Relationships: [];
      };
      vocabulary: {
        Row: {
          id: string;
          chapter_id: string;
          latin: string;
          dutch: string;
          part_of_speech: string | null;
          gender: string | null;
          extra_forms: string | null;
          difficulty: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          chapter_id: string;
          latin: string;
          dutch: string;
          part_of_speech?: string | null;
          gender?: string | null;
          extra_forms?: string | null;
          difficulty?: number;
        };
        Update: {
          latin?: string;
          dutch?: string;
          part_of_speech?: string | null;
          gender?: string | null;
          extra_forms?: string | null;
          difficulty?: number;
        };
        Relationships: [];
      };
      user_word_progress: {
        Row: {
          id: string;
          user_id: string;
          vocabulary_id: string;
          ease_factor: number;
          interval: number;
          repetitions: number;
          next_review: string;
          last_quality: number;
          times_correct: number;
          times_incorrect: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          vocabulary_id: string;
          ease_factor?: number;
          interval?: number;
          repetitions?: number;
          next_review?: string;
          last_quality?: number;
          times_correct?: number;
          times_incorrect?: number;
        };
        Update: {
          ease_factor?: number;
          interval?: number;
          repetitions?: number;
          next_review?: string;
          last_quality?: number;
          times_correct?: number;
          times_incorrect?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      practice_sessions: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          total_questions: number;
          correct_answers: number;
          xp_earned: number;
          completed_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          course_id: string;
          total_questions?: number;
          correct_answers?: number;
          xp_earned?: number;
          completed_at?: string | null;
        };
        Update: {
          total_questions?: number;
          correct_answers?: number;
          xp_earned?: number;
          completed_at?: string | null;
        };
        Relationships: [];
      };
      practice_answers: {
        Row: {
          id: string;
          session_id: string;
          vocabulary_id: string;
          question_type: string;
          direction: string;
          given_answer: string;
          correct_answer: string;
          is_correct: boolean;
          quality: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          vocabulary_id: string;
          question_type: string;
          direction: string;
          given_answer: string;
          correct_answer: string;
          is_correct: boolean;
          quality: number;
        };
        Update: Record<string, never>;
        Relationships: [];
      };
      user_courses: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          enrolled_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          course_id: string;
          enrolled_at?: string;
        };
        Update: Record<string, never>;
        Relationships: [];
      };
      uploads: {
        Row: {
          id: string;
          user_id: string;
          chapter_id: string;
          storage_path: string;
          status: string;
          extracted_data: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          chapter_id: string;
          storage_path: string;
          status?: string;
          extracted_data?: Json | null;
        };
        Update: {
          status?: string;
          extracted_data?: Json | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Course = Database["public"]["Tables"]["courses"]["Row"];
export type Chapter = Database["public"]["Tables"]["chapters"]["Row"];
export type Vocabulary = Database["public"]["Tables"]["vocabulary"]["Row"];
export type UserWordProgress = Database["public"]["Tables"]["user_word_progress"]["Row"];
export type PracticeSession = Database["public"]["Tables"]["practice_sessions"]["Row"];
export type PracticeAnswer = Database["public"]["Tables"]["practice_answers"]["Row"];
export type UserCourse = Database["public"]["Tables"]["user_courses"]["Row"];
export type Upload = Database["public"]["Tables"]["uploads"]["Row"];
