'use strict';

import React from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '@src/store/modal';
import API from '../../api';
import './exchangeConfirm.less';

@observer
class ExchangeConfirm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="exchangeShopConfirmed1Twice">
        <span className="popupWindowBottom"></span>
        <span className="sureCost300">确定花费3000雪花购买商品名称吗？</span>
        <span className="forgetIt"></span>
        <span className="buy"></span>
      </div>
    );
  }
}
export default ExchangeConfirm;
