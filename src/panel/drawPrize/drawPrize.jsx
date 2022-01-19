'use strict';

import React from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '@src/store/modal';
import './drawPrize.less';
import { _throttle } from '@src/utils/utils.js';

@observer
class DrawPrize extends React.Component {
  constructor(props) {
    super(props);
  }

  clickClose = () => {
    const {popData} = this.props;
    modalStore.closePop("DrawPrize");
    if(popData?.prizeInfo?.needToPrize && popData?.prizeInfo?.url) {
      window.location.href = popData.prizeInfo.url
    }
  }

  render() {
    const {popData} = this.props;
    return (
      <div className="drawFeedback1">
        <span className="bg"></span>
        <div className="content">
          <span className="prizena textover">获得{popData?.prizeInfo?.optionName}</span>
          <div className="imgbox">
            <img src={popData?.prizeInfo?.optionImg} alt="" />
          </div>
        </div>
        <span className="button" onClick={this.clickClose}></span>
        <p className='drawFeedback1-in'>在「我的奖品」中查看</p>
        <span className="snowAndIceAtmosphere"></span>
      </div>
    );
  }
}
export default DrawPrize;
