"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isIos = isIos;
exports.isWeChat = isWeChat;
exports.onInitShare = onInitShare;
exports.onUpdateShare = onUpdateShare;
exports.onCallShare = onCallShare;
exports.shareWXmini = exports.miniDoShare = exports.requireShare = exports.miniGoUrl = void 0;

var _share = require("@spark/share");

var _dbdomain = require("@spark/dbdomain");

/**
 * @description: 小程序跳转
 * @param {*} 
 * @return {*}
 */
var miniGoUrl = function miniGoUrl(url) {
  wx.miniProgram.navigateTo({
    url: url
  });
};
/**
 * 判断是否为ios系统
 */


exports.miniGoUrl = miniGoUrl;

function isIos() {
  return navigator.userAgent.match(/iphone|ipod|ipad/gi);
}
/** 判断微信环境 */


function isWeChat() {
  var ua = window.navigator.userAgent.toLowerCase();
  return ua.match(/MicroMessenger/i) == 'micromessenger';
}
/**
 * 初始化分享
 */


function onInitShare(cb) {
  return regeneratorRuntime.async(function onInitShare$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _share.start)([_share.Weixin], function (success) {
            console.log("share result:----", success);
            cb && cb();
          }));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
}
/**
 * 更新分享
 * @param {*} shareParams 
 * @param {*} justUpdate 
 */


function onUpdateShare(shareParams) {
  console.info("更新分享", shareParams);
  (0, _share.updateShare)(shareParams);
}
/**
 * 被动分享 - 北京银行
 * @param {*} shareParams 
 */


function onCallShare(shareParams) {
  console.info("分享链接", shareParams);
  (0, _share.callShare)(shareParams);
}
/**
 * @description: 分享处理中心
 * @param {Object} 分享信息
 */


var requireShare = function requireShare(opts) {
  var shareData = {
    title: opts.shareTitle,
    content: opts.shareContent,
    url: opts.shareUrl,
    images: [{
      image: opts.shareThumbnail,
      type: "url"
    }]
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


exports.requireShare = requireShare;

var miniDoShare = function miniDoShare(opts) {
  console.log(opts);
  wx.miniProgram.postMessage({
    data: {
      title: opts.title,
      // 标题
      desc: opts.desc,
      // 描述
      imgUrl: opts.imgUrl,
      // 图片
      link: opts.link // 链接

    }
  });
};

exports.miniDoShare = miniDoShare;

var shareWXmini = function shareWXmini(code) {
  console.info("执行了分享", CFG.shareUrl + '&inviteCode=' + code); // 微信小程序，加上也没用，不加了
  // await ensureDomain();
  // let ori = domain || location.origin;

  wx.miniProgram.postMessage({
    data: {
      title: "这个滑雪游戏好好玩，还可以冲关夺黄金",
      // 标题
      desc: "这个滑雪游戏好好玩，还可以冲关夺黄金",
      // 描述
      imgUrl: "https://yun.duiba.com.cn/aurora/assets/c8fcffbdb1eb3576452060d18af6ff9f9760e382.jpg",
      // 图片
      link: CFG.shareUrl + '&inviteCode=' + code // 链接

    }
  });
  console.info("执行了分享之后");
};

exports.shareWXmini = shareWXmini;