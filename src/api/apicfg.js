
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
}

export default apiCfg;
