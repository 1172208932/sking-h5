
const rule = require("./common/rule");
const drawNum = require("./common/drawNum");

const proxy = {
  "GET /projectRule.query": rule,
  "GET /drawNum.query": drawNum
};
module.exports = proxy;
