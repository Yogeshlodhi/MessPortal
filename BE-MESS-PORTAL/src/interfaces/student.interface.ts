export interface ICreateStudentDTO {
  first_name: string;
  last_name?: string;
  email_id: string;
  password: string;  
  contact_number: string;
  role: 'STUDENT' | 'ADMIN';
  batch: string;
  roll_number: string;
}