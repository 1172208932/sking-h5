import p2 from 'p2/build/p2';
import {
    RES_PATH
} from '../../../../sparkrc.js';
import gameStore from '../gameStore.js';
import { propSize } from '@src/lujingInfo/lujing.js';
const Sprite = FYGE.Sprite;
const Shape = FYGE.Shape;

export default class Obstacle {
    type = ""
    rectShape;//刚体形状
    rectBody;//刚体
    rectcoin;//展示节点
    width;
    height;
    x = 0;
    y = 0;
    constructor(item, lineInfo, world, box) {
        this.type = item.type

        this.width = propSize[this.type].width;
        this.height = propSize[this.type].height;

        this.rectcoin = new FYGE.Sprite()
        box.addChild(this.rectcoin);
        //加载图片
        FYGE.GlobalLoader.loadImage((s, image) => {
            //纹理
            var texture = FYGE.Texture.fromImage(image);
            //显示对象
            this.rectcoin.texture = texture

        }, `${RES_PATH}GamePage/level1/${this.type}.png`)

        // var shapeshow = new Shape()
        // box.addChild(shapeshow)
        // shapeshow.beginFill(0xff0000, 0.5)
        //     .drawRect(0, 0, propSize[this.type].width * 0.7, propSize[this.type].height * 0.7)
        //     .endFill();
        this.rectShape = new p2.Box({
            width: propSize[this.type].width * 0.6, height: propSize[this.type].height * 0.6,
            material: new p2.Material()
        });

        var showY = -item.y
        if (this.type == "snow" || this.type == "gem") {
            showY = -item.y
        } else {

           
            var time = Math.floor(item.x / 100)
            if (time + 1 > lineInfo.length) {
                time = time
            } else {
                time = time + 1
            }

            if(item?.offsetY){
                showY = lineInfo[time] - this.height*0.75 - item?.offsetY
            }else{
                showY = lineInfo[time] - this.height*0.75
            }

        }

        this.rectcoin.position.set(item.x, showY + 300)
        // shapeshow.position.set(item.x , showY + 300 )
        this.x = item.x
        this.y = showY + 300
        this.rectBody = new p2.Body({
            mass: 0,    //重量
            position: [item.x + this.rectShape.width / 2 + this.rectShape.width * 0.4, (-showY) - 300 - this.rectShape.height / 2 - this.rectShape.height * 0.7]
        });

        this.rectBody.addShape(this.rectShape);

        world.addBody(this.rectBody);
        this.addMaterial(this.rectShape, world)


    }
    addMaterial(heighshape, world) {
        var contactMaterial1 = new p2.ContactMaterial(heighshape.material, gameStore.role.circleShape.material, {
            restitution: 0, // This means no bounce!
            surfaceVelocity: -82000,
            friction: 0,
            relaxation: 0,
            stiffness: 0.5
        });
        world.addContactMaterial(contactMaterial1)

        var contactMaterial2 = new p2.ContactMaterial(heighshape.material, gameStore.role.circleShape2.material, {
            restitution: 0, // This means no bounce!
            surfaceVelocity: -82000,
            friction: 0,
            relaxation: 0,
            stiffness: 0.5
        });
        world.addContactMaterial(contactMaterial2)

        var contactMaterial3 = new p2.ContactMaterial(heighshape.material, gameStore.role.carShape.material, {
            restitution: 0, // This means no bounce!
            surfaceVelocity: -82000,
            friction: 0,
            relaxation: 0,
            stiffness: 0.5
        });
        world.addContactMaterial(contactMaterial3)
    }
}