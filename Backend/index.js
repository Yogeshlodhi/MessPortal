import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './Routes/studentRoutes.js';
import adminRoutes from './Routes/adminRoutes.js';
import leaveRoutes from './Routes/leaveRoutes.js';
import { errorHandler } from './Middleware/errorMiddleware.js';
import cors from 'cors';
import bodyParser from 'body-parser';

// Load environment variables
if (process.env.NODE_ENV === undefined) {
  dotenv.config({ path: ".env.local" });
} else {
  dotenv.config();
}

const app = express();

connectDB();

const PORT = process.env.NODE_PORT || 3001;
const ENV = process.env.NODE_ENV || "local";

// CORS configuration
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Content-Type,Authorization'
};
app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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




// import express from 'express';
// import dotenv from 'dotenv';
// import connectDB from './config/db.js';
// import userRoutes from './Routes/studentRoutes.js';
// import adminRoutes from './Routes/adminRoutes.js';
// import { errorHandler } from './Middleware/errorMiddleware.js';
// import cors from 'cors';
// import leaveRoutes from './Routes/leaveRoutes.js';

// const app = express();
// dotenv.config();
// connectDB();

// const PORT = process.env.PORT || 6000;

// // app.use(cors({ origin: "*" }))
// const corsOptions = {
//     origin: ["http://localhost:5173", "http://localhost:5174"], 
//     // origin: ["http://localhost:3000", "deployed backend url"], 
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//     allowedHeaders: 'Content-Type,Authorization'
// }
// app.use(cors(corsOptions));

// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

// app.use('/api/student', userRoutes);
// app.use('/api/student/leaveApplication', leaveRoutes);
// app.use('/api/admin', adminRoutes);

// app.use(errorHandler);

// app.listen(PORT, () => {
//     console.log(`App is running fine @ ${PORT}`)
// })