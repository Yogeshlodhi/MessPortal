import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary';

import connectDB from './config/db.js';
import userRoutes from './Routes/studentRoutes.js';
import adminRoutes from './Routes/adminRoutes.js';
import leaveRoutes from './Routes/leaveRoutes.js';
import { errorHandler, notFound } from './Middleware/errorMiddleware.js';
import { apiLimiter } from './Middleware/rateLimiter.js';

dotenv.config();

const PORT = process.env.NODE_PORT || 3001;
const ENV = process.env.NODE_ENV || 'development';

const app = express();
app.set('trust proxy', 1); // correct client IPs behind a proxy (rate limiting)

/* ────────────────────────────── CORS ────────────────────────────────── */
const allowedOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser clients (no Origin) and whitelisted origins.
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization',
  }),
);

/* ──────────────────────── Security & parsing ─────────────────────────── */
app.use(helmet());
app.use(compression());
if (ENV !== 'production') app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* ────────────────────────────── Routes ──────────────────────────────── */
app.get('/health', (req, res) => res.status(200).json({ status: 'ok', env: ENV }));

app.use('/api', apiLimiter);
app.use('/api/student', userRoutes);
app.use('/api/student/leaveApplication', leaveRoutes);
app.use('/api/admin', adminRoutes);

/* ─────────────────────── 404 + error handling ───────────────────────── */
app.use(notFound);
app.use(errorHandler);

/* ─────────────────────────── Bootstrap ──────────────────────────────── */
const start = async () => {
  await connectDB();
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT} [${ENV}]`);
  });

  const shutdown = (signal) => {
    console.log(`\n${signal} received. Shutting down gracefully...`);
    server.close(() => {
      console.log('HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
  });
};

start();
