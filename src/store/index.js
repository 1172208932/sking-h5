import { makeAutoObservable } from 'mobx';
import API from '../api/index';
import modalStore from "@src/store/modal";
import { hideLoading, showLoading, Toast } from '@spark/ui';
import {shareWXmini} from "@src/utils/share"
const store = makeAutoObservable({
  ruleInfo: '',
  curPage: 'homePage',
  homeInfo: {},
  currentGameLevel: 1, // 正在闯关的level
  startId: null, // 正在闯关的startID
  inviteCode: null,
  newGuideStep: {}, // 新手引导详情
  isPlayMusic: true,
  carouselList: [], // 中奖轮播
  setMusic(value){
    this.isPlayMusic = value
  },
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
    if (this.homeInfo?.joinGolds > this.homeInfo?.goldNum) {
      modalStore.pushPop("NoMoney");
    } else if(this.homeInfo?.desc) {
      modalStore.pushPop("GameRemind",{level:level})
    } else {
      modalStore.pushPop("PayConfirm",{
        needCoin:this.homeInfo.joinGolds,
        start:async() => {
          this.setCurrentGameLevel(level);
          modalStore.closePop("PayConfirm")
          showLoading()
          const {success,data} = await API.startGame()
          hideLoading()
          if(success && data) {
            // Toast("金币-"+this.homeInfo?.joinGolds||0);
            this.setStartId(data)
            this.changePage("Gamepage");
          }
        }
      })
    }
  },

  // 邀请好友
  async toInvite() {
    const {success, data} = await API.getInviteCode();
    if(success && data) {
      this.setInviteCode(data.inviteCode);
      // 海报
      modalStore.pushPop("Poster");
      shareWXmini(data.inviteCode)
    }
  },
  setInviteCode(data) {
    this.inviteCode = data
  },

  // 新手引导查询
  async queryNewGuide() {
    const {success, data} = await API.queryNewGuide();
    if(success && data) {
      this.newGuideStep = data;
    }
  },

  // 中奖轮播
  async getCarousel() {
    const { success, data } = await API.carousel()
    if (success && data?.list?.length) {
      this.carouselList = data.list
    }
  },
});
export default store;
