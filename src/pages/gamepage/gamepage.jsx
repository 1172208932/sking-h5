'use strict';

import React from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '@src/store/modal';
import API from '../../api';
import './gamepage.less';
import gameStore from './gameStore.js';
import { toJS } from "mobx";
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
@observer
class Gamepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStep: 0,//第？关 0  准备1  出发2
      startpop: true, //是否需要显示开始
      starInfo: '',//关卡信息
    };
  }
  componentDidMount() {
    this.initCanvas();
    this.setStarInfo()
  }
  setStarInfo() {
    let { starInfo } = Object.assign({}, toJS(store.homeInfo));
    console.info('gamepage ===>>>>>>> starInfo:', starInfo)
    this.setState({
      starInfo
    })
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

  async canvasUI() {
    //let img = new FYGE.Sprite("")
    console.log("初始化canvasUI")
    gameStore.offsetX = (1624 - (document.body.clientWidth > 1624 ? 1624 : document.body.clientWidth)) / 2
    gameStore.offsetY = (750 - (document.body.clientHeight > 750 ? 750 : document.body.clientHeight)) / 2
    console.log(document.body.clientWidth > 1624 ? 1624 : document.body.clientWidth)
    gameStore.bgArea2 = new FYGE.Container();
    this.gamestage.addChild(gameStore.bgArea2)
    gameStore.bgArea1 = new FYGE.Container();
    this.gamestage.addChild(gameStore.bgArea1)
    gameStore.bgCon = new FYGE.Container();
    this.gamestage.addChild(gameStore.bgCon)


    var test = new FYGE.TextField();
    gameStore.bgCon.addChild(test)
    test.text = "123121123"
    test.size = 55
    test.fillColor = "#ff0000"
    test.position.set(gameStore.offsetX, 0)


    gameStore.getData()

    gameStore.addRole()

    gameStore.initbg()

    //帧刷新
    this.gamestage.addEventListener(FYGE.Event.ENTER_FRAME, () => {
      gameStore.enterFrame(this.gamestage)
    });

    //点击
    this.gamestage.addEventListener(FYGE.MouseEvent.CLICK, () => {
      gameStore.clickStage()
    });

    this.setTimeStatus()
  }
  async setTimeStatus() {
    await delay(1500)
    this.setState({
      gameStep: 1,
    });
    await delay(1500)
    this.setState({
      gameStep: 2,
    });
    await delay(1500)
    this.setState({
      gameStep: 0,
      startpop: false
    });
  }
  render() {
    const { gameStep, startpop, starInfo } = this.state
    return (
      <div className="homePagebox">
        <div className="gamepage">
          <canvas className="canvas" id="gamestage"></canvas>

          {
            startpop && <div className="startpop">
              {
                gameStep == 0 && <div className="startaim">
                  <div className="startbg" />
                  <div className="oneaim">
                    <span className="oneaimstar"></span>
                    <span className="oneaimlab">成功到达终点</span>
                  </div>
                  <div className="twoaim">
                    <span className="twoaimstar"></span>
                    <span className="twoaimlab">{`到达终点且获得 ${starInfo?.[store.currentGameLevel - 1]?.star2}分`}</span>
                  </div>
                  <div className="threeaim">
                    <span className="thaimstar"></span>
                    <span className="thaimlab">{`到达终点且获得 ${starInfo?.[store.currentGameLevel - 1]?.star3}分`}</span>
                  </div>
                  <div className="starttitle">
                    <span className="title"></span>
                  </div>
                  <span className="startsnow"></span>
                </div>
              }

              {
                gameStep == 1 && <span className="startready"></span>
              }
              {
                gameStep == 2 && <span className="startgo"></span>
              }

            </div>
          }


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
      </div>
    );
  }
}
export default Gamepage;
