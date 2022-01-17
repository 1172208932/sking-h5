import {
    RES_PATH
} from '../../../../sparkrc.js';

const urlList = [`${RES_PATH}GamePage/level1/bg2-1.png`, `${RES_PATH}GamePage/level1/bg2-2.png`, `${RES_PATH}GamePage/level1/bg2-3.png`]
const urlList3 = [`${RES_PATH}GamePage/level1/bg3-1.png`, `${RES_PATH}GamePage/level1/bg3-2.png`, `${RES_PATH}GamePage/level1/bg3-3.png`, `${RES_PATH}GamePage/level1/bg3-4.png`]
const urlTopList3 = [226, 534, 200, 186]

export const Background = {
    // 背景天空
    bgArea0: '',
    bgArea1: '',

    bgArea2: '',
    bgList2: [],
    bgArea2X: 0,

    bgArea3: '',
    bgList3: [],
    bgArea3X: 0,

    initbgUI(gamestage) {
        this.bgArea0 = new FYGE.Container();
        gamestage.addChild(this.bgArea0)

        this.bgArea1 = new FYGE.Container();
        gamestage.addChild(this.bgArea1)

        this.bgArea2 = new FYGE.Container();
        gamestage.addChild(this.bgArea2)

        this.bgArea3 = new FYGE.Container();
        gamestage.addChild(this.bgArea3)
    },

    initbg() {
        this.bgArea0.addChild(FYGE.Sprite.fromUrl(`${RES_PATH}GamePage/level1/sky.png`))

        // FYGE.GlobalLoader.loadImage((s, image) => {
        //     //纹理
        //     var texture = FYGE.Texture.fromImage(image);
        //     //显示对象
        //     var spr = new FYGE.Sprite(texture)
        //     spr.y = 184 + this.offsetY
        //     this.bgArea1.addChild(spr)
        //     var spr2 = new FYGE.Sprite(texture)
        //     spr2.y = 184 + this.offsetY
        //     spr2.x = spr.width
        //     this.bgArea1.addChild(spr2)
        // }, `${RES_PATH}GamePage/level1/bg1-1.png`)



        this.addBgList2Item(0);
        this.addBgList2Item(1);
        this.addBgList2Item(2);

        this.addBgList3Item(0);
        this.addBgList3Item(1);
        this.addBgList3Item(2);
    },

    addBgList2Item(index) {
        FYGE.GlobalLoader.loadImage((s, image) => {
            //纹理
            var texture = FYGE.Texture.fromImage(image);
            //显示对象
            var spr3 = new FYGE.Sprite(texture)

            this.bgList2.push(spr3)
            spr3.x = this.bgArea2X
            spr3.y = 220 + (this.offsetY || 0) 

            this.bgArea2X = this.bgArea2X + spr3.width * 0.8
            this.bgArea2.addChildAt(spr3, 1)
        }, urlList[index])
    },

    addBgList3Item(index) {
        FYGE.GlobalLoader.loadImage((s, image) => {
            //纹理
            var texture = FYGE.Texture.fromImage(image);
            //显示对象
            var spr3 = new FYGE.Sprite(texture)

            this.bgList3.push(spr3)
            spr3.x = this.bgArea3X
            spr3.y = urlTopList3[index] +  (this.offsetY || 0) 


            this.bgArea3X = this.bgArea3X + spr3.width * 0.8
            this.bgArea3.addChildAt(spr3, 1)
        }, urlList3[index])
    },

    MoveBg() {
        // if (!this.bgArea1?.children?.length) {
        //     return
        // }

        // // 滚动背景
        // if (this.bgArea1.x <= -this.bgArea1.children[0].width * 1.5) {
        //     this.bgArea1.x = -this.bgArea1.children[0].width * 0.5
        // }
        // this.bgArea1.x = this.bgArea1.x - 1
        // if (this.bgArea1.x <= -4872) {
        //     this.bgArea1.x = -1624
        // }
        // this.bgArea1.x = this.bgArea1.x - 9

        if (!this.bgList2?.length) {
            return
        }
        if (this.bgList2[0].x < -this.bgList2[0].width) {
            this.bgList2[0].destroy()
            this.bgList2.shift();
            let index = Math.floor(Math.random() * 3)
            this.addBgList2Item(index)
        }


        this.bgList2.forEach(item => {
            item.x = item.x - 3
        })
        this.bgArea2X = this.bgArea2X - 3

        // 第三屏
        if (!this.bgList3?.length) {
            return
        }
        if (this.bgList3[0].x < -this.bgList3[0].width) {
            this.bgList3[0].destroy()
            this.bgList3.shift();
            let index = Math.floor(Math.random() * 4)
            this.addBgList3Item(index)
        }

        this.bgList3.forEach(item => {
            item.x = item.x - 5
        })

        this.bgArea3X = this.bgArea3X - 5
    },

}