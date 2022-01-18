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
import { _throttle } from "@src/utils/utils"
import "./gameGuide.less";
import gameStore from '@src/pages/gamepage/gameStore';

@observer
class GameGuide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1
    }
  }

  nextStep() {
    const { step } = this.state;
    if (step == 3) { return }
    this.setState({
      step: step + 1
    })
  }

  afterStep() {
    const { step } = this.state;
    if (step == 1) { return }
    this.setState({
      step: step - 1
    })
  }
  beginGame() {

  }

  renderStepCenter(step) {
    switch (step) {
      case 1:
        return (
          <div className="guideContext1"></div>
        )
      case 2:
        return (
          <div className="guideContext2"></div>
        )
      case 3:
        return (
          <div className="guideContext3"></div>
        )
    }
  }

  render() {
    const { step } = this.state;
    return (
      <div className="gameGuidePanel">

        <div className="content-gameGuide"></div>
        {
          this.renderStepCenter(step)
        }
        {
          step == 3 ? (
            <div className="gameGuideBeginBtn" onClick={() => { this.beginGame() }}></div>
          ) : (
            <div className="gameGuideNextBtn" onClick={() => { this.nextStep() }}></div>
          )
        }
        {
          step != 1 && (<div className="gameGuideLeftBtn" onClick={() => { this.afterStep() }}></div>)
        }
        {
          step != 3 && (<div className="gameGuideRightBtn" onClick={() => { this.nextStep() }}></div>)
        }
        {/* <div className="gameGuideTitle">
          <p>确认退出游戏吗</p>
        </div>
        <div className="again-fail" onClick={() => {
          modalStore.closePop("gameGuide")
          gameStore.goonGame()
        }}>
          继续游戏
        </div>
        <p className="out" onClick={() => {
          modalStore.closePop("gameGuide");
          store.changePage('Mappage');
          store.getHomeInfo();
        }}></p> */}
      </div>
    );
  }
}
export default GameGuide;
