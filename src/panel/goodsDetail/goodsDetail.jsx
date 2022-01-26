'use strict';

import React from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '@src/store/modal';
import './GoodsDetail.less';
import { _throttle } from '@src/utils/utils.js';
import API from '../../api';
import { USER_AVATAR, USER_NAME } from '@src/utils/constants.js';

@observer
class GoodsDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const {popData} = this.props;
    console.log(popData?.goodDesc)
    return (
      <div className="goodsDetail">
        <div className="content">
          <div className="imgbox">
            <img src={popData?.img} alt="" />
          </div>
          <div className="goodtext" dangerouslySetInnerHTML={{ __html: popData?.goodDesc}}></div>
        </div>
        <div className="close" onClick={() => modalStore.closePop("GoodsDetail")}></div>
      </div>
    );
  }
}
export default GoodsDetail;
