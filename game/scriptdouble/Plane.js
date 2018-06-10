//飞机函数
function Plane(image, speed, x, y, order) {
	SimpleImageObject.call(this, image, x, y, order);
	this.speed = speed;
	this.left = false;
	this.right = false;
	this.up = false;
	this.down = false;

//	const NORMAL = 0;
//	const EXPLODING = 1;
//	this.type = NORMAL; 

	this.dead = false;
	
	this.timer = 0;
	this.fireOpen = false;
	const FIRE_INTREVAL = 0.2;//开火间隔时间
	//keycode键码飞机移动
	this.keydown = function(event) {
		if (event.keyCode == 97) {
			this.left = true;
		}
		if (event.keyCode == 99) {
			this.right = true;
		}
		if (event.keyCode == 101) {
			this.up = true;
		}
		if (event.keyCode == 98) {
			this.down = true;
		}
//		if (event.keyCode == 32) {
//			this.type = EXPLODING;
//		}
	}
	
	this.keyup = function(event) {
		if (event.keyCode == 97) {
			this.left = false;
		}
		if (event.keyCode == 99) {
			this.right = false;
		}
		if (event.keyCode == 101) {
			this.up = false;
		}
		if (event.keyCode == 98) {
			this.down = false;
		}
	}
	
	this.update = function(context, array, dt) {
		var distance = speed * dt;
		
		if (this.left) {
			this.x -= distance;
		}
		if (this.right) {
			this.x += distance;
		}

		if (this.up) {
			this.y -= distance;
		}
		if (this.down) {
			this.y += distance;
		}
		
		if (this.x < 0) { 
			this.x = 0;
		}
		if (this.x + this.image.width > context.canvas.width) {
			this.x = context.canvas.width - this.image.width;
		}
		if (this.y < 0) {
			this.y = 0;
		}
		if (this.y + this.image.height > context.canvas.height) {
			this.y = context.canvas.height - this.image.height;
		}
		
//		// here is to test the Explosion Object
//		if (this.type == EXPLODING) {
//			new Explosion(this.x + this.image.width / 2, this.y + this.image.height / 2).addTo(array);
//			this.type = NORMAL;
//		}
//		// test end
		
		if (this.fireOpen) {
			this.fire(array, dt);
		}
		
		if (this.dead) {
			new Explosion(this.x + this.image.width / 2, this.y + this.image.height / 2).addTo(array);
			this.removeFrom(array);
			
			array[array.length - 1].survivet();
		}
	}
	//碰撞函数
	
	this.collide = function(array) {
		for (i in array) {
			if (array[i] instanceof SimpleBullet) {
				if (array[i].type >= 1) {
					if (detectCollision([this.x + this.image.width / 2, this.y + this.image.height / 2, this.image.width, this.image.height], [array[i].x, array[i].y, array[i].image.width, array[i].image.height])) {
						this.explode();
						array[i].removeFrom(array);
					}
				}
			}
			
			if (array[i] instanceof AtomBullet) {
				if (detectCollision([this.x + this.image.width / 2, this.y + this.image.height / 2, this.image.width, this.image.height], [array[i].x, array[i].y, array[i].image.width, array[i].image.height])) {
					this.explode();
					array[i].removeFrom(array);
				}
			}
		}
	}
	//飞机子弹函数
	this.fire = function(array, dt) {
		this.timer += dt;
		if (this.timer >= FIRE_INTREVAL) {
			new SimpleBullet(0, 300, new Array([this.x + this.image.width / 2, this.y - 5], [this.x + this.image.width / 2, -10])).addTo(array);
			this.timer = 0;
		}
	}
	//开火函数
	this.setFireOpen = function(set) {
		this.fireOpen = set;
	}
	//飞机被摧毁后爆炸
	this.explode = function() {
		this.dead = true;
	}

}
Plane.prototype = new SimpleImageObject();