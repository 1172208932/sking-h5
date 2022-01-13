import {
    RES_PATH
} from '../../../../sparkrc.js';

export const Background = {
    bgArea1: '',
    bgArea2: '',
    initbg() {
        //加载图片
        // FYGE.GlobalLoader.loadImage((s, image) => {
        //     //纹理
        //     var texture = FYGE.Texture.fromImage(image);
        //     //显示对象
        //     var spr = new FYGE.Sprite(texture)
        // }, "")

        // SvgaParser.loadSvga(
        //     `${RES_PATH}主页面/collectenergy.svga`,
        //    (v) => {
        //       let mv = new FYGE.MovieClip(v)
        //       mv.x = 320;
        //       mv.y = document.body.clientWidth / 750 * 1624 * 0.1//288;
        //       mv.lockStep = true;
        //       gameindex.collectsvga = mv
        //       gameindex.collectsvga.visible = false
        //       this.gamestage.addChild(mv)
        //       resolve()
        //     },
        //     (err) => {

        //     }
        //   )

        this.bgArea2.addChild(FYGE.Sprite.fromUrl(`${RES_PATH}GamePage/level1/sky.png`))
        FYGE.GlobalLoader.loadImage((s, image) => {
            //纹理
            var texture = FYGE.Texture.fromImage(image);
            //显示对象
            var spr = new FYGE.Sprite(texture)
            spr.y = 86
            console.log(spr.width, 'width')
            this.bgArea2.addChild(spr)
            var spr2 = new FYGE.Sprite(texture)
            spr2.y = 86
            spr2.x = spr.width
            this.bgArea2.addChild(spr2)
        }, `${RES_PATH}GamePage/level1/skylast.png`)

        FYGE.GlobalLoader.loadImage((s, image) => {
            //纹理
            var texture = FYGE.Texture.fromImage(image);
            console.log(this.offsetY, 'this.offsetY')
            //显示对象
            var spr = new FYGE.Sprite(texture)
            spr.y = 184 + this.offsetY
            console.log(spr.width, 'width')
            this.bgArea1.addChild(spr)
            var spr2 = new FYGE.Sprite(texture)
            spr2.y = 184 + this.offsetY
            spr2.x = spr.width
            this.bgArea1.addChild(spr2)
        }, `${RES_PATH}GamePage/level1/bg1.png`)

    },

    MoveBg() {
        // 滚动背景
        if (this.bgArea2.x <= -4872) {
            this.bgArea2.x = -1624
        }
        this.bgArea2.x = this.bgArea2.x - 1
        if (this.bgArea1.x <= -4872) {
            this.bgArea1.x = -1624
        }
        this.bgArea1.x = this.bgArea1.x - 9
    },
}