"use strict";

import React from "react";
import { observer } from "mobx-react";
import store from "../../store/index";
import modalStore from "@src/store/modal";
import "./IndexBtn.less";
import { Toast, Marquee } from "@spark/ui";
import { _throttle } from "@src/utils/utils";
import AvatarBox from "@src/components/AvatarBox/AvatarBox"
import CoinBox from "@src/components/CoinBox/CoinBox"
import { SvgaPlayer } from '@spark/animation';
import { RES_PATH } from '../../../sparkrc.js';

@observer
class IndexBtn extends React.Component {
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

  clickBackIndex = () => {
    wx.miniProgram.switchTab({
      url: "/pages/index/index",
    });
  }

  render() {
    const { homeInfo, carouselList } = store;
    return (
      <>
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
              renderItem={(data) => (
                <div className="marquee-item">
                  {data.name}获得{data.prizeName}
                </div>
              )}
            />
          </div>
        </div>

        {/* 右上角 */}
        <div className="topright">
          <div className="tiShi textover">
            有{homeInfo?.pvNum || 0}位用户与你一起闯关
          </div>
          {/* 我的奖品 */}
          <span
            className="jiangPin"
            onClick={() => modalStore.pushPop("Myprize")}
          ></span>
          {/* 活动规则 */}
          <span className="guiZe" onClick={this.clickRule}></span>
        </div>

        {/* 左下角 */}
        <div className="bottoml">
          {/* 兑换商店 */}
          <div
            className="duiHuanShangDian"
            onClick={_throttle(() => {
              if (this.judgeEndTime()) {
                modalStore.pushPop("ExchangeShop");
              }
            })}
          >
            <div className="duihaoli"></div>
            <SvgaPlayer
              src={`${RES_PATH}svga/兑换商店.svga`}
              className="store-svga"
            ></SvgaPlayer>
          </div>
          {/* 得金币 */}
          <span
            className="deJinBi"
            onClick={_throttle(() => {
              if (this.judgeEndTime()) {
                modalStore.pushPop("Task");
              }
            })}
          ></span>
        </div>

        {/* 右下角 */}
        <div className="bottomr">
          {/* 排行榜 */}
          <div className="yinghuangjin"></div>
          <span
            className="ultimateLeaderboard"
            onClick={() => modalStore.pushPop("Rank")}
          ></span>
          <span
            className="moreGifts"
            onClick={this.clickBackIndex}
          ></span>
        </div>
      </>
    );
  }
}

export default IndexBtn;
