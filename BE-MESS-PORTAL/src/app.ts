import express from 'express';
import cors from 'cors';
import { studentRouter } from './routes/student.route';

const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Routes ---
app.use('/api/v1/students', studentRouter);

// --- Health Check Route ---
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Mess Portal Backend is up and running!',
  });
});

// --- Centralized Error Handler ---
// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   res.status(statusCode).json({
//     success: false,
//     message: err.message || 'Internal Server Error',
//   });
// });

export default app;