
const rule = require("./common/rule");
const drawNum = require("./common/drawNum");
const {getIndex,doExchange,listExchangeLimit} = require("./activity")
const proxy = {
  "GET /projectRule.query": rule,
  "GET /drawNum.query": drawNum,
  "GET /scoring/index.do": getIndex,
  "POST /exchange_1/doExchange.do":doExchange,
  "GET /exchange_1/listExchangeLimit.do":listExchangeLimit,
};
module.exports = proxy;
