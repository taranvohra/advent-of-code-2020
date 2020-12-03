const fs = require('fs');

const traverse = (trees) => ([right, down]) => {
  const info = { r: 0, c: 0, count: 0 };
  while (info.r < trees.length - 1) {
    info.c = (info.c + right) % trees[0].length;
    info.r += down;
    info.count = info.count + (trees[info.r][info.c] === '#' ? 1 : 0);
  }
  return info.count;
};

const input = fs.readFileSync('./input.txt', 'utf-8').split('\n');
const countTrees = traverse(input);
const output = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
]
  .map(countTrees)
  .reduce((product, count) => product * count, 1);
console.log(output);
