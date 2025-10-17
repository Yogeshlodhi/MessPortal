// src/config/index.ts

import 'dotenv/config';

// Define an interface for type safety
interface Config {
    port: number;
    env: string;
    jwtSecret: string;
    databaseUrl: string;
    cloudinary: {
        cloudName: string;
        apiKey: string;
        apiSecret: string;
    };
}

// Function to validate and load environment variables
const getConfig = (): Config => {
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
    const env = process.env.NODE_ENV || 'development';
    const jwtSecret = process.env.JWT_SECRET;
    const databaseUrl = process.env.DATABASE_URL;

    // Check for critical missing variables
    if (!jwtSecret || !databaseUrl) {
        throw new Error("Missing critical environment variables: JWT_SECRET or DATABASE_URL");
    }

    return {
        port,
        env,
        jwtSecret,
        databaseUrl,
        cloudinary: {
            cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
            apiKey: process.env.CLOUDINARY_API_KEY || '',
            apiSecret: process.env.CLOUDINARY_API_SECRET || '',
        },
    };
};

export const config = getConfig();