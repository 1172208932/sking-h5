"use strict";

import React from "react";
import { observer } from "mobx-react";
import store from "../../store/index";
import { SvgaPlayer } from "@spark/animation";
import { RES_PATH } from "../../../sparkrc.js";
import "./LastPrize.less";
import API from '../../api';

import { _throttle } from "@src/utils/utils";
import modalStore from '@src/store/modal';

@observer
class LastPrize extends React.Component {
  constructor(props) {
    super(props);
  }

  clickReceive = _throttle(async() => {
    const { homeInfo } = store;
    if(homeInfo?.rankReceiveFlag == 2) {
      const {success, data} = await API.rankingAward()
      if(success && data) {
        modalStore.pushPop("DrawPrize",{
          prizeInfo: {
            optionImg: data.prizeImg,
            optionName: data.prizeName,
            url: data.url,
            needToPrize: true,
          }
        })
      }
    }
  })

  render() {
    const { homeInfo } = store;
    return (
      <div className="giftbox">
        <span className="giftboxtitle"></span>
        <span className="giftboximg"></span>
        <div className="giftlist">
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
        </div>
        {/* 按钮 */}
        <div className="lastprizeBtn">
          <div
            className={`btn ${
              homeInfo?.rankReceiveFlag == 1
                ? "need100"
                : homeInfo?.rankReceiveFlag == 2
                ? "waitReceive"
                : "received"
            }`}
            onClick={this.clickReceive}
          ></div>
          {/* 手势 */}
          {homeInfo?.rankReceiveFlag == 2 && (
            <SvgaPlayer
              className="gesturesAperture"
              src={`${RES_PATH}/svga/手势单击.svga`}
            />
          )}
        </div>

        {/* <span className="giftboxpoint"></span> */}
      </div>
    );
  }
}

export default LastPrize;
