const fs = require('fs');

const countBagsInside = (color, graph) =>
  graph[color].reduce(
    (sum, [count, inner]) =>
      sum + count + (inner !== '' ? count * countBagsInside(inner, graph) : 0),
    0
  );

const rules = fs
  .readFileSync('./input.txt', 'utf-8')
  .split('\n')
  .map((rule) => rule.split('contain'))
  .map(([outerBag, ...rest]) => [
    outerBag.trim(),
    ...rest[0].split(',').map((b) => b.trim()),
  ]);

const graph = rules.reduce((acc, curr) => {
  const [outer, ...inner] = curr;
  const [outerAttr, outerColor] = outer.split(' ');
  acc[`${outerAttr} ${outerColor}`] = inner.map((inner) => {
    const [count, ...rest] = inner.split(' ');
    if (count === 'no') return [0, ''];
    return [Number(count), `${rest[0]} ${rest[1]}`];
  });
  return acc;
}, {});

console.log(countBagsInside('shiny gold', graph));
