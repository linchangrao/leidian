function BossPlane(speed, path, hp, bossfireInterval, order) {
	var img = new Image();
	img.src = "img/boss_enemy.png";
	Enemy.call(this, img, speed, path, hp, true, order);
	this.bossfireInterval = bossfireInterval;
	this.timer = 0;
	
	const DISTANCE_LIMIT = this.speed * 0.1 * 0.5;
	
	this.update = function(context, array, dt) {
		this.x += this.vx * dt;
		this.y += this.vy * dt;
		
		var dis = Math.sqrt((this.path[this.nextIndex][0] - this.x) * (this.path[this.nextIndex][0] - this.x) + (this.path[this.nextIndex][1] - this.y) * (this.path[this.nextIndex][1] - this.y));
		if (dis <= DISTANCE_LIMIT) { // arrive at node
			if (this.nextIndex == this.path.length -1) { // that node is the last one
				if (!this.cae) { // object doesn't continue to move out the canvas after arriving
					this.removeFrom(array);
				}
			}
			else {
				this.x = this.path[this.nextIndex][0];
				this.y = this.path[this.nextIndex][1];
				this.nextIndex++;
				this.calculateSpeed();
			}
		}
		
		if (!this.isInCanvas(context)) {
			array[array.length - 1].bossNum--;
			this.removeFrom(array);
		}
		
		this.timer += dt;
		if (this.timer >= this.bossfireInterval) {
			this.fire(array);
			this.timer = 0;
		}
			
		if (this.hp <= 0) {
			this.timer += dt;
			array.splice(1, array.length -2);
			var imges = new Image();
			imges.src = "img/win.png";
			window.setTimeout("window.location.href='main.html'",5000);

			new SimpleImageObject(imges, (context.canvas.width - img.width) / 8, (context.canvas.height - img.height) / 3).addTo(array);
			
			array[array.length - 1].addScore(10);
			array[array.length - 1].bossNum--;
	
			this.removeFrom(array);
			
		}
	}
	
	
	this.fire = function(array) {
		for (i in array) {
			if (array[i] instanceof Rocket) {
				var end = [0, 0];
				end[0] = array[i].x + array[i].image.width / 2;
				end[1] = array[i].y + array[i].image.height / 2;
				new AtomBullet(80, new Array([this.x, this.y + 10], end),7).addTo(array);
			}
		}
	}
}
BossPlane.prototype = new Enemy();