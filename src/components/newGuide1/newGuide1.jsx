"use strict";

import React from "react";
import { observer } from "mobx-react";
import store from "../../store/index";
import "./newGuide1.less";
import { RES_PATH } from "../../../sparkrc.js";
import { SvgaPlayer } from '@spark/animation';
import { _throttle } from '@src/utils/utils.js';
import API from "@src/api";


@observer
class NewGuide1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
  }

  clickStart = _throttle(async() => {
    const {judgeEndTime} = this.props
    if(judgeEndTime()) {
      // 递进新手引导
      const {success} = await API.stepNewGuide()
      await store.queryNewGuide();
      if(success) {
        store.changePage("Mappage")
      }
    }
  })
 
  render() {
    return (
      <div className="newGuide1">
        {/* 开始游戏按钮 */}
        <SvgaPlayer className="startga" src={`${RES_PATH}svga/开始游戏.svga`} onClick={this.clickStart}/>
        {/* 新手引导第一步todo */}
        <div className="shoushi-gesturesAperture">
          <SvgaPlayer className="gesturesAperture" src={`${RES_PATH}svga/手势单击.svga`} />
          <p>点击开启“冰雪大冒险”</p>
        </div>
      </div>
    );
  }
}

export default NewGuide1;
