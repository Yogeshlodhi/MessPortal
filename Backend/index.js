import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './Routes/studentRoutes.js';
import adminRoutes from './Routes/adminRoutes.js';
import { errorHandler } from './Middleware/errorMiddleware.js';
import cors from 'cors';
import leaveRoutes from './Routes/leaveRoutes.js';

const app = express();
dotenv.config();
connectDB();

const PORT = process.env.PORT || 6000;

app.use(cors({origin: "*"}))

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/student',userRoutes);
app.use('/api/student/leaveApplication',leaveRoutes);
app.use('/api/admin',adminRoutes);

app.use(errorHandler);

app.listen(PORT,() => {
    console.log(`App is running fine @ ${PORT}`)
})