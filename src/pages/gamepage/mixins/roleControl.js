import {
    RES_PATH
} from '../../../../sparkrc.js';
import Role from '../components/Role'
import p2 from 'p2/build/p2';
import Obstacle from '../components/Obstacle.js';
import EventBus from '@duiba/event-bus';

export const RoleControl = {
    role: null,
    // 双击
    timer: null,
    count: null,
    ifFly: false,

    addRole() {
        this.role = new Role()
        this.bgCon.addChild(this.role)

        this.addMaterial(this.heighshape)

		//添加各种障碍additives
        for (let addi = 0; addi < this.propInfo.length; addi++) {
            let coin = new Obstacle(this.propInfo[addi],this.lineInfo, this.phyworld, this.bgCon)
            this.additiveslist.push(coin)

        }
        this.phyworld.addBody(this.role.circleBody);
        this.phyworld.addBody(this.role.circleBody2);
        this.phyworld.addBody(this.role.carBody);
        let revoluteBack = new p2.LockConstraint(this.role.carBody, this.role.circleBody);
        let revoluteFront = new p2.LockConstraint(this.role.carBody, this.role.circleBody2);
        this.phyworld.addConstraint(revoluteBack);
        this.phyworld.addConstraint(revoluteFront);
    },
    addMaterial(heighshape) {
        var contactMaterial1 = new p2.ContactMaterial(heighshape.material, this.role.circleShape.material, {
            restitution: 0, // This means no bounce!
            surfaceVelocity: -82000,
            friction: 0.8
        });
        this.phyworld.addContactMaterial(contactMaterial1)

        var contactMaterial2 = new p2.ContactMaterial(heighshape.material, this.role.circleShape2.material, {
            restitution: 0, // This means no bounce!
            surfaceVelocity: -82000,
            friction: 0.8
        });
        this.phyworld.addContactMaterial(contactMaterial2)

        var contactMaterial3 = new p2.ContactMaterial(heighshape.material, this.role.carShape.material, {
            restitution: 0, // This means no bounce!
            surfaceVelocity: -82000,
            friction: 0
        });
        this.phyworld.addContactMaterial(contactMaterial3)


        
    console.log(this.line0)
    console.log(this.role.carBody,'this.role.carBody')

        // var prismatic = new p2.PrismaticConstraint(this.line1,  this.role.carBody, {
        //     localAnchorA :  [ 1, 0],    // Anchor point in bodyA, where the axis starts
        //     localAnchorB :  [-1, 0],    // Anchor point in bodyB, that will slide along the axis
        //     localAxisA :    [ 0, 1],    // An axis defined locally in bodyA
        //     upperLimit :    0.5,        // Upper limit along the axis
        //     lowerLimit :    -0.5,       // Lower limit along the axis
        // });
        // this.phyworld.addConstraint(prismatic);

        // var prismatic2 = new p2.PrismaticConstraint( this.line0,  this.role.carBody, {
        //     localAnchorA :  [ 1, 0],    // Anchor point in bodyA, where the axis starts
        //     localAnchorB :  [1, 1],    // Anchor point in bodyB, that will slide along the axis
        //     localAxisA :    [ 1, 0],    // An axis defined locally in bodyA
        //     upperLimit :    0.5,        // Upper limit along the axis
        //     lowerLimit :    -0.5,       // Lower limit along the axis
        // });
        // this.phyworld.addConstraint(prismatic2);


    },
    // 接触地面
    touchGround(){
        this.role.smokeSvga.visible = true
    },
    updateRole(stage) {
        if(!this.role){return}
        const x = this.role.circleBody.position[0];
        const y = -this.role.circleBody.position[1];

        const carBodyX = this.role.carBody.position[0];
        const carBodyY = -this.role.carBody.position[1];

        const circleBody2X = this.role.circleBody2.position[0];
        const circleBody2Y = -this.role.circleBody2.position[1];


        this.role.circle2.position.set(circleBody2X, circleBody2Y);
        this.role.car.position.set(carBodyX - 45, carBodyY - 56);

        this.role.circle.position.set(x, y);
        this.role.car.rotation = -this.role.carBody.angle / Math.PI * 180

        this.bgCon.x = -x + stage.width / 8 +this.offsetX//镜头跟随
        this.bgCon.y = -y + stage.height * 0.4
        
    },

    roleContact(e) {
        if (
            (e.bodyA == this.role.circleBody && e.bodyB == this.line0) ||
            (e.bodyB == this.role.circleBody && e.bodyA == this.line0) ||
            (e.bodyA == this.role.circleBody2 && e.bodyB == this.line0) ||
            (e.bodyB == this.role.circleBody2 && e.bodyA == this.line0)||
            (e.bodyA == this.role.carBody && e.bodyB == this.line0) ||
            (e.bodyB == this.role.carBody && e.bodyA == this.line0)
        ) {
            // console.log(e)
            // console.log(hfShapeBody)
            this.role.carBody.fixedRotation = false
            console.log('碰撞到地面了1')
            this.touchGround()
            this.count = 0
            // this.role.carBody.angle = 0
        }else if (
            (e.bodyA == this.role.circleBody && e.bodyB == this.line1) ||
            (e.bodyB == this.role.circleBody && e.bodyA == this.line1) ||
            (e.bodyA == this.role.circleBody2 && e.bodyB == this.line1) ||
            (e.bodyB == this.role.circleBody2 && e.bodyA == this.line1) ||
            (e.bodyA == this.role.carBody && e.bodyB == this.line1) ||
            (e.bodyB == this.role.carBody && e.bodyA == this.line1)
        ) {
            // console.log(e)
            // console.log(hfShapeBody)
            this.role.carBody.fixedRotation = false
            console.log('碰撞到地面了2')
            this.touchGround()
            this.count = 0
            // this.role.carBody.angle = 0
        }else if (
            e.bodyA.id == this.endId || e.bodyB.id == this.endId
        ) {
            // console.log(e)
            // console.log(hfShapeBody)
            this.role.carBody.fixedRotation = false
            console.log('游戏结束')
			this.count = 0
			this.gameWin();
            // this.role.carBody.angle = 0
        }else{
			for(let i =0; i<this.additiveslist.length;i++){
				if( e.bodyB.id == this.additiveslist[i].rectBody.id
					|| e.bodyA.id == this.additiveslist[i].rectBody.id){
						if(this.additiveslist[i].type == "snow"){
							this.phyworld.removeBody(this.additiveslist[i].rectBody)
							this.bgCon.removeChild(this.additiveslist[i].rectcoin)
							console.log("getCoin")
						}else {
                            this.role.carBody.sleep()
							this.role.circleBody.sleep()
							this.role.circleBody2.sleep()
                            this.count = 0;

							console.log("die")
							this.gameEnd = true
							this.dieItem = this.additiveslist[i]
                            this.role.smokeSvga.visible = false
							
                            EventBus.fire('GAME_OVER')
						}
					}
			}
			
		}
	},
	//复活
	reviveCar(){
        this.gameEnd = false
		if(this.dieItem){
			this.phyworld.removeBody(this.dieItem.rectBody)
		    this.bgCon.removeChild(this.dieItem.rectcoin)
		}	
		
		this.role.carBody.wakeUp()
		this.role.circleBody.wakeUp()
		this.role.circleBody2.wakeUp()
	},
	//死亡
	dieCar(){

	},
	//游戏结束
	gameWin(){
		this.role.carBody.sleep()
		this.role.circleBody.sleep()
		this.role.circleBody2.sleep()
        EventBus.fire('GAME_WIN')
		alert("游戏结束")
		
	}
	

}