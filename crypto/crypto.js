import crypto from "crypto";

console.log(crypto.getHashes());
console.log(crypto.getCiphers());

const iv = crypto.randomBytes(16);

const hash = crypto
  .createHash("sha1")
  .update("your message")
  .digest("hex");

console.log(hash);

const secretMessage = ":)";
const key = "12345678123456781234567812345678";

const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
let encrypted = cipher.update(secretMessage, "utf-8", "hex");
encrypted += cipher.final("hex");

console.log(`encrypted: ${encrypted}`);

const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
let decrypted = decipher.update(encrypted, "hex", "utf-8");
decrypted += decipher.final("utf-8");

console.log(`decrypted: ${decrypted}`);
