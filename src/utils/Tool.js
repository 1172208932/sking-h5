
import * as TWEEN from '@tweenjs/tween.js';
export class Tool {
    constructor() {

    }
    static animate() {
        if (TWEEN.update()) {
            requestAnimationFrame(Tool.animate);
        }
    }
    /**
     * @param {*} context 上下文
     * @param {*} number 新数据
     * @param {*} field state的字段名
     * @param {*} duration 动画持续时间
     */
    static tween(context, number, field, duration = 5000, showView) {
        new TWEEN.Tween({
            number: 0
        }).to({
            number: number
        }, duration).onUpdate(tween => {
            context.setState({ [field]: tween.number.toFixed(0) })
        }).start()
            .onComplete(() => {
                showView && showView()
                //context.setState({ [showView]: true })
            })
        Tool.animate()
    }
    /**
    * @param {*} repeat 默认一直循环
    */
    static tweenReapt(context, number, field, duration = 900, repeat = Infinity) {
        new TWEEN.Tween({
            number: 0
        }).to({
            number: number
        }, duration).onUpdate(tween => {
            context.setState({ [field]: tween.number.toFixed(0) })
        }).start().repeat(repeat)

        Tool.animate()
    }

    /**
     * @param {*} repeat 从a到b
     */
    static tweenReaptToto(context, startnum, endnumber, field, duration = 900, repeat = Infinity) {
        new TWEEN.Tween({
            number: startnum
        }).to({
            number: endnumber
        }, duration).onUpdate(tween => {
            context.setState({ [field]: tween.number })

        }).start()
        Tool.animate()
    }

    static tweenReaptToto2(context, startnum, endnumber, duration = 900, cb) {
        new TWEEN.Tween({
            number: startnum
        }).to({
            number: endnumber
        }, duration).onUpdate(tween => {
            context.scrollTop = parseInt(tween.number)
        }).start().onComplete(() => {
            cb && cb()
        })
        Tool.animate()
    }
    /**
     * @param {*} repeat 从a到b
     */
    static tweenReaptTotoCb(context, startnum, endnumber, field, duration = 900, tg) {
        console.log('tg:', tg)
        new TWEEN.Tween({
            number: startnum
        }).to({
            number: endnumber
        }, duration).onUpdate(tween => {
            context.setState({ [field]: tween.number })
        }).start().onComplete(() => {
            context.setState({ [tg]: false })
        })
        Tool.animate()
    }

    static removeAlltweens() {
        //移除所有tween、
        // console.log('移除所有tween')
        TWEEN.removeAll()
    }


    //时间戳处理
    static timeStampFromat(timeStamp) {
        let d, h, m, s;
        d = Math.floor(timeStamp / 1000 / 60 / 60 / 24);
        h = Math.floor(timeStamp / 1000 / 60 / 60 % 24);
        m = Math.floor(timeStamp / 1000 / 60 % 60);
        s = Math.floor(timeStamp / 1000 % 60);
        h = h < 10 ? "0" + h : h.toString();
        m = m < 10 ? "0" + m : m.toString();
        s = s < 10 ? "0" + s : s.toString();
        return `${d}.${h}.${m}.${s}`;
    }

    static ymdFromat(timeStamp) {
        let date = new Date(timeStamp)
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds();
        return (Y + M + D + h + m + s);
    }

    //微信分享
    static wechatShare() {
        console.log('设置微信分享')
        let shareCode = Tool.genInviteInfo.data
        //link: "https://79815.activity-1.m.duiba.com.cn/projectx/p0a5982d6/fd0ab4cd0.html" + `?shareCode=${shareCode}`// 链接
        window["wx"].miniProgram.postMessage({
            data: {
                title: "赶快来领美妆年终奖，免费抽大奖！", // 标题
                desc: "跟我一起参加挑战，最高免费得iphone 12 pro手机", // 描述
                imgUrl: "https://yun.duiba.com.cn/spark/assets/ee9aa731d7e3e41eb4e41853d3e090b8626311d2.png", // 图片
                link: "https://79815.activity-1.m.duiba.com.cn/projectx/pe94c1ddc/f38d3f156.html" + `?shareCode=${shareCode}`// 链接
            }
        });
    }
}


