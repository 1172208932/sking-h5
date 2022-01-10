
const apiCfg = {
  getRule:`projectRule.query`,
  doJoin: {
    uri: `join.do`,
    method: "post"
  },
  getIndex: `scoring/index.do`,
  listExchangeLimit:`exchange_1/listExchangeLimit.do`,
  doExchange: {
    uri: `exchange_1/doExchange.do`,
    method: "post",
    withToken: true,
  },
  getMyPrize: `records.query`, // 我的奖品页
  carousel: `carousel_1/query.do`, // 首页中奖轮播
  getRank: `scoring/ranking.do`, // 排行榜列表
  turnTableQuery: `draw_1/query.do`, // 大转盘抽奖奖品
  turnTableDraw: {// 大转盘抽奖
    uri: `draw_1/drawPrize.do`,
    method: "post",
    withToken: true,
  }
}

export default apiCfg;
