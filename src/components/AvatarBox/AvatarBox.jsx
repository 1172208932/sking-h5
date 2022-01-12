'use strict';

import React from 'react';
import { observer } from 'mobx-react';
import store from '../../store/index';
import {USER_AVATAR} from "../../utils/constants"

import "./AvatarBox.less"
@observer
class AvatarBox extends React.Component {
  render() {
    const {homeInfo} = store;
    return (
      <div className="picture2">
        <img className="picture3" src={homeInfo?.avatar || USER_AVATAR}/>
        <span className="currentScore">当前分数</span>
        <span className="layer34173 textover">{homeInfo?.rankScore||0}</span>
      </div>
    )
  }
}

export default AvatarBox