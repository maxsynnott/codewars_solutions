function pathFinder(maze) {
  if (maze.length == 1) return 0;
  let shortestPath;
  
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

  const queue = [[0]];
  
  while (queue.length && !shortestPath) {
    const path = queue.shift();
    const n = path[path.length - 1];
    const adjs = adjIndexes(n)
    
    adjs.forEach(i => {
      const newPath = path.slice();
      newPath.push(i);
      
      const value = maze[i];
      
      if (value == "T") shortestPath = newPath;
      
      if (value == ".") {
        replaceAt(i, "X");
        queue.push(newPath);
      };
    });
  };
  
  return shortestPath ? shortestPath.length - 1 : false;
};
