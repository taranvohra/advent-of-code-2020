const fs = require('fs');

const isValidPassword = (password, letter, min, max) => {
  let count = 0;
  for (let i = 0; i < password.length; i++) {
    if (password[i] === letter) {
      count++;
      if (count > max) return false;
    }
  }
  return count >= min && count <= max;
};

const rows = fs.readFileSync('./input.txt', 'utf-8').split('\n');
const validPasswords = rows
  .map((row) => {
    const [policy, password] = row.split(':');
    const [counts, letter] = policy.split(' ');
    const [min, max] = counts.split('-').map(Number);
    return isValidPassword(password, letter, min, max);
  })
  .filter(Boolean).length;

console.log(validPasswords);
