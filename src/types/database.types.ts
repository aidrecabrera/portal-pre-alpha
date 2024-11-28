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
      EnrolleeInquiry: {
        Row: {
          created_at: string
          email: string
          id: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      EnrollmentHistory: {
        Row: {
          class_id: number
          enrollment_date: string
          id: number
          student_id: number
        }
        Insert: {
          class_id: number
          enrollment_date: string
          id?: number
          student_id: number
        }
        Update: {
          class_id?: number
          enrollment_date?: string
          id?: number
          student_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'EnrollmentHistory_student_id_fkey'
            columns: ['student_id']
            isOneToOne: false
            referencedRelation: 'Student'
            referencedColumns: ['id']
          },
        ]
      }
      Instructor: {
        Row: {
          department: string | null
          email: string | null
          instructor_id: number
          name: string
          phone: string | null
        }
        Insert: {
          department?: string | null
          email?: string | null
          instructor_id?: number
          name: string
          phone?: string | null
        }
        Update: {
          department?: string | null
          email?: string | null
          instructor_id?: number
          name?: string
          phone?: string | null
        }
        Relationships: []
      }
      PaymentLedger: {
        Row: {
          charge_reference: string
          charges_debit: number
          department: string
          id: number
          particulars: string
          payment_credit: number
          reference_number: string
          student_id: number
          transaction_date: string
          transaction_type: string
        }
        Insert: {
          charge_reference: string
          charges_debit: number
          department: string
          id?: number
          particulars: string
          payment_credit: number
          reference_number: string
          student_id: number
          transaction_date: string
          transaction_type: string
        }
        Update: {
          charge_reference?: string
          charges_debit?: number
          department?: string
          id?: number
          particulars?: string
          payment_credit?: number
          reference_number?: string
          student_id?: number
          transaction_date?: string
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: 'PaymentLedger_student_id_fkey'
            columns: ['student_id']
            isOneToOne: false
            referencedRelation: 'Student'
            referencedColumns: ['id']
          },
        ]
      }
      Room: {
        Row: {
          building_name: string | null
          capacity: number | null
          room_id: number
          room_number: string
        }
        Insert: {
          building_name?: string | null
          capacity?: number | null
          room_id?: number
          room_number: string
        }
        Update: {
          building_name?: string | null
          capacity?: number | null
          room_id?: number
          room_number?: string
        }
        Relationships: []
      }
      Schedule: {
        Row: {
          day: Database['public']['Enums']['day_enum']
          end_time: string
          schedule_id: number
          start_time: string
        }
        Insert: {
          day: Database['public']['Enums']['day_enum']
          end_time: string
          schedule_id?: number
          start_time: string
        }
        Update: {
          day?: Database['public']['Enums']['day_enum']
          end_time?: string
          schedule_id?: number
          start_time?: string
        }
        Relationships: []
      }
      Section: {
        Row: {
          section_id: number
          section_name: string
        }
        Insert: {
          section_id?: number
          section_name: string
        }
        Update: {
          section_id?: number
          section_name?: string
        }
        Relationships: []
      }
      Semester: {
        Row: {
          academic_year: string
          semester: Database['public']['Enums']['semester_enum']
          semester_id: number
        }
        Insert: {
          academic_year: string
          semester: Database['public']['Enums']['semester_enum']
          semester_id?: number
        }
        Update: {
          academic_year?: string
          semester?: Database['public']['Enums']['semester_enum']
          semester_id?: number
        }
        Relationships: []
      }
      Student: {
        Row: {
          birth_place: string
          birthdate: string
          civil_status: string
          course_id: number
          created_at: string
          disability: boolean | null
          email: string
          enrollment_status: string
          first_name: string
          gender: string
          id: number
          landline_number: string | null
          last_name: string
          learner_reference_number: string | null
          middle_name: string | null
          mobile_number: string
          nationality: string
          phone: string
          preferred_class_session: string
          program: string
          religion: string
          student_number: string | null
          transferee: boolean
          updated_at: string | null
          year_level: number | null
        }
        Insert: {
          birth_place: string
          birthdate: string
          civil_status: string
          course_id: number
          created_at?: string
          disability?: boolean | null
          email: string
          enrollment_status?: string
          first_name: string
          gender: string
          id?: number
          landline_number?: string | null
          last_name: string
          learner_reference_number?: string | null
          middle_name?: string | null
          mobile_number: string
          nationality: string
          phone: string
          preferred_class_session: string
          program: string
          religion: string
          student_number?: string | null
          transferee: boolean
          updated_at?: string | null
          year_level?: number | null
        }
        Update: {
          birth_place?: string
          birthdate?: string
          civil_status?: string
          course_id?: number
          created_at?: string
          disability?: boolean | null
          email?: string
          enrollment_status?: string
          first_name?: string
          gender?: string
          id?: number
          landline_number?: string | null
          last_name?: string
          learner_reference_number?: string | null
          middle_name?: string | null
          mobile_number?: string
          nationality?: string
          phone?: string
          preferred_class_session?: string
          program?: string
          religion?: string
          student_number?: string | null
          transferee?: boolean
          updated_at?: string | null
          year_level?: number | null
        }
        Relationships: []
      }
      StudentAcademicProfile: {
        Row: {
          als_pept: boolean | null
          created_at: string
          honors_received: string | null
          id: number
          level: string
          program_degree: string | null
          school_name: string | null
          strand: string | null
          student_id: number
          track: string | null
          updated_at: string | null
          year_graduated: number | null
        }
        Insert: {
          als_pept?: boolean | null
          created_at?: string
          honors_received?: string | null
          id?: number
          level: string
          program_degree?: string | null
          school_name?: string | null
          strand?: string | null
          student_id: number
          track?: string | null
          updated_at?: string | null
          year_graduated?: number | null
        }
        Update: {
          als_pept?: boolean | null
          created_at?: string
          honors_received?: string | null
          id?: number
          level?: string
          program_degree?: string | null
          school_name?: string | null
          strand?: string | null
          student_id?: number
          track?: string | null
          updated_at?: string | null
          year_graduated?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'StudentAcademicProfile_student_id_fkey'
            columns: ['student_id']
            isOneToOne: true
            referencedRelation: 'Student'
            referencedColumns: ['id']
          },
        ]
      }
      StudentAddress: {
        Row: {
          address_type: string
          barangay: string
          city_municipality: string
          created_at: string
          house_number_street: string
          id: number
          province: string
          student_id: number
          updated_at: string | null
        }
        Insert: {
          address_type: string
          barangay: string
          city_municipality: string
          created_at?: string
          house_number_street: string
          id?: number
          province: string
          student_id: number
          updated_at?: string | null
        }
        Update: {
          address_type?: string
          barangay?: string
          city_municipality?: string
          created_at?: string
          house_number_street?: string
          id?: number
          province?: string
          student_id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'StudentAddress_student_id_fkey'
            columns: ['student_id']
            isOneToOne: true
            referencedRelation: 'Student'
            referencedColumns: ['id']
          },
        ]
      }
      StudentClass: {
        Row: {
          instructor_id: number
          room_id: number
          schedule_id: number
          section_id: number
          semester_id: number
          student_class_id: number
          student_id: number
          subject_id: number
        }
        Insert: {
          instructor_id: number
          room_id: number
          schedule_id: number
          section_id: number
          semester_id: number
          student_class_id?: number
          student_id: number
          subject_id: number
        }
        Update: {
          instructor_id?: number
          room_id?: number
          schedule_id?: number
          section_id?: number
          semester_id?: number
          student_class_id?: number
          student_id?: number
          subject_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'StudentClass_instructor_id_fkey'
            columns: ['instructor_id']
            isOneToOne: false
            referencedRelation: 'Instructor'
            referencedColumns: ['instructor_id']
          },
          {
            foreignKeyName: 'StudentClass_room_id_fkey'
            columns: ['room_id']
            isOneToOne: false
            referencedRelation: 'Room'
            referencedColumns: ['room_id']
          },
          {
            foreignKeyName: 'StudentClass_schedule_id_fkey'
            columns: ['schedule_id']
            isOneToOne: false
            referencedRelation: 'Schedule'
            referencedColumns: ['schedule_id']
          },
          {
            foreignKeyName: 'StudentClass_section_id_fkey'
            columns: ['section_id']
            isOneToOne: false
            referencedRelation: 'Section'
            referencedColumns: ['section_id']
          },
          {
            foreignKeyName: 'StudentClass_semester_id_fkey'
            columns: ['semester_id']
            isOneToOne: false
            referencedRelation: 'Semester'
            referencedColumns: ['semester_id']
          },
          {
            foreignKeyName: 'StudentClass_student_id_fkey'
            columns: ['student_id']
            isOneToOne: false
            referencedRelation: 'Student'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'StudentClass_subject_id_fkey'
            columns: ['subject_id']
            isOneToOne: false
            referencedRelation: 'Subject'
            referencedColumns: ['subject_id']
          },
        ]
      }
      StudentConsentForm: {
        Row: {
          created_at: string
          id: number
          is_agree: boolean
          student_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          is_agree: boolean
          student_id: number
        }
        Update: {
          created_at?: string
          id?: number
          is_agree?: boolean
          student_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'StudentConsentForm_student_id_fkey'
            columns: ['student_id']
            isOneToOne: true
            referencedRelation: 'Student'
            referencedColumns: ['id']
          },
        ]
      }
      StudentFamilyBackground: {
        Row: {
          age: number | null
          contact_number: string | null
          created_at: string
          email: string | null
          employer_name_address: string | null
          first_name: string
          highest_educational_attainment: string | null
          id: number
          last_name: string
          middle_name: string | null
          nationality: string
          occupation: string
          student_id: number
          type: string
          updated_at: string | null
        }
        Insert: {
          age?: number | null
          contact_number?: string | null
          created_at?: string
          email?: string | null
          employer_name_address?: string | null
          first_name: string
          highest_educational_attainment?: string | null
          id?: number
          last_name: string
          middle_name?: string | null
          nationality: string
          occupation: string
          student_id: number
          type: string
          updated_at?: string | null
        }
        Update: {
          age?: number | null
          contact_number?: string | null
          created_at?: string
          email?: string | null
          employer_name_address?: string | null
          first_name?: string
          highest_educational_attainment?: string | null
          id?: number
          last_name?: string
          middle_name?: string | null
          nationality?: string
          occupation?: string
          student_id?: number
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'StudentFamilyBackground_student_id_fkey'
            columns: ['student_id']
            isOneToOne: true
            referencedRelation: 'Student'
            referencedColumns: ['id']
          },
        ]
      }
      StudentSibling: {
        Row: {
          created_at: string
          id: number
          number_of_children: number | null
          number_of_siblings: number | null
          student_id: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          number_of_children?: number | null
          number_of_siblings?: number | null
          student_id: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          number_of_children?: number | null
          number_of_siblings?: number | null
          student_id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'StudentSibling_student_id_fkey'
            columns: ['student_id']
            isOneToOne: true
            referencedRelation: 'Student'
            referencedColumns: ['id']
          },
        ]
      }
      StudentSocioEconomicProfile: {
        Row: {
          created_at: string
          id: number
          living_in: string
          living_with: string
          program_intended: string
          status: string
          student_id: number
          studies_supported_by: string
          tribal_affiliation: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          living_in: string
          living_with: string
          program_intended: string
          status: string
          student_id: number
          studies_supported_by: string
          tribal_affiliation?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          living_in?: string
          living_with?: string
          program_intended?: string
          status?: string
          student_id?: number
          studies_supported_by?: string
          tribal_affiliation?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'StudentSocioEconomicProfile_student_id_fkey'
            columns: ['student_id']
            isOneToOne: true
            referencedRelation: 'Student'
            referencedColumns: ['id']
          },
        ]
      }
      Subject: {
        Row: {
          description: string | null
          hours: number
          subject_code: string
          subject_id: number
          title: string
          units: number
        }
        Insert: {
          description?: string | null
          hours?: number
          subject_code: string
          subject_id?: number
          title: string
          units?: number
        }
        Update: {
          description?: string | null
          hours?: number
          subject_code?: string
          subject_id?: number
          title?: string
          units?: number
        }
        Relationships: []
      }
      TransactionDetail: {
        Row: {
          amount: number
          id: number
          particulars: string
          payment_ledger_id: number
        }
        Insert: {
          amount: number
          id?: number
          particulars: string
          payment_ledger_id: number
        }
        Update: {
          amount?: number
          id?: number
          particulars?: string
          payment_ledger_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'TransactionDetail_payment_ledger_id_fkey'
            columns: ['payment_ledger_id']
            isOneToOne: false
            referencedRelation: 'PaymentLedger'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      day_enum:
        | 'MONDAY'
        | 'TUESDAY'
        | 'WEDNESDAY'
        | 'THURSDAY'
        | 'FRIDAY'
        | 'SATURDAY'
        | 'SUNDAY'
      semester_enum: 'FIRST' | 'SECOND' | 'SUMMER'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never
