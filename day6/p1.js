const fs = require('fs');

const countQuestionsAnsweredYes = (group) => {
  const { count } = group.reduce(
    (acc, answeres) => {
      answeres.split('').forEach((a) => {
        if (!acc.answered[a]) {
          acc.answered[a] = true;
          acc.count += 1;
        }
      });
      return acc;
    },
    { answered: {}, count: 0 }
  );
  return count;
};

const sumGroupAnswers = (groups) =>
  groups.reduce((acc, curr) => acc + countQuestionsAnsweredYes(curr), 0);

const { groups } = fs
  .readFileSync('./input.txt', 'utf-8')
  .split('\n')
  .reduce(
    (acc, curr, i, arr) => {
      if (curr === '') {
        acc.groups.push(acc.buffer);
        acc.buffer = [];
      } else acc.buffer.push(curr);

      if (i === arr.length - 1) acc.groups.push(acc.buffer);
      return acc;
    },
    { groups: [], buffer: [] }
  );

const output = sumGroupAnswers(groups);
console.log(output);
