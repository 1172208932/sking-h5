"use strict";

import React from "react";
import { RES_PATH } from "../../../sparkrc.js";
import { observer } from "mobx-react";
import store from "../../store/index";
import modalStore from "@src/store/modal";
import API from "../../api";
import "./exchangeShop.less";

@observer
class ExchangeShop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isNow: true,
    };
  }

  componentDidMount() {
    this.getList();
  }

  getList = async () => {
    const { success, data } = await API.listExchangeLimit();
    if (success && data?.conditions?.length) {
      this.setState({
        list: data.conditions,
      });
    }
  };

  clickDateBtn = (flag) => {
    if (flag == this.state.isNow) return;
    this.setState({
      isNow: flag,
    });
  };
  render() {
    const { homeInfo } = store;
    const { list, isNow } = this.state;
    const bg = isNow
      ? `url(${RES_PATH}/兑换商店明日预1/nowbg.png)`
      : `url(${RES_PATH}/兑换商店明日预1/tomorro.png)`;
    return (
      <div className="exchangeShopWillAdvance1Tomorrow">
        <div className="popupWindowBottom">
          <span className="exchangeShop"></span>
          <div className="goldCoins">
            <span className="layer3618 textover">{homeInfo?.goldNum || 0}</span>
          </div>
        </div>
        {/* 内容区域 */}
        <div className="shopBox" style={{ backgroundImage: bg }}>
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
                        <span className="number">
                          数量 {item?.options?.[0]?.optionStock}
                        </span>
                        <span className="button"></span>
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

        <span
          className="shutDown"
          onClick={() => modalStore.closePop("ExchangeShop")}
        ></span>
        <span className="snowAndIceAtmosphere"></span>
      </div>
    );
  }
}
export default ExchangeShop;
