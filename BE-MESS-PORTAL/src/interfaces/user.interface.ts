// src/interfaces/user.interface.ts
export interface IUser {
  id: number; 
  first_name: string;
  last_name?: string | null;
  email_id: string;
  contact_number: string;
  role: 'STUDENT' | 'ADMIN';
  created_at: Date;
  updated_at: Date;
}

// DTO for creating user
export interface ICreateUserDTO {
  first_name: string;
  email_id: string;
  password: string;  
  contact_number: string;
  role: 'STUDENT' | 'ADMIN';
  batch: string;
  roll_number: string;
}