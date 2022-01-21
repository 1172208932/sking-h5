'use strict';

import React from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '@src/store/modal';
import API from '../../api';
import './gameRemind.less';
import { _throttle } from '@src/utils/utils.js';
import { hideLoading, showLoading, Toast } from '@spark/ui';

@observer
class GameRemind extends React.Component {
  constructor(props) {
    super(props);
  }
  clickStart = _throttle(async() => {
    const {popData} = this.props;
    modalStore.closePop("GameRemind");
    this.startGame(popData.level);
  })

  // 开始游戏
  async startGame(level) {
    if (store.homeInfo?.joinGolds > store.homeInfo?.goldNum) {
      modalStore.pushPop("NoMoney");
    } else {
      modalStore.pushPop("PayConfirm",{
        needCoin:store.homeInfo.joinGolds,
        start:async() => {
          store.setCurrentGameLevel(level);
          modalStore.closePop("PayConfirm")
          showLoading()
          const {success,data} = await API.startGame()
          hideLoading()
          if(success && data) {
            Toast("金币-"+store.homeInfo?.joinGolds||0);
            store.setStartId(data)
            store.changePage("Gamepage");
          }
        }
      })
    }
  }
  render() {
    const {homeInfo} = store
    return (
      <div className="addedPopover1">
        <span className="low"></span>
        <span className="title"></span>
        <span className="shutDown" onClick={() => modalStore.closePop("GameRemind")}></span>
        <span className="button" onClick={this.clickStart}></span>
        <p className="copywritingCopywriting">{homeInfo?.desc}
        </p>
      </div>
    );
  }
}
export default GameRemind;
