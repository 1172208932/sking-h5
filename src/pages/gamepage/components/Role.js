import p2 from 'p2/build/p2';

const Sprite = FYGE.Sprite;
const Shape = FYGE.Shape;

export default class Role extends Sprite {
    // 前轮
    circle

    circleShape
    circleShape2
    carShape
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

    roleSkin
    jump1
    jump2
    smokeSvga

    constructor() {
        super()
        this.initUI()
    }

    jumpRole1() {
        this.smokeSvga.visible = false
        this.roleSkin.visible = false
        this.jump1.visible = true
        this.jump1.startAniRange(0, this.jump1.totalFrames, 1, () => {
            this.roleSkin.visible = true
            this.jump1.visible = false
        });
    }

    jumpRole2() {
        this.roleSkin.visible = false
        this.jump2.visible = true
        this.jump2.startAniRange(0, this.jump2.totalFrames, 1, () => {
            this.roleSkin.visible = true
            this.jump2.visible = false
        });
    }

    initUI() {
        // let speedUpBtnAni = new FYGE.MovieClip(RES.getRes('尾气.svga'))
        // speedUpBtnAni.position.set(0,-10)
        // // this._speedUpBtnIcon.visible = false
        // this.addChild(speedUpBtnAni)
        // 烟雾
        SvgaParser.loadSvga('https://yun.duiba.com.cn/aurora/assets/da64169b4e806806999ba8bf73e95ba7539dfd99.svga', (data) => {
            console.log(this, 'this')
            //创建SvgaAni对象
            const svga = this.smokeSvga = this.car.addChild(new FYGE.SvgaAni(data));

            // svga.anchorTexture.set(1, 1);

            //设置svga位置~
            svga.position.set(-180, -40 + 56);
            svga.visible = false

            //从0到最后一帧播放一次动画，并进行回调
            svga.startAniRange(0, svga.totalFrames, 0);
        })

        // 一段跳
        SvgaParser.loadSvga('https://yun.duiba.com.cn/aurora/assets/948a86510f6f12d4cfc3f52a23a165fb0b75b5ec.svga', (data) => {
            //创建SvgaAni对象
            this.jump1 = this.car.addChild(new FYGE.SvgaAni(data));
            this.jump1.position.set(-13, -85 + 56);
            this.jump1.stop(0)
            this.jump1.visible = false

        })

        // 二段跳
        SvgaParser.loadSvga('https://yun.duiba.com.cn/aurora/assets/865da1fc8b0ea72c473cc23a61189f55277f53e0.svga', (data) => {
            //创建SvgaAni对象
            this.jump2 = this.car.addChild(new FYGE.SvgaAni(data));
            this.jump2.position.set(-12, -85 + 56);
            this.jump2.stop(0)
            this.jump2.visible = false
        })

        const circle = this.circle = new FYGE.Shape();
        this.addChild(circle);
        // circledrawRoundedRect
        circle.beginFill(0xff0000, 0.5)
            .drawCircle(0, 0, 8)
            // .drawRoundedRect(0,0,40,40)
            .endFill();

        // new Box({width:40,height:40})
        const circleShape = this.circleShape = new p2.Circle({
            radius: 8,
            material: new p2.Material()
        });
        //  new Circle({ radius: 20 });
        const circleBody = this.circleBody = new p2.Body({
            mass: 1, //重量
            position: [100, -210],
            // fixedRotation: true,
        });
        circleBody.addShape(circleShape);

        // world.addBody(circleBody);

        const circle2 = this.circle2 = new FYGE.Shape();
        this.addChild(circle2);
        // circledrawRoundedRect
        circle2.beginFill(0xff0000, 0.5)
            .drawCircle(0, 0, 8)
            // .drawRoundedRect(0,0,40,40)
            .endFill();


        const circleShape2 = this.circleShape2 = new p2.Circle({
            radius: 8,
            material: new p2.Material()
        });
        //  new Circle({ radius: 20 });
        const circleBody2 = this.circleBody2 = new p2.Body({
            mass: 1, //重量
            position: [180, -210],
            // fixedRotation: true,
        });
        circleBody2.addShape(circleShape2);

        // world.addBody(circleBody2);

        // 车身
        const car = this.car = new FYGE.Shape();
        const role = this.roleSkin = car.addChild(FYGE.Sprite.fromUrl("//yun.duiba.com.cn/aurora/assets/b9a82aa3e1f0ab0dc2c2b7604ead33f215c9da4f.png"))
        role.anchorTexture.set(0, 1);
        role.position.set(0, 36 + 56)
        role.scale.set(0.5, 0.5)
        // role.width = 150;
        // role.height = 15;

        this.addChild(car);
        // circledrawRoundedRect
        car.beginFill(0xff0000, 0.5)
            .drawRect(0, 0, 90, 113)
            // .drawRoundedRect(0,0,40,40)
            .endFill();

        const carShape = this.carShape = new p2.Box({
            width: 90,
            height: 113,
            material: new p2.Material()
        });
        //  new Circle({ radius: 20 });
        const carBody = this.carBody = new p2.Body({
            mass: 2, //重量
            // position: [100, -410],
            // position: [180, -410],
            angularDamping: 1,
            position: [140, -170],
            collisionResponse:false
            // fixedRotation: true,
        });
        carBody.addShape(carShape);

        // world.addBody(carBody);
    }
}