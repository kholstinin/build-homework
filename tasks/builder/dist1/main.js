const modules = {
  "./cals.cjs": function (require, module) {
    console.log(11, require("./arguments.cjs"));
    const { a, b } = require("./arguments.cjs");

    function sum() {
      return a + b;
    }
    return { sum };
  },
  "./arguments.cjs": function (require, module) {
    const a = 5;
    const b = 6;
    
    console.log(22);
    return { a, b };
  },
};

function require(moduleId) {
  modules[moduleId](require);
}

// TODO module.exports
// const { sum } = myRequire("./calc.cjs");
// console.log(sum());

console.log(modules["./cals.cjs"](require));
