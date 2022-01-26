"use strict";

import React from "react";
import { RES_PATH } from "../../../sparkrc.js";
import { observer } from "mobx-react";
import store from "../../store/index";
import modalStore from "@src/store/modal";
import "./share.less";


@observer
class Share extends React.Component {
  render(){
    return(
      <div className="shareIconPage" onClick={() => modalStore.closePop("Share")}>
        <div className="shareIcon"></div>
      </div>
    )
  }
}
export default Share;
