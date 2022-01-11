"use strict";

import React from "react";
import { RES_PATH } from "../../../sparkrc.js";
import { observer } from "mobx-react";
import store from "../../store/index";
import modalStore from "@src/store/modal";
import API from "../../api";
import "./turnTable.less";
import { Toast } from "@spark/ui";

@observer
class TurnTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawList: null,
      inDraw: false,
      drawPrize: null,
      prizeIndex: 0,
    };
    this.timeout = null;
  }
  componentDidMount() {
    this.getDrawList()
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  getDrawList = async () => {
    const { success, data } = await API.turnTableQuery();
    if (success && data?.options?.length) {
      this.setState({
        drawList: data.options,
      });
    }
  };

  /**
   * 点击抽奖
   * @returns {Promise<void>}
   */
  clickStart = async () => {
    const {inDraw} = this.state;
    if(inDraw) return false;
    this.setState({
      inDraw: true
    });
    const {success, data} = await API.turnTableDraw();
    if(success && data?.options?.length) {
      this.setState({
        drawPrize: data
      })
      this.startTurn(data.options[0].prizeId)
    } else {
      this.setState({
        inDraw: false
      });
    }
  };

  startTurn = (prizeId) => {
    const {drawList} = this.state;
    let endIndex = -1;
    for (let i = 0; i < drawList.length; i++) {
      if (drawList[i].prizeId === prizeId) {
        endIndex = i;
        break;
      }
    }

    if (endIndex === -1) {
      Toast("prizeId配置存在问题")
      modalStore.closePop("TurnTable")
      return false;
    }

    const minSpeed = 300; // 最小速度
    const maxSpeed = 50; // 最快速度
    const maxRing = 6; // 最大圈数
    const halfRing = 4; // half最大圈数
    let ring = 0;
    let speed = 500;
    let willOver = false;

    const turnOnce = () => {
      this.timeout = setTimeout(() => {
        this.state.prizeIndex++;
        if (this.state.prizeIndex > 7) {
          this.state.prizeIndex = 0;
          ring++;
        }

        if (ring <= halfRing) {
          speed -= 50;
        } else {
          speed += 50;
        }

        if (speed > minSpeed) {
          speed = minSpeed;
        } else if (speed < maxSpeed) {
          speed = maxSpeed;
        }

        if (ring >= maxRing) {
          willOver = true;
        }

        this.setState({
          prizeIndex: this.state.prizeIndex,
        });

        if (willOver && this.state.prizeIndex === endIndex) {
          this.endTurn(endIndex)
          return;
        }

        turnOnce();
      }, speed);
    };

    turnOnce();
  }


  endTurn = (index) => {
    const {drawList} = this.state;
    this.setState({
      inDraw: false
    })
    if (drawList[index].prizeId == "thanks") {
      // 谢谢参与
      Toast("很遗憾，您未中奖");
      modalStore.closePop("TurnTable");
    } else {
      // 中奖
      modalStore.closePop("TurnTable");
      modalStore.pushPop("DrawPrize",{prizeInfo: drawList[index]})
    }
    store.getHomeInfo();
  }





  render() {
    const { drawList, prizeIndex } = this.state;
    return (
      <div className="turntable">
        <span className="light"></span>
        <span className="drawbg"></span>
        <span className="title"></span>
        <span className="snowAndIceAtmosphere"></span>
        <div className="turnBox">
          {/* 奖品渲染 */}
          {drawList?.length
            ? drawList.map((v, i) => {
                return (
                  <div
                    className={`turn-prize turn-prize${i} ${
                      prizeIndex === i ? "turn-prize-choose" : ""
                    }`}
                    key={v.prizeId}
                  >
                    <img className="turn-prize-icon" src={v.optionImg} />
                  </div>
                );
              })
            : null}
        </div>
         {/* GO */}
         <span className="go" onClick={this.clickStart}></span>
        <span className="ribbon"></span>
      </div>
    );
  }
}
export default TurnTable;
