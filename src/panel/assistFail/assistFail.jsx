'use strict';

import React from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '@src/store/modal';
import './assistFail.less';
import { _throttle } from '@src/utils/utils.js';
import API from '../../api';
import { ERROR_MESSSAGE } from '@src/utils/constants.js';


@observer
class AssistFail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  render() {
    const {popData} = this.props;
    console.log(popData.code,ERROR_MESSSAGE(popData?.code))
    return (
      <div className="assistFail">
        <div className="snowAndIceAtmosphere">
        </div>
        <div className="content">
          <p className="toptitle">{ERROR_MESSSAGE(popData?.code) ||  popData?.msg || '助力失败'}</p>
          <p className="subtitle-assist">
          快来试试你能闯到多少关？<br/>和朋友一起赢燃动冰雪赢黄金！
          </p>
          <div className="btn" onClick={() => modalStore.closePop("AssistFail")}></div>
          {/* <div className="close" onClick={() => modalStore.closePop("AssistSuccess")}></div> */}
        </div>
      </div>
    );
  }
}
export default AssistFail;
