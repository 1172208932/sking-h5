import {
    RES_PATH
} from '../../../../sparkrc.js';
import Role from '../components/Role'
import p2 from 'p2/build/p2';
import Obstacle from '../components/Obstacle.js';
import EventBus from '@duiba/event-bus';
import store from '@src/store/index.js';
import { playSound, stopSound, preloadSounds, registerSounds } from '@spark/utils';

const sorceConfig = {
    "snow":10,
    "gem":30
}

export const RoleControl = {
    role: null,
    // 双击
    timer: null,
    // 跳跃次数
    count: null,
    ifFly: false,
    score:0,
    isCallWin:false,
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

        // 锁性约束
        // let revoluteBack = new p2.LockConstraint(this.role.carBody, this.role.circleBody);
        // let revoluteFront = new p2.LockConstraint(this.role.carBody, this.role.circleBody2);
        // this.phyworld.addConstraint(revoluteBack);
        // this.phyworld.addConstraint(revoluteFront);


        // 弹性约束
        var c1 = new p2.PrismaticConstraint(this.role.carBody,this.role.circleBody,{
            localAnchorA : [-45,-46],
            localAnchorB : [0,0],
            localAxisA : [0,1],
            disableRotationalLock : true,
        });
        var c2 = new p2.PrismaticConstraint(this.role.carBody,this.role.circleBody2,{
            localAnchorA : [ 45,-46],
            localAnchorB : [0,0],
            localAxisA : [0,1],
            disableRotationalLock : true,
        });
        c1.setLimits(-8, 8);
        c2.setLimits(-8, 8);
        this.phyworld.addConstraint(c1);
        this.phyworld.addConstraint(c2);


        // 车轮约束
        // var vehicle = new p2.TopDownVehicle(this.role.carBody);
        // var frontWheel = vehicle.addWheel({
        //     localPosition: [0, 0.5] // front
        // });
        // frontWheel.setSideFriction(4);

        // var backWheel = vehicle.addWheel({
        //     localPosition: [0, -0.5] // back
        // });
        // backWheel.setSideFriction(3); // Less side friction on back wheel makes it easier to drift
        // vehicle.addToWorld( this.phyworld);
        // frontWheel.steerValue = Math.PI / 16;
        // backWheel.engineForce = 10;
        // backWheel.setBrakeForce(0);
    },
    addMaterial(heighshape) {
        var contactMaterial1 = new p2.ContactMaterial(heighshape.material, this.role.circleShape.material, {
            restitution: 0, // This means no bounce!
            surfaceVelocity: -82000,
            friction: 0.2,
        });
        this.phyworld.addContactMaterial(contactMaterial1)

        var contactMaterial2 = new p2.ContactMaterial(heighshape.material, this.role.circleShape2.material, {
            restitution: 0, // This means no bounce!
            surfaceVelocity: -82000,
            friction: 0.2
        });
        this.phyworld.addContactMaterial(contactMaterial2)

        var contactMaterial3 = new p2.ContactMaterial(heighshape.material, this.role.carShape.material, {
            restitution: 0, // This means no bounce!
            surfaceVelocity: -82000,
            friction: 0.2,
            frictionRelaxation: 0.3,
            // relaxation:40,
        });
        this.phyworld.addContactMaterial(contactMaterial3)


        
    // console.log(this.line0)
    // console.log(this.role.carBody,'this.role.carBody')

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
        if(this.role?.smokeSvga){
            this.role.smokeSvga.visible = true
        }
        
    },
    updateRole(stage) {
        if(!this.role){return}
        const x = this.role.circleBody.position[0];
        const y = -this.role.circleBody.position[1];
        if(x >= 8941 && x <= 9045 && this.slowState == false && store.currentGameLevel == 1){
            this.slowState = true
        }

        const carBodyX = this.role.carBody.position[0];
        const carBodyY = -this.role.carBody.position[1];

        const circleBody2X = this.role.circleBody2.position[0];
        const circleBody2Y = -this.role.circleBody2.position[1];


        // this.role.circle2.position.set(circleBody2X, circleBody2Y);
        this.role.car.position.set(carBodyX - 45, carBodyY - 56);

        // this.role.circle.position.set(x, y);
        this.role.car.rotation = -this.role.carBody.angle / Math.PI * 180
        
        if( this.gameEnd ){ return }

        // console.log(-x + stage.width / 8 +this.offsetX - 300 ,-y + stage.height * 0.6)
        // if( -x + stage.width / 8 +this.offsetX - 300 > 700 ){return}
        // if( -y + stage.height * 0.6 < this.bgCon.y){return}

        // console.log(this.bgCon,'this.bgCon')
        
        this.bgCon.x = -x + stage.width / 8 +this.offsetX - 300//镜头跟随
        this.bgCon.y = -y + stage.height * 0.6
        
        
    },

    roleContact(e) {

        if(
            (e.bodyA == this.role.carBody && e.bodyB == this.line0) ||
            (e.bodyB == this.role.carBody && e.bodyA == this.line0) ||
            (e.bodyA == this.role.carBody && e.bodyB == this.line1) ||
            (e.bodyB == this.role.carBody && e.bodyA == this.line1)
        ){
            this.role.carBody.fixedRotation = false
            if( this.isSecondJump ){
			    this.role.playDownSvga()
                this.isSecondJump = false
            }
            console.log('碰撞到地面了1')
            this.touchGround()
            this.count = 0
        } else if (
            e.bodyA.id == this.endId || e.bodyB.id == this.endId
        ) {
            if(this.isCallWin){return}
            this.isCallWin = true
            // console.log(e)
            // console.log(hfShapeBody)
            // this.role.carBody.fixedRotation = false
            // console.log('游戏结束')
			// this.count = 0
			// this.gameWin();
            // this.role.carBody.angle = 0
        }else{
			for(let i =0; i<this.additiveslist.length;i++){
				if( 
                    (e.bodyB == this.role.carBody && e.bodyA == this.additiveslist[i].rectBody) ||
                    (e.bodyA == this.role.carBody && e.bodyB == this.additiveslist[i].rectBody)
                ){
						if(this.additiveslist[i].type == "snow" || this.additiveslist[i].type == "gem"){
                            console.warn(this.additiveslist[i].rectcoin.x,this.additiveslist[i].rectcoin.y)
							this.phyworld.removeBody(this.additiveslist[i].rectBody)
							this.bgCon.removeChild(this.additiveslist[i].rectcoin)
                            this.score =this.score + sorceConfig[this.additiveslist[i].type]

                            this.snowSvga.startAniRange(0, undefined, 1,()=>{
                                this.snowSvga.visible = false
                            });
                            this.snowSvga.visible = true
                            
                            this.snowSvga.position.set(this.additiveslist[i].x,this.additiveslist[i].y-this.additiveslist[i].height*0.6)

                            if(this.additiveslist[i].type == "snow"){
                                if( !store.isPlayMusic ){ return}
                                preloadSounds(null, () => {
                                    playSound('game_snow', { 'loop': false })
                                  })
                            }

                            if(this.additiveslist[i].type == "gem"){
                                if( !store.isPlayMusic ){ return}
                                preloadSounds(null, () => {
                                    playSound('game_gem', { 'loop': false })
                                  })
                            }
						}else {
                            console.error(this.additiveslist[i].rectcoin.x,this.additiveslist[i].rectcoin.y)
                            // this.role.carBody.sleep()
							// this.role.circleBody.sleep()
							// this.role.circleBody2.sleep()
                            // this.count = 0;
                           
							// console.log("die")
							// this.gameEnd = true
							// this.dieItem = this.additiveslist[i]
                            // this.role.smokeSvga.visible = false
                            // let showtype = ""
                            // if(this.additiveslist[i].type == "grass"){
                            //     showtype = "grassSvga"
                            // }else if(this.additiveslist[i].type == "stone" || this.additiveslist[i].type == "bigstone"){
                            //     // console.log(this.additiveslist[i].rectcoin.x,this.additiveslist[i].rectcoin.y,'stone')
                            //     showtype = "stoneSvga"
                            // }else if(this.additiveslist[i].type == "house"){
                            //     showtype = "houseSvga"
                            // }
                            // this[showtype].startAniRange(0, undefined, 1,()=>{
                            //     this[showtype].visible = false
                            //     EventBus.fire('GAME_OVER',{score:this.score})
                            // });
                            // this[showtype].visible = true
                            
                            // this[showtype].position.set(this.additiveslist[i].x,this.additiveslist[i].y-this.additiveslist[i].height*0.6)
                            
                            
                           
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
        this.gameEnd = true
		this.role.carBody.sleep()
		this.role.circleBody.sleep()
		this.role.circleBody2.sleep()
        EventBus.fire('GAME_WIN',{score:this.score})
		// alert("游戏结束")
	}
	

}