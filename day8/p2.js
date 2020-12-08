const fs = require('fs');

const runBootCode = (instructions) => {
  const debug = { seen: {}, acc: 0, pointer: 0 };
  while (1) {
    if (debug.seen[debug.pointer]) return null;
    if (instructions[debug.pointer] === undefined) return debug.acc;
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
};

const getAccAfterFixingInstruction = (instructions) => {
  const indexesOfNopJmp = instructions.reduce((acc, curr, i) => {
    if (['jmp', 'nop'].includes(curr.split(' ')[0])) acc.push(i);
    return acc;
  }, []);

  return indexesOfNopJmp
    .map((index) => {
      const copy = instructions.slice();
      copy[index] = copy[index].replace(/(nop|jmp)/, (m) =>
        m === 'nop' ? 'jmp' : 'nop'
      );
      return runBootCode(copy);
    })
    .filter(Boolean)[0];
};

const input = fs.readFileSync('./input.txt', 'utf-8').split('\n');
console.log(getAccAfterFixingInstruction(input));
