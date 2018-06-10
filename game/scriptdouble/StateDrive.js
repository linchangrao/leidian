//此对象的实例必须设置为对象数组的第一个项
function StateDrive(life, score,bosslife,lifetwo,level, grade) {
	BasicObject.call(this, 0, 0, 999);
	
	this.life = 8;//飞机的血量
	
	this.lifetwo =8;
	
	
	this.score = (!isNaN(score) && score > 0) ? score : 0;
	this.grade = (!isNaN(grade) && grade > 0) ? grade : 0;
	
	this.level = 1;
	
	
	this.bosslevel=1;
	
	
	this.bosslife=50;//boss血量


	
	
	const SURVIVE_INTERVAL = 15;//声明生存间隔为15 SURVIVE_INTERVAL
	const OVER_INTERVAL = 2;//声明过渡间隔为2 OVER_INTERVAL
	const GAME_CLEARANCE = 2; //声明通关
	
	this.isDead = false; //定义死亡的时候直接false
	this.towDead =false;//定义死亡的时候直接false
	

	this.timer = 0; //定义计时器初始时间为0
	
	this.enemyAppearTimer = 0.2; //敌人出现定时器
	this.apearInterval = 1.1;//间隔
	this.fireInterval = 1.5; //射击间隔
	
	this.bombAppearTimer = 5; //炸弹出现计时器
	this.bombInterval = 5; //炸弹间隔
	var bombPoint = new Array();//轰炸点
	
	this.muEyeNum = 0;//眼睛？
	this.muTimer = 0;//定时器
	this.muInterval = 4;//眼睛间隔
	
	this.bossNum =1; //boss 
	this.bosstime =0;	
	this.bossInterval =60;//boss出现时间
	
	var muPath1; //声明路径1
	
	var muPath2; //声明路径2
	var bosspath;
	var bosspath1;
	
	//创建更新修改函数  context：背景，环境；array：数组；
	this.update = function(context, array, dt,) {
		if (bombPoint.length <= 0) {
			var x1 = context.canvas.width * 0.333;
			var x2 = context.canvas.width * 0.667;
			var x3 = -10;
			var x4 = context.canvas.width + 10;
			var y1 = context.canvas.height * 0.333;
			var y2 = context.canvas.height * 0.667;
			var y3 = -10;
			var y4 = context.canvas.height + 10;
			
			bombPoint[0] = [x1, y3];
			bombPoint[1] = [x2, y3];
			bombPoint[2] = [x4, y1];
			bombPoint[3] = [x4, y2];
			bombPoint[4] = [x1, y4];
			bombPoint[5] = [x2, y4];
			bombPoint[6] = [x3, y1];
			bombPoint[7] = [x3, y2];
			
			
			muPath1 = new Array([x1, -10], [x1, y1], [x2, y1], [x1, y1], [x2, y1], [x1, -10]);
			muPath2 = new Array([x2, -10], [x2, y1], [x1, y1], [x2, y1], [x1, y1], [x1, -10]);
			
			//boss出现后所按图标进行路径进行移动
			bosspath = new Array([x1, -5], [x1, y1], [x2, y1], [x1, y1], [x2, y1],[x1, y1], [x2, y1], [x1, y1], [x2, y1],[x1, y1], [x2, y1], [x1, y1], [x2, y1],[x1, y1], [x2, y1], [x1, y1], [x2, y1],[x1, y1], [x2, y1], [x1, y1], [x2, y1],[x1, y1], [x2, y1], [x1, y1], [x2, y1],[x1, y1], [x2, y1], [x1, y1], [x2, y1],[x1, y1], [x2, y1], [x1, y1], [x2, y1],[x1, y1], [x2, y1], [x1, y1], [x2, y1],[x1, y1], [x2, y1], [x1, y1], [x2, y1],[x1, y1], [x2, y1], [x1, y1], [x2, y1],[x1, y1], [x2, y1], [x1, y1], [x2, y1],[x1, y1], [x2, y1], [x1, y1], [x2, y1],[x1, y1], [x2, y1], [x1, y1], [x2, y1],[x1, y1], [x2, y1], [x1, y1], [x2, y1],[x1, y1], [x2, y1], [x1, y1], [x2, y1],[x1, y1], [x2, y1], [x1, y1], [x2, y1],[x1, y1], [x2, y1], [x1, y1], [x2, y1],[x1, y1], [x2, y1], [x1, y1], [x2, y1],[x1, y1], [x2, y1], [x1, y1], [x2, y1]);
		}
			//如果生命大于零
		if ((this.life>0&&this.lifetwo > 0)||(this.life==0&&this.lifetwo>0)||(this.life>0&&this.lifetwo==0)){
		//产生敌人开始=
			this.enemyAppearTimer += dt;
				//如果敌人出现定时器大于间隔
			if (this.enemyAppearTimer >= this.apearInterval) {
				var path = new Array();
				var a = Math.random() * 1000 % context.canvas.width;
				path[0] = [a, -10];
				var b = Math.random() * 1000 % context.canvas.width;
				var c = Math.random() * 1000 % context.canvas.height;
				path[1] = [b, c];
				var d = Math.random() * 1000 % context.canvas.width;
				var e = (Math.random() >= 0.5) ? (context.canvas.height + 10) : -10;
				path[2] = [d, e];
				var type = (Math.random() >= 0.5) ? 0 : 1;
				new Eye(type, 250, path, 1, this.fireInterval).addTo(array);
				this.enemyAppearTimer = 0;
			}
			//炸弹定时器
			
			this.bombAppearTimer += dt;
			//如果炸弹定时器大于轰炸的间隔
			if (this.bombAppearTimer >= this.bombInterval) {
				var path = new Array();
				var beginIndex = (parseInt(Math.random() * 1000)) % 8;
				var endIndex = 0;
				if (beginIndex >= 4) {
					endIndex = beginIndex - 4;
				}
				else {
					endIndex = beginIndex + 4;
				}
				new BombBall(200, new Array(bombPoint[beginIndex], bombPoint[endIndex]), 1, 1.7).addTo(array);
				this.bombAppearTimer = 0;
			}
			if (this.level >= 1 && this.muEyeNum == 0) {
				this.muTimer += dt;
				if (this.muTimer >= this.muInterval) {
					var muPath;
					if (Math.random() > 0.5) {
						muPath = muPath1;
					}
					else {
						muPath = muPath2;
					}
					new MutativeEye(100, muPath,20, 3).addTo(array);
					this.muTimer = 0;
					this.muEyeNum++;
				}
			}
			//boss函数
			if (this.bosslevel >= 1 && this.bossNum == 1) {
				this.bosstime += dt;
				if (this.bosstime >= this.bossInterval) {
					var bossmuPath;
					if (Math.random() > 0.5) {
						bossmuPath = bosspath;
					}
					new BossPlane(65, bossmuPath,80, 3).addTo(array); //BOSS出现速度、路径、血量、子弹生成速度
					this.bosstime =0;
					this.bossNum--;
				}
			}
			
			if (this.bosslevel < 2) {
				if (this.score >= this.bosslevel * 200&&this.grade >= this.bosslevel * 200) {
					this.bosslevel++;
				}
			}
				//死亡判定函数
				for(var i=0;i<15;i++){
					
				if (this.isDead) {
				this.timer += dt;
				if (this.timer >= SURVIVE_INTERVAL) {
					this.isDead = false;
					this.timer = 0;
					//如果生命大于零
					var rocketImg = new Image();
						
						if(this.life>0) {
						rocketImg.src = "img/rocket_20_48.png";
						
						var r = new Rocket(rocketImg, 230, canvas.width / 2 - rocketImg.width / 2, canvas.height - rocketImg.height - 50);
						r.addTo(array);
						r.setFireOpen(true);
						break;
						}
				}
		}
				if (this.towDead) {
				this.timer += dt;
				if (this.timer >= SURVIVE_INTERVAL) {
					this.towDead = false;
					this.timer = 0;
					var rocketImgtwo =new Image();
						if(this.lifetwo>0) {
					
						rocketImgtwo.src="Img/blue_plane.png";
		var t= new Plane(rocketImgtwo,250, canvas.width / 2.5 - rocketImgtwo.width / 2, canvas.height - rocketImgtwo.height -50);
						t.addTo(array);
						t.setFireOpen(true);
						return 0;
				}
		}
				
				
	}

}

}
		
		//死亡跳出图片函数（当生命没有时跳出游戏结束画面）(this.life<0||this.lifetwo<0)
		 else{
			this.timer += dt;
			if (this.timer >= OVER_INTERVAL) {
				array.splice(1, array.length - 2);
				var img = new Image();
				img.src = "img/game_over.png";
				new SimpleImageObject(img, (context.canvas.width - img.width) / 2, (context.canvas.height - img.height) / 2).addTo(array);
			}
		
		//boss死亡通关判断函数
	}
}

	this.draw = function(context) {
		context.save();
		context.font = "15px 微软雅黑 ";
		context.fillStyle="#fff";
	context.fillText("分数: " + this.score, 5, context.canvas.height - 30)
	context.fillText("玩家2: " + this.lifetwo, context.canvas.width - 90, context.canvas.height - 30);
	context.fillText("玩家1: " + this.life, context.canvas.width - 90, context.canvas.height - 5);
	context.restore();

		document.getElementsByTagName("p")[1].innerHTML = "分数: " + this.score;
		//document.getElementsByTagName("p")[1].innerHTML = "分数: " + this.grade;
		//document.getElementsByTagName("p")[2].innerHTML = "玩家二生命: " + this.lifetwo+"/15";
		//document.getElementsByTagName("p")[3].innerHTML = "Level:" + this.level;
		
	}
	
	//第一角色添加分数
	
	this.addScore = function(s) {
		this.score += s * 10;

		//分数赋予函数
		if (this.score <= 1000) {
			this.apearInterval -= 0.01;
			this.fireInterval -= 0.005;
		}	
	}
	
/*
		this.addScore = function(s) {
		this.grade += s * 10;

		//分数赋予函数
		if (this.grade <= 1000) {
			this.apearInterval -= 0.01;
			this.fireInterval -= 0.005;
		}	
	}
	
*/
	
	/*this.addgrade = function(g) {
		this.grade += g * 10;
		//分数赋予函数
		if (this.grade <= 1000) {
			this.apearInterval -= 0.01;
			this.fireInterval -= 0.005;
		}
		
	}
	*/
	
	
	
	
	
	
	//第一角色幸存判定幸存判定
	this.survive = function() {
		this.isDead = true;
		if (this.life > 0) {
			this.life--;
		}
	}
	//第二角色幸存判定
	this.survivet = function() {
		this.towDead = true;
		if (this.lifetwo > 0) {
			this.lifetwo--;
		}
	}
	
}




StateDrive.prototype = new BasicObject();