'use strict';

import React from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '@src/store/modal';
import API from '../../api';
import './gamepage.less';
import gameStore from './gameStore.js';
import EventBus from '@duiba/event-bus';
import { SvgaPlayer } from '@spark/animation';

import { toJS } from "mobx";
import { md5 } from '@spark/utils';
import { playSound, stopSound, preloadSounds, registerSounds } from '@spark/utils';
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
@observer
class Gamepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStep: 0,//第？关 0  准备1  出发2
      startpop: true, //是否需要显示开始
      starInfo: '',//关卡信息
      soundon: true,
    };
  }
  componentDidMount() {
    EventBus.on('GAME_OVER', this.gameOver, this);
    EventBus.on('GAME_WIN', this.gameWin, this);
    EventBus.on('BEGIN_DOWNTIME', this.beginDownTime, this);
    registerSounds({ 'game_bgmusic': RES_PATH + 'sound/游戏中背景音乐.mp3' })
    registerSounds({ 'game_snow': RES_PATH + 'sound/吃雪花音效.mp3' })
    registerSounds({ 'game_gem': RES_PATH + 'sound/吃宝石音效.mp3' })

    this.initCanvas();
    this.setStarInfo()
    if(store.isPlayMusic){
      this.playSound()
    }


    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.stopSound(true)
        console.log("H5已切换到后台或手机息屏");
      } else {
        if(store.isPlayMusic){
          this.playSound()
        }
      }

    })
  }
  componentWillUnmount() {
    EventBus.off('GAME_OVER', this.gameOver);
    EventBus.off('GAME_WIN', this.gameWin);
    EventBus.off('BEGIN_DOWNTIME', this.beginDownTime);
    this.stopSound(true)
  }

  gameWin(e) {
    console.log("成功到达终点")
    this.submitGame(e?.detail?.score || 0, 1)
  }

  async gameOver(e) {
    console.log(e, "游戏结束来，死啦死啊了");
    this.submitGame(e?.detail?.score || 0, 0)
  }
  
  /*
   *关闭声音
   * @param {*} musci 音乐
  */
  stopSound(isEnd = false) {
    stopSound('game_bgmusic')
    stopSound('game_snow')
    stopSound('game_gem')
    if(isEnd){
      return
    }
    store.setMusic(false)
  }

  playSound() {
    store.setMusic(true)
    preloadSounds(null, () => {
      playSound('game_bgmusic', { 'loop': true })
    })
  }
  /**
   * 提交分数
   * @param {*} score 分数
   * @param {*} pass 是否通过，1通过，0未过关
   */
  submitGame = async (score, pass) => {
    console.log(store.currentGameLevel, 11111, "currentGameLevel")
    const { success, data } = await API.gameSubmit({
      sign: md5(`9deb162d75304805b6a5a8d0b0d3d310${store.currentGameLevel}${score}${store.startId}${pass}`),
      levelNum: store.currentGameLevel,
      score,
      startId: store.startId,
      arrive: pass
    })
    await store.getHomeInfo();
    if (success && data) {
      if (pass == 0) {
        // 游戏失败了
        modalStore.pushPop("GameFail", {
          ...data,
          removeGame: this.removeGame,
          canvasUI: this.canvasUI
        })
      } else {
        // 通关
        console.log(data, 'data')
        modalStore.pushPop("GameSuccess", {
          ...data,
          score,
          levelNum: store.currentGameLevel,
          removeGame: this.removeGame,
          canvasUI: this.canvasUI
        })
      }
    } else {
      await this.removeGame();
      store.changePage("Mappage")
    }
  }

  setStarInfo() {
    let { starInfo } = Object.assign({}, toJS(store.homeInfo));
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

  flushfunc = () => {
    gameStore.enterFrame(this.gamestage)
  }
  clickfunc = () => {
    gameStore.clickStage()
  }
  canvasUI = async () => {
    //let img = new FYGE.Sprite("")
    console.log("初始化canvasUI")
    gameStore.offsetX = (1624 - (document.body.clientHeight > 1624 ? 1624 : document.body.clientHeight)) / 2
    gameStore.offsetY = (750 - (document.body.clientWidth > 750 ? 750 : document.body.clientHeclientWidthight)) / 2
    console.log(document.body.clientWidth > 1624 ? 1624 : document.body.clientWidth)
    console.log("当前偏移量：", gameStore.offsetX, gameStore.offsetY)


    gameStore.gameEnd = false
    gameStore.initbgUI(this.gamestage)

    gameStore.bgCon = new FYGE.Container();
    this.gamestage.addChild(gameStore.bgCon)

    gameStore.getData(this.gamestage)
    gameStore.initbg()


    //帧刷新
    this.gamestage.addEventListener(FYGE.Event.ENTER_FRAME, this.flushfunc);
    //点击
    this.gamestage.addEventListener(FYGE.MouseEvent.MOUSE_DOWN, this.clickfunc);

    // this.setState({
    //   gameStep: 0,
    //   startpop: false
    // },()=>{
    //   gameStore.addRole()
    //   gameStore.beginGame = true
    // });
    await store.queryNewGuide();
    if (store?.newGuideStep?.alreadyGuideSteps == 2 && store.currentGameLevel == 1) {
      modalStore.pushPop("GameGuide")
    } else {
      this.setTimeStatus()
    }

  }

  beginDownTime() {
    this.setTimeStatus()
  }

  async setTimeStatus() {
    this.setState({
      startpop: true,
    });
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
    }, () => {
      gameStore.addRole()
      gameStore.beginGame = true
    });
  }
  removeGame = () => {
    return new Promise((res, rej) => {
      console.log(this.gamestage, "this.gamestage.")
      gameStore.shape0.clear(); // debug
      gameStore.shape1.clear();
      gameStore.Shapestock0.clear(); // debug
      gameStore.Shapestock1.clear();

      this.gamestage.removeEventListener(FYGE.Event.ENTER_FRAME, this.flushfunc);
      //点击
      this.gamestage.removeEventListener(FYGE.MouseEvent.MOUSE_DOWN, this.clickfunc);
      gameStore.bgCon.removeAllChildren()
      this.gamestage.removeAllChildren()
      gameStore.beginGame = false;
      gameStore.phyworld.step = 0;
      gameStore.subdivision = 0

      gameStore.score = 0
      gameStore.gameEnd = false
      gameStore.phyworld.removeBody(gameStore.role.carBody)
      gameStore.phyworld.removeBody(gameStore.role.circleBody)
      gameStore.phyworld.removeBody(gameStore.role.circleBody2)
      for (let i = 0; i < gameStore.additiveslist.length; i++) {
        gameStore.phyworld.removeBody(gameStore.additiveslist[i].rectBody)
      }
      gameStore.distance = 0
      gameStore.phyworld.clear()
      gameStore.role = null
      gameStore.phyworld = null
      gameStore.bgList2 = []
      gameStore.bgArea2X = 0
      gameStore.bgList3 = []
      gameStore.bgArea3X = 0
      res()
    })

  }


  backMapPage() {
    if (gameStore.beginGame == false) { return }
    gameStore.pasueGame()
    modalStore.pushPop("GameLeave", { removeGame: this.removeGame })
  }
  render() {
    const { gameStep, startpop, starInfo, soundon } = this.state
    return (
      <div className="homePagebox">
        <div className="gamepage">
          <div className="canvasbox">
            <canvas className="canvas" id="gamestage"></canvas>
          </div>
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
                    <span className="title_di"></span>

                    <span className="title_ge"
                      style={{ background: `url(${RES_PATH}GamePage/${store.currentGameLevel.toString()[0]}.png) no-repeat top left / 100% 100%` }}
                    ></span>

                    {
                      store.currentGameLevel > 9 && <span className="title_shi"
                        style={{ background: `url(${RES_PATH}GamePage/${store.currentGameLevel.toString()[1]}.png) no-repeat top left / 100% 100%` }}
                      ></span>
                    }

                    {
                      store.currentGameLevel > 99 && <span className="title_bai"
                        style={{ background: `url(${RES_PATH}GamePage/${store.currentGameLevel.toString()[2]}.png) no-repeat top left / 100% 100%` }}
                      ></span>
                    }



                    <span className="title_guan"></span>
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


          <div className="iconarea" >

            <div className="distance">
              <span className="distancebg"></span>
              <span className="distancenum">{((gameStore.lineInfo.length - 13) * 100 - Math.floor(gameStore.distance)) > 0 ? Math.floor(((gameStore.lineInfo.length - 13) * 100 - Math.floor(gameStore.distance))/100 ): 0}m</span>
            </div>
            <div className="bar">
              <div className="three">
                <span className="bj"></span>
                <div className="baron_mask" style={{ width: `${(gameStore.score * 1) / Math.floor(starInfo?.[store.currentGameLevel - 1]?.star3) * 4.79}rem` }}>
                  <span className="baron"></span>
                  <SvgaPlayer className="baron_svga" src={`${RES_PATH}svga/流光高亮.svga`} />
                </div>


                <div className="twoarea">
                  <span className="twobg"></span>
                  <span className="twoscore">{`${starInfo?.[store.currentGameLevel - 1]?.star2}`}</span>
                  <span className="twostar"></span>
                </div>
                <div className="threearea">
                  <span className="threebg"></span>
                  <span className="threescore">{`${starInfo?.[store.currentGameLevel - 1]?.star3}`}</span>
                  <span className="threestar"></span>
                </div>
              </div>
              <span className="bartip">当前分数</span>
              <span className="barscore">{gameStore.score}</span>
            </div>
            <div className="sound">

              {
                !store.isPlayMusic && <span className="soundf"
                  onClick={() => {
                    console.log('打开声音')
                    this.playSound()
                    store.setMusic(true)
                    // this.setState({
                    //   soundon: true
                    // })
                  }}
                ></span>
              }

              {
                store.isPlayMusic && <span className="soundon"
                  onClick={() => {
                    console.log('关闭声音')
                    this.stopSound()
                    store.setMusic(false)
                    // this.setState({
                    //   soundon: false
                    // })
                  }}
                ></span>
              }

            </div>
            <span className="back" onClick={() => {
              this.backMapPage()
            }}></span>
          </div>
        </div>
      </div>
    );
  }
}
export default Gamepage;
