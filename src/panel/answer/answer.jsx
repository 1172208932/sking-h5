"use strict";

import React from "react";
import { RES_PATH } from "../../../sparkrc.js";
import { observer } from "mobx-react";
import store from "../../store/index";
import modalStore from "@src/store/modal";
import API from "../../api";
import "./answer.less";
import { _throttle } from "@src/utils/utils.js";

@observer
class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startId: null,
      answerDetail: null,
      rightIndex: null, // 正确项的索引
      chooseIndex: null, // 选择的索引
    };
  }

  async componentDidMount() {
    this.getAnswer();
  }



  // 获取题目列表
  getAnswer = async () => {
    const { popData: {startId} } = this.props;
    const { success, data } = await API.answerQuery({ startId });
    if (success && data) {
      this.setState({
        answerDetail: data,
      });
    }
  };

  clickChoose = _throttle(async (index) => {
    const { popData: {startId} } = this.props;
    const { success, data } = await API.answerSubmit({
      startId,
      answer: index + 1,
    });
    if (success) {
      this.setState({
        chooseIndex: index,
        rightIndex: data?.answer?.correctAnswers?.[0] - 1,
      });
    }
  });

  // 完成答题
  completeAnswer = async() => {
    const { startId } = this.state;
    const {success,data} = await API.answerComplete(startId);
    if(success && data) {
     // data.extra是新的startID  TODO进入游戏页
    }
  };
  render() {
    const { answerDetail, chooseIndex, rightIndex } = this.state;
    const isRight = chooseIndex == rightIndex;
    return (
      <div className="iDidntChoose1">
        <span className="popupWindowBottom"></span>
        <p className="title textover2">{answerDetail?.content}</p>
        <div className="answerlist">
          {Boolean(answerDetail?.answers?.length) &&
            answerDetail.answers.map((item, index) => {
              return (
                <div
                  className={`answeritem ${
                    index == chooseIndex ? isRight ? "rightBg" : "errorBg" : ""
                  } ${
                    index == rightIndex && !isRight && "rightBg"
                  }`}
                  key={index}
                  onClick={() => this.clickChoose(index)}
                >
                  <p className="answertitle textover">{item}</p>
                  <div className="rightIcon">
                    {index == rightIndex && <p className="right"></p>}
                    {index == chooseIndex && !isRight && <p className="wrong"></p>}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
export default Answer;
