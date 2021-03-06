
const apiCfg = {
  getRule:`projectRule.query`,
  doJoin: {
    uri: `join.do`,
    method: "post"
  },
  getIndex: `scoring/index.do`,
  listExchangeLimit:`exchange/listExchangeLimit.do`,
  doExchange: {
    uri: `exchange/doExchange.do`,
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
  },
  answerQuery: {// 获取题目
    uri: `answer_1/getQuestion.do`,
    method: "post",
    withToken: true,
  },
  answerStart: {// 开始答题
    uri: `answer_1/start.do`,
    method: "post",
    withToken: true,
  },
  answerSubmit: {// 提交答案
    uri: `answer_1/submit.do`,
    method: "post",
    withToken: true,
  },
  answerComplete: {// 完成提交
    uri: `answer_1/doCompleted.do`,
    method: "post",
    withToken: true,
  },
  resurgence: {//复活参与游戏(扣少量金币的时候掉)
    uri: `scoring/resurgence.do`,
    withToken: true,
  },
  doAssist: {
    uri:`assist_1/doAssist.do`,
    method: "post",
    withToken: true,
    hideError: true, // 隐藏该接口报错的toast
  },
  signQuery: `checkin_1/query.do`,
  signOptions: `checkin_1/queryOptions.do`,//查询签到奖品配置
  doSign: {
    uri: `checkin_1/doSign.do`,
    withToken: true,
    method: "post",
  },

  queryNewGuide: {
    uri: `guide_1/queryNewGuide.do`,
    method: "post",
  },

  stepNewGuide: {
    uri: `guide_1/stepNewGuide.do`,
    withToken: true,
    method: "post",
  },
  inviteRecord: `assist_1/queryInviteRecords.do`, //查询我的邀请记录
  rankingAward: {
    uri:`scoring/rankingAward.do`,
    withToken: true,
  },
  startGame: { // 开始游戏
    uri: `scoring/start.do`,
    withToken: true,
  },
  rockQuery: `draw_2/query.do`, // 摇奖机抽奖奖品
  rockDraw: {// 摇奖机抽奖
    uri: `draw_2/drawPrize.do`,
    method: "post",
    withToken: true,
  },
  gameSubmit: { // 提交分数
    uri: `scoring/submit.do`,
    withToken: true,
  },
  getInviteCode: {
    uri: `assist_1/getInviteCode.do`,
    withToken: true,
    method: "post",
  },
  getCode: `scoring/genQrCode.do`, // 获取分享海报二维码
  shareInfo: `scoring/shareInfo.do`, // 获取昵称头像
}

export default apiCfg;
