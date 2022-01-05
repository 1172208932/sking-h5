import MD from 'spark-utils/out/md/index.js';

let appId = CFG.appID;
const dcm = '202.' + CFG.projectId + '.0.0';
const domain = '//embedlog.duiba.com.cn';

let MDList = [
  {
    ele: `.test-md1`,
    data: {
      dpm: `${appId}.110.5.1`,
      dcm,
      domain,
      appId
    },
    once: false
  }
];

export default () =>
  MD({
    show: MDList, // 曝光
    click: MDList // 点击
  });
