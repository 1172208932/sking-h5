'use strict';

import React from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '@src/store/modal';
import './assistSuccess.less';
import { _throttle } from '@src/utils/utils.js';

@observer
class AssistSuccess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="assistSuccess">
        <div className="snowAndIceAtmosphere">
        </div>
        <div className="content">
          <div className="btn" onClick={() => modalStore.closePop("AssistSuccess")}></div>
          {/* <div className="close" onClick={() => modalStore.closePop("AssistSuccess")}></div> */}
        </div>
      
      </div>
    );
  }
}
export default AssistSuccess;
