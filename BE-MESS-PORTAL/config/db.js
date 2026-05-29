import mongoose from 'mongoose';

/**
 * Establishes the MongoDB connection.
 *
 * Connection event listeners are registered *before* connecting so we never
 * miss the initial `connected` event, and `autoIndex` is disabled in
 * production (indexes are created explicitly / during deploys instead of on
 * every boot).
 */
const connectDB = async () => {
  const { DB_AUTH_USER, DB_AUTH_PASSWORD, DB_URL, DB_NAME } = process.env;

  if (!DB_AUTH_USER || !DB_AUTH_PASSWORD || !DB_URL || !DB_NAME) {
    console.error('❌ Missing required database environment variables.');
    process.exit(1);
  }

  const uri = `mongodb+srv://${DB_AUTH_USER}:${DB_AUTH_PASSWORD}@${DB_URL}/${DB_NAME}?retryWrites=true&w=majority`;

  mongoose.set('strictQuery', true);

  const connection = mongoose.connection;
  connection.on('connected', () => console.log(`✅ MongoDB connected: ${connection.name}`));
  connection.on('error', (err) => console.error('❌ MongoDB connection error:', err.message));
  connection.on('disconnected', () => console.warn('⚠️  MongoDB disconnected.'));

  try {
    await mongoose.connect(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      autoIndex: process.env.NODE_ENV !== 'production',
    });
  } catch (error) {
    console.error('❌ Initial MongoDB connection failed:', error.message);
    process.exit(1);
  }

  return connection;
};

export default connectDB;
