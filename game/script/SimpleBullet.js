//飞机单位子弹函数方法
function SimpleBullet(type, speed, path, damage, order) {
	var img = new Image();
	img.src = "img/bullet_" + type + ".png";
	SimpleOrbitObject.call(this, img, speed, path, true, order);
	this.type = type;
	this.damage = isNaN(damage) ? 1 : damage;
	//碰撞函数
	this.collide = function(array) {
		// do nothing
	}
}
SimpleBullet.prototype = new SimpleOrbitObject();