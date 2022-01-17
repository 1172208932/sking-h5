"use strict";

import React from "react";
import { RES_PATH } from "../../../sparkrc.js";
import { observer } from "mobx-react";
import store from "../../store/index";
import modalStore from "@src/store/modal";
import API from "../../api";
import "./answer.less";
import { SvgaPlayer } from "@spark/animation";
import { _throttle } from "@src/utils/utils.js";

@observer
class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerDetail: null,
      rightIndex: -1, // 正确项的索引-1
      chooseIndex: -1, // 选择的索引-1
    };
  }

  async componentDidMount() {
    this.getAnswer();
  }

  // 获取题目列表
  getAnswer = async () => {
    const {
      popData: { startId },
    } = this.props;
    const { success, data } = await API.answerQuery({ startId });
    if (success && data) {
      this.setState({
        answerDetail: data,
      });
    }
  };

  clickChoose = _throttle(async (index) => {
    const {
      popData: { startId },
    } = this.props;
    const { success, data } = await API.answerSubmit({
      startId,
      answer: index + 1,
    });
    console.log(this.props)
    await this.completeAnswer(index, data?.answer?.correctAnswers?.[0] - 1);
    if (success) {
      this.setState({
        chooseIndex: index,
        rightIndex: data?.answer?.correctAnswers?.[0] - 1,
      });
    }
  });

  // 完成答题
  completeAnswer = async (chooseIndex, rightIndex) => {
    const {
      popData,
    } = this.props;
    const { success, data } = await API.answerComplete({ startId: popData?.startId });
    if (success && data) {
    //   // data.extra是新的startID
      if (chooseIndex != rightIndex) {
        //  打错
        this.answerFail()
      } else {
    //     // 答对，开始下一句
        store.setStartId(data.extra);
      }
    }
  };

  answerFail = () => {
    // 答题失败
    const { popData } = this.props;
    setTimeout(() => {
      // 清除
      popData.removeGame();
      // 清除startId
      store.setStartId(null);
      modalStore.closePop("Answer");
      store.changePage("Mappage");
    }, 2000);
  };

  svgaEnd = async () => {
    console.log("end");
    // 复活进入游戏页
    const { popData } = this.props;
    modalStore.closePop("Answer");
    await popData.removeGame();
    popData.canvasUI();
  };
  render() {
    const { answerDetail, chooseIndex, rightIndex } = this.state;
    const isRight = chooseIndex == rightIndex;
    return (
      <div className="iDidntChoose1">
        {/* 头部 */}
        {chooseIndex >= 0 && (
          <div className="topAvatar">
            {isRight ? (
              <SvgaPlayer
                className="avatar-svga"
                src={`${RES_PATH}svga/女生和牛.svga`}
              ></SvgaPlayer>
            ) : (
              <div className="avatar-fail"></div>
            )}
          </div>
        )}
        <span className="popupWindowBottom"></span>
        <p className="title textover2">{answerDetail?.content}</p>
        <div className="answerlist">
          {Boolean(answerDetail?.answers?.length) &&
            answerDetail.answers.map((item, index) => {
              return (
                <div
                  className={`answeritem ${
                    index == chooseIndex
                      ? isRight
                        ? "rightBg"
                        : "errorBg"
                      : ""
                  } ${index == rightIndex && !isRight && "rightBg"}`}
                  key={index}
                  onClick={() => this.clickChoose(index)}
                >
                  <p className="answertitle textover">{item}</p>
                  <div className="rightIcon">
                    {index == rightIndex && <p className="right"></p>}
                    {index == chooseIndex && !isRight && (
                      <p className="wrong"></p>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
        {/* 答题成功/失败 */}
        {chooseIndex >= 0 && (
          <div className="answer-result">
            {isRight ? (
              <SvgaPlayer
                className="answer-ok-svga"
                src={`${RES_PATH}svga/答题成功.svga`}
                loop={1}
                endFrame={100}
                onEnd={this.svgaEnd}
              ></SvgaPlayer>
            ) : (
              <div className="answer-fail-png">
                <div className="fail"></div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
export default Answer;
