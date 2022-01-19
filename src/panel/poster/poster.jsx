"use strict";

import React from "react";
import { RES_PATH } from "../../../sparkrc.js";
import { observer } from "mobx-react";
import store from "../../store/index";
import modalStore from "@src/store/modal";
import API from "../../api";
import {_throttle} from "@src/utils/utils"
import { htmlShot } from "@spark/utils";
import {USER_AVATAR} from "@src/utils/constants"
import "./poster.less";

@observer
class Poster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posterImg: ""
    }
    this.timeOutEvent = null
  }

  async componentDidMount() {
    await this.createdCode();
    const dataUrl = await htmlShot(this.poster); //整个页面截图
    // console.log(dataUrl)
    this.setState({
      posterImg: dataUrl
    })
  }

  createdCode = async () => {
    new QRCode(this.erCode, {
      text: `${CFG.shareUrl}&inviteCode=${store.inviteCode}`, // url or text
      width: 150, // 二维码宽度
      height: 150, // 二维码高度
    });
  }
  
  render() {
    const {posterImg} = this.state;
    return (
      <div className="posterpage" ref={(el) => (this.poster = el)}>
        <div className="codeBox" ref={(el) => (this.erCode = el)}>
        </div>
        <img src={USER_AVATAR} alt="" className="ren"/>
        <img src={posterImg} className="posterpage-img"/>
        <div className="back-poster" onClick={() => modalStore.closePop("Poster")}>返回</div>
      </div>
    );
  }
}
export default Poster;
