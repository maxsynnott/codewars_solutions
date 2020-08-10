function permutations (string) {
  const permsArr = [];
  
  const swap = (arr, i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };
  
  const permutate = (n, arr) => {
    if (n == 1) {
      permsArr.push(arr.join(''));
    } else {
      permutate(n - 1, arr);
    
      for (let i = 0; i < n - 1; i++) {
        swap(arr, n % 2 ? 0 : i, n - 1);

        permutate(n - 1, arr);
      };
    };
  };
  
  permutate(string.length, string.split(''));
  
  return Array.from(new Set(permsArr));
}