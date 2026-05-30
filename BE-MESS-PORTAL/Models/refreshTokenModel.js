import mongoose, { Schema } from 'mongoose';

/**
 * Server-side record of an issued refresh token.
 *
 * Only the SHA-256 hash of the raw token is stored, so a database leak can't be
 * replayed against the API. Tokens are single-use: on every refresh the current
 * row is marked `revoked` and a fresh one is issued in the same `family`. If a
 * token that was already rotated (or revoked) is ever presented again, that's a
 * reuse signal — the whole family is revoked, logging out the attacker and the
 * victim. The `expiresAt` TTL index lets MongoDB purge expired rows on its own.
 */
const refreshTokenSchema = new Schema(
  {
    // The authenticated principal. `role` selects which collection `user` lives
    // in (Student vs Admin), so the refresh endpoint stays role-agnostic.
    user: { type: Schema.Types.ObjectId, required: true, index: true },
    role: { type: String, required: true, enum: ['Student', 'Admin'] },

    // SHA-256 hex of the raw token. Never store the raw token.
    tokenHash: { type: String, required: true, unique: true },

    // Shared id across one login session's rotation chain. Reuse of a revoked
    // token revokes every row in its family.
    family: { type: String, required: true, index: true },

    revoked: { type: Boolean, default: false },

    // TTL: MongoDB removes the document once this time passes.
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true },
);

refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const refreshTokenModel = mongoose.model('RefreshToken', refreshTokenSchema, 'RefreshTokens');

export default refreshTokenModel;
