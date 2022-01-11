'use strict';

import React from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '@src/store/modal';
import API from '../../api';
import './mappage.less';

@observer
class Mappage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mappage">
        {/* 背景 */}
        <div className='mapBgbox'>
          <span className="mapBgimg1"></span>
          <span className="mapBgimg2"></span>
        </div>
        <div className="levelbox">
          <div className="alreadylevel">
            <div className="startlist">
              <span className="startitem1"></span>
              <span className="startitem2"></span>
              <span className="startitem3"></span>
            </div>
            <div className="nostartlist">
              <span className="nostart1"></span>
              <span className="nostart2"></span>
              <span className="nostart3"></span>
            </div>
            <span className="levelbg"></span>
            <div className="levelnumbox">
              <span className="level_1"></span>
              <span className="level_2"></span>
              <span className="level_3"></span>
              <span className="level_4"></span>
              <span className="level_5"></span>
              <span className="level_6"></span>
              <span className="level_7"></span>
              <span className="level_8"></span>
              <span className="level_9"></span>
              <span className="level_0"></span>
            </div>
          </div>
          <div className="nextedlevel">
            <span className="nextedbg"></span>
            <span className="nextedtest">0</span>
          </div>
          <div className="forwardlevel">
            <span className="forwardicon"></span>
          </div>
        </div>
        <div className="gifticonbox">
          <span className="gift2"></span>
          <span className="gift1"></span>
          <span className="gift3"></span>
          <span className="gift4"></span>
          <span className="gift5"></span>
          <span className="gift6"></span>
          <span className="gift7"></span>
          <span className="gift8"></span>
          <span className="gift9"></span>
        </div>
        <div className="giftbox">
          <span className="giftboximg"></span>
          <div className="giftlist">
            <span className="giftlistbg"></span>
            <span className="gitlistimgbg"></span>
            <span className="giftlisttext1">第1-50名</span>
            <span className="giftlisttext2">第51-100名</span>
            <span className="giftlisttext3">第101-500名</span>
          </div>
          <span className="giftboxtitle"></span>
          <span className="opengiftbtn"></span>
          <span className="getgiftbtn"></span>
          <span className="giftboxpoint"></span>
        </div>
        <div className="btnbox">
          <div className="delcoinbox">
            <span className="iconbg"></span>
            <span className="icon"></span>
            <div className="numbox">
              <span className="_1"></span>
              <span className="_2"></span>
              <span className="_3"></span>
              <span className="_4"></span>
              <span className="_5"></span>
              <span className="_6"></span>
              <span className="_7"></span>
              <span className="_8"></span>
              <span className="_9"></span>
              <span className="_0"></span>
            </div>
            <span className="sub"></span>
          </div>
          {/* 返回首页按钮 */}
          <span className="backbtn" onClick={() => { store.changePage('homePage') }}></span>
          <div className="topheadbox">
            <span className="topheadbg"></span>
            <span className="topheadimg"></span>
            <span className="topheadtext2">当前分数</span>
            <span className="topheadtext1">34173456</span>
          </div>
          <div className="topiconbox">
            <span className="topiconbg"></span>
            <span className="topiconadd"></span>
            <span className="topiconimg"></span>
            <span className="topicontext">3418</span>
          </div>
          <div className="tipbox">
            <span className="tipbg"></span>
            <span className="tiptext">有123456位用户与你一起闯关</span>
          </div>
          <span className="closebtn"></span>


        </div>
        <div className="headiconbox">
          <span className="headboxbottombg"></span>
          <span className="headboxbottomimg"></span>
        </div>

      </div>
    );
  }
}

export default Mappage;
