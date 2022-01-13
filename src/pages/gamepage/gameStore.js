import { makeAutoObservable } from 'mobx';
import { level, level1 } from '@src/lujingInfo/lujing';
import p2 from 'p2/build/p2';
import { RES_PATH } from '../../../sparkrc.js';
import { mix } from './mix';
import { Background } from './mixins/background.js';
import { RoleControl } from './mixins/roleControl.js'
const gameStore = makeAutoObservable(mix({
	heighshape:null,
	hfShapeshape:null,
    bgCon:'',
    phyCon:'',
    offsetX:'',
    offsetY:'',

    bgList:'',
    lineInfo:'',
    propInfo:'',
    getData(){
        this.lineInfo = level1
        this.propInfo = ""
        this.createPhysicsWorld()
    },

    stopMoveBg(){

    },

    subdivision:0,

	enterFrame( stage){
		this.phyworld.step(1 / 60);

		this.updateRole(stage)

        // this.bgArea.x = -x + stage.width / 4 ;

		this.MoveBg()
        
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

			this.roleContact(e)

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
},Background,RoleControl));
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
