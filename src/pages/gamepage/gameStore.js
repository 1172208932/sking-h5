import { makeAutoObservable } from 'mobx';
import { level, level1 } from '@src/lujingInfo/lujing';
import p2 from 'p2/build/p2';
import Role from './components/Role'
import { RES_PATH } from '../../../sparkrc.js';

const gameStore = makeAutoObservable({

	role:null,
	// 双击
	timer:null,
	count:null,
	ifFly:false,
	heighshape:null,
	hfShapeshape:null,
    bgCon:'',
    phyCon:'',
    offsetX:'',
    offsetY:'',
    bgArea1:'',
    bgArea2:'',

    bgList:'',
    lineInfo:'',
    propInfo:'',
    getData(){
        this.lineInfo = level1
        this.propInfo = ""
        this.createPhysicsWorld()
    },

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

		this.bgArea2.addChild(FYGE.Sprite.fromUrl( `${RES_PATH}GamePage/level1/sky.png`))
        FYGE.GlobalLoader.loadImage((s, image) => {
            //纹理
            var texture = FYGE.Texture.fromImage(image);
            //显示对象
            var spr = new FYGE.Sprite(texture)
            spr.y = 86
			console.log(spr.width,'width')
            this.bgArea2.addChild(spr)
			var spr2 = new FYGE.Sprite(texture)
            spr2.y = 86
			spr2.x = spr.width
			this.bgArea2.addChild(spr2)
        }, `${RES_PATH}GamePage/level1/skylast.png`)

        FYGE.GlobalLoader.loadImage((s, image) => {
            //纹理
            var texture = FYGE.Texture.fromImage(image);
			console.log(this.offsetY,'this.offsetY')
            //显示对象
            var spr = new FYGE.Sprite(texture)
            spr.y = 184+this.offsetY
			console.log(spr.width,'width')
            this.bgArea1.addChild(spr)
			var spr2 = new FYGE.Sprite(texture)
            spr2.y = 184+this.offsetY
			spr2.x = spr.width
			this.bgArea1.addChild(spr2)
        }, `${RES_PATH}GamePage/level1/bg1.png`)

    },
    MoveBg(){

    },
    stopMoveBg(){

    },
    subdivision:0,
	addRole(){
		this.role = new Role()
		this.bgCon.addChild(this.role)

		this.addMaterial(this.heighshape)
		
		this.phyworld.addBody(this.role.circleBody);
		this.phyworld.addBody(this.role.circleBody2);
		this.phyworld.addBody(this.role.carBody);
		let revoluteBack = new p2.LockConstraint(this.role.carBody, this.role.circleBody);
		let revoluteFront = new p2.LockConstraint(this.role.carBody, this.role.circleBody2);
		this.phyworld.addConstraint(revoluteBack);
		this.phyworld.addConstraint(revoluteFront);
	},

	addMaterial(heighshape){
		var contactMaterial1  = new p2.ContactMaterial(heighshape.material,this.role.circleShape.material, {
			restitution: 0, // This means no bounce!
			surfaceVelocity: -82000,
			friction: 0.8
		});
		this.phyworld.addContactMaterial(contactMaterial1)

		var contactMaterial2 =new p2.ContactMaterial(heighshape.material,this.role.circleShape2.material, {
			restitution: 0, // This means no bounce!
			surfaceVelocity: -82000,
			friction: 0.8
		});
		this.phyworld.addContactMaterial(contactMaterial2)

		var contactMaterial3  = new p2.ContactMaterial(heighshape.material,this.role.carShape.material, {
			restitution: 0, // This means no bounce!
			surfaceVelocity: -82000,
			friction: 0
		});
		this.phyworld.addContactMaterial(contactMaterial3)
	},

	enterFrame( stage){
		this.phyworld.step(1 / 60);

		const x = this.role.circleBody.position[0];
		const y = -this.role.circleBody.position[1];

		const carBodyX = this.role.carBody.position[0];
		const carBodyY = -this.role.carBody.position[1];

		const circleBody2X = this.role.circleBody2.position[0];
		const circleBody2Y = -this.role.circleBody2.position[1];


		this.role.circle2.position.set(circleBody2X, circleBody2Y);
		this.role.car.position.set(carBodyX - 40, carBodyY);



		this.bgCon.x = -x + stage.width / 4   //镜头跟随
        this.bgCon.y = -y + stage.height *0.6
        // this.bgArea.x = -x + stage.width / 4 ;
		
		// 滚动背景
		if(this.bgArea2.x <= -4872){
			this.bgArea2.x = -1624
		}
		this.bgArea2.x = this.bgArea2.x -1
		if(this.bgArea1.x <= -4872){
			this.bgArea1.x = -1624
		}
		this.bgArea1.x = this.bgArea1.x -9
		this.role.circle.position.set(x, y);
        this.role.car.rotation = -this.role.carBody.angle / Math.PI * 180
        
        // 位置
        if(this.role.carBody.position[0]> 2000*(this.subdivision+1)-500 ){
            this.subdivision++;
            this.removetype = true
            this.addLine(this.subdivision,this.phyworld)

        }
        if(this.role.carBody.position[0]>this.subdivision*2000 && this.removetype){
            console.log("remove")
            this.removetype = false
            this.removeLine((this.subdivision-1),this.phyworld)
        }
	},


	clickStage(){
		if(this.count >1){return}
		const x = this.role.circleBody.position[0];
		const y = -this.role.circleBody.position[1];

		const x2 = this.role.circleBody2.position[0];
		const y2 = -this.role.circleBody2.position[1];

		this.role.carBody.angle = 0
		this.role.carBody.fixedRotation = true


		this.role.carBody.applyForce([0, 2 * 100000], [0, 0]);
		this.count ++;
	},
    phyworld:'',
    additiveslist:[],
    createPhysicsWorld(){
        this.phyworld = new p2.World({
			gravity: [0, -982]
        });
        //划线
        var heights = [];
        const shape = new FYGE.Shape(); // debug
        this.bgCon.addChild(shape);   // debug
        
		//绘制地面线路
		
        this.shape0 = new FYGE.Shape(); // debug
		this.bgCon.addChild(this.shape0);   // debug
		//绘制地面线路
		// let level1 = [ 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110,]
        
		this.shape0.beginStroke(0xff0000, 4); // debug
		for (let i = 0; i < 20; i++) {
			const y = this.lineInfo[i];
			heights.push(-y);   // 加入高度组
            this.shape0.lineTo( i*100, y + 300);   // debug
            if(i>0)
            this.shape0.addChild(this.stockArea(i))
        }
        
        this.shape0.endStroke();  // debug
        
        // Shapestock.beginGradientFill([])


		//生成地面刚体
		//物理绘制
		const dx = 100;

        // 第一组地面
		const heighshape = this.heighshape = new p2.Heightfield({
			heights: heights,
			elementWidth: dx,
			material:new p2.Material()
		});
		this.line0 = new p2.Body({
			mass: 0,
			position: [0, -300],
		});
		this.line0.addShape(heighshape);
		this.phyworld.addBody(this.line0);

        //结束拦截
        const panelShape = new p2.Plane();
		const panelBody = new p2.Body({
			mass: 0,    //重量
			position: [(this.lineInfo.length-1)*100, -(this.lineInfo[this.lineInfo.length - 1] + 360)],
		});
		panelBody.addShape(panelShape);

		panelBody.angle= Math.PI/2
		this.phyworld.addBody(panelBody);


		//添加各种障碍additives
		// for (let addi = 0; addi < this.additives.length; addi++) {
		// 	let coin = new Obstacle(this.additives[addi], world, this.bgCon)
		// 	this.additiveslist.push(coin)

		// }

		this.listenContact()
    },

	listenContact(){
		//碰装检测
		this.phyworld.on("beginContact", (e) => {

			let pengzhuangID = 0;
			pengzhuangID = e.bodyB.id

			// debugger
			// console.log(hfShapeBody)

			if (
				(e.bodyA.id == this.role.circleBody.id && e.bodyB.id == this.line0.id) ||
				(e.bodyB.id == this.role.circleBody.id && e.bodyA.id == this.line0.id) ||
				(e.bodyA == this.role.circleBody2 && e.bodyB == this.line0) ||
				(e.bodyB == this.role.circleBody2 && e.bodyA == this.line0)
			) {
				// console.log(e)
				// console.log(hfShapeBody)
				this.role.carBody.fixedRotation = false
				console.log('碰撞到地面了')
				this.count = 0
				// this.role.carBody.angle = 0
			}
			if (
				(e.bodyA.id == this.role.circleBody.id && e.bodyB.id == this.line1.id) ||
				(e.bodyB.id == this.role.circleBody.id && e.bodyA.id == this.line1.id) ||
				(e.bodyA == this.role.circleBody2 && e.bodyB == this.line1) ||
				(e.bodyB == this.role.circleBody2 && e.bodyA == this.line1)
			) {
				// console.log(e)
				// console.log(hfShapeBody)
				this.role.carBody.fixedRotation = false
				console.log('碰撞到地面了')
				this.count = 0
				// this.role.carBody.angle = 0
			}

			// for (let i = 0; i < this.additives.length; i++) {
			// 	// console.log(this.additiveslist[i].rectBody.id)
			// 	if (pengzhuangID == this.additiveslist[i].rectBody.id) {
			// 		if (this.additiveslist[i].type == "coin" || this.additiveslist[i].type == "bigcoin") {
			// 			world.removeBody(this.additiveslist[i].rectBody)
			// 			this.box.removeChild(this.additiveslist[i].rectcoin)
			// 			console.log("getCoin")
			// 		} else {
			// 			console.log("die")
			// 		}
			// 	}
			// }
		})
    },
    
    //后续延展刚体
	line0:'',
    line1:'',
    shape0:'',
    shape1:'',
    addLine(subdivision,world){
		console.log("???")
		var heights = []
		var useShape;
		var useLine;
		if(subdivision%2 == 0){
			this.shape0 = new FYGE.Shape();
			this.bgCon.addChild(this.shape0);
			useShape = this.shape0
			this.line0 = new p2.Body({
				mass: 0,
				position: [(subdivision*20-1)*100, -300],
			});
			world.addBody(this.line0);
			useLine = this.line0
		}else{
			this.shape1 = new FYGE.Shape();
			this.bgCon.addChild(this.shape1);
			useShape = this.shape1
			this.line1 = new p2.Body({
				mass: 0,
				position: [(subdivision*20-1)*100, -300],
			});
			world.addBody(this.line1);
			useLine = this.line1
		}
		console.log((subdivision*20-1)*100,this.lineInfo[subdivision*20-1])//为啥查一个
		//绘制地面线路
		useShape.beginStroke(0xff0000, 4); // debug
		for (let i = subdivision*20-1; i < (subdivision*20+20<this.lineInfo.length?subdivision*20+20:this.lineInfo.length); i++) {
			const y = this.lineInfo[i];
			heights.push(-y);   // 加入高度组
            useShape.lineTo( i*100, y + 300);   // debug
            useShape.addChild(this.stockArea(i))
		}
		useShape.endStroke();  // debug



		//生成地面刚体
		//物理绘制
		const dx = 100;

		// 第一组地面
		const hfShapeshape = this.hfShapeshape = new p2.Heightfield({
			heights: heights,
			elementWidth: dx,
			material:new p2.Material()
		});
		useLine.addShape(hfShapeshape);

		this.addMaterial(this.hfShapeshape)

	},
	removeLine(subdivision,world){
		if(subdivision<0){
			return
		}
		console.log(subdivision)
		var useShape;
		var useLine;
		if(subdivision%2 == 0){
			this.bgCon.removeChild(this.shape0)
			world.removeBody(this.line0);
		}else{
			this.bgCon.removeChild(this.shape1)
			world.removeBody(this.line1);
		}
		if(useLine && useShape){
			
		}else{
			console.log("移除了")
		}
		console.log(this.bgCon.children)
		
		
    },
    //填充
    stockArea(i){
        console.log(i,"当前")
        if(i<160){
            return
        }
        var Shapestock = new FYGE.Shape();
        Shapestock.beginGradientFill([0,0,0,this.lineInfo[i]+800],[[0,"#ffffff",1],[1,'#82b1e3',1]])
        Shapestock.lineTo((i-1)*100, (this.lineInfo[i-1]) + 300)
        Shapestock.lineTo(i*100, this.lineInfo[i] + 300)
        Shapestock.lineTo(i*100,  this.lineInfo[i]+500)
        Shapestock.lineTo((i-1)*100,  this.lineInfo[i]+500)
        Shapestock.endFill()
        return Shapestock;
    }
});
export default gameStore;


export class Obstacle {
	type = ""
	rectShape;//刚体形状
	rectBody;//刚体
	rectcoin;//展示节点
	constructor(item, world, box) {
		this.type = item.type
		this.rectShape = new p2.Box({ width: 40, height: 80 });
		//  new Circle({ radius: 20 });
		this.rectBody = new p2.Body({
			mass: 0,    //重量
			position: [item.x, -item.y],
			// fixedRotation: true,
		});
		this.rectBody.addShape(this.rectShape);

		world.addBody(this.rectBody);

		this.rectcoin = new FYGE.Shape();
		box.addChild(this.rectcoin);
		// circledrawRoundedRect
		if(this.type == "bigstone"){
			this.rectcoin.beginFill(0xff0000, 0.5)
			.drawRect(0, 0, 40, 80)
			// .drawRoundedRect(0,0,40,40)
			.endFill();
		}else {
			this.rectcoin.beginFill(0xff0000, 0.5)
			.drawRect(0, 0, 40, 40)
			// .drawRoundedRect(0,0,40,40)
			.endFill();
		}
		
		this.rectcoin.position.set(item.x, item.y)
	}

}
