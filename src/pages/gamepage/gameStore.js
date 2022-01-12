import { makeAutoObservable } from 'mobx';
import { level, level1 } from '@src/lujingInfo/lujing';
import p2 from 'p2/build/p2'
const gameStore = makeAutoObservable({

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
