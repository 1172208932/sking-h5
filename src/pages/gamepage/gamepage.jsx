'use strict';

import React from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '@src/store/modal';
import API from '../../api';
import './gamepage.less';

@observer
class Gamepage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    this.initCanvas();
  }
  gamestage;
  initCanvas() {
    var canvas = document.getElementById('gamestage')
    canvas.width = 1624;
    canvas.height = 750;
    this.gamestage = new FYGE.Stage(canvas, 1624, 750,
      document.body.clientWidth,
      document.body.clientHeight,
      FYGE.RENDERER_TYPE.WEBGL)
    var mouseEvent = this.gamestage.onMouseEvent.bind(this.gamestage);
    canvas.addEventListener("touchstart", mouseEvent, false);
    canvas.addEventListener("touchmove", mouseEvent, false);
    canvas.addEventListener("touchend", mouseEvent, false);
    //加载舞台
    console.info("4")
    this.gamestage.addEventListener(FYGE.Event.INIT_STAGE, this.canvasUI, this);
    let self = this;
    (function loop() {
      FYGE.Tween.flush();
      self.gamestage.flush()
      requestAnimationFrame(loop)
    })()
  }

  canvasUI(){
    //let img = new FYGE.Sprite("")
  }
  render() {
    return (
      <div className="gamepage">
        <div className="startpop">
          <div className="startaim">
            <div className="startbg" />
            <div className="oneaim">
              <span className="oneaimstar"></span>
              <span className="oneaimlab">成功到达终点</span>
            </div>
            <div className="twoaim">
              <span className="twoaimstar"></span>
              <span className="twoaimlab">到达终点且获得 900分</span>
            </div>
            <div className="threeaim">
              <span className="thaimstar"></span>
              <span className="thaimlab">到达终点且获得 1500分</span>
            </div>
            <div className="starttitle">
              <span className="title"></span>
            </div>
            <span className="startsnow"></span>
          </div>
          <span className="startready"></span>
          <span className="startgo"></span>
        </div>
        <canvas className="canvas" id="gamestage"></canvas>
        <div className="iconarea">
          
          <div className="distance">
            <span className="distancebg"></span>
            <span className="distancenum">3234m</span>
          </div>
          <div className="bar">
            <div className="three">
              <span className="bj"></span>
              <span className="baron"></span>
              <div className="twoarea">
                <span className="twobg"></span>
                <span className="twoscore">900</span>
                <span className="twostar"></span>
              </div>
              <div className="threearea">
                <span className="threebg"></span>
                <span className="threescore">1500</span>
                <span className="threestar"></span>
              </div>
            </div>
            <span className="bartip">当前分数</span>
            <span className="barscore">345</span>
          </div>
          <div className="sound">
            <span className="soundf"></span>
            <span className="soundon"></span>
          </div>
          <span className="back"></span>
        </div>
      </div>
    );
  }
}
export default Gamepage;
