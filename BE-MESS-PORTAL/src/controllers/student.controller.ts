import { Request, Response, NextFunction } from "express";
import { StudentService } from "../services/student.service";

/**
 * Controller layer: Handles the HTTP Request/Response cycle for User endpoints.
 */
export class StudentController {
  private studentService: StudentService;

  constructor() {
    this.studentService = new StudentService();
  }

  /**
   * POST /api/v1/users - Handles user creation.
   */
  public createStudent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const {
        first_name,
        email_id,
        password,
        contact_number,
        role,
        batch,
        roll_number,
      } = req.body;

      // 1. Simple Validation
      if (!first_name || !email_id || !password) {
        const error = new Error(
          "Missing required fields: name, email, password, and role."
        ) as any;
        error.statusCode = 400;
        return next(error);
      }

      // 2. Call the Service layer
      const newStudent = await this.studentService.createStudent({
        first_name,
        email_id,
        password,
        contact_number,
        role,
        batch,
        roll_number,
      });

      // 3. Send the successful response (201 Created)
      res.status(201).json({
        success: true,
        message: "Student created successfully",
        data: newStudent,
      });
    } catch (error) {
      next(error); // Pass error to the centralized error handler (in src/app.ts)
    }
  };
}
