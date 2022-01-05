/*
 * @Author: super
 * @Date: 2021-01-20 14:08:27
 * @LastEditTime: 2021-01-20 14:53:39
 * @LastEditors: super
 * @Description: 
 */
// 弹窗优先级 可以是负数， 不写默认是10， 数值越小，层级越高
export const MODAL_INDEX = {
  // rank: 1,
  // task: 1
  lastgain: 1,
  auth: 2,
  assit: 3,
  rankprize: 4,
  // sucwalk: 1
  // taskfinish: 1
};
export function ERROR_MESSSAGE(errorCode) {
  let message = "";
  switch (errorCode) {
    // case 999101:
    //   message = "登录已过期";
    //   break;
    case 999002:
      message = "活动已结束";
    break;
    case 500021:
      message = "没有昨日线下步数";
      break;
    case 500022:
      message = "已经领取过了";
      break;
    default:
      message = "";
      break;
  }
  return message;
}
