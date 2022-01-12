import { makeAutoObservable } from 'mobx';
import { level, level1 } from '@src/lujingInfo/lujing';
import p2 from 'p2/build/p2';
import Role from './components/Role'

const gameStore = makeAutoObservable({

	role:null,
	// 双击
	timer:null,
	count:null,

    bgCon:'',
    phyCon:'',
    offsetX:'',
    offsetY:'',

    initUI() {
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
        


    },

	addRole(){
		this.role = new Role()
		this.bgCon.addChild(this.role)

		this.phyworld.addBody(this.role.circleBody);
		this.phyworld.addBody(this.role.circleBody2);
		this.phyworld.addBody(this.role.carBody);
		let revoluteBack = new p2.LockConstraint(this.role.carBody, this.role.circleBody);
		let revoluteFront = new p2.LockConstraint(this.role.carBody, this.role.circleBody2);
		this.phyworld.addConstraint(revoluteBack);
		this.phyworld.addConstraint(revoluteFront);
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

		// console.log(carBody.angle)


		this.bgCon.x = -x + stage.width / 4   //镜头跟随
		this.bgCon.y = -y + stage.height / 4

		this.role.circle.position.set(x, y);
		// console.log(circleBody.angle)
		this.role.car.rotation = -this.role.carBody.angle / Math.PI * 180
	},


	clickStage(){
		const x = this.role.circleBody.position[0];
		const y = -this.role.circleBody.position[1];

		const x2 = this.role.circleBody2.position[0];
		const y2 = -this.role.circleBody2.position[1];

		this.timer = setTimeout(() => { // 初始化一个延时
			if (this.count === 1) {
				this.role.carBody.angle = 0
				this.role.carBody.fixedRotation = true

				console.log('单击')
				/* 单击后要处理的业务 */
				this.role.carBody.applyForce([0, 2 * 100000], [0, 0]);
			} else {
				this.role.carBody.angle = 0

				this.role.carBody.fixedRotation = true

				console.log('双击')
				/* 双击后要处理的业务 */
				this.role.carBody.applyForce([0, 2 * 180000], [0, 0]);
			}
			clearTimeout(this.timer)
			this.count = 0
		}, 300)
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
		this.shape0.beginStroke(0xff0000, 4); // debug
		for (let i = 0; i < 20; i++) {
			const y = level1[i];
			heights.push(-y);   // 加入高度组
			this.shape0.lineTo( i*100, y + 300);   // debug
		}
		this.shape0.endStroke();  // debug


		//生成地面刚体
		//物理绘制
		const dx = 100;

        // 第一组地面
        
		const heighshape = new p2.Heightfield({
			heights: heights,
			elementWidth: dx,
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
			position: [(level1.length-1)*100, -(level1[level1.length - 1] + 360)],
		});
		panelBody.addShape(panelShape);

		panelBody.angle= Math.PI/2
		this.phyworld.addBody(panelBody);


		//添加各种障碍additives
		// for (let addi = 0; addi < this.additives.length; addi++) {
		// 	let coin = new Obstacle(this.additives[addi], world, this.bgCon)
		// 	this.additiveslist.push(coin)

		// }
        
    },
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
		console.log((subdivision*20-1)*100,level1[subdivision*20-1])//为啥查一个
		//绘制地面线路
		useShape.beginStroke(0xff0000, 4); // debug
		for (let i = subdivision*20-1; i < (subdivision*20+20<level1.length?subdivision*20+20:level1.length); i++) {
			const y = level1[i];
			heights.push(-y);   // 加入高度组
			useShape.lineTo( i*100, y + 300);   // debug
		}
		useShape.endStroke();  // debug



		//生成地面刚体
		//物理绘制
		const dx = 100;

		// 第一组地面
		const hfShapeshape = new p2.Heightfield({
			heights: heights,
			elementWidth: dx,
		});
		useLine.addShape(hfShapeshape);
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
			this.world.removeBody(this.line0);
		}else{
			this.bgCon.removeChild(this.shape1)
			this.world.removeBody(this.line1);
		}
		if(useLine && useShape){
			
		}else{
			console.log("移除了")
		}
		console.log(this.bgCon.children)
		
		
	},
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
