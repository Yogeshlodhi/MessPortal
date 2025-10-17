import app from './app';
import { config } from './config';

const startServer = async () => {
  try {
    // 🔹 Future: Initialize DB here
    // await connectDatabase();

    app.listen(config.port, () => {
      console.log(`🚀 Server running on port ${config.port}`);
      console.log(`Environment: ${config.env}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();