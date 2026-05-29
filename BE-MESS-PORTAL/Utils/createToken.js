import bcrypt from 'bcryptjs';

// 12 rounds is the modern sweet spot: strong enough while keeping logins fast.
// (The previous value of 15 took ~seconds per hash and blocked the event loop.)
export const SALT_ROUNDS = 12;

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
};
