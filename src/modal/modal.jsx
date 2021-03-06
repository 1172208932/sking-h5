import React, { Component } from "react";
import {GameLeave} from "../panel/index.js";
import './modal.less';
import { observer } from 'mobx-react';
import modalStore from '../store/modal';
import { toJS } from 'mobx';
import store from "../store/index";

export const cfg = {
  GameLeave
};

@observer
class Modal extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentDidUpdate() {
    const list = toJS(modalStore.popList);
    if(!document.getElementById("mapPageId")) return false;
    if(!list.length) {
      document.getElementById("mapPageId").style.position = 'absolute';
      this.moveMap();
    } else {
      document.getElementById("mapPageId").style.position = 'fixed';
    }
  }

   /**
   * 关卡移动
   * 当关卡》3时，位于从左到右的第三关
   * @returns 
   */
  moveMap = () => {
    const remscale = window.remScale;
    const { homeInfo } = store;
    let len = homeInfo?.gameInfo?.length ? homeInfo.gameInfo.length : 0;
    if (len >= 3) {
      // 3移动1，4移动2个
      window.scrollTo(0, remscale * 340 + ((14413 * remscale) / 108) * (len - 3));
    }
  }


  render() {
    const list = toJS(modalStore.popList);

    if (!list.length) {
      //TODO:此处根据需要自行修改
      document.body.style.overflow = 'auto';
      return <section></section>;
    }

    let PopUp, popData, PopUpMulti, popUpMultiData;

    if (list.length > 1 && list[list.length - 1].isMulti == true) {
      const popObj2 = list[list.length - 1];
      PopUpMulti = cfg[popObj2.key];
      popUpMultiData = popObj2.data;
    }

    const popObj = list[0];
    PopUp = cfg[popObj.key];
    popData = popObj.data;

    if (PopUp || PopUpMulti) {
      document.body.style.overflow = 'hidden';
    }

    console.log(popObj,"popData")

    return <section className="modal-hoc-bg" style={{
      zIndex: !!modalStore.popList.length ? 1000 : -1,
      display: !!modalStore.popList.length ? 'flex' : 'none'
    }}>
      {PopUp && <PopUp popData={popData} />}
      {PopUpMulti && <section className="modal-hoc-bg" style={{
        zIndex: !!modalStore.popList.length ? 1000 : -1,
        display: !!modalStore.popList.length ? 'flex' : 'none'
      }}><PopUpMulti popData={popUpMultiData} />
      </section>}
      {(popObj.key !="Poster"&&popObj.key !="Share")&&<div className="leftlogo"></div>}
      {(popObj.key !="Poster"&&popObj.key !="Share")&&<div className="rightlogo"></div>}
    </section>;
  }

}

export default Modal;