"use strict";

import React from "react";
import { observer } from "mobx-react";
import store from "../../store/index";
import modalStore from "@src/store/modal";
import "./MapBox.less";
import { MapPosition, USER_AVATAR } from "@src/utils/constants.js";
import { RES_PATH } from "../../../sparkrc.js";
import { SvgaPlayer } from "@spark/animation";
import { _throttle } from "@src/utils/utils";
import API from "../../api";
import { Toast } from "@spark/ui";
@observer
class MapBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapList: null,
      a:null
    };
  }
  mapTimer1= null;
  mapTimer2= null;


  componentDidMount() {
    // this.setMapList();
  }
  componentDidUpdate() {
    // setTimeout(() => {
    //   console.log(2222)
    //   this.setMapList();

    // })
  }

  watah = () => {
   
  }

  /**
   * 如果homeInfo?.gameInfo最后一项的level有gift&&receive!=1,其后面那一项不能是蓝色的
   */
  setMapList = () => {
    console.log(11123231211);
    const { homeInfo } = store;
    const gameLen = homeInfo?.gameInfo?.length ? homeInfo.gameInfo.length : 0;
    let list = new Array(109).fill({
      level: null,
      top: null,
      left: null,
      class: null,
      marginTop: 0,
      iconList: [],
    });
    let list2 = [];
    let giftNum = 0;
    for (let i = 0; i < list.length; i++) {
      if (i % 11 == 10) {
        giftNum += 1;
      }
      list[i].level =
        i % 11 == 10 ? `gift_${i.toString()[0]}0` : i - giftNum + 1;
      if (i % 11 == 10) {
        // 这是礼盒
        list[i].class = "giftBtn";
        list[i].iconList = [];
      } else if (i >= CFG.open && i<CFG.oneOpen) {
        // 今日开放
        list[i].class = "needwait todayBtn";
        list[i].iconList = [];
      } else if(i>=CFG.oneOpen && i<CFG.twoOpen) {
        // 41-60
        list[i].class = "needwait open1_28Btn";
        list[i].iconList = [];
      } else if(i>=CFG.twoOpen && i<CFG.threeOpen) {
        // 61-80
        list[i].class = "needwait open1_30Btn";
        list[i].iconList = [];
      } else if(i>=CFG.threeOpen) {
        // 81-100
        list[i].class = "needwait open2_8Btn";
        list[i].iconList = [];
      } else if (i > gameLen) {
        // 还没通过这一关，锁
        list[i].class = "lockBtn";
        list[i].iconList = list[i].level.toString().split("");
      } else {
        // 通过
        list[i].class = "greenBtn";
        list[i].iconList = list[i].level.toString().split("");
      }
      if (
        i == gameLen &&
        homeInfo?.gameInfo?.[gameLen - 1]?.level.indexOf("gift") >= 0 &&
        homeInfo?.gameInfo?.[gameLen - 1]?.receive != 1
      ) {
        // 后面的那一个是蓝色，手指在该项，
        list[i].class = i >= CFG.open ? "needwait":"lockBtn";
      }


      // left&top
      if (i <= 10) {
        list[i].left = MapPosition[i].left;
        list[i].top = MapPosition[i].top;
      } else {
        if (i % 6 == 0 || i % 6 == 1) {
          list[i].top = "11%";
        } else if (i % 3 == 0 || i % 3 == 1) {
          list[i].top = "65%";
        } else if (i % 2 == 0 || i % 2 == 1) {
          list[i].top = "36%";
        }
        list[i].left = (100 / 109) * i + "%";
        list[i].marginTop = i % 11 == 10 ? "-0.2rem" : "";
      }
      list2.push(JSON.parse(JSON.stringify(list[i])));
    }

    return list2;
    // this.setState({
    //   mapList: list2,
    // });
  };

  clickStart = _throttle((item, index) => {
    const { homeInfo } = store;
    if (homeInfo?.activityEndTime <= homeInfo.currentTime) {
      Toast("活动已结束");
      return false;
    }
    if (item.class == "greenBtn") {
      // 绿色按钮，可以玩
      this.mapTimer2 = setTimeout(() => {
        store.startGame(item.level);
      },400)
      
    } else if (item.class == "giftBtn") {
      // 礼盒按钮
      this.mapTimer2 = setTimeout(() => {
        this.clickGift(index);
      },400)
    }
  });


  // 礼盒按钮
  clickGift = (index) => {
    const { homeInfo } = store;
    if (index + 1 == homeInfo?.gameInfo.length) {
      if (homeInfo?.gameInfo[index]?.receive == 0) {
        // 未完成
        modalStore.pushPop("ToInvite");
      } else if (homeInfo?.gameInfo?.[index]?.receive == 2) {
        // 待领取
        store.setCurrentGameLevel(homeInfo.gameInfo[index].level)
        modalStore.pushPop("TurnTable");
      }
    }
  };

  // 动效，因为ios不支持active
  /**
   * 
   * @param {TouchEvent} e 
   * @returns 
   */
  toushStart = (e) => {
    console.log(e.currentTarget);
    if(!window.isIos) return false;
    e.currentTarget.classList.add("active");
  }

  // 动效，因为ios不支持active
  touchEnd = (e) => {
    if(!window.isIos) return false;
    e.persist();
    e.currentTarget.classList.remove("active");
  }

  componentWillUnmount() {
    this.mapTimer1&&clearTimeout(this.mapTimer1)
    this.mapTimer2&&clearTimeout(this.mapTimer2)
  }

  render() {
    const { homeInfo } = store;
    // const { mapList } = this.state;
    const gameLen = homeInfo?.gameInfo?.length ? homeInfo.gameInfo.length : 0;

    const mapList = this.setMapList();
    return (
      <div className="mapBox">
        {Boolean(mapList?.length) &&
          mapList.map((item, index) => {
            return (
              <div
                className="mapItem"
                style={{
                  top: item.top,
                  left: item.left,
                  marginTop: item.marginTop,
                }}
                key={index}
              >
                {/* 星星: 玩过 */}
                {Boolean(
                  index < gameLen &&
                    homeInfo?.gameInfo?.[index] &&
                    homeInfo?.gameInfo?.[index]?.star > 0
                ) && (
                  <div className="starBox">
                    {[1, 2, 3].map((staritem) => {
                      return (
                        <img
                          src={
                            staritem <= homeInfo?.gameInfo[index].star
                              ? `${RES_PATH}mapPage/star.png`
                              : `${RES_PATH}mapPage/noStar.png`
                          }
                          alt=""
                          key={staritem}
                        />
                      );
                    })}
                  </div>
                )}
                {/* 头像+手指：该玩这关了 */}
                {((index == gameLen &&
                  item.class != "lockBtn"&&item.class.indexOf('needwait')<0) ||
                  (index == gameLen - 1 &&
                    item.class == "giftBtn" &&
                    homeInfo?.gameInfo?.[index]?.receive != 1)) && (
                  <div className="head-hand">
                    <div className="headiconbox">
                      <p className="headiconboxtitle">
                        消耗{homeInfo?.joinGolds}金币开始
                      </p>
                      <p className="headboxbottombg"></p>
                      <img
                        className="headboxbottomimg"
                        src={homeInfo?.avatar || USER_AVATAR}
                      />
                    </div>
                    <SvgaPlayer
                      className="gesturesAperture"
                      src={`${RES_PATH}svga/手势单击.svga`}
                    />
                  </div>
                )}
                {/* 按钮 */}
                <div
                  onTouchStart={(e)=>this.toushStart(e, index,item.class)}
                  onTouchEnd={(e) => this.touchEnd(e, index)}
                  className={`levelBox ${item.class} ${item.classAct}`}
                  onClick={() => this.clickStart(item, index)}
                >
                  {Boolean(item.iconList?.length) &&
                    item.iconList.map((val, i) => {
                      return (
                        <img
                          className="num"
                          key={i}
                          src={
                            item.class == "lockBtn"
                              ? `${RES_PATH}mapPage/blue-level${val}.png`
                              : `${RES_PATH}mapPage/level_${val}.png`
                          }
                        />
                      );
                    })}
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

export default MapBox;
