'use strict';

import React from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '@src/store/modal';
import API from '../../api';
import './exchangeConfirm.less';
import { _throttle } from '@src/utils/utils.js';
import { Toast } from '@spark/ui';

@observer
class ExchangeConfirm extends React.Component {
  constructor(props) {
    super(props);
  }

  clickBuy = _throttle(async() => {
    const {popData} = this.props;
    const {success,data} = await API.doExchange({
      ruId: popData.detail?.ruleId,
      gear: popData.detail?.gear
    })
    store.getHomeInfo();
    if(success) {
      Toast("购买成功");
      modalStore.closePop("all");
    }
  })
  render() {
    const {popData} = this.props;
    return (
      <div className="exchangeShopConfirmed1Twice">
        <span className="popupWindowBottom"></span>
        <span className="sureCost300 textover2">确定花费{popData?.detail?.needCoin || 0}金币购买{popData?.detail?.name}吗？</span>
        <span className="forgetIt" onClick={() => modalStore.closePop("ExchangeConfirm")}></span>
        <span className="buy" onClick={this.clickBuy}></span>
      </div>
    );
  }
}
export default ExchangeConfirm;
