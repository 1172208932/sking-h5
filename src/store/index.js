import { makeAutoObservable } from 'mobx';
import API from '../api/index';
const store = makeAutoObservable({
  ruleInfo: '',
  curPage: 'homePage',
  homeInfo: {},
  currentGameLevel :1,
  // 首页数据
  setRule(ruleInfo) {
    this.ruleInfo = ruleInfo;
  },
  setHomeInfo(homeInfo) {
    this.homeInfo = homeInfo;
  },
  changePage(page, callback) {
    this.curPage = page;
    callback && callback();
  },
  async initRule() {
    // 模拟获取远程的数据
    const { data } = await API.getRule();
    this.setRule(data);
  },
  async getHomeInfo() {
    const { success, data } = await API.getIndex();
    success && this.setHomeInfo(data);
  },
});
export default store;
