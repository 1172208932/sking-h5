"use strict";

import React from "react";
import { observer } from "mobx-react";
import modalStore from "@src/store/modal";

import "./acivityFail.less";
@observer
class ActivityFail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return(
      <div className="acivityFail">
        <p className="title">当前活动太火爆了</p>
        <p className="subT">稍等刷新一下游戏再一起冲关哦~</p>
        {/* <span
          className="shutDown"
          onClick={() => modalStore.closePop("ActivityFail")}
        ></span> */}
      </div>
    )
  }
}

export default ActivityFail;
