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
		shape.beginStroke(0xff0000, 1); // debug
		for (let i = 0; i < level1.length; i++) {
            for(let n = 0;n<level1[i].length;n++){
                const y = level1[i][n].y;
                heights.push(-y);   // 加入高度组
                shape.lineTo(this.offsetX+level1[i][n].x, y );   // debug
            }
			
		}
		shape.endStroke();  // debug



		//生成地面刚体
		//物理绘制
		const dx = 100;

		// 第一组地面
		const hfShape = new p2.Heightfield({
			heights: heights,
			elementWidth: dx,
		});
		const hfShapeBody = new p2.Body({
			mass: 0,
			position: [level1[0].x, -400],
		});
		hfShapeBody.addShape(hfShape);
		this.phyworld.addBody(hfShapeBody);

        //结束拦截
        const panelShape = new p2.Plane();
		const panelBody = new p2.Body({
			mass: 0,    //重量
			position:[level1[level1.length - 1].x, -(level1[level1.length - 1].y + 400)],//位置要改
		});
		panelBody.addShape(panelShape);

		panelBody.angle= Math.PI/2
		this.phyworld.addBody(panelBody);


		//添加各种障碍additives
		// for (let addi = 0; addi < this.additives.length; addi++) {
		// 	let coin = new Obstacle(this.additives[addi], world, this.box)
		// 	this.additiveslist.push(coin)

		// }
        
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
