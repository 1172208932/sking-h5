
const rule = require("./common/rule");
const drawNum = require("./common/drawNum");
const carousel = require("./common/carousel");
const getIndex = require("./homeInfo");


const {doExchange,listExchangeLimit,getMyPrize, getRank, turnTableQuery, turnTableDraw, answerQuery, answerStart, answerSubmit,answerComplete, resurgence, doAssist, doSign,signOptions,signQuery, queryNewGuide, stepNewGuide,inviteRecord,rankingAward,startGame,gameSubmit,getInviteCode} = require("./activity")
const proxy = {
  "GET /projectRule.query": rule,
  "GET /drawNum.query": drawNum,
  "GET /scoring/index.do": getIndex,
  "POST /exchange/doExchange.do": doExchange,
  "GET /exchange/listExchangeLimit.do": listExchangeLimit,
  "GET /records.query": getMyPrize,
  "GET /carousel_1/query.do": carousel,
  "GET /scoring/ranking.do": getRank,
  "GET /draw_1/query.do": turnTableQuery,
  "POST /draw_1/drawPrize.do": turnTableDraw,
  "POST /answer_1/getQuestion.do": answerQuery,
  "POST /answer_1/start.do": answerStart,
  "POST /answer_1/submit.do": answerSubmit,
  "POST /answer_1/doCompleted.do": answerComplete,
  "GET /scoring/resurgence.do": resurgence,
  "POST /assist_1/doAssist.do": doAssist,
  "POST /sign_1/doSign.do": doSign,
  "GET /sign_1/query.do": signQuery,
  "GET /sign_1/queryOptions.do": signOptions,

  "POST /guide_1/queryNewGuide.do": queryNewGuide,
  "GET /guide_1/stepNewGuide.do": stepNewGuide,

  "GET /assist_1/queryInviteRecords.do": inviteRecord,
  "GET /scoring/rankingAward.do": rankingAward,
  "GET /scoring/start.do":startGame,
  "GET /draw_2/query.do": turnTableQuery,
  "POST /draw_2/drawPrize.do": turnTableDraw,
  "GET /scoring/submit.do": gameSubmit,
  "POST /assist_1/getInviteCode.do":getInviteCode,
};
module.exports = proxy;
