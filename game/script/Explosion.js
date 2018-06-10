//这里，参数x和y必须是爆炸物体的中心点（x，y）。
//爆炸函数
function Explosion(x, y, order) {
	var img = new Image();
	img.src = "img/explosion.png";
	var dx = x - img.width / 6;
	var dy = y - img.height / 2;
	SimpleFrameObject.call(this, img, 3, dx, dy, order);
	this.timer = 0;
	
	this.update = function(context, array, dt) {
		this.timer += dt;
		if (this.cframe == this.frame - 1) {
			if (this.timer >= 0.3) {
				this.cframe++;
				this.timer = 0;
			}
		}
		else {
			if (this.timer >= 0.1) {
				this.cframe++;
				this.timer = 0;
			}
		}
		
		if (this.cframe == this.frame) {
			this.removeFrom(array);
		}
	}
}
Explosion.prototype = new SimpleFrameObject();