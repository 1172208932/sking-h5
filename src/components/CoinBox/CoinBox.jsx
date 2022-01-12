'use strict';

import React from 'react';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '@src/store/modal';
import "./CoinBox.less"
@observer
class CoinBox extends React.Component {
  render() {
    const {homeInfo} = store;
    return (
      <div className="goldCoins" onClick={() => modalStore.pushPop("Task")}>
        <span className="coin"></span>
        <span className="layer3418 textover">{homeInfo?.goldNum || 0}</span>
      </div>
    )
  }
}

export default CoinBox