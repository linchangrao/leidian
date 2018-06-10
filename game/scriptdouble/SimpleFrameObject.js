//简单框架对象函数

function SimpleFrameObject(image, frame, x, y, order) {
	BasicObject.call(this, x, y, order);
	this.image = image;
	this.frame = frame;
	this.cframe = 0;
	//画布元素函数
	this.draw = function(context) {
		context.drawImage(this.image, this.image.width / this.frame * this.cframe, 0, this.image.width / this.frame, this.image.height, this.x, this.y, this.image.width / this.frame, this.image.height);
	}
	//更新函数
	this.update = function(context, array, dt) {
		this.cframe = (this.cframe + 1 == this.frame) ? 0 : (this.cframe + 1);
	}
}
SimpleFrameObject.prototype = new BasicObject();