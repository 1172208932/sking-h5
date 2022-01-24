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
    if(document.getElementById("overlay_layer")) {
      document.getElementById("overlay_layer").style.display = 'none';
    }
  }

  componentWillUnmount() {
    if(document.getElementById("overlay_layer")) {
      document.getElementById("overlay_layer").style.display = 'block';
    }
  }


  getPrizeList = async () => {
    const { success, data } = await API.getMyPrize();
    if (success && data?.length) {
      const list = data.filter((item)=> {
        return item.extra.type !=1
      })
      this.setState({
        list,
      });
    }
  };

  goToLink = _throttle((item) => {
    const {id, url} = item
    if(item.extra.type ==1) return false;
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
        <div className="fenwei"></div>
        <span className="popoverBaseplate3"></span>
        <span
          className="shutDown"
          onClick={() => modalStore.closePop("Myprize")}
        ></span>
        <p className="text-prize">将在活动结束后5个工作日内统一发货
</p>
        <div className="prizelistbox">
          {list?.length ? list.map((item, index) => {
            return (
              <div className="prizelistitem" key={index} onClick={() => this.goToLink(item)}>
                <img className="prizelistimg" src={item?.extra?.icon}/>
                <div className="right-detail">
                  <span className="namePrize textover">{item?.extra?.name}</span>
                  <span className="time-prize">{dateFormatter(item?.gmtCreate,'yyyy.MM.dd')}</span>
                </div>
              </div>
            );
          }): 
          <div className="nodata"></div>
          }
        </div>

      </div>
    );
  }
}
export default Myprize;
