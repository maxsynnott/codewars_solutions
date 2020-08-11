const query = () => new Query();

class Query {
  constructor() {
    this.data = [];
    
    this.groupByFuncs = [];
    this.whereFuncs = [];
  };
  
  from(...data) {
    if (this.fromCalled) throw Error("Duplicate FROM");
    this.fromCalled = true;
    
    if (data.length > 1) {
      const joinData = [];
      
      for (let i = 0; i < data[0].length; i++) {
        for (let j = 0; j < data[1].length; j++) {
          joinData.push([data[0][i], data[1][j]]);
        };
      };
      
      this.data = joinData.slice();
    } else {
      this.data = data[0].slice();
    };
    
    return this;
  };
  
  where(...funcs) {
    this.whereFuncs.push(funcs);
    
    return this;
  };
  
  execWhere() {
    this.data = this.data.filter(e => this.whereFuncs
      .map(funcArr => funcArr.some(func => func(e)))
      .every(e => e)
    );
  };
  
  groupBy(...funcs) {
    if (this.groupByCalled) throw Error("Duplicate GROUPBY");
    this.groupByCalled = true;
    
    funcs.forEach(func => this.groupByFuncs.push(func));
    
    return this;
  };
  
  execGroupBy() {
    const groups = [];
    
    this.data.forEach(e => {
      const path = [];

      this.groupByFuncs.forEach(func => path.push(func(e)));
      
      const target = pathToTarget(path, groups);
      
      target.push(e);
    });
    
    this.data = groups;
  }
  
  having(func) {
    this.havingFunc = func;
    
    return this;
  };
  
  execHaving() {
    this.data = this.data.filter(e => this.havingFunc(e));
  };
  
  select(func) {
    if (this.selectCalled) throw Error("Duplicate SELECT");
    this.selectCalled = true;
    
    this.selectFunc = func;
    
    return this;
  };
  
  execSelect() {
    this.data = this.data.map(e => this.selectFunc(e));
  };
  
  orderBy(func) {
    if (this.orderByCalled) throw Error("Duplicate ORDERBY");
    this.orderByCalled = true;
      
    this.orderByFunc = func;
    
    return this;
  };
  
  execOrderBy() {
    this.data = this.data.sort((a, b) => this.orderByFunc(a, b));
  };
  
  execute() {
    if (this.whereFuncs.length) this.execWhere();
    if (this.groupByFuncs.length) this.execGroupBy();
    if (this.havingFunc) this.execHaving();
    if (this.selectFunc) this.execSelect();
    if (this.orderByFunc) this.execOrderBy();
    
    return this.data;
  };
};

const pathToTarget = (path, target) => {
  const group = target.find((g) => g[0] == path[0]);

  if(!group) target.push([path[0], []]);

  const newTarget = group ? group[1] : target[target.length - 1][1];

  if (path.length == 1) {
    return newTarget;
  } else {
    path.shift();
    return pathToTarget(path, newTarget);
  };
};