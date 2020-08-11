const calc = expression => {
  // Evaluate brackets first and replace with result
  const bracketCheck = /-?\(([^()]+)\)/;
  while (bracketCheck.test(expression)) expression = expression.replace(bracketCheck, (match, c1) => match[0] == '-' ? -calc(c1) : calc(c1));

  const checks = [
    /(-?\d+(?:\.\d+(?:e(?:\+|-)\d+)?)?) ?(\*|\/) ?(-?\d+(?:\.\d+(?:e(?:\+|-)\d+)?)?)/,
    /(-?\d+(?:\.\d+(?:e(?:\+|-)\d+)?)?) ?(\+|-) ?(-?\d+(?:\.\d+(?:e(?:\+|-)\d+)?)?)/
  ]
  
  checks.forEach((check) => {
    while (check.test(expression)) {
      expression = expression.replace(check, (_, a, o, b) => {
        [a, b] = [+a, +b];
        switch (o) {
          case '*': return a * b;
          case '/': return a / b;
          case '+': return a + b;
          case '-': return a - b;
        };
      });
    };
  });

  return +expression;
};