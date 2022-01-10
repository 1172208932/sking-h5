
const rule = require("./common/rule");
const drawNum = require("./common/drawNum");
const carousel = require("./common/carousel");
const {getIndex,doExchange,listExchangeLimit,getMyPrize, getRank, turnTableQuery, turnTableDraw} = require("./activity")
const proxy = {
  "GET /projectRule.query": rule,
  "GET /drawNum.query": drawNum,
  "GET /scoring/index.do": getIndex,
  "POST /exchange_1/doExchange.do":doExchange,
  "GET /exchange_1/listExchangeLimit.do":listExchangeLimit,
  "GET /records.query":getMyPrize,
  "GET /carousel_1/query.do": carousel,
  "GET /scoring/ranking.do":getRank,
  "GET /draw_1/query.do": turnTableQuery,
  "POST /draw_1/drawPrize.do": turnTableDraw,

};
module.exports = proxy;
