'use strict';

import React from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '@src/store/modal';
import API from '../../api';
import './payConfirm.less';
import { _throttle } from '@src/utils/utils.js';
import { Toast } from '@spark/ui';

@observer
class PayConfirm extends React.Component {
  constructor(props) {
    super(props);
  }

  clickStart = _throttle(async() => {
    const {popData} = this.props;
    popData.start();
  })

  clickMiss = () => {
    const {popData} = this.props;
    if(popData?.miss) {
      popData.miss()
    } else {
      modalStore.closePop("PayConfirm")
    }
  }
  render() {
    const {popData} = this.props;
    return (
      <div className="exchangeShopConfirmed1Twice">
        <span className="popupWindowBottom"></span>
        <div className="sureCost300 textover2">确认支付{popData?.needCoin || 0}金币进入游戏吗？</div>
        <span className="forgetIt" onClick={this.clickMiss}>再想想</span>
        <span className="buy" onClick={this.clickStart}>确认</span>
      </div>
    );
  }
}
export default PayConfirm;
