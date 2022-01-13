'use strict';

import React from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '@src/store/modal';
import API from '../../api';
import './toInvite.less';

@observer
class ToInvite extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="unlockPopover1">
        <span className="bg"></span>
        <span className="shutDown" onClick={() => modalStore.closePop("ToInvite")}></span>
        {/* TODO */}
        <span className="button"></span>
      </div>
    );
  }
}
export default ToInvite;
