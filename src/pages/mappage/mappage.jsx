"use strict";

import React from "react";
import { RES_PATH } from "../../../sparkrc.js";
import { observer } from "mobx-react";
import store from "../../store/index";
import modalStore from "@src/store/modal";
import API from "../../api";
import "./mappage.less";
import AvatarBox from "@src/components/AvatarBox/AvatarBox";
import CoinBox from "@src/components/CoinBox/CoinBox";
import DecCoinBox from "@src/components/DecCoinBox/DecCoinBox";
import LastPrize from "@src/components/LastPrize/LastPrize.jsx";
import MapBox from "@src/components/MapBox/MapBox.jsx";
import { Tool } from '@src/utils/Tool.js';
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
@observer
class Mappage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryNewGuideInfo: '', // 中奖轮播
    };
  }

  getMapInfo = () => {
    
    MapPosition.map((item) => {});
  };
    
  componentDidMount() {
    this.queryNewGuide()
  }
  async queryNewGuide() {

    let queryNewGuideInfo = await API.queryNewGuide()
    console.info('queryNewGuideInfo:', queryNewGuideInfo)
    this.setState({
      queryNewGuideInfo: queryNewGuideInfo.data
    })

    let toWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - document.documentElement.clientWidth
    console.log("toWidth:", toWidth)
    var percent = { toWidth: 100 }
    await delay(1000)
    Tool.tweenReaptToto2(document.documentElement, 0, toWidth, toWidth)

  }
  scroolToBottom() {
    // setTimeout(() => {
    //   document.documentElement.scrollLeft = document.body.scrollLeft = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - document.documentElement.clientWidth
    // }, 0);
  }
  render() {
    const { homeInfo } = store;
    return (
      <div className="mappage">
        {/* 背景 */}
        <div className="mapBgbox">
          <span className="mapBgimg1"></span>
          <span className="mapBgimg2"></span>
        </div>
        {/* 按钮 */}
        <div className="btnbox">
          <div className="topleftIcon">
            {/* 头像 */}
            <AvatarBox />
            {/* 金币数量 */}
            <CoinBox />
          </div>
          {/* 扣除多少金币 */}
          <DecCoinBox />
          <div className="mapPage-tiShi textover">
            有{homeInfo?.pvNum || 0}位用户与你一起闯关
          </div>
          {/* 返回首页按钮 */}
          <span
            className="backbtn"
            onClick={() => {
              store.changePage("homePage");
            }}
          ></span>
        </div>
        {/* 100关 */}
        <MapBox/>

        {/* 终极大奖 */}
        <LastPrize />

        {/* 人 */}
        {/* <div className="headiconbox">
          <span className="headboxbottombg"></span>
          <span className="headboxbottomimg"></span>
        </div> */}
      </div>
    );
  }
}

export default Mappage;
