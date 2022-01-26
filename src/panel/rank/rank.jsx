'use strict';

import React from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '@src/store/modal';
import API from '../../api';
import { USER_AVATAR, USER_NAME } from '@src/utils/constants.js';
import './rank.less';
import { SvgaPlayer } from "@spark/animation";
import { _throttle } from '@src/utils/utils.js';

@observer
class Rank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rankDetail: {}
    }
  }

  componentDidMount() {
    this.getRankList()
    if(document.getElementById("overlay_layer")) {
      document.getElementById("overlay_layer").style.display = 'none';
    }
  }

  componentWillUnmount() {
    if(document.getElementById("overlay_layer")) {
      document.getElementById("overlay_layer").style.display = 'block';
    }
  }

  getRankList = async() => {
    const {success,data} = await API.getRank();
    if(success && data) {
      this.setState({
        rankDetail: data
      })
    }
  }

  clickInvite = _throttle(() => {
    modalStore.closePop("Rank")
    store.toInvite()
  })
  render() {
    const {rankDetail} = this.state;
    const {homeInfo} = store;

    return (
      <div className="rank">
        <span className="popupWindowBottom"></span>
        <div className="title-rank"></div>
        <SvgaPlayer className="snowAndIceAtmosphere" src={`${RES_PATH}svga/雪花.svga`}></SvgaPlayer>
        <span className="shutDown" onClick={() => modalStore.closePop("Rank")}></span>
        {/* 奖品区域 */}
        <div className="rank-prizeList">
          <p className="beforeInvitingFriends">将在2月23日0点开奖后发放至「我的奖品」</p>
          <div className="prizeListBox">
            {
              Boolean(rankDetail?.rankPrize?.length) && rankDetail.rankPrize.map((item,index)=> {
                return(
                  <div className="rankprizeItem" key={index}>
                    <div className="imgbox">
                      <img src={item.prizeImg} alt="" />
                    </div>
                    <p className="rankprizescore textover">第{item.rank}名</p>
                  </div>
                )
              })
            }
          </div>
        </div>

        {/* 排名区域 */}
        <div className="rank-rankList">
          {/* 我的排名 */}
          <div className="myrank">
            <p className="myrank-rank">{rankDetail?.myRank?.rankNum <= 500 ? rankDetail.myRank.rankNum : '1000+'}</p>
            <div className="rank-nickName">
              <img src={homeInfo?.avatar || USER_AVATAR} alt="" className="rank-avatar" />
              <p className="rank-name textover">{homeInfo?.nickName || USER_NAME}</p>
            </div>
            <p className="rank-score textover">{rankDetail?.myRank?.score || 0}</p>
          </div>
          {/* 排行榜的排名 */}
          <div className="rank-otherRank">
          {
            rankDetail?.rankList ? rankDetail.rankList.map((item,index)=> {
              return(
                <div className="myrank" key={index}>
                  <p className="myrank-rank">{item?.rankNum <= 500 ? item.rankNum : '1000+'}</p>
                  <div className="rank-nickName">
                    <img src={item?.avatar || USER_AVATAR} alt="" className="rank-avatar" />
                    <p className="rank-name textover">{item?.nickName || USER_NAME}</p>
                  </div>
                  <p className="rank-score textover">{item?.score || 0}</p>
                </div>
              )
            }) :
            <p className="nodata">暂无数据</p>
          }
          </div>
        </div>
        {/* 邀请 */}
        <div className="button3" onClick={this.clickInvite}>邀好友赢黄金</div>
      </div>
    );
  }
}
export default Rank;
