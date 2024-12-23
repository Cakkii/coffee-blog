import * as CryptoJS from "crypto-js";

// https://stackoverflow.com/questions/62578705/decrypt-openssl-aes-256-cbc-in-browser-cryptojs

export function getBlog(encrypted: string, password: string): string {
  // 1. Separate ciphertext and salt
  const encryptedWA = CryptoJS.enc.Base64.parse(encrypted);
  // const prefixWA = CryptoJS.lib.WordArray.create(
  //   encryptedWA.words.slice(0, 8 / 4),
  // ); // Salted__ prefix
  const saltWA = CryptoJS.lib.WordArray.create(
    encryptedWA.words.slice(8 / 4, 16 / 4),
  ); // 8 bytes salt: 0x0123456789ABCDEF
  const ciphertextWA = CryptoJS.lib.WordArray.create(
    encryptedWA.words.slice(16 / 4, encryptedWA.words.length),
  ); // ciphertext

  // 2. Determine key and IV using PBKDF2
  const keyIvWA = CryptoJS.PBKDF2(password, saltWA, {
    keySize: (32 + 16) / 4, // key and IV
    iterations: 10000,
    hasher: CryptoJS.algo.SHA256,
  });
  const keyWA = CryptoJS.lib.WordArray.create(keyIvWA.words.slice(0, 32 / 4));
  const ivWA = CryptoJS.lib.WordArray.create(
    keyIvWA.words.slice(32 / 4, (32 + 16) / 4),
  );
  // 3. Decrypt
  const decryptedWA = CryptoJS.AES.decrypt(
    CryptoJS.lib.CipherParams.create({
      ciphertext: ciphertextWA,
    }),
    keyWA,
    { iv: ivWA },
  );
  const decrypted = decryptedWA.toString(CryptoJS.enc.Utf8);
  console.log(decrypted);
  return decrypted;
}
