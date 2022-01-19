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
import "./gameLeave.less";
import gameStore from '@src/pages/gamepage/gameStore';

@observer
class GameLeave extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="gameLeavePanel">

        <div className="content-gamefail">
          <p>退出后本局游戏将不被纪录</p>
        </div>
        <div className="gameLeaveTitle">
          <p>确认退出游戏吗</p>
        </div>
        {/* 继续游戏 */}
        <div className="again-fail" onClick={() => {
          modalStore.closePop("GameLeave")
          gameStore.goonGame()
        }}>
          继续游戏
        </div>
        {/* 确认退出 */}
        <p className="out" onClick={async() => {
          modalStore.closePop("GameLeave");
          await this.props.popData.removeGame()
          store.changePage('Mappage');
          store.getHomeInfo();
        }}></p>
      </div>
    );
  }
}
export default GameLeave;
