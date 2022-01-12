"use strict";

import React from "react";
import { observer } from "mobx-react";
import store from "../../store/index";
import modalStore from "@src/store/modal";
import "./MapBox.less";
import { MapPosition } from "@src/utils/constants.js";
import { RES_PATH } from "../../../sparkrc.js";

@observer
class MapBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapList: null,
    };
  }

  componentDidMount() {
    this.setMapList();
  }

  setMapList = () => {
    const { homeInfo } = store;
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
      } else if (i >= 21) {
        //21
        // 暂时未开放
        list[i].class = "needwait";
        list[i].iconList = [];
      } else if (
        i > homeInfo?.gameInfo?.length ||
        !homeInfo?.gameInfo?.length
      ) {
        // 还没通过这一关，锁
        list[i].class = "lockBtn";
        list[i].iconList = list[i].level.toString().split("");
      } else {
        // 通过
        list[i].class = "greenBtn";
        list[i].iconList = list[i].level.toString().split("");
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
    this.setState({
      mapList: list2,
    });
  };

  render() {
    const { homeInfo } = store;
    const { mapList } = this.state;
    console.log(mapList, "mapListmapListmapListmapList");
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
                {index<homeInfo?.gameInfo?.length && Boolean(homeInfo?.gameInfo?.[index]) &&
                  homeInfo?.gameInfo?.[index]?.star && (
                    <div className="starBox">
                      {[1, 2, 3].map((staritem) => {
                        return (
                          <img
                            src={
                              staritem <= homeInfo?.gameInfo[index].star
                                ? `${RES_PATH}/mappage/star.png`
                                : `${RES_PATH}/mappage/noStar.png`
                            }
                            alt=""
                            key={staritem}
                          />
                        );
                      })}
                    </div>
                  )}
                {/* 按钮 */}
                <div
                  className={`levelBox ${item.class}`}
                  onClick={() => store.changePage("Gamepage")}
                >
                  {Boolean(item.iconList?.length) &&
                    item.iconList.map((val, i) => {
                      return (
                        <img
                          className="num"
                          key={i}
                          src={
                            index > homeInfo?.gameInfo?.length ||
                            !homeInfo?.gameInfo?.length
                              ? `${RES_PATH}/mappage/blue-level${val}.png`
                              : `${RES_PATH}/mappage/level_${val}.png`
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
