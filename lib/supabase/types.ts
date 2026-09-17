export type ProjectRow = {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  description: string | null;
  image_url: string | null;
  technologies: string[];
  category: string;
  project_date: string | null; // date ISO (YYYY-MM-DD)
  github_url: string | null;
  demo_url: string | null;
  documentation_url: string | null;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type ProjectInput = {
  title: string;
  slug: string;
  short_description: string;
  description?: string | null;
  image_url?: string | null;
  technologies: string[];
  category: string;
  project_date?: string | null;
  github_url?: string | null;
  demo_url?: string | null;
  documentation_url?: string | null;
  featured: boolean;
  published: boolean;
};

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: ProjectRow;
        Insert: Partial<ProjectRow> & Pick<ProjectRow, 'title' | 'slug' | 'short_description' | 'category'>;
        Update: Partial<ProjectRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
