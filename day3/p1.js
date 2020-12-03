const fs = require('fs');

const traverse = (trees) => {
  const info = { r: 0, c: 0, count: 0 };
  while (info.r < trees.length - 1) {
    info.c = (info.c + 3) % trees[0].length;
    info.r += 1;
    info.count = info.count + (trees[info.r][info.c] === '#' ? 1 : 0);
  }
  return info.count;
};

const input = fs.readFileSync('./input.txt', 'utf-8').split('\n');
const treeCount = traverse(input);
console.log(treeCount);
