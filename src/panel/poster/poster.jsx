"use strict";

import React from "react";
import { RES_PATH } from "../../../sparkrc.js";
import { observer } from "mobx-react";
import store from "../../store/index";
import modalStore from "@src/store/modal";
import API from "../../api";
import { _throttle } from "@src/utils/utils";
import { htmlShot } from "@spark/utils";
import "./poster.less";
import { USER_AVATAR } from "@src/utils/constants";
@observer
class Poster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posterImg: "",
      codeImg: "",
    };
    this.timeOutEvent = null;
  }

  async componentDidMount() {
    await this.getErCodeImg();
  }

  // 画图
  canvasDraw = async (codeImg) => {
    const { homeInfo } = store;
    const width = (this.canvasRef.width = 956);
    const height = (this.canvasRef.height = 607);
    const ctx = this.canvasRef.getContext("2d");
    const imgs = await Promise.all([
      await this.loadImg(
        "//yun.duiba.com.cn/aurora/assets/a28b65a0186ab89e87adbc9c99127a77c9f96962.png"
      ),
      await this.loadImg(homeInfo?.avatar || USER_AVATAR),
      await this.loadImg(codeImg),
    ]);
    ctx.drawImage(imgs[0], 0, 0, width, height);

    ctx.drawImage(imgs[2], 727, 420, 146, 146);

    ctx.font = "26px Arial";
    ctx.fillStyle = "#0d7bd8";
    ctx.fillText(`我正在和${homeInfo?.pvNum || 0}人一起冰雪跑酷`, 140, 380);

    const pat = ctx.createPattern(imgs[1], "repeat");
    ctx.fillStyle = pat;
    ctx.arc(82, 369, 35, 0, 2 * Math.PI);
    ctx.clip();
    ctx.drawImage(imgs[1], 47, 334, 70, 70);

    var image = new Image();  
    image.src = this.canvasRef.toDataURL("image/png");
    this.setState({
      posterImg: image.src
    })
    console.info(image)
  };

  loadImg = (src) => {
    return new Promise((res) => {
      const image = new Image();
      image.setAttribute('crossOrigin', 'anonymous');
      image.onload = () => res(image);
      image.src = src;
    });
  };

  // 获取二维码图片
  getErCodeImg = async () => {
    const { success, data } = await API.getCode({
      shareCode: store.inviteCode,
    });
    if (success) {
      this.setState({
        codeImg: data.imageUrl,
      });
      this.canvasDraw(data.imageUrl);
    }
  };

  // convertCanvasToImage(canvas) {
  //   var image = new Image();
  //   image.src = canvas.toDataURL("image/png");
  //   return image;
  // }

  render() {
    const { posterImg, codeImg } = this.state;
    const { homeInfo } = store;
    return (
      <div className="posterpage">
        {/* <div className="poster" ref={(el) => (this.poster = el)}>
          <div className="userInfo-poster">
            <img
              src={homeInfo?.avatar || USER_AVATAR}
              alt=""
              className="avatar"
            />
            <p className="haveperson">
              我正在和{homeInfo?.pvNum || 0}人一起冰雪跑酷
            </p>
          </div>
          <img src={codeImg} alt="" className="codeBox"/>
        </div> */}
        <canvas
          className="posterpage-img"
          ref={(el) => (this.canvasRef = el)}
        ></canvas>
        {/* 二维码图片 */}
        <img src={codeImg} className="codeImg"/>
        <img src={posterImg} alt="" className="posterImg" />
        <div
          className="back-poster"
          onClick={() => modalStore.closePop("Poster")}
        ></div>
        <p className="longpress-text">长按保存邀请海报</p>
      </div>
    );
  }
}
export default Poster;
