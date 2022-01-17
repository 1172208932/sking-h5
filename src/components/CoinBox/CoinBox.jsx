'use strict';

import React from 'react';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '@src/store/modal';
import "./CoinBox.less"
import { Toast } from "@spark/ui";
import { _throttle } from '@src/utils/utils';
@observer
class CoinBox extends React.Component {
  clickbtn = _throttle(() => {
    const {homeInfo} = store;
    if(homeInfo?.activityEndTime<=homeInfo.currentTime){
      Toast("活动已结束");
    } else {
      modalStore.pushPop("Task")
    }
  })
  render() {
    const {homeInfo} = store;
    return (
      <div className="goldCoins" onClick={this.clickbtn}>
        <span className="coin"></span>
        <span className="layer3418 textover">{homeInfo?.goldNum || 0}</span>
      </div>
    )
  }
}

export default CoinBox