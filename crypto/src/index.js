const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
  let cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function decrypt(ivHex, encryptedTextHex) {
  let iv = Buffer.from(ivHex, 'hex');
  let encryptedText = Buffer.from(encryptedTextHex, 'hex');
  let decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

// Example usage
const creditCardNumber = '1234-5678-9012-3456';
const encryptedData = encrypt(creditCardNumber);
console.log(`Encrypted data: ${encryptedData.encryptedData}, IV: ${encryptedData.iv}`);
const decryptedData = decrypt(encryptedData.iv, encryptedData.encryptedData);
console.log(`Decrypted data: ${decryptedData}`);
