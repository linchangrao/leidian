//

Array.prototype.remove = function(obj) {
	for (i in this) {
		if (this[i] === obj) {
			this.splice(i, 1);
			break;
		}
	}
}

// The parameter here must be in the format of "[centerX, centerY, width, height]"
//参数这里格式必须为“[集中式交换，世纪，宽度，高度]”
//碰撞检测函数
function detectCollision(objA, objB) {
	var a = Math.abs(objA[0] - objB[0]);
	var b = Math.abs(objA[1] - objB[1]);
	var c = (objA[2] + objB[2]) / 2;
	var d = (objA[3] + objB[3]) / 2;
	
	if (a <= c && b <=d) {
		return true;
	}
	else {
		return false;
	}
}