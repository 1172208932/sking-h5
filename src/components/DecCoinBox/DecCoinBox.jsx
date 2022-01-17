"use strict";

import React from "react";
import { observer } from "mobx-react";
import store from "../../store/index";
import "./DecCoinBox.less";
import { RES_PATH } from "../../../sparkrc.js";

@observer
class CoinBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iconList: null
    }
  }
  componentDidMount() {
    this.setIconPng()
  }
  setIconPng = () => {
    const { homeInfo } = store;
    if(!homeInfo?.joinGolds) {
      this.setState({
        iconList: [0]
      })
      return false
    }
    let str = homeInfo?.joinGolds.toString()
    let list = [];
    for(let i=0;i<str.length;i++) {
      list.push(Number(str[i]))
    }
    this.setState({
      iconList: list
    })
  }
  render() {
    const {iconList} = this.state;
    return (
      <div className="delcoinbox">
        <p className="icon"></p>
        <p className="sub"></p>
        {
          Boolean(iconList?.length) && iconList.map((item,index)=> {
            return(
              <img src={`${RES_PATH}mapPage/${item}.png`} alt="" key={index} className={`iconImg iconImg${item}`}/>
            )
          })
        }
      </div>
    );
  }
}

export default CoinBox;
