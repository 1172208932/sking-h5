"use strict";

import React from "react";
import { RES_PATH } from "../../../sparkrc.js";
import { observer } from "mobx-react";
import store from "../../store/index";
import modalStore from "@src/store/modal";
import API from "../../api";
import { showLoading,hideLoading, Toast } from "@spark/ui";
import "./task.less";
import { _throttle } from "@src/utils/utils.js";
import { SvgaPlayer } from "@spark/animation";

@observer
class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signPrizeConfig: null,
      signDetail: null,
      totalInviteCount: 0,
    };
  }

  componentDidMount() {
    this.getSignPrizeList();
    this.getSignDetail();
    this.queryInviteNum();
  }

  // 查询签到奖品配置
  getSignPrizeList = async () => {
    const { success, data } = await API.signOptions();
    if (success && data?.length) {
      this.setState({
        signPrizeConfig: data,
      });
    }
  };

  // 用户签到详情
  getSignDetail = async () => {
    const { success, data } = await API.signQuery();
    if (success && data) {
      this.setState({
        signDetail: data,
      });
    }
  };

  // 点击签到
  clickSign = _throttle((index) => {
    const { signDetail } = this.state;
    if(signDetail?.todaySign) return false;
    if(index == signDetail?.signDay) {
      this.toSign()
    }
  })

  // 查询已邀请人数
  queryInviteNum = async() => {
    const {success,data} = await API.inviteRecord({
      pageNum: 1,
      pageSize: 10,
      queryIntervalType: 1,//1=当日、4=永久
    })
    if(success) {
      this.setState({
        totalInviteCount: data?.totalCount
      })
    }
  }

  clickInvite = _throttle(() => {
    modalStore.closePop("Task")
    store.toInvite()
  })

  clickSignBtn = _throttle(() => {
    const { signDetail } = this.state;
    if(signDetail?.todaySign) return false;
    this.toSign()
  })

  toSign = async() => {
    showLoading()
    const {success, data} = await API.doSign();
    hideLoading()
    if(success) {
      Toast(`签到成功，金币+${data?.options?.[0]?.sendCount || 0}`)
      this.getSignDetail();
      store.getHomeInfo();
    }
  }
  render() {
    const {homeInfo} = store;
    const { signPrizeConfig, signDetail, totalInviteCount } = this.state;
    return (
      <div className="taskPopup1">
        <span className="snowAndIceAtmosphere"></span>
        <div className="popupWindowBottom">
          {/* 签到 */}
          <div className="signBox">
            <div className="signBox-line"></div>
            <div className="signItemBox">
              {signPrizeConfig &&
                signPrizeConfig.map((item, index) => {
                  return (
                    <div className="signitem" key={index}>
                      <div
                        className={`signitem-btn ${
                          index < signDetail?.signDay ? "signover" : ""
                        }`}
                      >
                        {index < signDetail?.signDay ? (
                          <p className="rightIcon"></p>
                        ) : (
                          <p className="textover">
                            +{item?.options[0]?.sendCount || 0}
                          </p>
                        )}
                      </div>
                      <p className="signitem-day textover">{index + 1}日</p>
                      {/* {index == signDetail?.signDay && !signDetail?.todaySign && <SvgaPlayer
                        className="gesturesAperture"
                        src={`${RES_PATH}svga/手势单击.svga`}
                      />} */}
                    </div>
                  );
                })}
            </div>
            <div className={`signBtn ${signDetail?.todaySign ? 'signdidbtn': 'nosignbtn'}`} onClick={this.clickSignBtn}></div>
          </div>
          {/* 邀请 */}
          <div className="inviteBox">
            <img src={RES_PATH+"任务弹窗1/avatar.png"} alt="" className="avatar-invite" />
            <div className="centerInfo-invite">
              <p className="title textover">邀请好友（{totalInviteCount}/10)</p>
              <p className="subTitle textover">邀请新用户一起玩可得{homeInfo?.inviteGolds}金币</p>
            </div>
            {/* 去邀请 */}
            <div className="inviteBtn" onClick={this.clickInvite}></div>
          </div>
        </div>
        <span className="shutDown" onClick={() => modalStore.closePop("Task")}></span>
      </div>
    );
  }
}
export default Task;
