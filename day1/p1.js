const fs = require('fs');

const findEntriesSummingTo2020 = (array) => {
  const cache = {};
  for (let i = 0; i < array.length; i++) {
    const entry = array[i];
    const entryNeeded = 2020 - entry;
    if (cache[entryNeeded]) return [entry, entryNeeded];
    else cache[entry] = i;
  }
};

const input = fs.readFileSync('./input1.txt', 'utf-8').split('\n').map(Number);
const [one, two] = findEntriesSummingTo2020(input);
console.log(one * two);
