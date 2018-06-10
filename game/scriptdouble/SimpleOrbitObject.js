// Here the parameters x, y and the points in the Path array must be the center point(x, y) of the orbit object
// The path array must contain at least 2 points and each point must be different
/*
 * 这里的参数/ / x，y和点的路径必须是阵列的中心点（x，y）的轨道的对象
/ /的路径数组必须包含至少2个百分点和每个点必须不同
 */
//简单对象函数


function SimpleOrbitObject(image, speed, path, continueAfterEnd, order) {
	BasicObject.call(this, path[0][0], path[0][1], order);
	this.image = image;
	this.speed = speed;
	this.path = path;
	this.cae = continueAfterEnd; // whether the object continues to move to the canvas edge after it reach the finishing point
	this.nextIndex = 1;
	
	this.vx = 0;
	this.vy = 0;
	
	const DISTANCE_LIMIT = this.speed * 0.1 * 0.6;
	
	this.draw = function(context) {
	
		context.drawImage(this.image, this.x - this.image.width / 2, this.y - this.image.height / 2);
	}
	
	this.update = function(context, array, dt) {
		this.x += this.vx * dt;
		this.y += this.vy * dt;
		
		var dis = Math.sqrt((this.path[this.nextIndex][0] - this.x) * (this.path[this.nextIndex][0] - this.x) + (this.path[this.nextIndex][1] - this.y) * (this.path[this.nextIndex][1] - this.y));
		if (dis <= DISTANCE_LIMIT) { // arrive at node
			if (this.nextIndex == this.path.length - 1) { // that node is the last one
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
			this.removeFrom(array);
		}
	}
	//计算速度函数
	this.calculateSpeed = function() {
		var xOrientation = (this.path[this.nextIndex][0] >= this.x) ? 1 : -1;
		var yOrientation = (this.path[this.nextIndex][1] >= this.y) ? 1 : -1;
		
		var s0 = this.path[this.nextIndex][0] - this.x;
		var s1 = this.path[this.nextIndex][1] - this.y;
		var s2 = s0 * s0;
		var s3 = s1 * s1;
		this.vx = xOrientation * Math.sqrt(s2 / (s2 + s3)) * this.speed;
		this.vy = yOrientation * Math.sqrt(s3 / (s2 + s3)) * this.speed;
	}
	this.calculateSpeed();
	//画布函数
	this.isInCanvas = function(context) {
		if (this.x + this.image.width / 2 < 0 || this.x - this.image.width / 2 > context.canvas.width) {
			return false;
		}
		if (this.y + this.image.height / 2 < 0 || this.y - this.image.height / 2 > context.canvas.height) {
			return false;
		}
		return true;
	}
}
SimpleOrbitObject.prototype = new BasicObject();