const listExchangeLimit = {
  success: true,
  data: {
    todayResult: {
      limitType: 1,
      exchangeLimitCount: 2,
      conditions: [
        {
          gear: 1,
          consumeSps: [
            {
              spId: "sp_1",
              quantity: 1,
              spName: "道具名称",
              spImg:
                "http://yun.duiba.com.cn/polaris/丝倍亮小型犬幼年年期全价犬粮7.5kg.c27e9ef4b4d418e8a90faa76798e20cb4f18a490.jpg",
            },
          ],
          options: [
            {
              ruleId: "ru_1",
              optionId: "123",
              optionName: "狗粮狗粮狗粮狗粮狗粮狗粮狗粮狗粮狗粮狗粮狗粮狗粮狗粮狗粮狗粮狗粮",
              optionStock: 10,
              optionImg:
                "http://yun.duiba.com.cn/polaris/丝倍亮小型犬幼年年期全价犬粮7.5kg.c27e9ef4b4d418e8a90faa76798e20cb4f18a490.jpg",
              prizeId: "123",
              prizeType: 1,
              userLimitCount: 1,
            },
          ],
        },
        {
          gear: 2,
          consumeSps: [
            {
              spId: "sp_1",
              quantity: 48376,
              spName: "道具名称",
              spImg:
                "http://yun.duiba.com.cn/polaris/丝倍亮小型犬幼年年期全价犬粮7.5kg.c27e9ef4b4d418e8a90faa76798e20cb4f18a490.jpg",
            },
          ],
          options: [
            {
              ruleId: "ru_1",
              optionId: "123",
              optionName:
                "狗粮狗粮狗粮狗粮狗粮狗粮狗粮狗粮狗粮狗粮狗粮狗粮狗粮狗粮狗粮狗粮狗粮狗粮狗粮狗粮狗粮狗粮",
              optionStock: 1,
              optionImg:
                "http://yun.duiba.com.cn/polaris/丝倍亮小型犬幼年年期全价犬粮7.5kg.c27e9ef4b4d418e8a90faa76798e20cb4f18a490.jpg",
              prizeId: "123",
              prizeType: 1,
              userLimitCount: 1,
            },
          ],
        },
        {
          gear: 3,
          consumeSps: [
            {
              spId: "sp_1",
              quantity: 48374,
              spName: "道具名称",
              spImg:
                "http://yun.duiba.com.cn/polaris/丝倍亮小型犬幼年年期全价犬粮7.5kg.c27e9ef4b4d418e8a90faa76798e20cb4f18a490.jpg",
            },
          ],
          options: [
            {
              ruleId: "ru_1",
              optionId: "123",
              optionName: "狗粮",
              optionStock: 1,
              optionImg:
                "http://yun.duiba.com.cn/polaris/丝倍亮小型犬幼年年期全价犬粮7.5kg.c27e9ef4b4d418e8a90faa76798e20cb4f18a490.jpg",
              prizeId: "123",
              prizeType: 1,
              userLimitCount: 1,
            },
          ],
        }, {
          gear: 1,
          consumeSps: [
            {
              spId: "sp_1",
              quantity: 10,
              spName: "道具名称",
              spImg:
                "http://yun.duiba.com.cn/polaris/丝倍亮小型犬幼年年期全价犬粮7.5kg.c27e9ef4b4d418e8a90faa76798e20cb4f18a490.jpg",
            },
          ],
          options: [
            {
              ruleId: "ru_1",
              optionId: "123",
              optionName: "狗粮",
              optionStock: 0,
              optionImg:
                "http://yun.duiba.com.cn/polaris/丝倍亮小型犬幼年年期全价犬粮7.5kg.c27e9ef4b4d418e8a90faa76798e20cb4f18a490.jpg",
              prizeId: "123",
              prizeType: 1,
              userLimitCount: 1,
            },
          ],
        },
      ],
    },
    tomorrowResult: {
      conditions: [
        {
          gear: 1,
          consumeSps: [
            {
              spId: "sp_1",
              quantity: 10000,
              spName: "道具名称",
              spImg:
                "http://yun.duiba.com.cn/polaris/丝倍亮小型犬幼年年期全价犬粮7.5kg.c27e9ef4b4d418e8a90faa76798e20cb4f18a490.jpg",
            },
          ],
          options: [
            {
              ruleId: "ru_1",
              optionId: "123",
              optionName: "狗粮",
              optionStock: 198198319831983198319831983198319833,
              optionImg:
                "http://yun.duiba.com.cn/polaris/丝倍亮小型犬幼年年期全价犬粮7.5kg.c27e9ef4b4d418e8a90faa76798e20cb4f18a490.jpg",
              prizeId: "123",
              prizeType: 1,
              userLimitCount: 1,
            },
          ],
        },
      ],
    },
  },
};

