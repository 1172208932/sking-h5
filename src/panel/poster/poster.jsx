"use strict";

import React from "react";
import { RES_PATH } from "../../../sparkrc.js";
import { observer } from "mobx-react";
import store from "../../store/index";
import modalStore from "@src/store/modal";
import API from "../../api";
import {_throttle} from "@src/utils/utils"
import { htmlShot } from "@spark/utils";
import "./poster.less";
import {USER_AVATAR} from "@src/utils/constants"
@observer
class Poster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posterImg: "",
      codeImg:""
    }
    this.timeOutEvent = null
  }

  async componentDidMount() {
    await this.getErCodeImg();
    const dataUrl = await htmlShot(this.poster); //整个页面截图
    this.setState({
      posterImg: dataUrl
    })
  }

  // 获取二维码图片
  getErCodeImg = async() => {
    const {success, data} = await API.getCode({
      shareCode: store.inviteCode
    })
    if(success) {
      this.setState({
        codeImg: data.imageUrl
      })
    }
  }
  
  render() {
    const {posterImg, codeImg} = this.state;
    const {homeInfo} = store;
    return (
      <div className="posterpage" ref={(el) => (this.poster = el)}>
        <div className="userInfo-poster">
          <img src={homeInfo?.avatar || USER_AVATAR} alt="" className="avatar" />
          <p>我正在和{homeInfo?.pvNum||0}人一起冰雪跑酷</p>
        </div>
        <img src={codeImg} alt="" className="codeBox"/>
        {/* <img src={USER_AVATAR} alt="" className="ren"/> */}
        {/* <img src={posterImg} className="posterpage-img"/> */}
        <div className="back-poster" onClick={() => modalStore.closePop("Poster")}></div>
        <p className="longpress-text">长按保存邀请海报</p>
      </div>
    );
  }
}
export default Poster;
