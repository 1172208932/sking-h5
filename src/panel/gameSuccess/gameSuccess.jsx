'use strict';

import React from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '@src/store/modal';
import API from '../../api';
import './gameSuccess.less';
import { _throttle } from '@src/utils/utils.js';
import { SvgaPlayer } from '@spark/animation';

@observer
class GameSuccess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canClick: false,
    }
  }

  // 进入下一关
  againNext = async() => {
    if(!this.state.canClick) return false;
    const {popData} = this.props;
    await popData.removeGame();
    modalStore.closePop("GameSuccess");
    store.changePage('Mappage')
    store.startGame(store.currentGameLevel+1);
  }

  // 点击邀请
  clickInvite = _throttle(async () => {
    if(!this.state.canClick) return false;
    const {popData} = this.props;
    await popData.removeGame();
    store.changePage("Mappage")
    modalStore.closePop("GameSuccess")
    store.toInvite();
  })

  // 星星动效结束，需要看是否出摇奖机
  svgaEnd = () => {
    const {popData} = this.props;
    this.setState({
      canClick: true
    })
    // 看看需不需要满星抽奖
    if(!store?.homeInfo?.gameInfo || popData.star <3) return false;
    const index = store.homeInfo.gameInfo.findIndex((item) => {
      return item.level ==  store.currentGameLevel
    })
    if((index>=0 && store.homeInfo.gameInfo[index].receive !== 1) || (index<0)) {
      modalStore.pushPop("RockPrize",{},true)
    }
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
        {/* 小标题，超棒的自己/获得三颗星可以抽奖 */}
        <span className={popData?.star  == 3 ?"headings2":"headings"}></span>
        {/* 星星 */}
        <div className="stars">
          {<span className="nullsta1"></span>}
          {<span className="nullsta2"></span>}
          {<span className="nullsta3"></span>}
          {popData?.star>=1 &&<SvgaPlayer src={`${RES_PATH}svga/结算星星${popData?.star}.svga`} className='star-svga' loop={1} onEnd={this.svgaEnd}/>}
        </div>
        {/* 彩带，动效说没动效 */}
        <span className="ribbon"></span>
        {/* 底部按钮 */}
        {
          popData?.levelNum  % 10 == 0 ?(
            <div className="bottomBtnBox2">
              <span className="button5" onClick={this.clickInvite}></span>
            </div>
          ):(
            <div className="bottomBtnBox">
              {/* 邀请好友 */}
              <div className="leftButton" onClick={this.clickInvite}>
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
          )
        }
      </div>
    );
  }
}
export default GameSuccess;
