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

export const USER_AVATAR = "https://yun.duiba.com.cn/aurora/assets/65892f1a1fb9bde97f06acf79c64f8d966dc2ae2.png"
export const USER_NAME = "牛蒙蒙";


/**
 * 地图坐标
 * 1-5关自定义left,top
 * 6-109一样的top
 * 6,11same top, 7,12same,8-13,9,14,10-15
 * 6-11, 7-12等都left相差7.84
 */
export const MapPosition = [
  {
    left: '0rem',
    top: '0.3rem',
    level: 1,
  },{
    left: '1.52rem',
    top: '0.46rem',
    level: 2,
  },{
    left: '2.73rem',
    top: '1.2rem',
    level: 3,

  },{
    left: '4.01rem',
    top: '2.04rem',
    level: 4,

  },{
    left: '5.44rem',
    top: '2.04rem',
    level: 5,
  },
  
  {
    left: '6.69rem',
    top: '1.19rem',
    level: 6,
  },{
    left: '7.94rem',
    top: '0.34rem',
    level: 7,
  },{
    left: '9.44rem',
    top: '0.34rem',
    level: 8,
  },{
    left: '10.69rem',
    top: '1.16rem',
    level: 9,
  },{
    left: '11.84rem',
    top: '2.04rem',
    level: 10,
  },
  {
    left: '13.36rem',
    top: '1.82rem',
    level: '10_gift',
  },
  
  {
    left: '14.53rem',
    top: '1.19rem',
    level: 11,
  },{
    left: '15.78rem',
    top: '0.34rem',
    level: 12,
  },{
    left: '17.28rem',
    top: '0.34rem',
    level: 13,
  },{
    left: '18.53rem',
    top: '1.16rem',
    level: 14,
  },{
    left: '19.78rem',
    top: '2.04rem',
    level: 15,
  },{
    left: '21.22rem',
    top: '2.04rem',
    level: 16,
  },{
    left: '22.47rem',
    top: '1.19rem',
    level: 17,
  },{
    left: '23.72rem',
    top: '0.34rem',
    level: 18,
  },{
    left: '25.22rem',
    top: '0.34rem',
    level: 19,
  },{
    left: '26.47rem',
    top: '1.16rem',
    level: 20,
  },{
    left: '27.55rem',
    top: '1.81rem',
    level: '20_gift',
  },{
    left: '29.16rem',
    top: '2.04rem',
    level: 21,
  },{
    left: '30.5rem',
    top: '1.18rem',
    level: 22,
  },{
    left: '31.76rem',
    top: '0.34rem',
    level: 23,
  },{
    left: '33.26rem',
    top: '0.33rem',
    level: 24,
  },{
    left: '34.41rem',
    top: '1.16rem',
    level: 25,
  },{
    left: '35.66rem',
    top: '2.04rem',
    level: 26,
  },{
    left: '37.11rem',
    top: '2.04rem',
    level: 27,
  },{
    left: '38.36rem',
    top: '1.19rem',
    level: 28,
  },{
    left: '39.61rem',
    top: '0.34rem',
    level: 29,
  },{
    left: '41.24rem',
    top: '0.34rem',
    level: 30,
  },{
    left: '42.54rem',
    top: '0.9rem',
    level: '30_gift',
  },
]
