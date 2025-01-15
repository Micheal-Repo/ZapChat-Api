import crypto from "crypto"

function generateRandomBase64(size:any) {
  return crypto.randomBytes(size).toString('base64');
}

const base64String = generateRandomBase64(16); 
console.log(base64String);
