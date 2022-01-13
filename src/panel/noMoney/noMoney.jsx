"use strict";

import React from "react";
import { RES_PATH } from "../../../sparkrc.js";
import { observer } from "mobx-react";
import store from "../../store/index";
import modalStore from "@src/store/modal";
import API from "../../api";
import {_throttle} from "@src/utils/utils"
import "./noMoney.less";

@observer
class NoMoney extends React.Component {
  constructor(props) {
    super(props);
  }

  clickToTask = _throttle(() => {
    modalStore.closePop("NoMoney")
    modalStore.pushPop("Task")
  })
  
  render() {
    return (
      <div className="noMoney">
        <div className="content-gamefail">
          <p>啊噢～金币不足<br/>做任务可以获得更多金币</p>
        </div>
        {/* 去做任务 */}
        <div className="nomoney-btn" onClick={() => this.clickToTask()}></div>
        <div className="noMoney-close" onClick={() => modalStore.closePop("NoMoney")}></div>
      </div>
    );
  }
}
export default NoMoney;
