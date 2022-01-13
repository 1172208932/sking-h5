'use strict';

import React from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '@src/store/modal';
import API from '../../api';
import './rockPrize.less';

@observer
class RockPrize extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prizeList: null
    }
  }

  componentDidMount() {
    this.getRockPrizeList()
  }

  getRockPrizeList = async() => {
    const {success,data} = await API.rockQuery()
    if(success&&data?.options?.length) {
      this.setState({
        prizeList: data.options
      })
    }
  }
  render() {
    const {prizeList} = this.state
    return (
      <div className="fullStarDraw1">
        <span className="snowAndIceAtmosphere"></span>
        <span className="ribbon"></span>
        <span className="light"></span>
        <span className="title"></span>
        <div className="rockBox">
          <div className="rock">
            {
              [1,2,3].map((item)=> {
                return(
                  <div className="item" key={item}>
                     <ul className="roller">
                      {prizeList
                        ? prizeList.map((items, indexs) => {
                            return (
                              <li key={indexs + "s"}>
                                <div className="img-box">
                                  <img
                                    className="img-icon"
                                    src={items.optionImg}
                                    // src="//yun.duiba.com.cn/spark/assets/mao.ba0bbe8ce49749557114d3c7f2221d5a9182358b.png"
                                    alt=""
                                  />
                                </div>
                              </li>
                            );
                          })
                        : null}
                    </ul>
                  </div>
                )
              })
            }
          </div>
        </div>
        <span className="highlightPoints"></span>
      </div>
    );
  }
}
export default RockPrize;
