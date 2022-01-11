'use strict';

import React from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '@src/store/modal';
import API from '../../api';
import {USER_AVATAR} from "../../utils/constants"
import './homePage.less';
import { _throttle } from '@src/utils/utils.js';
import { Marquee, Toast } from "@spark/ui";
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
  }

  // 首页接口数据处理
  indexDataChange = () => {
    if(store.homeInfo?.assistInfo?.assistNum > 0) {
      modalStore.pushPop("InviteSuccess")
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
        <span className="leftPerson"></span>
        <span className="rightPerson"></span>

        {/* 开始游戏按钮 */}
        <span className="startga"></span>
        <span className="gesturesAperture"></span>
        {/* 左上角icon */}
        <div className="topleft">
          {/* 头像 */}
          <div className="picture2">
            <img className="picture3" src={homeInfo?.avatar || USER_AVATAR}/>
            <span className="currentScore">当前分数</span>
            <span className="layer34173 textover">{homeInfo?.rankScore||0}</span>
          </div>
          {/* 金币数量 */}
          <div className="goldCoins">
            <span className="coin"></span>
            <span className="layer3418 textover">{homeInfo?.goldNum || 0}</span>
          </div>
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
          <span className="duiHuanShangDian" onClick={() => modalStore.pushPop("ExchangeShop")}></span>
          {/* 得金币 */}
          <span className="deJinBi"></span>
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
