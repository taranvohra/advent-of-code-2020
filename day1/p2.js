const fs = require('fs');

const findEntriesSummingTo2020 = (array) => {
  const sumCache = {};
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (i === j) continue;
      const ijSum = array[i] + array[j];
      sumCache[ijSum] = [array[i], array[j]];
    }
  }

  for (let i = 0; i < array.length; i++) {
    const entry = array[i];
    const entryNeeded = 2020 - entry;
    if (sumCache[entryNeeded])
      return [entry, sumCache[entryNeeded][0], sumCache[entryNeeded][1]];
  }
};

const input = fs.readFileSync('./input1.txt', 'utf-8').split('\n').map(Number);
const [one, two, three] = findEntriesSummingTo2020(input);
console.log(one * two * three);
