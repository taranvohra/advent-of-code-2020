const fs = require('fs');

const getRow = (sequence) =>
  sequence.reduce(
    (acc, curr) => {
      const mid = Math.floor((acc[0] + acc[1]) / 2);
      acc = curr === 'F' ? [acc[0], mid] : [mid + 1, acc[1]];
      return acc;
    },
    [0, 127]
  )[0];

const getCol = (sequence) =>
  sequence.reduce(
    (acc, curr) => {
      const mid = Math.floor((acc[0] + acc[1]) / 2);
      acc = curr === 'L' ? [acc[0], mid] : [mid + 1, acc[1]];
      return acc;
    },
    [0, 7]
  )[0];

const getUniqueSeatID = (boardingPass) => {
  const row = getRow(boardingPass.split('').slice(0, 7));
  const col = getCol(boardingPass.split('').slice(7));
  return row * 8 + col;
};

const boardingPasses = fs.readFileSync('./input.txt', 'utf-8').split('\n');
const highestSeatId = Math.max(...boardingPasses.map(getUniqueSeatID));
console.log(highestSeatId);
