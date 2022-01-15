/**
 * 游戏离开弹窗
 */
"use strict";

import React from "react";
import { RES_PATH } from "../../../sparkrc.js";
import { observer } from "mobx-react";
import store from "../../store/index";
import modalStore from "@src/store/modal";
import API from "../../api";
import {_throttle} from "@src/utils/utils"
import "./gameLeave.less";

@observer
class GameLeave extends React.Component {
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
    // levelNum TODO
    const {success,data} = await API.resurgence({
      levelNum: 1,
    })
    if(success&&data) {
      // TODO 再来一句,记得关当前弹窗
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
      <div className="gameLeavePanel">

        <div className="content-gamefail">
          <p>退出后本局游戏将不被纪录</p>
        </div>
        <div className="gameLeaveTitle">
          <p>确认退出游戏吗</p>
        </div>
        {/* 再来一次 */}
        <div className="again-fail" onClick={()=>{}}>
          继续游戏
        </div>
        {/* 确认退出 */}
        <p className="out" onClick={()=>{}}></p>
      </div>
    );
  }
}
export default GameLeave;
