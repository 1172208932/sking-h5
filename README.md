
# H5简易版滑雪大冒险游戏实现

![image-20211004163312936](https://yun.duiba.com.cn/aurora/assets/359b9dc0a46ac2245b272728fa3a9165a05b0b15.gif)
## 前言
   文章的目的是分享滑雪游戏的实现方案，为之后的小伙伴提供参考意见，同时也欢迎大家提出改善意见，将会按照下面的步骤开始介绍。
   [游戏demo体验链接](https://1172208932.github.io/sking-h5/)

- 技术栈
- 需求分析
- 技术方案
- 游戏模块划分
- 总结

## 技术栈

H5游戏引擎：选用的是目前公司自研的H5游戏引擎 FYGE（目前暂未开源） api可以参考[白鹭引擎](https://docs.egret.com/engine/docs/api/engine/egret.DisplayObject)
为了比较好的实现物体的运动效果，采用第三方物理引擎[p2.js](https://github.com/schteppe/p2.js)

## 需求分析
需求方是拿着《滑雪大冒险》手游，希望实现简易版的H5游戏。

通过 `标准-定制` 与 `复杂-简单` 两个维度考虑，需求属于定制开发，第一版就不考虑组件化

![image-682a254eb7e641f59733abc68feace9243846131](https://yun.duiba.com.cn/aurora/assets/682a254eb7e641f59733abc68feace9243846131.png)


 初步分析，游戏主要模块分为四个

![image-682a254eb7e641f59733abc68feace9243846131](https://yun.duiba.com.cn/aurora/assets/e524bffa8946457ada0d7ab0eddcfa33997f9b86.png)

1. 游戏背景：分为近景与远景，且随机山峰循环滚动
2. 地面生成：圆滑且连续
3. 人物运动：流畅符合简单物理逻辑 需求只有跳跃没有加速 这也是与滑雪大冒险的不同点
4. 障碍物与道具生成：多个关卡，不同路线与道具


# 技术方案
需求初步分析之后，总结到如下难点与方案：
1. 地面如何生成
    - 方案1：
    路线通过贝塞尔曲线重复随机生成（优点：无需ui介入生成，开发效率高 缺点：线与线的接点 会有卡顿，时间关系没有找到好的解决方式）
    - 方案2：
    路线通过ui给到的图片，通过[getImageData](https://www.w3school.com.cn/tags/canvas_getimagedata.asp)读取图片指定颜色，根据步长生成线的高度数组。（优点：生成线段连贯 缺点：每关都需要生成，开发总量增加。）
2. 人物运动如何连贯且不易倒
    - 方案1：
  ![image-682a254eb7e641f59733abc68feace9243846131](https://yun.duiba.com.cn/aurora/assets/0e6796c65aa6d9b23d47a1f14cfe003ac0abab34.png)
    人物模型采用矩形，通过修改摩擦力与外力实现游戏（优点：模型简单 缺点：效果一般，落地与增加外力时，效果有些生硬。）
    - 方案2：
  ![image-682a254eb7e641f59733abc68feace9243846131](https://yun.duiba.com.cn/aurora/assets/bbed172cf8797f495779c46c69e58b349904c206.png)
    人物模型采用车的模型。（优点：运动流畅 缺点：模型复杂。）

主要代码：
```javascript
        // 增加车身与两个轮子间的弹性约束
        var c1 = new p2.PrismaticConstraint(this.role.carBody,this.role.circleBody,{
            localAnchorA : [-45,-46],
            localAnchorB : [0,0],
            localAxisA : [0,1],
            disableRotationalLock : true,
        });
        var c2 = new p2.PrismaticConstraint(this.role.carBody,this.role.circleBody2,{
            localAnchorA : [ 45,-46],
            localAnchorB : [0,0],
            localAxisA : [0,1],
            disableRotationalLock : true,
        });
        c1.setLimits(-8, 8);
        c2.setLimits(-8, 8);
        this.phyworld.addConstraint(c1);
        this.phyworld.addConstraint(c2);
```

结论：综上都采用方案二的实现方式。

## 游戏模块划分

游戏采用[Mixins](https://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/)的方式来划分游戏内的模块


 ![image-543af390e9edcb496c94387b7d19c17bb3839c05](https://yun.duiba.com.cn/aurora/assets/543af390e9edcb496c94387b7d19c17bb3839c05.png)



```
├── components
│   ├── Obstacle.js
│   └── Role.js
├── gameStore.js         // 主要模块：路线、与物理世界生成
├── gamepage.jsx
├── gamepage.less
├── mix.js
└── mixins
    ├── background.js    // 游戏背景
    └── roleControl.js   // 游戏角色相关逻辑
```

## 总结

以上就是游戏的开发与设计思路，游戏实现方式还不够优雅，这是[github的demo地址](https://github.com/1172208932/sking-h5/tree/master)，欢迎大家在issues中留言。