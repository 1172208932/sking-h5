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

  againNext = () => {
    alert("我还没做,先刷新！！", 11212);
  }
  render() {
    const {popData} = this.props;
    return (
      <div className="gameSuccessIsLessThanStar1">
        <span className="snowAndIceAtmosphere"></span>
        <span className="light"></span>
       
        <div className="copy">
          <p className="layer4773 textover">+{popData?.score || 0}</p>
          <p className="layer300 textover">+{popData?.sendGold || 0}</p>
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
          <div className="leftButton" onClick={() => store.toInvite()}>
            <p className="button5 textover">
              领{store?.homeInfo?.inviteGolds||0}金币
            </p>
            <div className="participateInAnswer2">
              <p className="participationAnswer3">邀请好友</p>
            </div>
           
          </div>
          {/* 继续闯关 */}
          <span className="button4" onClick={this.againNext}></span>
        </div>
        
      </div>
    );
  }
}
export default GameSuccess;
