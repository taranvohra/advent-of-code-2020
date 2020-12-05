const fs = require('fs');

const countValidPassports = (passports) => {
  const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  return passports.filter((passport) => {
    const fields = Object.fromEntries(
      passport.split(' ').map((field) => field.split(':'))
    );
    return requiredFields.every((rf) => {
      const value = fields[rf];
      if (!value) return false;

      switch (rf) {
        case 'byr':
          return value >= 1920 && value <= 2002;
        case 'iyr':
          return value >= 2010 && value <= 2020;
        case 'eyr':
          return value >= 2020 && value <= 2030;
        case 'hgt':
          const hgtValUnit = value.split(/(\d+)(in|cm)/g).filter(Boolean);
          if (hgtValUnit.length !== 2) return false;
          const [height, unit] = hgtValUnit;
          if (unit === 'cm') return height >= 150 && height <= 193;
          else if (unit === 'in') return height >= 59 && height <= 76;
          else return false;
        case 'hcl':
          return /^#[a-f0-9]{6}$/.test(value);
        case 'ecl':
          return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(
            value
          );
        case 'pid':
          return /^[0-9]{9}$/.test(value);
        default:
          return false;
      }
    });
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
