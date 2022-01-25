"use strict";

import React from "react";
import { RES_PATH } from "../../../sparkrc.js";
import { observer } from "mobx-react";
import store from "../../store/index";
import modalStore from "@src/store/modal";
import API from "../../api";
import "./rule.less";

@observer
class Rule extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (document.getElementById("overlay_layer")) {
      document.getElementById("overlay_layer").style.display = "none";
    }
  }

  componentWillUnmount() {
    if (document.getElementById("overlay_layer")) {
      document.getElementById("overlay_layer").style.display = "block";
    }
  }

  render() {
    return (
      <div className="rule">
        <div className="rule-fenwei"></div>
      
        <span className="popoverBaseplate5"></span>
        {/* <div className="rule-title"></div> */}
        <p className="close" onClick={() => modalStore.closePop("Rule")}></p>
        {/* <article className="ruleInfo" dangerouslySetInnerHTML={{ __html: store.ruleInfo }}></article> */}
        <div className="ruleInfo">
          {
            [1,2,3,4,5,6].map(item => {
              return (
                <img key={item} src={`${RES_PATH}rule/${item}.jpg`} alt="" className={`ruleImg img${item}`} />
              )
            })
          }
          
          {/* <p>一、活动时间:</p>
          <p>北京时间2022年1月2５日0点-2月23日0点</p>
          <p>二、活动规则</p>
          <p>1．游戏机制：</p>
          <p>
            ·登录并授权“牛蒙蒙”小程序后进入“冰雪跑酷冲关夺黄金——和谷爱凌一起燃动冰雪”游
            戏，首次进入游戏，可获得20金币，每次游戏需消耗5金币开始游戏；
          </p>
          <p>
            ·游戏中，需要通过「单击」&「双击」操作牛蒙蒙完成“滑雪跳跃及翻滚”动作，收获雪花
            及水晶并越过多重障碍；
          </p>
          <p>
            ·在游戏中，每收集1枚雪花可获得10分，每收集1枚水晶可获得30分，根据游戏得分
            完成情况，可评判三个梯度金币奖励（一星/二星/三星，满星通关可参与一次抽奖）
          </p>
          <p>·游戏中若碰撞障碍物，则闯关失败，每人每天可通过参与“复活答题”赢取1次免费游戏机会。</p>
          <p>·每解锁十个关卡，可获一次幸运大转盘抽奖机会。</p>
          <p>
            ·整体活动结束后（2月23日0点后，在地图页尾“夺黄金奖台”点击「开奖按钮」查询自己
            是否获奖），总分数排名前5的用户可获得【青蛙公主足金吊坠1个】，排名6-50名可获得
            【蒙牛谷爱凌定制装纯牛奶1箱】，排名51-100名可获得【谷爱凌Q版限量立体奶卡1个】；
            （同一分数排名，按参与者达到该分数时间顺序排名）
          </p>
          <p>
            ·总分数计算方法为：游戏总分按照每关卡的最高分进行累积（比如：参与者可重复闯关，
            若重复闯关得分大于之前闯关得分，则按照本关卡的最高分计入总分数）
          </p>
          <p>·游戏中所获金币，可在【兑换商城】免费兑换奖品；</p>
          <p>2．更多游戏金币获得方式：</p>
          <p>·参与者通过“每日签到”可获进阶额度的金币奖励；</p>
          <p>
            ·活动期间参与者每成功邀请1位新注册用户参与活动，可获得5枚金币奖励，每天最多可
            邀请10位新用户（*注意：新用户指牛蒙蒙平台新注册用户）；
          </p>
          <p>三、奖品设置</p>
          <p>1.【总分数排行榜】奖品设置：</p>
          <p>
            ·榜单前1-5名【青蛙公主足金吊坠1个单价¥1073】（数量:共5个，总价值¥5365）
          </p>
          <img src={`${RES_PATH}rule/1.png`} alt="" className="img1"/>
          <p>· 榜单前6-50名【蒙牛谷爱凌定制装纯牛奶1箱（ 250ml×24盒） 单价¥79.2】（数量:共45箱，总价值¥3564）</p>
          <img src={`${RES_PATH}rule/2.png`} alt="" className="img2"/>
          <p>· 榜单前51-100名【谷爱凌Q版限量立体奶卡1个（可作为立体摆件，扫码可兑换蒙牛纯牛奶一箱 规格：250mlx16盒） （四款主题随机发）立体奶卡单价¥56】（数量:共50张，总价值¥2800） </p>
          <img src={`${RES_PATH}rule/3.png`} alt="" className="img3"/>
          <p>2.【幸运大转盘抽奖】奖品设置：</p>
          <p>·【金镶玉醒狮吊坠 1个单价¥1100】（数量:共1个，总价值¥1100）中奖概率0.01%</p>
          <img src={`${RES_PATH}rule/4.png`} alt="" className="img4"/>
          <p>·【牛蒙蒙X谷爱凌「小凌蒙礼物盒」 1盒单价¥139】（数量:共100盒，总价值¥13900）中奖概率0.1% （小凌蒙礼物盒内包含：谷爱凌纪念版包装牛奶1盒、谷爱凌Q版冰箱贴四款及配件，马口铁随行盒1个）</p>
          <img src={`${RES_PATH}rule/5.png`} alt="" className="img5"/>
          <p>·【牛蒙蒙中国牛摆件 1个单价¥89】（数量:共50个，总价值¥4450）中奖概率0.1%</p>
          <img src={`${RES_PATH}rule/6.png`} alt="" className="img6"/>
          <p>·【谷爱凌冰雪贴贴 红/蓝两款带背卡 任意发1张单价¥59】（数量:共100张，总价值¥5900）中奖概率0.19%</p>
          <img src={`${RES_PATH}rule/7.png`} alt="" className="img7"/>
          <p>·【20游戏金币】中奖概率10%</p>
          <p>·【10游戏金币】中奖概率20%</p>
          <p>·【5游戏金币】中奖概率30%</p>
          <p>·【2游戏金币】中奖概率39.6%</p>
          <p>3.【满星抽奖】奖品设置：</p>
          <p>·【蒙牛谷爱凌定制装纯牛奶1箱（250ml×24盒）单价¥79.2】（数量:共15箱，总价值¥1188）中奖概率0.01%</p>
          <img src={`${RES_PATH}rule/8.png`} alt="" className="img8"/>
          <p>·【牛蒙蒙中国牛渔夫帽1个 单价¥75】（数量:共25个，总价值¥1875）中奖概率0.04%</p>
          <img src={`${RES_PATH}rule/9.png`} alt="" className="img9"/>
          <p>·【牛蒙蒙中国牛镭射包1个单价¥69】（数量:共25个，总价值¥1725）中奖概率0.05%</p>
          <img src={`${RES_PATH}rule/10.png`} alt="" className="img10"/>
          <p>·【10游戏金币】中奖概率20%</p>
          <p>·【5游戏金币】中奖概率30%</p>
          <p>·【2游戏金币】中奖概率49.90%</p>
          <p>4.【兑换商店】奖品设置</p>
          <p>·【牛蒙蒙X谷爱凌「小凌蒙礼物盒」 1盒单价¥139，需兑换金币值278枚】（数量:共200盒，总价值¥27800）（小凌蒙礼物盒内包含：谷爱凌纪念版包装牛奶1盒、谷爱凌Q版冰箱贴四款及配件，马口铁随行盒1个）</p>
          <img src={`${RES_PATH}rule/5.png`} alt="" className="img5"/>
          <p>·【谷爱凌冰雪贴贴 红/蓝两款带背卡 单价¥59，需兑换金币值118枚】（数量:共200张，总价值¥11800）</p>
          <img src={`${RES_PATH}rule/7.png`} alt="" className="img7"/>
          <p>·【牛蒙蒙中国牛渔夫帽 单价¥75，需兑换金币值150枚】（数量:共25个，总价值¥1875）</p>
          <img src={`${RES_PATH}rule/9.png`} alt="" className="img9"/>
          <p>·【牛蒙蒙中国牛镭射包 单价¥69，需兑换金币值138枚】（数量:共25个，总价值¥1725）兑换金币值138枚</p>
          <img src={`${RES_PATH}rule/10.png`} alt="" className="img10"/>
          <p>·【谷爱凌Q版限量立体奶卡（可作为立体摆件，扫码可兑换蒙牛纯牛奶一箱 规格：250mlx16盒），单价¥56，需兑换金币值112枚】 （数量:共20张，总价值¥1120）（四款随机发）</p>
          <img src={`${RES_PATH}rule/3.png`} alt="" className="img3"/>
          <p>四、注意事项: </p>
          <p>1.活动范围:仅限中国大陆地区用户参与活动及领奖;</p>
          <p>2.所有实物奖品无需承担任何费用，包邮到家；港澳台、新疆、 西藏、宁夏回族自治区、四川省阿坝自治州、以及特殊疫情受限管控区不能发货，请您填写地址时规避以下物流受限区域： 
            <br/>
            广东省珠海市香洲区、广东省中山市坦洲、广东省深圳市东升/罗湖翠竹站、陕西省西安市、陕西省咸阳市渭城区/泾阳县/三原县、陕西省商洛市商州区、山西省运城市临猗县、河南省郑州市金水区、河南省商丘市民权县、河南省开封市杞县、上海市宝山区集贤路、上海市静安区武宁南路、天津市东丽区
            <br/>
            如您处于物流受限区域,建议您填写亲友的不受限地址帮忙代收
          </p>
          <p>3. 活动中所获所有奖品（包含兑换商店商品）可在“我的奖品”中进行查看和领取。实物奖品需提供发货信息，若活动结束2日内未填写者，则默认放弃奖品；总排名奖在2022年2月23日以短信形式发送到中奖者的牛蒙蒙注册手机号,并安排客服人员电话联系。中奖者所提供信息需与中奖手机号绑定的身份证信息一致,以便核查参与真实性,其他号码来电视为无效。若3日内电话无法接通或3日内接通但未提供有效信息,将视为自动弃奖,奖品不再发放。若发现异常参与活动行为(包括并不仅限于恶意刷单邀请用户),牛蒙蒙有权取消活动参与及中奖资格;</p>
          <p>4.所有实物奖品活动结束后15日内统一安排发货;</p>
          <p>5.所有奖品不得兑换现金或作价销售;</p>
          <p>6.若发现异常参与活动行为(包括并不仅限于恶意刷 单邀请用户)，牛蒙蒙有权取消活动参与及中奖资格;</p>
          <p>7.牛蒙蒙小程序在线客服：【牛蒙蒙小程序】-【我的】-【我的服务】-【在线客服】( 工作日:9:00~18:00）</p> */}
        </div>
      </div>
    );
  }
}
export default Rule;
