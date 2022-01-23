'use strict';

import React from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '@src/store/modal';
import './sendCoin.less';
import { _throttle } from '@src/utils/utils.js';
import API from '../../api';

@observer
class SendCoin extends React.Component {
  constructor(props) {
    super(props);
  }

  clickBtn = _throttle(async() => {
    const {popData} = this.props
    const judgeEndTime = popData.judgeEndTime;
    if(judgeEndTime()) {
      // 递进新手引导
      const {success} = await API.stepNewGuide()
      await store.queryNewGuide();
      if(success) {
        modalStore.closePop("SendCoin")
      }
    }
  })

  render() {
    return (
      <div className="sendCoin">
        <div className="fenwei-sencoin"></div>
        <span className="bg"></span>
        <span className="button" onClick={this.clickBtn}></span>
        {/* <p className='drawFeedback1-in'>在「我的奖品」中查看</p> */}
        <span className="snowAndIceAtmosphere"></span>
      </div>
    );
  }
}
export default SendCoin;
