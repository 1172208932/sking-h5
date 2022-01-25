'use strict';

import React from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '@src/store/modal';
import './toAssist.less';
import { _throttle } from '@src/utils/utils.js';
import API from '../../api';
import { USER_AVATAR, USER_NAME } from '@src/utils/constants.js';

@observer
class ToAssist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shareInfo: {}
    }
  }

  componentDidMount() {
    this.getUserInfo()
  }
  getUserInfo = async() => {
    const {success,data} = await API.shareInfo()
    if(success) {
      this.setState({
        shareInfo: data
      })
    }
  }

  clickAssist = _throttle(async() => {
    const { success,message,code } = await API.doAssist({
      inviteCode: CFG.inviteCode
    })
    sessionStorage.setItem("inviteCode", CFG.inviteCode)
    if (success) {
      // Toast("助力成功")
      modalStore.pushPop("AssistSuccess")
    } else {
      // Toast("助力失败")
      modalStore.pushPop("AssistFail",{msg: message,code: code})
    }
    this.close()
  })

  close  = () => {
    modalStore.closePop("ToAssist");
    store.getHomeInfo();
  }

  render() {
    const {shareInfo} = this.state;
    return (
      <div className="toAssist">
        <div className="userInfo">
          <img src={shareInfo.avatar || USER_AVATAR} alt="" className="avatar-assist" />
          <p className="name">{shareInfo.nickName || USER_NAME}</p>
        </div>
        <div className="btn" onClick={this.clickAssist}></div>
        <div className="close" onClick={this.close}></div>
      </div>
    );
  }
}
export default ToAssist;
