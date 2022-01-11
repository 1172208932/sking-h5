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
    const { answerFlag, reGold } = this.props;
    if(!answerFlag) {
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
    const { success, data } = await API.answerStart();
    if (success && data?.startId) {
      modalStore.closePop("GameFail")
      modalStore.pushPop("Answer",{startId: data.startId})
    }
  };
  
  render() {
    const { answerFlag, reGold } = this.props;
    return (
      <div className="gameFailPanel">
        <div className="content-gamefail">
          {answerFlag ? (
            <p>
              参与古爱凌知识答题
              <br />
              答对即可免费再来一次
            </p>
          ) : (
            <p>支付{reGold || 0}金币即可再来一次</p>
          )}
        </div>
        {/* 再来一次 */}
        <div className="again-fail" onClick={this.clickAgain}>
          <div className="participateInAnswer2">
            <p className="participationAnswer3">{answerFlag ? '参与答题' : '支付金币'}</p>
          </div>
        </div>
        {/* 确认退出TODO */}
        <p className="out"></p>
      </div>
    );
  }
}
export default GameFail;
