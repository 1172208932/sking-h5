"use strict";

import React from "react";
import { observer } from "mobx-react";
import store from "../../store/index";
import modalStore from "@src/store/modal";
import API from "../../api";
import {dateFormatter, _throttle} from "@src/utils/utils"
import "./myprize.less";

@observer
class Myprize extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    this.getPrizeList();
  }

  getPrizeList = async () => {
    const { success, data } = await API.getMyPrize();
    if (success && data?.length) {
      this.setState({
        list: data,
      });
    }
  };

  goToLink = _throttle((item) => {
    const {id, url} = item
		if (url) {
			location.href = url
		} else {
			location.href = `/aaw/projectx/takePrize?projectOrderNo=${id}`
		}
  })
  render() {
    const { list } = this.state;
    return (
      <div className="myprize">
        <span className="popoverBaseplate3"></span>
        <span
          className="shutDown"
          onClick={() => modalStore.closePop("Myprize")}
        ></span>
        <div className="prizelistbox">
          {list.map((item, index) => {
            return (
              <div className="prizelistitem" key={index} onClick={() => this.goToLink(item)}>
                <img className="prizelistimg" src={item?.extra?.icon}/>
                <div className="right-detail">
                  <span className="namePrize textover">{item?.extra?.name}</span>
                  <span className="time-prize">{dateFormatter(item?.gmtCreate,'yyyy.MM.dd')}</span>
                </div>
              </div>
            );
          })}
        </div>

        <span className="iceAndSnowAtmosphere2"></span>
      </div>
    );
  }
}
export default Myprize;
