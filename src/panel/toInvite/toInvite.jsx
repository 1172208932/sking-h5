'use strict';

import React from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '@src/store/modal';
import API from '../../api';
import './toInvite.less';

@observer
class ToInvite extends React.Component {
  constructor(props) {
    super(props);
  }
  clickInvite = _throttle(() => {
    modalStore.closePop("ToInvite")
    store.toInvite()
  })
  render() {
    return (
      <div className="unlockPopover1">
        <span className="bg"></span>
        <p className="title">成功邀1位好友抽黄金并解锁后续精彩</p>
        <span className="shutDown" onClick={() => modalStore.closePop("ToInvite")}></span>
        <span className="button" onClick={this.clickInvite}>邀好友得黄金</span>
      </div>
    );
  }
}
export default ToInvite;