const doExchange = {
  success: true,
};

const getMyPrize = {
  data: [
    {
      extra: {
        name: "道具",
        icon: "//yun.dui88.com/images/201907/tua0um9jjp.jpg",
        refType: "coupon",
        refId: "49354",
        type: 1,
      },
      strategyId: 11,
      gmtCreate: 1565213353000,
      id: 331,
      prizeId: "g4c4c3edd",
    },
    {
      extra: {
        name: "2_优惠券-大转盘03",
        icon: "//yun.dui88.com/images/201907/tua0um9jjp.jpg",
        refType: "coupon",
        refId: "49354",
        type: 2,
      },
      strategyId: 11,
      gmtCreate: 1565213116000,
      id: 330,
      prizeId: "g0e432eeb",
    },
    {
      extra: {
        name: "3_异常福袋",
        icon: "//yun.dui88.com/images/201907/tua0um9jjp.jpg",
        refType: "coupon",
        refId: "49354",
        type: 1,
      },
      strategyId: 11,
      gmtCreate: 1565212826000,
      id: 329,
      prizeId: "g900c8442",
    },
    {
      extra: {
        name: "正常福袋",
        icon: "//yun.dui88.com/images/201907/tua0um9jjp.jpg",
        refType: "coupon",
        refId: "49354",
        type: 4,
      },
      gmtCreate: 1565205625000,
      id: 328,
      strategyId: 11,
      prizeId: "g4c7ba888",
    },
    {
      extra: {
        name: "优惠券-大转盘05",
        icon: "//yun.dui88.com/images/201907/tua0um9jjp.jpg",
        refType: "coupon",
        refId: "49354",
        type: 2,
      },
      strategyId: 11,
      gmtCreate: 1565203101000,
      id: 327,
      prizeId: "g900c8442",
    },
    {
      extra: {
        name: "优惠券-大转盘03",
        icon: "//yun.dui88.com/images/201907/tua0um9jjp.jpg",
        refType: "coupon",
        refId: "49354",
        type: 2,
      },
      strategyId: 11,
      gmtCreate: 1565203040000,
      id: 326,
      prizeId: "g0e432eeb",
    },
    {
      extra: {
        name: "优惠券-大转盘04",
        icon: "//yun.dui88.com/images/201907/tua0um9jjp.jpg",
        refType: "coupon",
        refId: "49354",
        type: 2,
      },
      gmtCreate: 1565197386000,
      id: 325,
      prizeId: "gc1a8c03c",
    },
    {
      extra: {
        name: "优惠券-大转盘02",
        icon: "//yun.dui88.com/images/201907/tua0um9jjp.jpg",
        refType: "coupon",
        refId: "49354",
        type: 2,
      },
      gmtCreate: 1565197080000,
      id: 324,
      strategyId: 11,
      prizeId: "g0e432eeb",
    },
  ],
  success: true,
};

const getRank = {
  message: "cillum dolor ad qui",
  data: {
    rankPrize: [
      {
        rank: "1-5000000",
        prizeName: "这是十多个风华绝代舒服的复古经典黑色",
        prizeImg:
          "//yun.duiba.com.cn/aurora/assets/683541868bd38fd6842e532c405a6e2b9fa775c9.png",
      },
      {
        rank: "50-15000000",
        prizeName: "这是十多个风华绝代舒服的复古经典黑色",
        prizeImg:
          "//yun.duiba.com.cn/aurora/assets/683541868bd38fd6842e532c405a6e2b9fa775c9.png",
      },
      {
        rank: "152-115000000",
        prizeName: "这是十多个风华绝代舒服的复古经典黑色",
        prizeImg:
          "//yun.duiba.com.cn/aurora/assets/683541868bd38fd6842e532c405a6e2b9fa775c9.png",
      },
    ],
    rankList: [
      {
        nickName: "小银杏大的会计核算",
        rankNum: 1,
        score: 45337,
        avatar:
          "//yun.duiba.com.cn/aurora/assets/a51a8f870e3031792ae2b27e435fca4abb79181d.png",
      },
      {
        nickName: "小银杏大的会计核算",
        rankNum: 1,
        score: 4537537,
        avatar:
          "//yun.duiba.com.cn/aurora/assets/a51a8f870e3031792ae2b27e435fca4abb79181d.png",
      },
      {
        nickName: "小银杏大的会计核算",
        rankNum: 1,
        score: 4537537,
        avatar:
          "//yun.duiba.com.cn/aurora/assets/a51a8f870e3031792ae2b27e435fca4abb79181d.png",
      },
      {
        nickName: "小银杏大的会计核算",
        rankNum: 1,
        score: 47,
        avatar:
          "//yun.duiba.com.cn/aurora/assets/a51a8f870e3031792ae2b27e435fca4abb79181d.png",
      },
      {
        nickName: "小银杏大的会计核算",
        rankNum: 1,
        score: 437,
        avatar:
          "//yun.duiba.com.cn/aurora/assets/a51a8f870e3031792ae2b27e435fca4abb79181d.png",
      },
      {
        nickName: "小银杏大的会计核算last",
        rankNum: 1,
        score: 7,
        avatar:
          "//yun.duiba.com.cn/aurora/assets/2f7fb2d7a5397ca10bed4574c2c8f37b3c362bf8.png",
      },
    ],
    myRank: {
      rankNum: 520,
      score: 43656357437743734,
    },
  },
  code: "ut dolore commodo id ad",
  success: true,
};

