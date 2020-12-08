const fs = require('fs');

const getAccBeforeInfiniteLoop = (instructions) => {
  const debug = { seen: {}, acc: 0, pointer: 0 };
  while (1) {
    if (debug.seen[debug.pointer]) break;
    const [operation, argument] = instructions[debug.pointer].split(' ');
    debug.seen[debug.pointer] = true;
    switch (operation) {
      case 'acc':
        debug.acc += Number(argument);
        debug.pointer += 1;
        break;
      case 'jmp':
        debug.pointer += Number(argument);
        break;
      case 'nop':
        debug.pointer += 1;
        break;
    }
  }
  return debug.acc;
};

const input = fs.readFileSync('./input.txt', 'utf-8').split('\n');
console.log(getAccBeforeInfiniteLoop(input));
