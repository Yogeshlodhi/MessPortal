import { Role } from './api.types';

export interface IStudentRecord {
  _id: string;
  emailId: string;
  studentName: string;
  studentRoll: string;
  number: string;
  bankAccount?: string;
  ifsc?: string;
  profileImage?: string;
  avatar?: { public_id: string; url: string };
  createdAt?: string;
  updatedAt?: string;
}

export interface IAdminRecord {
  _id: string;
  emailId: string;
  firstName: string;
  lastName?: string;
  adminType: Exclude<Role, 'Student'>;
  createdAt?: string;
  updatedAt?: string;
}

export interface IStudentLoginPayload {
  emailId: string;
  password: string;
}

export interface IStudentRegisterPayload {
  emailId: string;
  studentName: string;
  studentRoll: string;
  number: string;
  password: string;
}

export interface IAdminLoginPayload {
  emailId: string;
  password: string;
}
