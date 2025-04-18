export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      approval_comments: {
        Row: {
          approval_id: string | null
          comment_text: string
          created_at: string | null
          created_by: string | null
          id: string
        }
        Insert: {
          approval_id?: string | null
          comment_text: string
          created_at?: string | null
          created_by?: string | null
          id?: string
        }
        Update: {
          approval_id?: string | null
          comment_text?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "approval_comments_approval_id_fkey"
            columns: ["approval_id"]
            isOneToOne: false
            referencedRelation: "commission_approvals"
            referencedColumns: ["id"]
          },
        ]
      }
      approval_history: {
        Row: {
          approval_id: string | null
          changed_by: string | null
          created_at: string | null
          id: string
          new_status: string
          notes: string | null
          previous_status: string | null
        }
        Insert: {
          approval_id?: string | null
          changed_by?: string | null
          created_at?: string | null
          id?: string
          new_status: string
          notes?: string | null
          previous_status?: string | null
        }
        Update: {
          approval_id?: string | null
          changed_by?: string | null
          created_at?: string | null
          id?: string
          new_status?: string
          notes?: string | null
          previous_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "approval_history_approval_id_fkey"
            columns: ["approval_id"]
            isOneToOne: false
            referencedRelation: "commission_approvals"
            referencedColumns: ["id"]
          },
        ]
      }
      commission_approvals: {
        Row: {
          clerk_id: string | null
          created_at: string | null
          id: string
          notes: string | null
          reviewed_at: string | null
          reviewer_id: string | null
          status: string
          submitted_by: string | null
          threshold_exceeded: boolean | null
          transaction_id: string | null
          updated_at: string | null
        }
        Insert: {
          clerk_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          reviewed_at?: string | null
          reviewer_id?: string | null
          status?: string
          submitted_by?: string | null
          threshold_exceeded?: boolean | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Update: {
          clerk_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          reviewed_at?: string | null
          reviewer_id?: string | null
          status?: string
          submitted_by?: string | null
          threshold_exceeded?: boolean | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "commission_approvals_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "property_transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      commission_installments: {
        Row: {
          agent_id: string | null
          amount: number
          clerk_id: string | null
          commission_id: string | null
          created_at: string | null
          due_date: string
          id: string
          installment_number: number
          payment_date: string | null
          percentage: number
          scheduled_date: string | null
          status: string | null
          transaction_id: string | null
          updated_at: string | null
        }
        Insert: {
          agent_id?: string | null
          amount: number
          clerk_id?: string | null
          commission_id?: string | null
          created_at?: string | null
          due_date: string
          id?: string
          installment_number: number
          payment_date?: string | null
          percentage: number
          scheduled_date?: string | null
          status?: string | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Update: {
          agent_id?: string | null
          amount?: number
          clerk_id?: string | null
          commission_id?: string | null
          created_at?: string | null
          due_date?: string
          id?: string
          installment_number?: number
          payment_date?: string | null
          percentage?: number
          scheduled_date?: string | null
          status?: string | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "commission_installments_commission_id_fkey"
            columns: ["commission_id"]
            isOneToOne: false
            referencedRelation: "commissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commission_installments_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "property_transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      commission_payment_schedules: {
        Row: {
          created_at: string | null
          description: string | null
          first_payment_days: number | null
          fourth_payment_days: number | null
          id: string
          installment_count: number | null
          is_default: boolean | null
          name: string
          second_payment_days: number | null
          third_payment_days: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          first_payment_days?: number | null
          fourth_payment_days?: number | null
          id?: string
          installment_count?: number | null
          is_default?: boolean | null
          name: string
          second_payment_days?: number | null
          third_payment_days?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          first_payment_days?: number | null
          fourth_payment_days?: number | null
          id?: string
          installment_count?: number | null
          is_default?: boolean | null
          name?: string
          second_payment_days?: number | null
          third_payment_days?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      commissions: {
        Row: {
          agent_id: string | null
          amount: number
          clerk_id: string | null
          created_at: string | null
          id: string
          payment_schedule_id: string | null
          status: string | null
          transaction_id: string | null
          updated_at: string | null
        }
        Insert: {
          agent_id?: string | null
          amount: number
          clerk_id?: string | null
          created_at?: string | null
          id?: string
          payment_schedule_id?: string | null
          status?: string | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Update: {
          agent_id?: string | null
          amount?: number
          clerk_id?: string | null
          created_at?: string | null
          id?: string
          payment_schedule_id?: string | null
          status?: string | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "commissions_payment_schedule_id_fkey"
            columns: ["payment_schedule_id"]
            isOneToOne: false
            referencedRelation: "commission_payment_schedules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "property_transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      enhanced_properties: {
        Row: {
          address: Json
          agent_id: string | null
          area: number | null
          bathrooms: number | null
          bedrooms: number | null
          clerk_id: string | null
          created_at: string | null
          description: string | null
          features: string[] | null
          id: string
          images: string[] | null
          price: number
          status: string | null
          subtype: string | null
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          address: Json
          agent_id?: string | null
          area?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          clerk_id?: string | null
          created_at?: string | null
          description?: string | null
          features?: string[] | null
          id?: string
          images?: string[] | null
          price: number
          status?: string | null
          subtype?: string | null
          title: string
          type: string
          updated_at?: string | null
        }
        Update: {
          address?: Json
          agent_id?: string | null
          area?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          clerk_id?: string | null
          created_at?: string | null
          description?: string | null
          features?: string[] | null
          id?: string
          images?: string[] | null
          price?: number
          status?: string | null
          subtype?: string | null
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          clerk_id: string | null
          created_at: string | null
          data: Json | null
          for_admins_only: boolean
          id: string
          is_read: boolean
          message: string
          title: string
          type: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          clerk_id?: string | null
          created_at?: string | null
          data?: Json | null
          for_admins_only?: boolean
          id?: string
          is_read?: boolean
          message: string
          title: string
          type: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          clerk_id?: string | null
          created_at?: string | null
          data?: Json | null
          for_admins_only?: boolean
          id?: string
          is_read?: boolean
          message?: string
          title?: string
          type?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      old_profiles: {
        Row: {
          avatar_url: string | null
          clerk_id: string
          created_at: string
          email: string
          first_name: string | null
          full_name: string | null
          id: string
          last_name: string | null
          license_number: string | null
          phone: string | null
          role: string
          specializations: string[] | null
          tier: number
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          clerk_id: string
          created_at?: string
          email: string
          first_name?: string | null
          full_name?: string | null
          id?: string
          last_name?: string | null
          license_number?: string | null
          phone?: string | null
          role?: string
          specializations?: string[] | null
          tier?: number
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          clerk_id?: string
          created_at?: string
          email?: string
          first_name?: string | null
          full_name?: string | null
          id?: string
          last_name?: string | null
          license_number?: string | null
          phone?: string | null
          role?: string
          specializations?: string[] | null
          tier?: number
          updated_at?: string
        }
        Relationships: []
      }
      opportunities: {
        Row: {
          budget: string | null
          created_at: string | null
          description: string | null
          id: string
          location: string | null
          posted_by: string | null
          posted_by_clerk_id: string | null
          posted_date: string | null
          property_type: string
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          budget?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          location?: string | null
          posted_by?: string | null
          posted_by_clerk_id?: string | null
          posted_date?: string | null
          property_type: string
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          budget?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          location?: string | null
          posted_by?: string | null
          posted_by_clerk_id?: string | null
          posted_date?: string | null
          property_type?: string
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          clerk_id: string
          created_at: string
          email: string
          first_name: string | null
          full_name: string | null
          id: string
          last_name: string | null
          license_number: string | null
          phone: string | null
          role: string
          specializations: string[] | null
          tier: number
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          clerk_id: string
          created_at?: string
          email: string
          first_name?: string | null
          full_name?: string | null
          id?: string
          last_name?: string | null
          license_number?: string | null
          phone?: string | null
          role?: string
          specializations?: string[] | null
          tier?: number
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          clerk_id?: string
          created_at?: string
          email?: string
          first_name?: string | null
          full_name?: string | null
          id?: string
          last_name?: string | null
          license_number?: string | null
          phone?: string | null
          role?: string
          specializations?: string[] | null
          tier?: number
          updated_at?: string
        }
        Relationships: []
      }
      property_images: {
        Row: {
          created_at: string | null
          id: string
          is_primary: boolean | null
          property_id: string | null
          url: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          property_id?: string | null
          url: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          property_id?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_images_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "enhanced_properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_transactions: {
        Row: {
          agent_id: string | null
          agent_id_uuid: string | null
          buyer_agent: string | null
          buyer_agent_email: string | null
          buyer_agent_phone: string | null
          buyer_email: string | null
          buyer_name: string | null
          buyer_phone: string | null
          clerk_id: string | null
          closing_date: string | null
          co_agent_clerk_id: string | null
          co_agent_commission_amount: number | null
          co_agent_commission_percentage: number | null
          co_agent_id: string | null
          commission_amount: number
          commission_rate: number
          commission_split: string | null
          created_at: string | null
          escrow_company: string | null
          escrow_number: string | null
          id: string
          installments_generated: boolean | null
          lender: string | null
          lender_contact: string | null
          lender_email: string | null
          lender_phone: string | null
          notes: string | null
          payment_schedule_id: string | null
          property_address: string | null
          property_city: string | null
          property_id: string | null
          property_state: string | null
          property_title: string | null
          property_type: string | null
          property_zip: string | null
          seller_agent: string | null
          seller_agent_email: string | null
          seller_agent_phone: string | null
          seller_email: string | null
          seller_name: string | null
          seller_phone: string | null
          status: string | null
          title_company: string | null
          transaction_date: string
          transaction_type: string | null
          transaction_value: number
          updated_at: string | null
        }
        Insert: {
          agent_id?: string | null
          agent_id_uuid?: string | null
          buyer_agent?: string | null
          buyer_agent_email?: string | null
          buyer_agent_phone?: string | null
          buyer_email?: string | null
          buyer_name?: string | null
          buyer_phone?: string | null
          clerk_id?: string | null
          closing_date?: string | null
          co_agent_clerk_id?: string | null
          co_agent_commission_amount?: number | null
          co_agent_commission_percentage?: number | null
          co_agent_id?: string | null
          commission_amount: number
          commission_rate: number
          commission_split?: string | null
          created_at?: string | null
          escrow_company?: string | null
          escrow_number?: string | null
          id?: string
          installments_generated?: boolean | null
          lender?: string | null
          lender_contact?: string | null
          lender_email?: string | null
          lender_phone?: string | null
          notes?: string | null
          payment_schedule_id?: string | null
          property_address?: string | null
          property_city?: string | null
          property_id?: string | null
          property_state?: string | null
          property_title?: string | null
          property_type?: string | null
          property_zip?: string | null
          seller_agent?: string | null
          seller_agent_email?: string | null
          seller_agent_phone?: string | null
          seller_email?: string | null
          seller_name?: string | null
          seller_phone?: string | null
          status?: string | null
          title_company?: string | null
          transaction_date: string
          transaction_type?: string | null
          transaction_value: number
          updated_at?: string | null
        }
        Update: {
          agent_id?: string | null
          agent_id_uuid?: string | null
          buyer_agent?: string | null
          buyer_agent_email?: string | null
          buyer_agent_phone?: string | null
          buyer_email?: string | null
          buyer_name?: string | null
          buyer_phone?: string | null
          clerk_id?: string | null
          closing_date?: string | null
          co_agent_clerk_id?: string | null
          co_agent_commission_amount?: number | null
          co_agent_commission_percentage?: number | null
          co_agent_id?: string | null
          commission_amount?: number
          commission_rate?: number
          commission_split?: string | null
          created_at?: string | null
          escrow_company?: string | null
          escrow_number?: string | null
          id?: string
          installments_generated?: boolean | null
          lender?: string | null
          lender_contact?: string | null
          lender_email?: string | null
          lender_phone?: string | null
          notes?: string | null
          payment_schedule_id?: string | null
          property_address?: string | null
          property_city?: string | null
          property_id?: string | null
          property_state?: string | null
          property_title?: string | null
          property_type?: string | null
          property_zip?: string | null
          seller_agent?: string | null
          seller_agent_email?: string | null
          seller_agent_phone?: string | null
          seller_email?: string | null
          seller_name?: string | null
          seller_phone?: string | null
          status?: string | null
          title_company?: string | null
          transaction_date?: string
          transaction_type?: string | null
          transaction_value?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_transactions_payment_schedule_id_fkey"
            columns: ["payment_schedule_id"]
            isOneToOne: false
            referencedRelation: "commission_payment_schedules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_transactions_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "enhanced_properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_types: {
        Row: {
          created_at: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      schedule_installments: {
        Row: {
          created_at: string | null
          days_after_transaction: number
          description: string | null
          id: string
          installment_number: number
          percentage: number
          schedule_id: string | null
        }
        Insert: {
          created_at?: string | null
          days_after_transaction: number
          description?: string | null
          id?: string
          installment_number: number
          percentage: number
          schedule_id?: string | null
        }
        Update: {
          created_at?: string | null
          days_after_transaction?: number
          description?: string | null
          id?: string
          installment_number?: number
          percentage?: number
          schedule_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "schedule_installments_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "commission_payment_schedules"
            referencedColumns: ["id"]
          },
        ]
      }
      transaction_documents: {
        Row: {
          clerk_id: string | null
          created_at: string | null
          document_type: string | null
          id: string
          name: string
          storage_path: string
          transaction_id: string | null
          updated_at: string | null
        }
        Insert: {
          clerk_id?: string | null
          created_at?: string | null
          document_type?: string | null
          id?: string
          name: string
          storage_path: string
          transaction_id?: string | null
          updated_at?: string | null
        }
        Update: {
          clerk_id?: string | null
          created_at?: string | null
          document_type?: string | null
          id?: string
          name?: string
          storage_path?: string
          transaction_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transaction_documents_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "property_transactions"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_clerk_id_column: {
        Args: { p_table_name: string }
        Returns: undefined
      }
      add_commission_approval_comment: {
        Args: { p_approval_id: string; p_comment_text: string }
        Returns: Json
      }
      associate_notification_clerk_ids: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      check_admin_by_clerk_id: {
        Args: { user_clerk_id: string }
        Returns: boolean
      }
      check_column_types: {
        Args: Record<PropertyKey, never>
        Returns: {
          table_name: string
          column_name: string
          data_type: string
        }[]
      }
      check_profile_exists: {
        Args: { p_clerk_id: string }
        Returns: boolean
      }
      column_exists: {
        Args: { p_table_name: string; p_column_name: string }
        Returns: boolean
      }
      create_notification: {
        Args: {
          p_user_id: string
          p_type: string
          p_title: string
          p_message: string
          p_data?: Json
          p_for_admins_only?: boolean
        }
        Returns: string
      }
      create_production_transaction: {
        Args: {
          p_clerk_id: string
          p_status: string
          p_transaction_date: string
          p_property_id: string
          p_transaction_value: number
          p_commission_rate: number
          p_commission_amount: number
          p_notes: string
          p_buyer_name: string
          p_buyer_email: string
          p_buyer_phone: string
          p_seller_name: string
          p_seller_email: string
          p_seller_phone: string
          p_closing_date: string
          p_payment_schedule_id?: string
          p_commission_split?: boolean
          p_co_agent_id?: string
          p_co_agent_commission_percentage?: number
        }
        Returns: {
          agent_id: string | null
          agent_id_uuid: string | null
          buyer_agent: string | null
          buyer_agent_email: string | null
          buyer_agent_phone: string | null
          buyer_email: string | null
          buyer_name: string | null
          buyer_phone: string | null
          clerk_id: string | null
          closing_date: string | null
          co_agent_clerk_id: string | null
          co_agent_commission_amount: number | null
          co_agent_commission_percentage: number | null
          co_agent_id: string | null
          commission_amount: number
          commission_rate: number
          commission_split: string | null
          created_at: string | null
          escrow_company: string | null
          escrow_number: string | null
          id: string
          installments_generated: boolean | null
          lender: string | null
          lender_contact: string | null
          lender_email: string | null
          lender_phone: string | null
          notes: string | null
          payment_schedule_id: string | null
          property_address: string | null
          property_city: string | null
          property_id: string | null
          property_state: string | null
          property_title: string | null
          property_type: string | null
          property_zip: string | null
          seller_agent: string | null
          seller_agent_email: string | null
          seller_agent_phone: string | null
          seller_email: string | null
          seller_name: string | null
          seller_phone: string | null
          status: string | null
          title_company: string | null
          transaction_date: string
          transaction_type: string | null
          transaction_value: number
          updated_at: string | null
        }[]
      }
      create_profile_for_clerk_user: {
        Args: {
          p_clerk_id: string
          p_email: string
          p_first_name: string
          p_last_name: string
          p_role?: string
          p_avatar_url?: string
        }
        Returns: {
          avatar_url: string | null
          clerk_id: string
          created_at: string
          email: string
          first_name: string | null
          full_name: string | null
          id: string
          last_name: string | null
          license_number: string | null
          phone: string | null
          role: string
          specializations: string[] | null
          tier: number
          updated_at: string
        }
      }
      create_test_transaction: {
        Args: {
          p_clerk_id: string
          p_property_id: string
          p_transaction_value: number
          p_notes: string
        }
        Returns: {
          agent_id: string | null
          agent_id_uuid: string | null
          buyer_agent: string | null
          buyer_agent_email: string | null
          buyer_agent_phone: string | null
          buyer_email: string | null
          buyer_name: string | null
          buyer_phone: string | null
          clerk_id: string | null
          closing_date: string | null
          co_agent_clerk_id: string | null
          co_agent_commission_amount: number | null
          co_agent_commission_percentage: number | null
          co_agent_id: string | null
          commission_amount: number
          commission_rate: number
          commission_split: string | null
          created_at: string | null
          escrow_company: string | null
          escrow_number: string | null
          id: string
          installments_generated: boolean | null
          lender: string | null
          lender_contact: string | null
          lender_email: string | null
          lender_phone: string | null
          notes: string | null
          payment_schedule_id: string | null
          property_address: string | null
          property_city: string | null
          property_id: string | null
          property_state: string | null
          property_title: string | null
          property_type: string | null
          property_zip: string | null
          seller_agent: string | null
          seller_agent_email: string | null
          seller_agent_phone: string | null
          seller_email: string | null
          seller_name: string | null
          seller_phone: string | null
          status: string | null
          title_company: string | null
          transaction_date: string
          transaction_type: string | null
          transaction_value: number
          updated_at: string | null
        }[]
      }
      create_test_transaction_v2: {
        Args: { p_clerk_id: string }
        Returns: {
          agent_id: string | null
          agent_id_uuid: string | null
          buyer_agent: string | null
          buyer_agent_email: string | null
          buyer_agent_phone: string | null
          buyer_email: string | null
          buyer_name: string | null
          buyer_phone: string | null
          clerk_id: string | null
          closing_date: string | null
          co_agent_clerk_id: string | null
          co_agent_commission_amount: number | null
          co_agent_commission_percentage: number | null
          co_agent_id: string | null
          commission_amount: number
          commission_rate: number
          commission_split: string | null
          created_at: string | null
          escrow_company: string | null
          escrow_number: string | null
          id: string
          installments_generated: boolean | null
          lender: string | null
          lender_contact: string | null
          lender_email: string | null
          lender_phone: string | null
          notes: string | null
          payment_schedule_id: string | null
          property_address: string | null
          property_city: string | null
          property_id: string | null
          property_state: string | null
          property_title: string | null
          property_type: string | null
          property_zip: string | null
          seller_agent: string | null
          seller_agent_email: string | null
          seller_agent_phone: string | null
          seller_email: string | null
          seller_name: string | null
          seller_phone: string | null
          status: string | null
          title_company: string | null
          transaction_date: string
          transaction_type: string | null
          transaction_value: number
          updated_at: string | null
        }[]
      }
      create_transaction: {
        Args: {
          p_clerk_id: string
          p_status: string
          p_transaction_date: string
          p_property_id: string
          p_transaction_value: number
          p_commission_rate: number
          p_commission_amount: number
          p_notes: string
          p_buyer_name: string
          p_buyer_email: string
          p_buyer_phone: string
          p_seller_name: string
          p_seller_email: string
          p_seller_phone: string
          p_closing_date: string
          p_payment_schedule_id?: string
        }
        Returns: {
          agent_id: string | null
          agent_id_uuid: string | null
          buyer_agent: string | null
          buyer_agent_email: string | null
          buyer_agent_phone: string | null
          buyer_email: string | null
          buyer_name: string | null
          buyer_phone: string | null
          clerk_id: string | null
          closing_date: string | null
          co_agent_clerk_id: string | null
          co_agent_commission_amount: number | null
          co_agent_commission_percentage: number | null
          co_agent_id: string | null
          commission_amount: number
          commission_rate: number
          commission_split: string | null
          created_at: string | null
          escrow_company: string | null
          escrow_number: string | null
          id: string
          installments_generated: boolean | null
          lender: string | null
          lender_contact: string | null
          lender_email: string | null
          lender_phone: string | null
          notes: string | null
          payment_schedule_id: string | null
          property_address: string | null
          property_city: string | null
          property_id: string | null
          property_state: string | null
          property_title: string | null
          property_type: string | null
          property_zip: string | null
          seller_agent: string | null
          seller_agent_email: string | null
          seller_agent_phone: string | null
          seller_email: string | null
          seller_name: string | null
          seller_phone: string | null
          status: string | null
          title_company: string | null
          transaction_date: string
          transaction_type: string | null
          transaction_value: number
          updated_at: string | null
        }[]
      }
      current_user_id_as_uuid: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      delete_commission_approval_comment: {
        Args: { p_comment_id: string }
        Returns: Json
      }
      delete_notification: {
        Args: { notification_id_param: string }
        Returns: boolean
      }
      delete_transaction: {
        Args: { p_clerk_id: string; p_transaction_id: string }
        Returns: boolean
      }
      demote_to_agent: {
        Args: { p_email: string }
        Returns: boolean
      }
      generate_commission_for_transaction: {
        Args: { p_clerk_id: string; p_transaction_id: string }
        Returns: {
          agent_id: string | null
          amount: number
          clerk_id: string | null
          created_at: string | null
          id: string
          payment_schedule_id: string | null
          status: string | null
          transaction_id: string | null
          updated_at: string | null
        }[]
      }
      generate_commission_installments: {
        Args: { transaction_id: string }
        Returns: {
          agent_id: string | null
          amount: number
          clerk_id: string | null
          commission_id: string | null
          created_at: string | null
          due_date: string
          id: string
          installment_number: number
          payment_date: string | null
          percentage: number
          scheduled_date: string | null
          status: string | null
          transaction_id: string | null
          updated_at: string | null
        }[]
      }
      generate_installments_for_commission: {
        Args: { p_clerk_id: string; p_commission_id: string }
        Returns: {
          agent_id: string | null
          amount: number
          clerk_id: string | null
          commission_id: string | null
          created_at: string | null
          due_date: string
          id: string
          installment_number: number
          payment_date: string | null
          percentage: number
          scheduled_date: string | null
          status: string | null
          transaction_id: string | null
          updated_at: string | null
        }[]
      }
      get_auth_info: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_commission_approval_comments: {
        Args: { p_approval_id: string }
        Returns: Json[]
      }
      get_commission_approval_history: {
        Args: { p_approval_id: string }
        Returns: Json[]
      }
      get_commissions_by_clerk_id: {
        Args: { p_clerk_id: string }
        Returns: {
          agent_id: string | null
          amount: number
          clerk_id: string | null
          created_at: string | null
          id: string
          payment_schedule_id: string | null
          status: string | null
          transaction_id: string | null
          updated_at: string | null
        }[]
      }
      get_current_user_notifications: {
        Args: Record<PropertyKey, never>
        Returns: {
          clerk_id: string | null
          created_at: string | null
          data: Json | null
          for_admins_only: boolean
          id: string
          is_read: boolean
          message: string
          title: string
          type: string
          updated_at: string | null
          user_id: string | null
        }[]
      }
      get_installments_by_clerk_id: {
        Args: { p_clerk_id: string }
        Returns: {
          agent_id: string | null
          amount: number
          clerk_id: string | null
          commission_id: string | null
          created_at: string | null
          due_date: string
          id: string
          installment_number: number
          payment_date: string | null
          percentage: number
          scheduled_date: string | null
          status: string | null
          transaction_id: string | null
          updated_at: string | null
        }[]
      }
      get_my_profile: {
        Args: Record<PropertyKey, never>
        Returns: {
          avatar_url: string | null
          clerk_id: string
          created_at: string
          email: string
          first_name: string | null
          full_name: string | null
          id: string
          last_name: string | null
          license_number: string | null
          phone: string | null
          role: string
          specializations: string[] | null
          tier: number
          updated_at: string
        }[]
      }
      get_profile_by_clerk_id: {
        Args: { p_clerk_id: string }
        Returns: {
          avatar_url: string | null
          clerk_id: string
          created_at: string
          email: string
          first_name: string | null
          full_name: string | null
          id: string
          last_name: string | null
          license_number: string | null
          phone: string | null
          role: string
          specializations: string[] | null
          tier: number
          updated_at: string
        }[]
      }
      get_server_timestamp: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_transaction_by_id: {
        Args: { p_clerk_id: string; p_transaction_id: string }
        Returns: {
          agent_id: string | null
          agent_id_uuid: string | null
          buyer_agent: string | null
          buyer_agent_email: string | null
          buyer_agent_phone: string | null
          buyer_email: string | null
          buyer_name: string | null
          buyer_phone: string | null
          clerk_id: string | null
          closing_date: string | null
          co_agent_clerk_id: string | null
          co_agent_commission_amount: number | null
          co_agent_commission_percentage: number | null
          co_agent_id: string | null
          commission_amount: number
          commission_rate: number
          commission_split: string | null
          created_at: string | null
          escrow_company: string | null
          escrow_number: string | null
          id: string
          installments_generated: boolean | null
          lender: string | null
          lender_contact: string | null
          lender_email: string | null
          lender_phone: string | null
          notes: string | null
          payment_schedule_id: string | null
          property_address: string | null
          property_city: string | null
          property_id: string | null
          property_state: string | null
          property_title: string | null
          property_type: string | null
          property_zip: string | null
          seller_agent: string | null
          seller_agent_email: string | null
          seller_agent_phone: string | null
          seller_email: string | null
          seller_name: string | null
          seller_phone: string | null
          status: string | null
          title_company: string | null
          transaction_date: string
          transaction_type: string | null
          transaction_value: number
          updated_at: string | null
        }[]
      }
      get_transactions_by_clerk_id: {
        Args: { p_clerk_id: string }
        Returns: {
          agent_id: string | null
          agent_id_uuid: string | null
          buyer_agent: string | null
          buyer_agent_email: string | null
          buyer_agent_phone: string | null
          buyer_email: string | null
          buyer_name: string | null
          buyer_phone: string | null
          clerk_id: string | null
          closing_date: string | null
          co_agent_clerk_id: string | null
          co_agent_commission_amount: number | null
          co_agent_commission_percentage: number | null
          co_agent_id: string | null
          commission_amount: number
          commission_rate: number
          commission_split: string | null
          created_at: string | null
          escrow_company: string | null
          escrow_number: string | null
          id: string
          installments_generated: boolean | null
          lender: string | null
          lender_contact: string | null
          lender_email: string | null
          lender_phone: string | null
          notes: string | null
          payment_schedule_id: string | null
          property_address: string | null
          property_city: string | null
          property_id: string | null
          property_state: string | null
          property_title: string | null
          property_type: string | null
          property_zip: string | null
          seller_agent: string | null
          seller_agent_email: string | null
          seller_agent_phone: string | null
          seller_email: string | null
          seller_name: string | null
          seller_phone: string | null
          status: string | null
          title_company: string | null
          transaction_date: string
          transaction_type: string | null
          transaction_value: number
          updated_at: string | null
        }[]
      }
      get_user_commissions: {
        Args: Record<PropertyKey, never>
        Returns: {
          agent_id: string | null
          amount: number
          clerk_id: string | null
          created_at: string | null
          id: string
          payment_schedule_id: string | null
          status: string | null
          transaction_id: string | null
          updated_at: string | null
        }[]
      }
      get_user_notifications: {
        Args: {
          user_id_param?: string
          clerk_id_param?: string
          limit_param?: number
        }
        Returns: {
          clerk_id: string | null
          created_at: string | null
          data: Json | null
          for_admins_only: boolean
          id: string
          is_read: boolean
          message: string
          title: string
          type: string
          updated_at: string | null
          user_id: string | null
        }[]
      }
      get_user_transactions: {
        Args: Record<PropertyKey, never>
        Returns: {
          agent_id: string | null
          agent_id_uuid: string | null
          buyer_agent: string | null
          buyer_agent_email: string | null
          buyer_agent_phone: string | null
          buyer_email: string | null
          buyer_name: string | null
          buyer_phone: string | null
          clerk_id: string | null
          closing_date: string | null
          co_agent_clerk_id: string | null
          co_agent_commission_amount: number | null
          co_agent_commission_percentage: number | null
          co_agent_id: string | null
          commission_amount: number
          commission_rate: number
          commission_split: string | null
          created_at: string | null
          escrow_company: string | null
          escrow_number: string | null
          id: string
          installments_generated: boolean | null
          lender: string | null
          lender_contact: string | null
          lender_email: string | null
          lender_phone: string | null
          notes: string | null
          payment_schedule_id: string | null
          property_address: string | null
          property_city: string | null
          property_id: string | null
          property_state: string | null
          property_title: string | null
          property_type: string | null
          property_zip: string | null
          seller_agent: string | null
          seller_agent_email: string | null
          seller_agent_phone: string | null
          seller_email: string | null
          seller_name: string | null
          seller_phone: string | null
          status: string | null
          title_company: string | null
          transaction_date: string
          transaction_type: string | null
          transaction_value: number
          updated_at: string | null
        }[]
      }
      insert_test_notification: {
        Args: { user_clerk_id: string }
        Returns: string
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_admin_tier: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_current_user: {
        Args: { user_text_id: string }
        Returns: boolean
      }
      is_user_team_leader: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_valid_uuid: {
        Args: { text_id: string }
        Returns: boolean
      }
      mark_all_notifications_as_read: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      mark_all_notifications_read: {
        Args: { user_id_param?: string; clerk_id_param?: string }
        Returns: boolean
      }
      mark_notification_as_read: {
        Args: { p_notification_id: string }
        Returns: boolean
      }
      mark_notification_read: {
        Args: { notification_id_param: string }
        Returns: boolean
      }
      promote_to_admin: {
        Args: { p_email: string }
        Returns: boolean
      }
      safe_get_user_notifications: {
        Args: { p_clerk_id: string }
        Returns: {
          clerk_id: string | null
          created_at: string | null
          data: Json | null
          for_admins_only: boolean
          id: string
          is_read: boolean
          message: string
          title: string
          type: string
          updated_at: string | null
          user_id: string | null
        }[]
      }
      safe_get_user_transactions: {
        Args: { p_clerk_id: string }
        Returns: {
          id: string
          transaction_date: string
          property_id: string
          transaction_value: number
          commission_rate: number
          commission_amount: number
          agent_id: string
          clerk_id: string
          status: string
          notes: string
          buyer_name: string
          buyer_email: string
          buyer_phone: string
          seller_name: string
          seller_email: string
          seller_phone: string
          closing_date: string
          commission_split: string
          co_agent_id: string
          co_agent_commission_percentage: number
          payment_schedule_id: string
          created_at: string
          updated_at: string
          property_title: string
          property_address: string
          property_city: string
          property_state: string
          property_zip: string
          property_type: string
        }[]
      }
      safe_get_user_transactions_v2: {
        Args: { p_clerk_id: string }
        Returns: {
          agent_id: string | null
          agent_id_uuid: string | null
          buyer_agent: string | null
          buyer_agent_email: string | null
          buyer_agent_phone: string | null
          buyer_email: string | null
          buyer_name: string | null
          buyer_phone: string | null
          clerk_id: string | null
          closing_date: string | null
          co_agent_clerk_id: string | null
          co_agent_commission_amount: number | null
          co_agent_commission_percentage: number | null
          co_agent_id: string | null
          commission_amount: number
          commission_rate: number
          commission_split: string | null
          created_at: string | null
          escrow_company: string | null
          escrow_number: string | null
          id: string
          installments_generated: boolean | null
          lender: string | null
          lender_contact: string | null
          lender_email: string | null
          lender_phone: string | null
          notes: string | null
          payment_schedule_id: string | null
          property_address: string | null
          property_city: string | null
          property_id: string | null
          property_state: string | null
          property_title: string | null
          property_type: string | null
          property_zip: string | null
          seller_agent: string | null
          seller_agent_email: string | null
          seller_agent_phone: string | null
          seller_email: string | null
          seller_name: string | null
          seller_phone: string | null
          status: string | null
          title_company: string | null
          transaction_date: string
          transaction_type: string | null
          transaction_value: number
          updated_at: string | null
        }[]
      }
      safe_insert_notification: {
        Args:
          | {
              clerk_id_param: string
              title_param: string
              message_param: string
              type_param?: string
            }
          | {
              p_clerk_id: string
              p_type: string
              p_title: string
              p_message: string
              p_data?: Json
              p_for_admins_only?: boolean
            }
        Returns: string
      }
      safe_mark_all_notifications_read: {
        Args: { p_clerk_id: string }
        Returns: {
          clerk_id: string | null
          created_at: string | null
          data: Json | null
          for_admins_only: boolean
          id: string
          is_read: boolean
          message: string
          title: string
          type: string
          updated_at: string | null
          user_id: string | null
        }[]
      }
      safe_mark_notification_read: {
        Args: { p_notification_id: string }
        Returns: {
          clerk_id: string | null
          created_at: string | null
          data: Json | null
          for_admins_only: boolean
          id: string
          is_read: boolean
          message: string
          title: string
          type: string
          updated_at: string | null
          user_id: string | null
        }[]
      }
      safe_to_uuid: {
        Args: { text_id: string }
        Returns: string
      }
      safe_view_user_notifications: {
        Args: { clerk_id_param: string }
        Returns: {
          clerk_id: string | null
          created_at: string | null
          data: Json | null
          for_admins_only: boolean
          id: string
          is_read: boolean
          message: string
          title: string
          type: string
          updated_at: string | null
          user_id: string | null
        }[]
      }
      storage_is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      test_notifications_setup: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      text_to_uuid: {
        Args: { text_id: string }
        Returns: string
      }
      update_column_to_text: {
        Args: { p_table_name: string; p_column_name: string }
        Returns: undefined
      }
      update_commission_approval_status: {
        Args: { p_approval_id: string; p_new_status: string; p_notes?: string }
        Returns: Json
      }
      update_transaction: {
        Args: {
          p_clerk_id: string
          p_transaction_id: string
          p_status?: string
          p_transaction_date?: string
          p_property_id?: string
          p_transaction_value?: number
          p_commission_rate?: number
          p_commission_amount?: number
          p_notes?: string
          p_buyer_name?: string
          p_buyer_email?: string
          p_buyer_phone?: string
          p_seller_name?: string
          p_seller_email?: string
          p_seller_phone?: string
          p_closing_date?: string
          p_payment_schedule_id?: string
        }
        Returns: {
          agent_id: string | null
          agent_id_uuid: string | null
          buyer_agent: string | null
          buyer_agent_email: string | null
          buyer_agent_phone: string | null
          buyer_email: string | null
          buyer_name: string | null
          buyer_phone: string | null
          clerk_id: string | null
          closing_date: string | null
          co_agent_clerk_id: string | null
          co_agent_commission_amount: number | null
          co_agent_commission_percentage: number | null
          co_agent_id: string | null
          commission_amount: number
          commission_rate: number
          commission_split: string | null
          created_at: string | null
          escrow_company: string | null
          escrow_number: string | null
          id: string
          installments_generated: boolean | null
          lender: string | null
          lender_contact: string | null
          lender_email: string | null
          lender_phone: string | null
          notes: string | null
          payment_schedule_id: string | null
          property_address: string | null
          property_city: string | null
          property_id: string | null
          property_state: string | null
          property_title: string | null
          property_type: string | null
          property_zip: string | null
          seller_agent: string | null
          seller_agent_email: string | null
          seller_agent_phone: string | null
          seller_email: string | null
          seller_name: string | null
          seller_phone: string | null
          status: string | null
          title_company: string | null
          transaction_date: string
          transaction_type: string | null
          transaction_value: number
          updated_at: string | null
        }[]
      }
      update_transaction_status: {
        Args: { p_clerk_id: string; p_transaction_id: string; p_status: string }
        Returns: {
          agent_id: string | null
          agent_id_uuid: string | null
          buyer_agent: string | null
          buyer_agent_email: string | null
          buyer_agent_phone: string | null
          buyer_email: string | null
          buyer_name: string | null
          buyer_phone: string | null
          clerk_id: string | null
          closing_date: string | null
          co_agent_clerk_id: string | null
          co_agent_commission_amount: number | null
          co_agent_commission_percentage: number | null
          co_agent_id: string | null
          commission_amount: number
          commission_rate: number
          commission_split: string | null
          created_at: string | null
          escrow_company: string | null
          escrow_number: string | null
          id: string
          installments_generated: boolean | null
          lender: string | null
          lender_contact: string | null
          lender_email: string | null
          lender_phone: string | null
          notes: string | null
          payment_schedule_id: string | null
          property_address: string | null
          property_city: string | null
          property_id: string | null
          property_state: string | null
          property_title: string | null
          property_type: string | null
          property_zip: string | null
          seller_agent: string | null
          seller_agent_email: string | null
          seller_agent_phone: string | null
          seller_email: string | null
          seller_name: string | null
          seller_phone: string | null
          status: string | null
          title_company: string | null
          transaction_date: string
          transaction_type: string | null
          transaction_value: number
          updated_at: string | null
        }[]
      }
      user_can_access_approval: {
        Args: { approval_submitted_by: string; approval_transaction_id: string }
        Returns: boolean
      }
      user_can_access_document: {
        Args: { doc_uploaded_by: string; doc_transaction_id: string }
        Returns: boolean
      }
      user_has_role: {
        Args: { required_role: string }
        Returns: boolean
      }
      user_owns_commission: {
        Args: { commission_agent_id: string; commission_clerk_id: string }
        Returns: boolean
      }
      user_owns_installment: {
        Args: { installment_agent_id: string }
        Returns: boolean
      }
      user_owns_transaction: {
        Args:
          | { agent_id: string; clerk_id: string }
          | { transaction_agent_id: string; transaction_clerk_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
