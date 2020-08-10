function josephus(items, k) {
  const output = [];
  
  for (let i = ((k - 1) % items.length); items.length > 0; i = (i + k - 1) % items.length) {
    output.push(items.splice(i, 1)[0]);
  };
  
  return output;
};
