// src/utils/codeGen.js
const ALPHANUM = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateCode(length = 6) {
  let result = "";
  for (let i = 0; i < length; i++) {
    const idx = Math.floor(Math.random() * ALPHANUM.length);
    result += ALPHANUM[idx];
  }
  return result;
}

module.exports = { generateCode };
