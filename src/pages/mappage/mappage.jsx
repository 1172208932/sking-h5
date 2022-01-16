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
import { toJS } from "mobx";
import { SvgaPlayer } from '@spark/animation';
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
@observer
class Mappage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryNewGuideInfo: '', // 中奖轮播
      showMask: false,
      showMist: false
    };
  }

  getMapInfo = () => {

    MapPosition.map((item) => { });
  };

  componentDidMount() {
    let homeInfo = Object.assign({}, toJS(store.homeInfo));
    console.info('homeInfo:', homeInfo)
    // this.queryNewGuide()
    this.moveMap()
  }
  async queryNewGuide() {

    let queryNewGuideInfo = await API.queryNewGuide()
    console.info('queryNewGuideInfo:', queryNewGuideInfo)
    if (!queryNewGuideInfo.data.completeGuide) {
      document.body.style.overflow = "hidden";

      let toWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - document.documentElement.clientWidth
      document.documentElement.scrollLeft = toWidth
      await delay(1500)
      this.setState({
        queryNewGuideInfo: queryNewGuideInfo.data,
        showMist: true
      })
    }
  }
  showMoveMap() {
    let toWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - document.documentElement.clientWidth
    this.setState({
      showMask: true,
      showMist: false
    }, async () => {
      Tool.tweenReaptToto2(document.documentElement, toWidth, 0, toWidth, () => {
        this.setState({
          showMask: false,
        })
        document.body.style.overflow = 'auto';
      })
    })
  }
  /**
   * 关卡移动
   * 当关卡》3时，位于从左到右的第三关
   * @returns 
   */
  moveMap = () => {
    const remscale = window.remScale;
    const { homeInfo } = store;
    let len = homeInfo?.gameInfo?.length ? homeInfo.gameInfo.length : 0;
    if (len >= 3) {
      // 3移动1，4移动2个
      window.scrollTo(0,remscale*340 + ((14413*remscale) / 108) * (len - 3));
    }
  }
  render() {
    const { homeInfo } = store;
    const { showMask, showMist } = this.state
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
        <MapBox />

        {/* 终极大奖 */}
        <LastPrize />




        {/* 引导时屏蔽点击。这样最简单上盖一层div */}
        {
          showMask &&
          <div className="mapBgbox_mask">
          </div>
        }

        {
          showMist &&
          <SvgaPlayer className="mist_svga" src={`${RES_PATH}svga/云过渡.svga`}
            loop={1}
            onEnd={() => {
              this.showMoveMap()
            }}
          />
        }

      </div>
    );
  }
}

export default Mappage;
