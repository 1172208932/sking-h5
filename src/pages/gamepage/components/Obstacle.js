import p2 from 'p2/build/p2';
import {
    RES_PATH
} from '../../../../sparkrc.js';
import gameStore from '../gameStore.js';
const Sprite = FYGE.Sprite;
const Shape = FYGE.Shape;

export default class Obstacle {
    type = ""
    rectShape;//刚体形状
    rectBody;//刚体
    rectcoin;//展示节点
    width;
    height;
    constructor(item, world, box) {
        this.type = item.type


        //加载图片
        FYGE.GlobalLoader.loadImage((s, image) => {
            //纹理
            var texture = FYGE.Texture.fromImage(image);
            //显示对象
            this.rectcoin = new FYGE.Sprite(texture)
            box.addChild(this.rectcoin);
            this.rectcoin.position.set(item.x, -item.y + 300)
            this.width = this.rectcoin.width;
            this.height = this.rectcoin.height;
        }, `${RES_PATH}GamePage/level1/${this.type}.png`)

        var shapeshow = new Shape()
        box.addChild(shapeshow)
        if (this.type == "snow") {
            shapeshow.beginFill(0xff0000, 0.5)
                .drawRect(0, 0, 40, 40)
                .endFill();
            this.rectShape = new p2.Box({
                width: 40, height: 40,
                material: new p2.Material()
            });
        } else if (this.type == "grass") {
            shapeshow.beginFill(0xff0000, 0.5)
                .drawRect(0, 0, 244, 146)
                .endFill();
            this.rectShape = new p2.Box({
                width: 244, height: 146,
                material: new p2.Material()
            });
        } else if (this.type == "stone") {
            shapeshow.beginFill(0xff0000, 0.5)
                .drawRect(0, 0, 142, 120)
                .endFill();
            this.rectShape = new p2.Box({
                width: 142, height: 120,
                material: new p2.Material()
            });
        } else if (this.type == "bigstone") {
            shapeshow.beginFill(0xff0000, 0.5)
                .drawRect(0, 0, 301, 161)
                .endFill();
            this.rectShape = new p2.Box({
                width: 301, height: 161,
                material: new p2.Material()
            });
        }
        shapeshow.position.set(item.x, -item.y + 300)

        //  new Circle({ radius: 20 });
        console.log(this.rectShape.height, 'rectShape')

        this.rectBody = new p2.Body({
            mass: 0,    //重量
            position: [item.x + this.rectShape.width / 2, item.y - 300 - this.rectShape.height / 2]
        });

        this.rectBody.addShape(this.rectShape);

        world.addBody(this.rectBody);
        this.addMaterial(this.rectShape,world)
        

    }
    addMaterial(heighshape,world) {
        var contactMaterial1 = new p2.ContactMaterial(heighshape.material, gameStore.role.circleShape.material, {
            restitution: 0, // This means no bounce!
            surfaceVelocity: -82000,
            friction: 0,
            relaxation:0,
            stiffness:0.5
        });
        world.addContactMaterial(contactMaterial1)

        var contactMaterial2 = new p2.ContactMaterial(heighshape.material, gameStore.role.circleShape2.material, {
            restitution: 0, // This means no bounce!
            surfaceVelocity: -82000,
            friction: 0,
            relaxation:0,
            stiffness:0.5
        });
        world.addContactMaterial(contactMaterial2)

        var contactMaterial3 = new p2.ContactMaterial(heighshape.material, gameStore.role.carShape.material, {
            restitution: 0, // This means no bounce!
            surfaceVelocity: -82000,
            friction: 0,
            relaxation:0,
            stiffness:0.5
        });
        world.addContactMaterial(contactMaterial3)
    }
}