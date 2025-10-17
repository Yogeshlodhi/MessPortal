import prisma from "../db/prisma"; // Assumes you set up src/db/prisma.ts
import { ICreateStudentDTO } from "../interfaces/student.interface";
import { IUser } from "../interfaces/user.interface";

/**
 * Repository layer: Direct database access for the User entity.
 */
export class StudentRepository {
  /**
   * Creates a new user record in the database.
   */
  public async create(data: ICreateStudentDTO): Promise<IUser> {
    // NOTE: In a real app, hash the password here or in the Service layer
    // before saving. We omit hashing for brevity.

    // const newStudent: IUser = await prisma.user.create({ data });
    const newStudent = await prisma.user.create({
      data: {
        first_name: data.first_name,
        last_name: data.last_name || "",
        email_id: data.email_id,
        password: data.password, // hash before saving if needed
        contact_number: data.contact_number,
        role: data.role,
        student: {
          create: {
            batch: data.batch,
            roll_number: data.roll_number,
          },
        },
      },
      include: {
        student: true, // return the student nested object
      },
    });

    // Exclude the password before returning to the service layer
    const { password, ...userWithoutPassword } = newStudent as any;
    return userWithoutPassword as IUser;
  }

  /**
   * Finds a user by email. Useful for checking for duplicates.
   */
  public async findByEmail(email_id: string): Promise<IUser | null> {
    const user = await prisma.user.findUnique({ where: { email_id } });
    return user as IUser | null;
  }
}
