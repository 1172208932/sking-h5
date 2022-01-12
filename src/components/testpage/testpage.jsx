'use strict';

import React from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '@src/store/modal';
import API from '../../api';
import './testpage.less';

@observer
class Testpage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="testpage">
        <span className="background"></span>
        <div className="level1">
          <span className="level1_1"></span>
          <span className="level2"></span>
          <div className="layer09Numbers">
            <span className="layer1"></span>
            <span className="layer2"></span>
            <span className="layer3"></span>
            <span className="layer4"></span>
            <span className="layer5"></span>
            <span className="layer6"></span>
            <span className="layer7"></span>
            <span className="layer8"></span>
            <span className="layer9"></span>
            <span className="layer0"></span>
          </div>
          <span className="level3"></span>
          <span className="level4"></span>
          <span className="level5"></span>
          <span className="level6"></span>
          <span className="level7"></span>
          <span className="gate8"></span>
          <span className="level9"></span>
          <span className="level10"></span>
          <span className="box1"></span>
          <span className="level11"></span>
          <span className="gate12"></span>
          <span className="level13"></span>
          <span className="level14"></span>
          <span className="level15"></span>
          <span className="level16"></span>
          <span className="level17"></span>
          <span className="level18"></span>
          <span className="levels19"></span>
          <span className="_20"></span>
          <span className="box2"></span>
          <span className="levels21"></span>
          <span className="levels22"></span>
          <span className="levels23"></span>
          <span className="gate24"></span>
          <span className="levels25"></span>
          <span className="levels26"></span>
          <span className="levels27"></span>
          <span className="levels28"></span>
          <span className="levels29"></span>
          <span className="unlockedLevels"></span>
          <span className="levels97"></span>
          <span className="levels98"></span>
          <span className="levels99"></span>
          <span className="levels100"></span>
          <span className="box3"></span>
          <span className="box4"></span>
          <span className="box5"></span>
          <span className="giftBox6"></span>
          <span className="box7"></span>
          <span className="box8"></span>
          <span className="giftBox9"></span>
        </div>
      </div>
    );
  }
}
export default Testpage;
