'use strict';

import React from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '@src/store/modal';
import API from '../../api';
import './gameRemind.less';
import { _throttle } from '@src/utils/utils.js';

@observer
class GameRemind extends React.Component {
  constructor(props) {
    super(props);
  }
  clickStart = _throttle(() => {
    const {popData} = this.props;
    modalStore.closePop("GameRemind");
    store.startGame(popData.level);
  })
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
