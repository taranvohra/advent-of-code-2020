const fs = require('fs');

const doesOuterHaveColor = (outer, color, graph) =>
  graph[outer].some(([_, innerColor]) => {
    if (innerColor === color) return true;
    if (innerColor === '') return false;
    return doesOuterHaveColor(innerColor, color, graph);
  });

const countBagColorsContaining = (color, graph) =>
  Object.keys(graph)
    .map((outer) => doesOuterHaveColor(outer, color, graph))
    .filter(Boolean).length;

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

console.log(countBagColorsContaining('shiny gold', graph));
