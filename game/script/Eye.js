//敌人飞机单位函数
function Eye(type, speed, path, hp, fireInterval, order) {
	var img = new Image();
	img.src = (type > 0) ? "img/eye_right.png":"img/eye_left.png";
	Enemy.call(this, img, speed, path, hp, true, order);
	this.fireInterval = fireInterval;
	this.timer = 0;
	
	const DISTANCE_LIMIT = this.speed * 0.1 * 0.6;
	
	this.update = function(context, array, dt) {
		this.x += this.vx * dt;
		this.y += this.vy * dt;
		
		var dis = Math.sqrt((this.path[this.nextIndex][0] - this.x) * (this.path[this.nextIndex][0] - this.x) + (this.path[this.nextIndex][1] - this.y) * (this.path[this.nextIndex][1] - this.y));
		if (dis <= DISTANCE_LIMIT) { // 到达节点
			if (this.nextIndex == this.path.length - 1) { // 那个节点是最后一个
				if (!this.cae) { // 到达后，对象不会继续移动画布。
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
			this.removeFrom(array);
		}
		
		this.timer += dt;
		if (this.timer >= this.fireInterval) {
			this.fire(array);
			this.timer = 0;
		}
		
		if (this.hp <= 0) {
			new Explosion(this.x, this.y).addTo(array);
			array[array.length - 1].addScore(1);
			this.removeFrom(array);
		}
	}
	//敌方飞机开火函数
	this.fire = function(array) {
		for (i in array) {
			if (array[i] instanceof Rocket) {
				var end = [0, 0];
				end[0] = array[i].x + array[i].image.width / 2;
				end[1] = array[i].y + array[i].image.height / 2;
				new SimpleBullet(1, 300, new Array([this.x, this.y + 10], end)).addTo(array);
			}
		}
	}
}
Eye.prototype = new Enemy();