const turnTableDraw = {
  success: true,
  message: "11",
  data: {
    extra: 1,
    options: [
      {
        optionId: "sp_1",
        url: "http://www.baidu.com",
        optionName: "肯德基炸鸡圈",
        optionImg:
          "//yun.duiba.com.cn/aurora/assets/d8b6eaa9b0292dc53e5cbc15a8ff89e023e2d8aa.png",
      },
    ],
  },
};

const turnTableQuery = {
  code: null,
  data: {
    options: [
      {
        optionId: 'sp_1',
        optionImg: "//yun.duiba.com.cn/aurora/assets/aaabdca89f8b88c3648d9f3a33fde3a86bad459b.png",
        optionName: "抽奖奖品1111",
        prizeId: "11",
        prizeType: 1,
        url: "http://www.baidu.com",
      },
      {
        optionId: 'sp_2',
        optionImg: "//yun.duiba.com.cn/aurora/assets/a51a8f870e3031792ae2b27e435fca4abb79181d.png",
        optionName: "抽奖奖品1",
        prizeId: "sp_1",
        prizeType: 1,
        url: "http://www.baidu.com",
      }, {
        optionId: 'sp_3',
        optionImg: "//yun.duiba.com.cn/aurora/assets/2f7fb2d7a5397ca10bed4574c2c8f37b3c362bf8.png",
        optionName: "抽奖奖品2",
        prizeId: "sp_2",
        prizeType: 1,
        url: "http://www.baidu.com",
      }, {
        optionId: 'sp_4',
        optionImg: "//yun.duiba.com.cn/aurora/assets/9b89c69bf6115206c661d887938d0ceee5cc927f.png",
        optionName: "抽奖奖品3",
        prizeId: "sp_3",
        prizeType: 1,
        url: "http://www.baidu.com",
      }, {
        optionId: 'sp_5',
        optionImg: "//yun.duiba.com.cn/aurora/assets/2368d666b9c3caccc46c99b5f331a7432503b2a9.png",
        optionName: "抽奖奖品4",
        prizeId: "sp_4",
        prizeType: 1,
        url: "http://www.baidu.com",
      }, {
        optionId: 'sp_6',
        optionImg: "//yun.duiba.com.cn/aurora/assets/798e474e87d316de19974e9cbdce6e2d72876901.png",
        optionName: "抽奖奖品5",
        prizeId: "sp_5",
        prizeType: 1,
        url: "http://www.baidu.com",
      }, {
        optionId: 'sp_7',
        optionImg: "//yun.duiba.com.cn/aurora/assets/aaabdca89f8b88c3648d9f3a33fde3a86bad459b.png",
        optionName: "抽奖奖品6",
        prizeId: "sp_6",
        prizeType: 1,
        url: "http://www.baidu.com",
      }, {
        optionId: 'sp_8',
        optionImg: "//yun.duiba.com.cn/aurora/assets/1a2df0ff03d86b978e894bdf034f48d62817b0b0.png",
        optionName: "抽奖奖品7",
        prizeId: "sp_7",
        prizeType: 1,
        url: "http://www.baidu.com",
      }, {
        optionId: 'thanks',
        optionImg: "//yun.duiba.com.cn/aurora/assets/e8159bf64974c3b5b509b1c9f33a396d72cdfa8b.png",
        optionName: "抽奖奖品8",
        prizeId: "sp_8",
        prizeType: 1,
        url: "http://www.baidu.com",
      },
    ],
  },
  message: null,
  success: true,
};

