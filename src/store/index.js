import { makeAutoObservable } from 'mobx';
import API from '../api/index';
import modalStore from "@src/store/modal";

const store = makeAutoObservable({
  ruleInfo: '',
  curPage: 'homePage',
  homeInfo: {},
  currentGameLevel: 1, // 正在闯关的level
  startId: null, // 正在闯关的startID
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
  setCurrentGameLevel(level) {
    this.currentGameLevel = level;
  },
  setStartId(id) {
    this.startId = id
  },
  // 开始游戏
  async startGame(level) {
    console.log("level",level)
    if (this.homeInfo?.joinGolds > this.homeInfo?.goldNum) {
      modalStore.pushPop("NoMoney");
    } else if(this.homeInfo?.desc) {
      modalStore.pushPop("GameRemind",{level:level})
    } else {
      this.setCurrentGameLevel(level);
      const {success,data} = await API.startGame()
      if(success && data) {
        this.setStartId(data)
        this.changePage("Gamepage");
      }
    }
  }
});
export default store;
