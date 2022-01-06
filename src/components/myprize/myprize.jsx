'use strict';

import React from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '@src/store/modal';
import API from '../../api';
import './myprize.less';

@observer
class Myprize extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="myprize">
        <span className="popoverBaseplate3"></span>
        <span className="shutDown"></span>
        <span className="me"></span>
        <div className="layer1">
          <span className="rectangular2139"></span>
          <span className="rectangular1730"></span>
          <span className="namePrize">奖品名称</span>
          <span className="layer20214">2021.4.17</span>
        </div>
        <span className="iceAndSnowAtmosphere2"></span>
      </div>
    );
  }
}
export default Myprize;
