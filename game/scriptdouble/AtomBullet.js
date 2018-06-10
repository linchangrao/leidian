Rocket//原子弹函数speed：速度；path：路径；interval：间隔；dam；age：单位毁坏order：命令和规则
function AtomBullet(speed, path, interval, damage, order) {
	//简单子弹调用
	SimpleBullet.call(this, 2, speed, path, damage, order);
	this.interval = interval;
	this.timer = 0;
	/*子弹
	 * 
	 */
	this.rocketExist = false;//火箭（飞机）存在为flase
	this.planeExist=false;
	
	const DISTANCE_LIMIT = this.speed * 0.1 * 0.6;
	//update更新 函数参数context、array、dt 
	this.update = function(context, array, dt) {
		this.x += this.vx * dt;
		this.y += this.vy * dt;
		
		var dis = Math.sqrt((this.path[this.nextIndex][0] - this.x) * (this.path[this.nextIndex][0] - this.x) + (this.path[this.nextIndex][1] - this.y) * (this.path[this.nextIndex][1] - this.y));
		if (dis <= DISTANCE_LIMIT) { // 到达节点
			if (this.nextIndex == this.path.length - 1) { // 那个节点是最后一个
				if (!this.cae) { // 到达后，对象不会继续移动画布。
					this.removeFrom(array);//去掉
				}
			}
			else {
				
				this.x = this.path[this.nextIndex][0];//路径
				this.y = this.path[this.nextIndex][1];//路径
				this.nextIndex++;
			}
		}
		//计算速度
		this.calculateSpeed();
		//isInCanvas画布判断背景
		if (!this.isInCanvas(context)) {
			this.removeFrom(array);
		}
		
		this.timer += dt;
		if (this.timer >= this.interval) {
			this.removeFrom(array);
		}
		//遍历数组
		for (i in array) {
			if (array[i] instanceof Rocket) {
				this.rocketExist = true;//火箭(飞机)存在
				break;
			}
		}
		//如果不等于飞机去除
		if (!this.rocketExist) {
			this.removeFrom(array);
		}
			for (i in array) {
			if (array[i] instanceof Plane) {
				this.planeExist = true;//火箭(飞机)存在
				break;
			}
		}
		if (!this.planeExist) {
			this.removeFrom(array);
		}
		else {
			this.path[1][0] = array[i].x + array[i].image.width / 2;
			this.path[1][1] = array[i].y + array[i].image.height / 2;
		}
		this.rocketExist = false;
		this.planeExist =false;
	}
}
AtomBullet.prototype = new SimpleBullet();