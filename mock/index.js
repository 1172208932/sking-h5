
const rule = require("./common/rule");
const drawNum = require("./common/drawNum");
const carousel = require("./common/carousel");
const {getIndex,doExchange,listExchangeLimit,getMyPrize, getRank} = require("./activity")
const proxy = {
  "GET /projectRule.query": rule,
  "GET /drawNum.query": drawNum,
  "GET /scoring/index.do": getIndex,
  "POST /exchange_1/doExchange.do":doExchange,
  "GET /exchange_1/listExchangeLimit.do":listExchangeLimit,
  "GET /records.query":getMyPrize,
  "GET /carousel_1/query.do": carousel,
  "GET /scoring/ranking.do":getRank
};
module.exports = proxy;
