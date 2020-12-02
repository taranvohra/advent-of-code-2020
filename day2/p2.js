const fs = require('fs');

const isValidPassword = (password, letter, pos1, pos2) =>
  (password[pos1] === letter) ^ (password[pos2] === letter);

const rows = fs.readFileSync('./input.txt', 'utf-8').split('\n');
const validPasswords = rows
  .map((row) => {
    const [policy, password] = row.split(':');
    const [positions, letter] = policy.split(' ');
    const [pos1, pos2] = positions.split('-').map(Number);
    return isValidPassword(password.trim(), letter, pos1 - 1, pos2 - 1);
  })
  .filter(Boolean).length;

console.log(validPasswords);