const answerStart = {
  success: true,
  data: {
    startId: "start1212", //开始ID
  }
}

const answerQuery = {
  success: true,
  data: {
    content: "怎么可以优雅的滑雪怎么可以优雅的滑雪怎么可以优雅的滑雪怎么可以优雅的滑雪怎么可以优雅的滑雪怎么可以优雅的滑雪怎么可以优雅的滑雪",
    answers: [
      "坡道障碍滑雪",
      "是德国第三个圣诞节还是对酒当歌手机号",
      "打飞机估计会受到各方就会打给谁发回国倒计时的",
    ],
    currentIndex: 1, //本次答题的序号
  }
}

const answerSubmit = {
  success: true,
  data: {
    answer: {
      right: true, // 是否正确
      correctAnswers: ["2"], // 正确项的索引
    }
  }
}
const answerComplete = {
  success: true,
  data: {
    extra: "newStartId", // 答题成功返回的开始游戏id
  }
}

// 复活参与游戏
const resurgence = {
  success: true,
  data: "fuhuostartID"
}

const doAssist = {
  success: false,
  data: "1",
  message: "121271277",
  code: 1,
}

const doSign = {
  success: true,
  data: {
    options: [
      {
        name: "金币",
        sendCount: 20,
      }
    ]
  }
}
const signQuery = {
  success: true,
  data: {
    todaySign: false, //今天是否签到 true-签到
    signDay: 0,//连续/累计签到天数
  }
}

//查询签到奖品配置
const signOptions = {
  success: true,
  data: [{
    options: [
      {
        name: "金币",
        sendCount: 20,
      }
    ]
  }, {
    options: [
      {
        name: "金币",
        sendCount: 20,
      }
    ]
  }, {
    options: [
      {
        name: "金币",
        sendCount: 20,
      }
    ]
  }, {
    options: [
      {
        name: "金币",
        sendCount: 20,
      }
    ]
  }, {
    options: [
      {
        name: "金币",
        sendCount: 220,
      }
    ]
  }, {
    options: [
      {
        name: "金币",
        sendCount: 120,
      }
    ]
  }, {
    options: [
      {
        name: "金币",
        sendCount: 320,
      }
    ]
  }]
}

//查询是否完成新手引导
const queryNewGuide = {
  "success": true,
  "code": "",
  "data": {
    "skipNewGuide": false,
    "completeGuide": false,
    "alreadyGuideSteps": 2,
    "allGuideSteps": 3,
    "extra": ""
  }
}

//递进新手引导完成的步数
const stepNewGuide = {
  "success": true,
  "code": "",
  "data": {
    "completeGuide": true,
    "alreadyGuideSteps": 3,
    "allGuideSteps": 3,
    "extra": ""
  }
}


const inviteRecord ={
  success: true,
  data: {
    totalCount: 4,//总条数
  }
}

const rankingAward = {
  success: true,
  data: {
    prizeImg: "//yun.duiba.com.cn/aurora/assets/515ed09f2dd8458e1a9f0daeb24ad965ace57bf7.png",
    prizeName: "what",
    url: "http://www.baidu.com"
  }
}

const startGame = {
  success: true,
  data: "gameRecordUI"
}

const gameSubmit = {
  success: true,
  data: {
    sendGold: 20,//发放金币数
    answerFlag: 0,//1-可答题 0-不可答题
    reGold: 100,//复活需要金币数
    star: 1,
  }
}

const getInviteCode = {
  success: true,
  data: {
    inviteCode: 12345,
  }
}

const getCode = {
  "code": null,
  "data": {
      "avatar": null,
      "imageUrl": "https://devnmmimage.myrtb.net/storage/qrcode/16427293746711.png",
      "nickName": "Wvj7U3_LX0X21S8"
  },
  "message": null,
  "success": true
}

module.exports = {
  listExchangeLimit,
  doExchange,
  getMyPrize,
  getRank,
  turnTableDraw,
  turnTableQuery,
  answerStart,
  answerQuery,
  answerSubmit,
  answerComplete,
  resurgence,
  doAssist,
  doSign,
  signQuery,
  signOptions,
  queryNewGuide,
  stepNewGuide,
  inviteRecord,
  rankingAward,
  startGame,
  gameSubmit,
  getInviteCode,
  getCode
};
