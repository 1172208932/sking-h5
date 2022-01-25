"use strict";

import React from "react";
import { RES_PATH } from "../../../sparkrc.js";
import { observer } from "mobx-react";
import store from "../../store/index";
import modalStore from "@src/store/modal";
import API from "../../api";
import "./inviteSuccess.less";

@observer
class InviteSuccess extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { homeInfo } = store;
    return (
      <div className="invitationSuccessful1">
        <div className="invitationSuccessful1-bg">
          <div className="me">
            <p className="xNumberFriendsWereInvited textover">
              成功邀请{homeInfo?.assistInfo?.assistNum}名好友
            </p>
            <p className="receivedXxxGold textover">
              获得{homeInfo?.assistInfo?.assistGoldNum}金币
            </p>
          </div>
          <span
            className="button2"
            onClick={() => modalStore.closePop("InviteSuccess")}
          ></span>
        </div>
        <span className="atmosphere"></span>
      </div>
    );
  }
}
export default InviteSuccess;
