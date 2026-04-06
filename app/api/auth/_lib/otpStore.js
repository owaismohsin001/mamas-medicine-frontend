import crypto from "crypto";

const sessionStore = new Map();

const SESSION_EXPIRY_MS = 30 * 60 * 1000;

export function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function generateSessionToken(email) {
  const token = crypto.randomBytes(32).toString("hex");
  sessionStore.set(token, {
    email: email.toLowerCase().trim(),
    expiry: Date.now() + SESSION_EXPIRY_MS,
  });
  return token;
}

export function verifySessionToken(token) {
  if (!token) return { valid: false };
  const record = sessionStore.get(token);
  if (!record) return { valid: false };
  if (Date.now() > record.expiry) {
    sessionStore.delete(token);
    return { valid: false };
  }
  return { valid: true, email: record.email };
}

export function consumeSessionToken(token) {
  const result = verifySessionToken(token);
  if (result.valid) sessionStore.delete(token);
  return result;
}
