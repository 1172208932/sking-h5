"use strict";

import React from "react";
import { RES_PATH } from "../../../sparkrc.js";
import { observer } from "mobx-react";
import store from "../../store/index";
import modalStore from "@src/store/modal";
import API from "../../api";
import "./mappage.less";
import LastPrize from "@src/components/LastPrize/LastPrize.jsx";
import MapBox from "@src/components/MapBox/MapBox.jsx";
import { Tool } from '@src/utils/Tool.js';
import { toJS } from "mobx";
import { SvgaPlayer } from '@spark/animation';
import IndexBtn from '@src/components/IndexBtn/IndexBtn.jsx';

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
    this.queryNewGuide()
    this.moveMap()
  }
  async queryNewGuide() {
    let queryNewGuideInfo = await API.queryNewGuide()


    if (store?.newGuideStep?.alreadyGuideSteps == 2) {
      // document.body.style.overflow = "hidden";
      let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
      let toHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) - clientHeight
      let scrTop = document.documentElement || document.body;

      scrTop.scrollTop = toHeight
      document.body.scrollTop = toHeight
      document.documentElement.scrollTop = toHeight

      await delay(1500)
      this.setState({
        queryNewGuideInfo: queryNewGuideInfo.data,
        showMist: true
      })
    }
  }
  showMoveMap() {
    let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
    let toHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) - clientHeight
    console.info('showMoveMap')
    this.setState({
      showMask: true,
      showMist: false
    }, async () => {
      let doc = document.documentElement || document.body;
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0

      this.setState({
        showMask: false,
      })
      // document.body.style.overflow = 'auto';
      await API.stepNewGuide()
      await store.queryNewGuide();
      //todo 开始游戏


      // Tool.tweenReaptToto2(doc, toHeight, 0, 0, async () => {
      //   this.setState({
      //     showMask: false,
      //   })
      //   document.body.style.overflow = 'auto';
      //   await API.stepNewGuide()
      //   await store.queryNewGuide();
      // })
    })
  }
  /**
   * 关卡移动
   * 当关卡》3时，位于从左到右的第三关
   * @returns 
   */
  moveMap = () => {
    const remscale = window.remScale;
    const { homeInfo, newGuideStep } = store;
    let len = homeInfo?.gameInfo?.length ? homeInfo.gameInfo.length : 0;
    if (len >= 3) {
      // 3移动1，4移动2个
      window.scrollTo(0, remscale * 340 + ((14413 * remscale) / 108) * (len - 3));
    }
  }
  render() {
    const { homeInfo, newGuideStep } = store;
    const { showMask, showMist } = this.state
    this.moveMap()
    return (
      <div id="mapPageId">
        <div className="mappage">
          {/* 背景 */}
          <div className="mapBgbox">
            <span className="mapBgimg1"></span>
            <span className="mapBgimg2"></span>
          </div>

          {/* 牛蒙蒙形象 */}
          <div className="mengmeng"></div>

        </div>
        {/* 按钮 */}
        <div className="map-btnbox">
          <IndexBtn />

        </div>

        {/* 地图内容-主 */}
        <div className="mapcontent">
          {/* 100关 */}
          <MapBox />

          {/* 终极大奖 */}
          <LastPrize />
        </div>
        {/* 返回首页按钮 */}
        <span
          className="backbtn"
          onClick={() => {
            store.changePage("homePage");
          }}
        ></span>

        {
          newGuideStep?.alreadyGuideSteps == 2 &&
          <div className="mapBgbox_div">
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
        }


      </div>
    );
  }
}

export default Mappage;
