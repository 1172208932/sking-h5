"use strict";

import React from "react";
import { RES_PATH } from "../../../sparkrc.js";
import { observer } from "mobx-react";
import store from "../../store/index";
import modalStore from "@src/store/modal";
import API from "../../api";
import LotteryTiger from "./tiger.js";
import "./rockPrize.less";
import { SvgaPlayer } from "@spark/animation";
import { Toast } from "@spark/ui";

@observer
class RockPrize extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prizeList: null,
    };
    this.lottery = null;
  }

  async componentDidMount() {
    await this.getRockPrizeList();
    this.initLottie();
    
  }

  initLottie = () => {
    this.lottery = new LotteryTiger(
      // document.getElementById("js_toggle"),
      "",
      document.querySelectorAll(".roller"),
      {
        interval: 300, //每个roller间动画间隔
        aniMinTime: 3000, //动画执行最少时间
      }
    );
    setTimeout(() => {
      this.toDraw()
    },1000)
    this.rockEnd();
  };

  rockEnd = () => {
    this.lottery.on("end", (data) => {
      console.log("jieshujieshu",data);
      store.getHomeInfo();
      if (data.optionId == "thanks") {
        setTimeout(() => {
          Toast("没有中奖哦，再接再厉")
          modalStore.closePop("RockPrize")
        }, 1000);
      } else {
        setTimeout(() => {
          modalStore.pushPop("DrawPrize",{prizeInfo:{
            optionName: data.optionName,
            optionImg: data.optionImg
          }},true)
          modalStore.closePop("RockPrize")
        }, 1000);
      }
    });
  }

  getRockPrizeList = async () => {
    const { success, data } = await API.rockQuery();
    if (success && data?.options?.length) {
      this.setState({
        prizeList: data.options,
      });
    }
  };

  toDraw = async () => {
    const { success, data } = await API.rockDraw({
      levelNum: store.currentGameLevel,
    });
    if (success && data?.options?.[0]) {
      // 让他滚
      this.lottery.draw();
      this.startRock(data.options[0])
    } else {
      modalStore.closePop("RockPrize")
    }
  };

  // 开始摇摆
  startRock = (data) => {
    setTimeout(() => {
      let ret = this.getIndexById(data);
      this.lottery.setResult(ret, data);
    }, 2000);
  };

  // 根据id判断奖品索引
  getIndexById = (data) => {
    const { prizeList } = this.state;
    const index = prizeList.findIndex((item)=> {
      return item.optionId == data.optionId
    })
    if (index >=0 ) {
      return [index, index, index];
    } else {
      return this.getThreeNum();
    }
  };

  // 获取三个不一样的随机数
  getThreeNum = () => {
    const { prizeList } = this.state;
    let count = prizeList.length;
    let arr = [];
    let originalArray = new Array(); //原数组
    //给原数组originalArray赋值
    for (let i = 0; i < count; i++) {
      originalArray[i] = i;
    }
    originalArray.sort(function () {
      return 0.5 - Math.random();
    });
    for (let i = 0; i < 3; i++) {
      arr.push(originalArray[i]);
    }
    return arr;
  };
  render() {
    const { prizeList } = this.state;
    return (
      <div className="fullStarDraw1">
        <SvgaPlayer className="snowAndIceAtmosphere" src={`${RES_PATH}svga/雪花出来.svga`}></SvgaPlayer>
        <SvgaPlayer className="ribbon" src={`${RES_PATH}svga/彩带.svga`} loop={1}></SvgaPlayer>
        <span className="light"></span>
        <span className="title"></span>
      
        <div className="rockBox">
          <div className="rock">
            {[1, 2, 3].map((item) => {
              return (
                <div className="item" key={item}>
                  <ul className="roller">
                    {prizeList
                      ? prizeList.map((items, indexs) => {
                          return (
                            <li key={indexs + "s"}>
                              <div className="img-box">
                                <img
                                  className="img-icon"
                                  src={items.optionImg}
                                  alt=""
                                />
                              </div>
                            </li>
                          );
                        })
                      : null}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
        <SvgaPlayer className="highlightPoints" src={`${RES_PATH}svga/摇奖机光圈.svga`}/>
      </div>
    );
  }
}
export default RockPrize;
