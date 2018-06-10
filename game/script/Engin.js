//画布函数

function Engin() {
	var canvas = document.getElementById("canvas");
	canvas.width = 600;
	canvas.height = 650;
	var ctx = canvas.getContext("2d");
	
	var buffer = document.createElement("canvas");
	buffer.width = canvas.width;
	buffer.height = canvas.height;
	var bufCtx = buffer.getContext("2d");
	
	const FPS =100;
	
	var objs = new Array();
	
	//声明离开时间
	var ltime = new Date().getTime();
	//管理函数
	this.manage = function() {
		var ctime = new Date().getTime();
		var dt = (ctime - ltime) / 1000;
		ltime = ctime;
		
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		bufCtx.clearRect(0, 0, buffer.width, buffer.height);
		
		for (i in objs) {
			if (objs[i].update) {
				objs[i].update(bufCtx, objs, dt);
			}
		}
		for (i in objs) {
			if (objs[i].draw) {
				objs[i].draw(bufCtx);
			}
		}
		for (i in objs) {
			if (objs[i].collide) {
				objs[i].collide(objs);
			}
		}
		ctx.drawImage(buffer,0,0);
	
	}
	//移动函数
	document.onkeydown = function(event) {
		for (i in objs) {
			if (objs[i].keydown) {
				objs[i].keydown(event);
			}
		}
	}
	document.onkeyup = function(event) {
		for (i in objs) {
			if (objs[i].keyup) {
				objs[i].keyup(event);
			}
		}
	}
	
	//运行移动
	this.run = function() {
		var rocketImg = new Image();
		//飞机
		rocketImg.src = "img/rocket_20_48.png";
		var r = new Rocket(rocketImg,230, canvas.width / 2 - rocketImg.width / 2, canvas.height - rocketImg.height -50);
		r.addTo(objs);
		r.setFireOpen(true);
		new StateDrive(3).addTo(objs);
		//第二飞机
		/*
		 var planeImg = new Image();
		planeImg.src ='/img/blue_plane.png';
		var p=new Plane(rocketImg,230, canvas.width / 2 - rocketImg.width / 2, canvas.height - rocketImg.height -50);
		p.addTo(objs);
		p.setFireOpen(true);
		new StateDrive(3).addTo(objs);
		 */
		//背景
		var bg = new Image();
		bg.src="img/bg_space.jpg";
		new SimpleImageObjecto(bg, 0, 0, -50).addTo(objs);
		setInterval(this.manage, 1000 / FPS);
	}
	
}