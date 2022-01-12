import p2 from 'p2/build/p2';

const Sprite = FYGE.Sprite;
const Shape = FYGE.Shape;

export default class Role extends Sprite {
    // 前轮
    circle
    // 后轮
    circle2
    // 车身
    car
    // 前轮刚体
    circleBody
    // 后轮刚体
    circleBody2
    // 车身刚体
    carBody
    constructor() {
        super()
        this.initUI()
    }

    initUI() {
        // let speedUpBtnAni = new FYGE.MovieClip(RES.getRes('尾气.svga'))
        // speedUpBtnAni.position.set(0,-10)
        // // this._speedUpBtnIcon.visible = false
        // this.addChild(speedUpBtnAni)



        const circle = this.circle = new FYGE.Shape();
        this.addChild(circle);
        // circledrawRoundedRect
        circle.beginFill(0xff0000, 0.5)
            .drawCircle(0, 0, 4)
            // .drawRoundedRect(0,0,40,40)
            .endFill();

        // new Box({width:40,height:40})
        const circleShape = new p2.Circle({ radius: 4 });
        //  new Circle({ radius: 20 });
        const circleBody  = this.circleBody = new p2.Body({
            mass: 1,    //重量
            position: [100, -210],
            // fixedRotation: true,
        });
        circleBody.addShape(circleShape);

        // world.addBody(circleBody);

        const circle2  = this.circle2= new FYGE.Shape();
        this.addChild(circle2);
        // circledrawRoundedRect
        circle2.beginFill(0xff0000, 0.5)
            .drawCircle(0, 0, 4)
            // .drawRoundedRect(0,0,40,40)
            .endFill();


        const circleShape2 = new p2.Circle({ radius: 4 });
        //  new Circle({ radius: 20 });
        const circleBody2  = this.circleBody2 = new p2.Body({
            mass: 1,    //重量
            position: [180, -210],
            // fixedRotation: true,
        });
        circleBody2.addShape(circleShape2);

        // world.addBody(circleBody2);

        // 车身
        const car = this.car = new FYGE.Shape();

        const role = car.addChild(FYGE.Sprite.fromUrl("//yun.duiba.com.cn/aurora/assets/b9a82aa3e1f0ab0dc2c2b7604ead33f215c9da4f.png"))
        role.position.set(0,-82)
        role.scale.set(0.5,0.5)
        // role.width = 150;
        // role.height = 15;

        this.addChild(car);
        // circledrawRoundedRect
        car.beginFill(0xff0000, 0.5)
            .drawRect(0, 0, 40, 80)
            // .drawRoundedRect(0,0,40,40)
            .endFill();

        const carShape = new p2.Box({ width: 40, height: 80 });
        //  new Circle({ radius: 20 });
        const carBody = this.carBody = new p2.Body({
            mass: 8,    //重量
            // position: [100, -410],
            // position: [180, -410],

            position: [140, -170],
            // fixedRotation: true,
        });
        carBody.addShape(carShape);

        // world.addBody(carBody);
    }
}