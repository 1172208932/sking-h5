'use strict';

import React from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '@src/store/modal';
import API from '../../api';
import './gameSuccess.less';

@observer
class GameSuccess extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="gameSuccessIsLessThanStar1">
        <span className="snowAndIceAtmosphere"></span>
        <span className="light"></span>
       
        <div className="copy">
          <span className="scorebo"></span>
          <span className="layer4773">+4773</span>
          <span className="layer300">+300</span>
        </div>
        <span className="title"></span>
        <span className="headings"></span>
        <div className="stars">
          <span className="star3"></span>
          <span className="star2"></span>
          <span className="nullsta"></span>
        </div>
        <span className="ribbon"></span>
        {/* 底部按钮 */}
        <div className="bottomBtnBox">
          {/* 邀请好友 */}
          <div className="leftButton">
            <div className="button5">
              <span className="bluebg"></span>
              <span className="led20Coins">领20金币</span>
            </div>
            <span className="justify"></span>
            <span className="inviteFriends">邀请好友</span>
          </div>
          {/* 继续闯关 */}
          <span className="button4"></span>
        </div>
        
      </div>
    );
  }
}
export default GameSuccess;
