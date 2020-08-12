function add(a, b) {
  const len = Math.max(a.length, b.length) + 1;
  
  [a, b] = [a, b].map(s => s.padStart(len, '0'));
  a = a.split('');
  
  const addToA = (n, i) => {
    const added = +a[i] + n + "";
    
    a.splice(i, 1, added[added.length - 1]);
    
    if (added.length > 1) addToA(+added[0], i - 1);
  }
  
  for (let i = len - 1; i >= 0; i--) addToA(+b[i], i);
  
  while (a[0] == '0') a.splice(0, 1);
  
  return a.join('');
}