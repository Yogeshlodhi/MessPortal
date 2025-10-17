import { Router } from 'express';
import { StudentController } from '../controllers/student.controller';

const router = Router();
const studentController = new StudentController();

/**
 * POST /api/v1/users
 * Route to create a new user.
 */
router.post('/create', studentController.createStudent);

export { router as studentRouter };