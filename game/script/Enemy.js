//敌人
function Enemy(image, speed, path, hp, continueAfterEnd, order) {
	SimpleOrbitObject.call(this, image, speed, path, continueAfterEnd, order);
	this.hp = hp;
	//碰撞
	this.collide = function(array) {
		for (i in array) {
			//飞机
			if (array[i] instanceof Rocket) {
				if (detectCollision([array[i].x + array[i].image.width / 2, array[i].y + array[i].image.height / 2, array[i].image.width, array[i].image.height], [this.x, this.y, this.image.width, this.image.height])) {
					this.hp -= 5;
					array[i].explode();
				}
			}
			//子弹
			if (array[i] instanceof SimpleBullet) {
				if (array[i].type == 0) {
					if (detectCollision([this.x, this.y, this.image.width, this.image.height], [array[i].x, array[i].y, array[i].image.width, array[i].image.height])) {
						this.hp -= 1;
						array[i].removeFrom(array);
					}
				}
			}
		}
	}
}

Enemy.prototype = new SimpleOrbitObject();