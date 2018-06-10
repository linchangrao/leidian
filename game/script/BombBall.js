//炸弹球
function BombBall(speed, path, hp, explodeInterval, order) {
	var img = new Image();//声明img
	img.src = "img/bomb_ball.png";//图片路径
	Enemy.call(this, img, speed, path, hp, true, order);
	this.explodeInterval = explodeInterval;//调用函数爆炸间隔
	
	this.timer = 0;
	
	//DISTANCE_LIMIT极限距离
	const DISTANCE_LIMIT = this.speed * 0.1 * 0.6;
	//
	this.update = function(context, array, dt) {
		this.x += this.vx * dt;
		this.y += this.vy * dt;
		//
		var dis = Math.sqrt((this.path[this.nextIndex][0] - this.x) * (this.path[this.nextIndex][0] - this.x) + (this.path[this.nextIndex][1] - this.y) * (this.path[this.nextIndex][1] - this.y));
		if (dis <= DISTANCE_LIMIT) { // 到达节点
			if (this.nextIndex == this.path.length - 1) { // 那个节点是最后一个
				if (!this.cae) { //到达后，对象不会继续移动画布。
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
		//爆炸间隔
		if (this.explodeInterval) {
			this.timer += dt;
			if (this.timer >= this.explodeInterval) {
				this.selfExplode(array);
			}
		}
		//爆炸
		if (this.hp <= 0) {
			this.explode(array);
		}
	}
	
	this.explode = function(array) {
		new SimpleBullet(1, 300, new Array([this.x, this.y], [this.x, this.y - 10])).addTo(array);
		new SimpleBullet(1, 300, new Array([this.x, this.y], [this.x, this.y + 10])).addTo(array);
		new SimpleBullet(1, 300, new Array([this.x, this.y], [this.x + 10, this.y])).addTo(array);
		new SimpleBullet(1, 300, new Array([this.x, this.y], [this.x - 10, this.y])).addTo(array);
		
		new Explosion(this.x, this.y).addTo(array);
		array[array.length - 1].addScore(1);
		this.removeFrom(array);
	}
	
	this.selfExplode = function(array) {
		new SimpleBullet(1, 300, new Array([this.x, this.y], [this.x - 10, this.y - 10])).addTo(array);
		new SimpleBullet(1, 300, new Array([this.x, this.y], [this.x - 10, this.y + 10])).addTo(array);
		new SimpleBullet(1, 300, new Array([this.x, this.y], [this.x + 10, this.y - 10])).addTo(array);
		new SimpleBullet(1, 300, new Array([this.x, this.y], [this.x + 10, this.y + 10])).addTo(array);
		
		new Explosion(this.x, this.y).addTo(array);
		array[array.length - 1].addScore(1);
		this.removeFrom(array);
	}
}
BombBall.prototype = new Enemy();