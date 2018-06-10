//创建js基本对象方法
function BasicObject(x, y, order) {
	this.x = x;
	this.y = y;
	this.order = isNaN(order) ? 0 : order;
	
	this.addTo = function(array) {
		array.push(this);
		array.sort(function(a, b) {return a.order - b.order;});
	}
	
	this.removeFrom = function(array) {
		array.remove(this);
	}
}