const factorialize = (i, product = 1) => {
  if (i == 1 || i == 0) {
    return product;
  } else {
    product *= i;
    return factorialize(i - 1, product);
  };
};

const charCounts = str => {
  const counts = {};
  
  for (let i = 0; i < str.length; i++) counts[str[i]] = (counts[str[i]] || 0) + 1;
  
  return counts;
}

const perms = element => {
  const str = element.toString();
  const n = str.length;
  const counts = Object.values(charCounts(str));
  
  return factorialize(n) / counts.map(a => factorialize(a)).reduce((a, b) => a * b);
};
