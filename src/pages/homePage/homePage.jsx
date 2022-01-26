'use strict';

import React from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '@src/store/modal';
import API from '../../api';
import './homePage.less';
import { _throttle } from '@src/utils/utils.js';
import { Marquee, Toast } from "@spark/ui";
import { SvgaPlayer } from '@spark/animation';
import AvatarBox from "@src/components/AvatarBox/AvatarBox"
import CoinBox from "@src/components/CoinBox/CoinBox"
import { loadLocalAssets } from "@src/utils/preload1.3"
import NewGuide1 from "@src/components/newGuide1/newGuide1"
import { playSound, stopSound, preloadSounds, registerSounds } from '@spark/utils';
import {shareWXmini} from "@src/utils/share"
import IndexBtn from '@src/components/IndexBtn/IndexBtn.jsx';
@observer
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  async componentDidMount() {
    // 用户助力,要比首页接口先调用！！！
    if (CFG.inviteCode&&!sessionStorage.getItem("inviteCode")) {
      modalStore.pushPop("ToAssist")
    } else {
      store.getHomeInfo();
    }
    shareWXmini()
    loadLocalAssets();
    // 新手引导
    await store.queryNewGuide();
    store.getCarousel();
    // modalStore.pushPop("GameSuccess",{
    //   ...{sendGold:10,answerFlag:0,reGold:11,star:3},
    // })
  }


  toAssist = async () => {
    if (CFG.inviteCode&&!sessionStorage.getItem("inviteCode")) {
      modalStore.pushPop("ToAssist")
    }
  }


  judgeEndTime = () => {
    const { homeInfo } = store;
    if (homeInfo?.activityEndTime <= homeInfo.currentTime) {
      Toast("活动已结束");
      return false;
    }
    return true;
  }
  render() {
    const { homeInfo, newGuideStep } = store;
    return (
      <div className="homePagebox">
        <div className="homepage">
          <span className="title"></span>
          <div className="leftName"></div>
          <SvgaPlayer src={`${RES_PATH}svga/标题与人物.svga`} className='title-person'></SvgaPlayer>
          <div className="rightName"></div>
         
          {/* 开始游戏按钮 */}
          <SvgaPlayer className="startga" src={`${RES_PATH}svga/开始游戏.svga`} onClick={_throttle(() => { if (this.judgeEndTime()) { store.changePage('Mappage') } })} />
          <IndexBtn />
        </div>
        {/* 首页的新手引导 */}
        {newGuideStep?.alreadyGuideSteps == 1 && <NewGuide1 judgeEndTime={this.judgeEndTime}></NewGuide1>}
      </div>
    );
  }
}
export default HomePage;
