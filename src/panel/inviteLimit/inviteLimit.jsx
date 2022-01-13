'use strict';

import React from 'react';
import { observer } from 'mobx-react';
import modalStore from '@src/store/modal';
import './inviteLimit.less';
import { _throttle } from '@src/utils/utils.js';

@observer
class InviteLimit extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="inviteLimit">
        <span className="low"></span>
        <p className="title">今日邀请已达上限<br/>今天没有金币奖励了哦</p>
        <div className="close" onClick={() => modalStore.closePop("InviteLimit")}></div>
      </div>
    );
  }
}
export default InviteLimit;
