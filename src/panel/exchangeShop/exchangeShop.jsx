"use strict";

import React from "react";
import { RES_PATH } from "../../../sparkrc.js";
import { observer } from "mobx-react";
import store from "../../store/index";
import modalStore from "@src/store/modal";
import API from "../../api";
import "./exchangeShop.less";
import { _throttle } from "@src/utils/utils.js";
import { Toast } from "@spark/ui";
import {loadOneImg} from "@src/utils/preload1.3"
import { SvgaPlayer } from "@spark/animation";

@observer
class ExchangeShop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todayResult: [], // 当天兑换列表
      tomorrowResult: [], // 明日预告兑换列表
      isNow: true,
    };
  }

  async componentDidMount() {
    this.getList();
    if(document.getElementById("overlay_layer")) {
      document.getElementById("overlay_layer").style.zIndex = -1;
    }
    await loadOneImg("https://yun.duiba.com.cn/aurora/assets/b415744ec711daa4c93365b157c356ce38b6f726.png")
  }

  componentWillUnmount() {
    if(document.getElementById("overlay_layer")) {
      document.getElementById("overlay_layer").style.zIndex = 2001;
    }
  }

  getList = async () => {
    const { success, data } = await API.listExchangeLimit();
    if (success && data) {
      this.setState({
        todayResult: data?.todayResult?.conditions,
        tomorrowResult: data?.tomorrowResult?.conditions,
      });
    }
  };

  clickDateBtn = (flag) => {
    console.log(flag,this.state.isNow)
    if (flag == this.state.isNow) return;
    this.setState({
      isNow: flag,
    });
  };

  clickBtn = _throttle((item) => {
    const { isNow } = this.state;
    const { homeInfo } = store;
    if (!isNow) {
      if(document.getElementById("overlay_layer")) {
        document.getElementById("overlay_layer").style.zIndex = 2001;
      }
      Toast("即将开启，明日0点开抢!",2000,{didClose: ()=> {
        document.getElementById("overlay_layer").style.zIndex = -1;
      }});
      return false;
    }
    if (item?.consumeSps?.[0]?.quantity <= store?.homeInfo?.goldNum && item?.options?.[0]?.optionStock>0) {
      // 去兑换
      modalStore.pushPop("ExchangeConfirm", {
        detail: {
          needCoin: item.consumeSps[0].quantity,
          name: item?.options?.[0]?.optionName,
          gear: item.gear,
          ruleId: item?.options?.[0]?.ruleId,
        },
      },true);
    } else if(item?.consumeSps?.[0]?.quantity > homeInfo?.goldNum){
      if(document.getElementById("overlay_layer")) {
        document.getElementById("overlay_layer").style.zIndex = 2001;
      }
      // 金币不足
      Toast("金币不足，快去赚金币吧!",2000,{didClose: ()=> {
        document.getElementById("overlay_layer").style.zIndex = -1;
      }});
    } else {
      if(document.getElementById("overlay_layer")) {
        document.getElementById("overlay_layer").style.zIndex = 2001;
      }
      Toast("库存不足",2000,{didClose: ()=> {
        document.getElementById("overlay_layer").style.zIndex = -1;
      }})
    }
  });
  render() {
    const { homeInfo } = store;
    const { isNow, todayResult, tomorrowResult } = this.state;
    console.log(isNow)
    const bg = isNow
      ? `url(${RES_PATH}兑换商店明日预1/nowbg.png)`
      : `url('https://yun.duiba.com.cn/aurora/assets/b415744ec711daa4c93365b157c356ce38b6f726.png')`;
    const list = isNow ? todayResult : tomorrowResult;
    return (
      <div className="exchangeShopWillAdvance1Tomorrow">
        <SvgaPlayer className="snowAndIceAtmosphere" src={`${RES_PATH}svga/雪花.svga`}/>
        <div className="popupWindowBottom">
          <span className="exchangeShop"></span>
          <div className="goldCoins">
            <span className="layer3618 textover">{homeInfo?.goldNum || 0}</span>
          </div>
        </div>
        {/* 内容区域 */}
        <div className="shopBox" style={{ backgroundImage: bg}}>
          {/* 今日明日按钮 */}
          <div className="shopbtnBox">
            <div className="now" onClick={() => this.clickDateBtn(true)}></div>
            <div
              className="now tomorrow"
              onClick={() => this.clickDateBtn(false)}
            ></div>
          </div>

          {/* 商品 */}
          <div className="shopList">
            {list?.length ? (
              list.map((item, index) => {
                return (
                  <div className="item" key={index}>
                    <div className="imgbox">
                      <img src={item?.options?.[0]?.optionImg} alt="" />
                    </div>
                    <div className="right-good">
                      <p className="productNameProductName textover2">
                        {item?.options?.[0]?.optionName}
                      </p>
                      <div className="bottom">
                        <span className="number textover">
                          数量 {item?.options?.[0]?.optionStock}
                        </span>
                        {/* 按钮区域 */}
                        {/* xx金币抢购 */}
                        <div
                          className="button canBuy"
                          onClick={() => this.clickBtn(item)}
                        >
                          {isNow && item?.options?.[0]?.optionStock>0 &&
                            item?.consumeSps?.[0]?.quantity <=
                              homeInfo?.goldNum && (
                              <div className="button canBuy">
                                <p>{item?.consumeSps?.[0]?.quantity}</p>
                                <div className="coin"></div>
                              </div>
                            )}
                          {/* 即将开启 */}
                          {!isNow && <div className="button tomorrowbuy"></div>}
                          {/* 金币不足 */}
                          {isNow &&
                            item?.consumeSps?.[0]?.quantity >
                              homeInfo?.goldNum && (
                              <div className="button noMoney-shop"></div>
                            )}
                          {/* 暂无库存 */}
                          {isNow &&
                            item?.options?.[0]?.optionStock<=0 && item?.consumeSps?.[0]?.quantity <=
                            homeInfo?.goldNum &&(
                              <div className="button nokucun"><strong>库存不足</strong></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="nodata">暂无数据</p>
            )}
          </div>
        </div>

        <div className="shuya"></div>
        <span
          className="shutDown"
          onClick={() => modalStore.closePop("ExchangeShop")}
        ></span>
      </div>
    );
  }
}
export default ExchangeShop;
