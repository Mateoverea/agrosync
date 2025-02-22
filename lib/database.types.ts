export type Database = {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
      }
      users: {
        Row: {
          id: string
          company_id: string | null
          role: string | null
          department: string | null
          email: string | null
        }
        Insert: {
          id: string
          company_id: string | null
          role: string | null
          department: string | null
          email: string
        }
        Update: {
          id?: string
          company_id?: string | null
          role?: string | null
          department?: string | null
          email?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

