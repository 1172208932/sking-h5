'use strict';

import React from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '@src/store/modal';
import API from '../../api';
import './rank.less';

@observer
class Rank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rankDetail: {}
    }
  }

  componentDidMount() {
    this.getRankList()
  }

  getRankList = async() => {
    const {success,data} = await API.getRank();
    if(success && data) {
      this.setState({
        rankDetail: data
      })
    }
  }
  render() {
    return (
      <div className="rank">
        <span className="popupWindowBottom"></span>
        <span className="shutDown" onClick={() => modalStore.closePop("Rank")}></span>
        <div className="text">
          <span className="beforeInvitingFriends">邀请好友人数前十名可获得奖励 2月18日零点开奖</span>
          <span className="no150">第1-50名</span>
        </div>
        <span className="button3"></span>
        <span className="jPrizesFigure"></span>
        <span className="snowAndIceAtmosphere"></span>
      </div>
    );
  }
}
export default Rank;
