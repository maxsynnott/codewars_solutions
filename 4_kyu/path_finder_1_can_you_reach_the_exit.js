function pathFinder(maze) {
  let possiblePath = false;
  
  maze = maze.replace(/\n/g, "");
  
  const mazeLen = Math.sqrt(maze.length);
  
  const replaceAt = (i, char) => {
    maze = maze.slice(0, i) + char + maze.slice(i + 1);
  };
  
  const adjIndexes = (n) => {
    return [
      (n >= mazeLen) ? n - mazeLen : -1,
      (n < maze.length - mazeLen) ? n + mazeLen : -1,
      (n % mazeLen != 0) ? n - 1 : -1,
      (n % mazeLen != mazeLen - 1) ? n + 1 : -1
    ].filter(i => i >= 0 && i < maze.length);
  };
  
  replaceAt(0, "X");
  replaceAt(maze.length - 1, "T");

  const queue = [0];
  
  while (queue.length && !possiblePath) {
    const n = queue.shift();
    
    adjIndexes(n).forEach(i => {
      const value = maze[i];
      if (value == "T") possiblePath = true;
      
      if (value == ".") {
        replaceAt(i, "X");
        queue.push(i);
      };
    });
  };
  
  return possiblePath;
}