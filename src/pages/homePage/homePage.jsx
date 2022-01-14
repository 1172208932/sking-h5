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

@observer
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carouselList: [], // 中奖轮播
    }
  }
  async componentDidMount() {
    await store.getHomeInfo();
    this.indexDataChange();
    this.getCarousel();
    // modalStore.pushPop("GameSuccess")
  }

  // 首页接口数据处理
  indexDataChange = () => {
    // 有人助力成功弹窗
    if(store.homeInfo?.assistInfo?.assistNum > 0) {
      modalStore.pushPop("InviteSuccess")
    }
    // 用户助力
    this.toAssist();
    // 助力上限
    if(store?.homeInfo?.assistInfo?.limitNum > 0) {
      modalStore.pushPop("InviteLimit")
    }
  }

  toAssist = async() => {
    if(CFG.inviteCode && !sessionStorage.getItem("inviteCode")) {
      const {success} = await API.doAssist({
        inviteCode: CFG.inviteCode
      })
      sessionStorage.setItem("inviteCode",CFG.inviteCode)
      if(success) {
        Toast("助力成功")
      } else {
        Toast("助力失败")
      }
    }
  }

  // 中奖轮播
  getCarousel = async() => {
    const {success,data} = await API.carousel()
    if(success&&data?.list?.length) {
      this.setState({
        carouselList: data.list
      })
    }
  }

  clickRule = _throttle(async() => {
    const {ruleInfo} = store;
    !ruleInfo && await store.initRule();
    modalStore.pushPop("Rule")
  })
  render() {
    const {homeInfo} = store;
    const {carouselList} = this.state;
    return (
      <div className="homePagebox">
      <div className="homepage">
        <span className="title"></span>
        <SvgaPlayer src={`${RES_PATH}svga/标题与人物.svga`} className='title-person'></SvgaPlayer>

        {/* 开始游戏按钮 */}
        <SvgaPlayer className="startga" src={`${RES_PATH}svga/开始游戏.svga`} onClick={() => store.changePage('Mappage')}/>
        <SvgaPlayer className="gesturesAperture" src={`${RES_PATH}svga/手势单击.svga`} />
        {/* 左上角icon */}
        <div className="topleft">
          {/* 头像 */}
          <AvatarBox/>
          {/* 金币数量 */}
          <CoinBox/>
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
          <div className="duiHuanShangDian" onClick={() => modalStore.pushPop("ExchangeShop")}>
            <SvgaPlayer src={`${RES_PATH}svga/兑换商店.svga`} className='store-svga'></SvgaPlayer>
          </div>
          {/* 得金币 */}
          <span className="deJinBi" onClick={() => modalStore.pushPop("Task")}></span>
        </div>

        {/* 右下角 */}
        <div className="bottomr">
          {/* 排行榜 */}
          <span className="ultimateLeaderboard" onClick={() => modalStore.pushPop("Rank")}></span>
          <span className="moreGifts" onClick={() => window.location.href = homeInfo.url}></span>
        </div>
      </div>
      </div>
    );
  }
}
export default HomePage;
