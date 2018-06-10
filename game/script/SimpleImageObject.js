//简单图像对象函数
var iBgShiftY=2850;

function SimpleImageObject(image, x, y, order) {
	BasicObject.call(this, x, y, order);
	this.image = image;
	
	this.draw = function(context) {
		iBgShiftY-=0.03;
		context.drawImage(this.image, this.x, this.y);
	}
	
}
SimpleImageObject.prototype = new BasicObject();