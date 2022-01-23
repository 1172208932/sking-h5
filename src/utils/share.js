import {
  start,
  updateShare,
  callShare,
  Weixin,
} from "@spark/share"
import { ensureDomain, getDomain, domain } from "@spark/dbdomain";


/**
 * @description: 小程序跳转
 * @param {*} 
 * @return {*}
 */
export const miniGoUrl = (url) => {
  wx.miniProgram.navigateTo({ url: url });
}
/**
 * 判断是否为ios系统
 */
export function isIos() {
  return navigator.userAgent.match(/iphone|ipod|ipad/gi)
}

/** 判断微信环境 */
export function isWeChat() {
  var ua = window.navigator.userAgent.toLowerCase()
  return ua.match(/MicroMessenger/i) == 'micromessenger'
}
/**
 * 初始化分享
 */
 export async function onInitShare(cb) {
  await start([Weixin], function (success) {
      console.log("share result:----", success)
      cb && cb()
  })
}
/**
 * 更新分享
 * @param {*} shareParams 
 * @param {*} justUpdate 
 */
 export function onUpdateShare(shareParams) {
  console.info("更新分享", shareParams)
  updateShare(shareParams)
}
/**
 * 被动分享 - 北京银行
 * @param {*} shareParams 
 */
 export function onCallShare(shareParams) {
  console.info("分享链接", shareParams)
  callShare(shareParams);
}
/**
 * @description: 分享处理中心
 * @param {Object} 分享信息
 */
 export const requireShare = (opts) => {
  var shareData = {
    title: opts.shareTitle,
    content: opts.shareContent,
    url: opts.shareUrl,
    images: [{ image: opts.shareThumbnail, type: "url" }],
  };
  console.log('分享数据', opts);
  var shareStr = JSON.stringify(shareData);
  return shareStr;
};
/**
 * @description: 小程序分享
 * @param {*} 
 * @return {*}
 */
export const miniDoShare = (opts) => {
  console.log(opts);
  wx.miniProgram.postMessage({
    data: {
      title: opts.title, // 标题
      desc: opts.desc, // 描述
      imgUrl: opts.imgUrl, // 图片
      link: opts.link // 链接
    }
  });
}

export const shareWXmini = (code) => {
  console.info("执行了分享",CFG.shareUrl + '&inviteCode='+ code)
  // 微信小程序，加上也没用，不加了
  // await ensureDomain();
  // let ori = domain || location.origin;
  wx.miniProgram.postMessage({
    data: {
      title: "这个滑雪游戏好好玩，还可以冲关夺黄金", // 标题
      desc: "这个滑雪游戏好好玩，还可以冲关夺黄金", // 描述
      imgUrl: "https://yun.duiba.com.cn/aurora/assets/64eea9a7869761a9c37aa3f350cc7c3ad2ac5278.jpg", // 图片
      link: CFG.shareUrl + '&inviteCode='+ code, // 链接
    }
  });
  console.info("执行了分享之后")
}
