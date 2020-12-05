const fs = require('fs');

const countValidPassports = (passports) => {
  const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  return passports.filter((passport) => {
    const fieldNames = passport.split(' ').map((field) => field.split(':')[0]);
    return requiredFields.every((f) => fieldNames.includes(f));
  }).length;
};

const { passports } = fs
  .readFileSync('./input.txt', 'utf-8')
  .split('\n')
  .reduce(
    (acc, curr, i, arr) => {
      if (curr === '') {
        acc.passports.push(acc.buffer.join(' '));
        acc.buffer = [];
      } else acc.buffer.push(curr);

      if (i === arr.length - 1) acc.passports.push(acc.buffer.join(' '));
      return acc;
    },
    { passports: [], buffer: [] }
  );

const output = countValidPassports(passports);
console.log(output);
