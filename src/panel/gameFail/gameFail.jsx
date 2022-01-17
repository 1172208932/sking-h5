/**
 * 游戏失败弹窗，包含确认是否扣金币弹窗和确认是否答题弹窗
 */
"use strict";

import React from "react";
import { RES_PATH } from "../../../sparkrc.js";
import { observer } from "mobx-react";
import store from "../../store/index";
import modalStore from "@src/store/modal";
import API from "../../api";
import {_throttle} from "@src/utils/utils"
import "./gameFail.less";

@observer
class GameFail extends React.Component {
  constructor(props) {
    super(props);
  }

  // 再来一次
  clickAgain = _throttle(async() => {
    const {popData} = this.props;
    if(popData?.answerFlag == 1) {
      this.startAnswer();
    } else {
      // 扣少量金币再来一吧
      this.againPlay()
    }
  })

  // 扣金币再来
  againPlay = async() => {
    const {popData} = this.props;
    if (popData.reGold > store.homeInfo?.goldNum) {
      modalStore.pushPop("NoMoney");
      this.clickOut();
    } else {
      const {success,data} = await API.resurgence({
        levelNum: store.currentGameLevel,
      })
      if(success&&data) {
        // 再来一句,记得关当前弹窗
        store.setStartId(data);
        modalStore.closePop("GameFail")
        await popData.removeGame();
        popData.canvasUI();
      } else {
        this.clickOut();
      }
    }
  }


  // 开始答题
  startAnswer = async () => {
    const {popData} = this.props;
    const { success, data } = await API.answerStart();
    if (success && data?.startId) {
      modalStore.closePop("GameFail")
      modalStore.pushPop("Answer",{
        startId: data.startId,
        removeGame: popData.removeGame,
        canvasUI:popData.canvasUI
      })
    }
  };

  clickOut = () => {
    const {popData} = this.props;
    popData.removeGame();
    modalStore.closePop("GameFail")
    store.changePage("Mappage")
  }
  
  render() {
    const {popData} = this.props;
    return (
      <div className="gameFailPanel">
        <div className="content-gamefail">
          {popData?.answerFlag ? (
            <p>
              参与谷爱凌知识答题
              <br />
              答对即可免费再来一次
            </p>
          ) : (
            <p>支付{popData?.reGold || 0}金币即可再来一次</p>
          )}
        </div>
        {/* 再来一次 */}
        <div className="again-fail" onClick={this.clickAgain}>
          <div className="participateInAnswer2">
            <p className="participationAnswer3">{popData?.answerFlag ? '参与答题' : '支付金币'}</p>
          </div>
        </div>
        {/* 确认退出 */}
        <p className="out" onClick={this.clickOut}></p>
      </div>
    );
  }
}
export default GameFail;
