const fs = require('fs');

const doesNumberAtIndexFollowRule = (index, numbers) => {
  const previous = numbers.slice(index - 25, index);
  const sumOfCombinations = previous.reduce((acc, curr) => {
    previous.forEach((n) => (curr !== n ? acc.push(curr + n) : null));
    return acc;
  }, []);
  return sumOfCombinations.find((s) => s === numbers[index]);
};

const findWeaknessInXMAS = (numbers) =>
  numbers
    .slice(25)
    .map((_, i) => {
      const result = doesNumberAtIndexFollowRule(i + 25, numbers);
      return result ? true : numbers[i + 25];
    })
    .filter((r) => typeof r === 'number')[0];

const input = fs.readFileSync('./input.txt', 'utf-8').split('\n').map(Number);
console.log(findWeaknessInXMAS(input));
