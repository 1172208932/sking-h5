"use strict";

import React from "react";
import { observer } from "mobx-react";
import store from "../../store/index";
import { SvgaPlayer } from "@spark/animation";
import { RES_PATH } from "../../../sparkrc.js";
import "./LastPrize.less";
import API from "../../api";
import { _throttle, CusToast } from "@src/utils/utils";
import modalStore from "@src/store/modal";
import { Toast } from "@spark/ui";

@observer
class LastPrize extends React.Component {
  constructor(props) {
    super(props);
  }

  clickReceive = _throttle(async () => {
    const { homeInfo } = store;
    if(!store?.newGuideStep?.completeGuide) return false;
    if(homeInfo?.openPrizeTime > homeInfo?.currentTime) {
      Toast("别急，快去闯关吧！\n2月20日24点整开奖哦")
      // if(document.getElementById("overlay_layer")) {
      //   document.getElementById("overlay_layer").style.display = 'block';
      // }
      // Toast("别急，快去闯关吧！\n2月20日24点整开奖哦",2000,{didClose: ()=> {
      //   document.getElementById("overlay_layer").style.display = 'none';
      // }})
    } else if(homeInfo?.rankReceiveFlag == 2) {
      const { success, data } = await API.rankingAward();
      if (success && data) {
        modalStore.pushPop("DrawPrize", {
          prizeInfo: {
            optionImg: data.prizeImg,
            optionName: data.prizeName,
            url: data.url,
            needToPrize: true,
          },
        });
      }
    } else if(homeInfo?.rankReceiveFlag == 1){
      Toast("你的分数没有达到前百名，牛蒙蒙有更多惊喜等你解锁哦")
    }
  });

  render() {
    const { homeInfo } = store;
    return (
      <div className="giftbox">
        <span className="giftboxtitle"></span>
        <span className="giftboximg"></span>
        {/* <div className="giftlist">
          <div className="lastPrizeBox">
            {Boolean(homeInfo.rankPrize?.length) &&
              homeInfo.rankPrize.map((item, index) => {
                return (
                  <div className="lastPrizeItem" key={index}>
                    <div className="imgbox">
                      <img src={item.prizeImg} alt="" />
                    </div>
                    <p className="prizeItem-score textover">第{item.rank}名</p>
                  </div>
                );
              })}
          </div>
        </div> */}
        {/* 按钮 */}
        <div className="lastprizeBtn">
          <div
            className={`btn`}
            onClick={this.clickReceive}
          >
            {(!store?.newGuideStep?.completeGuide || homeInfo?.openPrizeTime > homeInfo?.currentTime) ? <img src={`${RES_PATH}mapPage/2月20.png`} alt=""  className="yue20"/>:
            homeInfo?.rankReceiveFlag == 2
            ? "领取奖励"
            : homeInfo?.rankReceiveFlag == 3
            ? "已领取"
            : "排名未入前百"
            }
          </div>
          {/* 手势 */}
          {homeInfo?.rankReceiveFlag == 2 && (
            <SvgaPlayer
              className="gesturesAperture"
              src={`${RES_PATH}svga/手势单击.svga`}
            />
          )}
        </div>
        {/* 文字 */}
        {/* <div className="prizedetailtext">
          奖品依据排行榜名次发放，将在活动结束后发放至「我的奖品」
        </div> */}
        {/* <span className="giftboxpoint"></span> */}
      </div>
    );
  }
}

export default LastPrize;
