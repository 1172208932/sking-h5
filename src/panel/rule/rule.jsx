'use strict';

import React from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '@src/store/modal';
import API from '../../api';
import './rule.less';

@observer
class Rule extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="rule">
        <span className="popoverBaseplate5"></span>
        <p className="close" onClick={()=>modalStore.closePop("Rule")}></p>
        <article className="ruleInfo" dangerouslySetInnerHTML={{ __html: store.ruleInfo }}></article>
        <span className="snowAndIceAtmosphere4"></span>
      </div>
    );
  }
}
export default Rule;
