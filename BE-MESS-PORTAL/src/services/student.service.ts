// import { Role } from "../generated/prisma";
import { ICreateStudentDTO } from "../interfaces/student.interface";
import { IUser } from "../interfaces/user.interface";
import { StudentRepository } from "../repositories/student.repository";
// import * as bcrypt from 'bcrypt'; // You would install and use bcrypt here

/**
 * Service layer: Contains business logic for User operations.
 */
export class StudentService {
  private studentRepository: StudentRepository;

  constructor() {
    this.studentRepository = new StudentRepository();
  }

  /**
   * Creates a new user after validation and password hashing.
   */
  public async createStudent(studentData: ICreateStudentDTO): Promise<IUser> {
    // 1. Business Rule: Check if user already exists
    const studentExists = await this.studentRepository.findByEmail(
      studentData.email_id
    );
    if (studentExists) {
      const error = new Error("Student with this email already exists.") as any;
      error.statusCode = 409; // Conflict
      throw error;
    }

    // 2. Business Logic: Hash password (implementation omitted)
    // const hashedPassword = await bcrypt.hash(userData.password, 10);

    // const studentToCreate = {
    //     ...userData,
    //     // password: hashedPassword, // Use the hashed password
    // };

    const studentToCreate = {
      ...studentData,
      //   first_name: studentData.first_name,
      //   // last_name: userData.last_name,
      //   email_id: studentData.email_id,
      //   role: studentData.role as Role,
      password: studentData.password, // hash it if you implement bcrypt
    };

    // 3. Call the Repository to save the data
    const newUser = await this.studentRepository.create(studentToCreate);

    return newUser;
  }
}
