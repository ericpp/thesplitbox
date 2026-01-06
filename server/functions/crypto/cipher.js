import crypto from "crypto";

const PBKDF2_ITERATIONS = 100000;
const KEY_LENGTH = 32; // AES-256
const SALT_LENGTH = 16;
const IV_LENGTH = 12; // GCM standard

/**
 * Encrypts text using AES-256-GCM with PBKDF2 key derivation
 * @param {string} token - Encryption passphrase
 * @param {string} text - Text to encrypt
 * @returns {string} - Format: salt:iv:encryptedData:authTag (hex)
 */
export function encrypt(token, text) {
  if (!token || !text) {
    throw new Error("Token and text are required");
  }

  const salt = crypto.randomBytes(SALT_LENGTH);
  const iv = crypto.randomBytes(IV_LENGTH);
  const key = crypto.pbkdf2Sync(token, salt, PBKDF2_ITERATIONS, KEY_LENGTH, "sha256");

  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return [salt, iv, encrypted, authTag]
    .map(buf => buf.toString("hex"))
    .join(":");
}

/**
 * Decrypts AES-256-GCM encrypted text
 * @param {string} token - Decryption passphrase
 * @param {string} encryptedText - Format: salt:iv:encryptedData:authTag
 * @returns {string} - Decrypted text
 */
export function decrypt(token, encryptedText) {
  if (!token || !encryptedText) {
    throw new Error("Token and encrypted text are required");
  }

  const parts = encryptedText.split(":");
  if (parts.length !== 4) {
    throw new Error("Invalid encrypted text format. Expected: salt:iv:data:authTag");
  }

  const [salt, iv, encrypted, authTag] = parts.map(p => Buffer.from(p, "hex"));
  const key = crypto.pbkdf2Sync(token, salt, PBKDF2_ITERATIONS, KEY_LENGTH, "sha256");

  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(authTag);

  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString("utf8");
}