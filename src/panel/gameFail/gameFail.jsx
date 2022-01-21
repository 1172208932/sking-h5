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
import { Toast } from "@spark/ui";
import "./gameFail.less";

@observer
class GameFail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outTimer: 10,
    }
    this.timer = null
  }

  componentDidMount() {
    const {popData} = this.props;
    if(popData?.answerFlag) return false;
    const {outTimer} = this.state;
    let outTime = outTimer-1;
    this.timer = setInterval(() => {
      if(outTime>0) {
        this.setState({
          outTimer: outTime--
        })
      } else {
        this.clickOut();
      }
    },1000)
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer)
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
      modalStore.closePop("GameFail");
      modalStore.pushPop("PayConfirm",{
        needCoin: popData?.reGold,
        start: this.confirmPay,
        miss: () => {
          modalStore.closePop("PayConfirm")
          this.clickOut();
        }
      })
    }
  }

  // 确定支付
  confirmPay = async() => {
    const {popData} = this.props;
    const {success,data} = await API.resurgence({
      levelNum: store.currentGameLevel,
    })
    if(success&&data) {
      Toast(`金币-${popData?.reGold}`)
      // 再来一句,记得关当前弹窗
      store.setStartId(data);
      modalStore.closePop("PayConfirm")
      await popData.removeGame();
      popData.canvasUI();
    } else {
      modalStore.closePop("PayConfirm")
      this.clickOut();
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

  clickOut = async() => {
    const {popData} = this.props;
    await popData.removeGame();
    modalStore.closePop("GameFail")
    store.changePage("Mappage")
  }
  
  render() {
    const {popData} = this.props;
    const {outTimer} = this.state;

    return (
      <div className="gameFailPanel">
        <div className="content-gamefail">
          <p className="title">{popData?.answerFlag ?'游戏失败参与知识答题':`闯关失败`}</p>
          {popData?.answerFlag ? (
            <p className="subT">
              参与谷爱凌知识答题
              <br />
              答对即可免费再来一次
            </p>
          ) : (
            <p className="subT">支付{popData?.reGold || 0}金币即可再来一次</p>
          )}
        </div>
        {/* 再来一次 */}
        <div className="again-fail" onClick={this.clickAgain}>
          <p className="goanswer">{popData?.answerFlag ?'去答题得机会':'再来一次'}</p>
          <div className="participateInAnswer2">
            <p className="participationAnswer3">{popData?.answerFlag ? '参与答题' : `支付${popData?.reGold || 0}金币`}</p>
          </div>
        </div>
        {/* 确认退出 */}
        <p className="out" onClick={this.clickOut}>{popData?.answerFlag ? '先不了休息一下':`${outTimer}s后自动退出`}</p>
      </div>
    );
  }
}
export default GameFail;
