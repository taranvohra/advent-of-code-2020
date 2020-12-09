const fs = require('fs');

const findEncryptionWeakness = (invalidNumber, numbers) => {
  let largestSetIndexes = [0, 0];
  for (let i = 0; i < numbers.length; i++) {
    let sum = numbers[i];
    for (let j = i + 1; j < numbers.length; j++) {
      sum += numbers[j];
      if (sum > invalidNumber) break;
      if (sum === invalidNumber) {
        const currSetLength = largestSetIndexes[1] - largestSetIndexes[0] + 1;
        const thisSetLength = j - i + 1;
        largestSetIndexes =
          thisSetLength > currSetLength ? [i, j] : largestSetIndexes;
        break;
      }
    }
  }
  const [first, ...rest] = numbers
    .slice(largestSetIndexes[0], largestSetIndexes[1] + 1)
    .sort((a, b) => a - b);
  const last = rest[rest.length - 1];
  return first + last;
};

const input = fs.readFileSync('./input.txt', 'utf-8').split('\n').map(Number);
console.log(findEncryptionWeakness(167829540, input));
