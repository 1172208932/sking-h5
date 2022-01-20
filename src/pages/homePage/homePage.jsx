'use strict';

import React from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '@src/store/modal';
import API from '../../api';
import './homePage.less';
import { _throttle } from '@src/utils/utils.js';
import { Marquee, Toast } from "@spark/ui";
import { SvgaPlayer } from '@spark/animation';
import AvatarBox from "@src/components/AvatarBox/AvatarBox"
import CoinBox from "@src/components/CoinBox/CoinBox"
import { loadLocalAssets } from "@src/utils/preload1.3"
import NewGuide1 from "@src/components/newGuide1/newGuide1"
import { playSound, stopSound, preloadSounds, registerSounds } from '@spark/utils';
@observer
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carouselList: [], // 中奖轮播
    }
  }
  async componentDidMount() {
    // 用户助力,要比首页接口先调用！！！
    await this.toAssist();
    loadLocalAssets();
    await store.getHomeInfo();
    // 新手引导，写完了记得注释删掉TODO
    await store.queryNewGuide();
    this.indexDataChange();
    this.getCarousel();
    // modalStore.pushPop("GameSuccess",{
    //   ...{sendGold:10,answerFlag:0,reGold:11,star:3},
    // })
    this.playSound()
  }
  playSound() {
    registerSounds({ 'game_bgmusic': RES_PATH + 'sound/游戏中背景音乐.mp3' })
    preloadSounds(null, () => {
      playSound('game_bgmusic', { 'loop': true })
    })
  }

  // 首页接口数据处理
  indexDataChange = () => {
    // 有人助力成功弹窗
    if (store.homeInfo?.assistInfo?.assistNum > 0) {
      modalStore.pushPop("InviteSuccess")
    }
    // 助力上限
    if (store?.homeInfo?.assistInfo?.limitNum > 0) {
      modalStore.pushPop("InviteLimit")
    }
  }

  toAssist = async () => {
    // TODO !sessionStorage.getItem("inviteCode")
    if (CFG.inviteCode) {
      const { success } = await API.doAssist({
        inviteCode: CFG.inviteCode
      })
      sessionStorage.setItem("inviteCode", CFG.inviteCode)
      if (success) {
        Toast("助力成功")
      } else {
        Toast("助力失败")
      }
    }
  }

  // 中奖轮播
  getCarousel = async () => {
    const { success, data } = await API.carousel()
    if (success && data?.list?.length) {
      this.setState({
        carouselList: data.list
      })
    }
  }

  clickRule = _throttle(async () => {
    const { ruleInfo } = store;
    !ruleInfo && await store.initRule();
    modalStore.pushPop("Rule")
  })

  judgeEndTime = () => {
    const { homeInfo } = store;
    if (homeInfo?.activityEndTime <= homeInfo.currentTime) {
      Toast("活动已结束");
      return false;
    }
    return true;
  }
  render() {
    const { homeInfo, newGuideStep } = store;
    const { carouselList } = this.state;
    return (
      <div className="homePagebox">
        <div className="homepage">
          <span className="title"></span>
          <SvgaPlayer src={`${RES_PATH}svga/标题与人物.svga`} className='title-person'></SvgaPlayer>

          {/* 开始游戏按钮 */}
          <SvgaPlayer className="startga" src={`${RES_PATH}svga/开始游戏.svga`} onClick={_throttle(() => { if (this.judgeEndTime()) { store.changePage('Mappage') } })} />
          {/* 新手引导第一步todo */}
          {/* <div className="shoushi-gesturesAperture">
          <SvgaPlayer className="gesturesAperture" src={`${RES_PATH}svga/手势单击.svga`} />
          <p>点击开启“冰雪大冒险”</p>
        </div> */}
          {/* 左上角icon */}
          <div className="topleft">
            {/* 头像 */}
            <AvatarBox />
            {/* 金币数量 */}
            <CoinBox />
            {/* 轮播 */}
            <div className="lunbo">
              <Marquee
                time={2000}
                direction="top"
                baseData={carouselList}
                renderItem={(data) => <div className="marquee-item">{data.name}获得{data.prizeName}</div>}
              />
            </div>
          </div>

          {/* 右上角 */}
          <div className="topright">
            <div className="tiShi textover">有{homeInfo?.pvNum || 0}位用户与你一起闯关</div>
            {/* 我的奖品 */}
            <span className="jiangPin" onClick={() => modalStore.pushPop("Myprize")}></span>
            {/* 活动规则 */}
            <span className="guiZe" onClick={this.clickRule}></span>
          </div>


          {/* 左下角 */}
          <div className="bottoml">
            {/* 兑换商店 */}
            <div className="duiHuanShangDian" onClick={_throttle(() => { if (this.judgeEndTime()) { modalStore.pushPop("ExchangeShop") } })}>
              <div className="duihaoli"></div>
              <SvgaPlayer src={`${RES_PATH}svga/兑换商店.svga`} className='store-svga'></SvgaPlayer>
            </div>
            {/* 得金币 */}
            <span className="deJinBi" onClick={_throttle(() => { if (this.judgeEndTime()) { modalStore.pushPop("Task") } })}></span>
          </div>

          {/* 右下角 */}
          <div className="bottomr">
            {/* 排行榜 */}
            <div className="yinghuangjin"></div>
            <span className="ultimateLeaderboard" onClick={() => modalStore.pushPop("Rank")}></span>
            <span className="moreGifts" onClick={() => window.location.href = homeInfo.url}></span>
          </div>
        </div>
        {/* 首页的新手引导 */}
        {newGuideStep?.alreadyGuideSteps == 0 && <NewGuide1 judgeEndTime={this.judgeEndTime}></NewGuide1>}
      </div>
    );
  }
}
export default HomePage;
