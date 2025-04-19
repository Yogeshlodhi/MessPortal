import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './Routes/studentRoutes.js';
import adminRoutes from './Routes/adminRoutes.js';
import leaveRoutes from './Routes/leaveRoutes.js';
import { errorHandler } from './Middleware/errorMiddleware.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';
import fileUpload from 'express-fileupload';
import path from 'path';

dotenv.config();

const app = express();

connectDB();

const PORT = process.env.NODE_PORT || 3001;
const ENV = process.env.NODE_ENV || "local";

// CORS configuration
const corsOptions = {
  origin: [
    "http://localhost:5173", 
    "http://localhost:5174", 
    "https://adminpanel-zvp2.onrender.com",
    "https://studentspanel.onrender.com"
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Content-Type,Authorization'
};
app.use(cors(corsOptions));


// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));

// to be used for aws 
const _dirname = path.dirname("")
const buildPathForStudents = path.join(_dirname, "../StudentsPanel/build")
const buildPathForAdmin = path.join(_dirname, "../AdminPanel/build")
app.use(express.static(buildPathForStudents));
app.use(express.static(buildPathForAdmin));
// to be used for aws 

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Routes
app.use('/api/student', userRoutes);
app.use('/api/student/leaveApplication', leaveRoutes);
app.use('/api/admin', adminRoutes);

// Error handler
app.use(errorHandler);

// CORS error handler
app.use((err, req, res, next) => {
  if (err.message === "Not allowed by CORS") {
    res.status(403).json({ error: "Access denied. This origin is not allowed." });
  } else {
    next(err);
  }
});

// Server start
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}, Environment: ${ENV}!`);
});