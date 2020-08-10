// This got a bit messy and could use cleaning up but it's working
const calc = expression => {
  const numCheckString = "(-?\\d+(?:\\.\\d+(?:e(?:\\+|-)\\d+)?)?)";
  const operatorCheckStrings = [" ?(\\*|\\/) ?", " ?(\\+|-) ?"];
  
  const bracketCheck = /-?\(([^()]+)\)/;
  
  while (expression.search(bracketCheck) != -1) {
    expression = expression.replace(bracketCheck, (match, c1) => {
      return match[0] == '-' ? calc(c1) * -1 : calc(c1);
    });
  };

  operatorCheckStrings.forEach((checkString) => {
    const regex = new RegExp(numCheckString + checkString + numCheckString)
    while (expression.search(regex) != -1) {
      expression = expression.replace(regex, (_, a, o, b) => {
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