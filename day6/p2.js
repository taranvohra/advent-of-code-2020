const fs = require('fs');

const countQuestionsAnsweredYesByAll = (group) => {
  const answered = group.reduce((acc, answeres) => {
    answeres.split('').forEach((a) => (acc[a] = (acc[a] || 0) + 1));
    return acc;
  }, {});
  return Object.values(answered).filter((a) => a === group.length).length;
};

const sumGroupAnswers = (groups) =>
  groups.reduce((acc, curr) => acc + countQuestionsAnsweredYesByAll(curr), 0);

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
