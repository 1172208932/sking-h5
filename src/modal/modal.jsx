import React, { Component } from "react";
import { ExchangeShop, ExchangeConfirm, Rule, Myprize, Rank, InviteSuccess } from "../panel/index.js";
import './modal.less';
import { observer } from 'mobx-react';
import modalStore from '../store/modal';
import { toJS } from 'mobx';
export const cfg = {
  ExchangeShop,
  ExchangeConfirm,
  Rule,
  Myprize,
  Rank,
  InviteSuccess,
};

@observer
class Modal extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

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
    </section>;
  }

}

export default Modal;