/*
 *	跨浏览器的事件处理
 *
 *
 *
 *  @kyrieliu
 */

/*
	DOM事件对象的成员：
		bubbles： boolean， 事件是否冒泡
		cancelable: boolean, 是否可以取消事件的默认行为
		currentTarget: element, 其事件处理程序当前正在处理事件的那个元素
		detail: integer, 与事件相关的细节信息
		eventPhase: integer, 调用事件处理程序的阶段：1表示捕获阶段，2表示处于目标阶段，3表示冒泡阶段
		preventDefault(): function, 取消事件的默认行为。如果cancelbubble是true，则可以使用这个方法
		stopPropagation(): function, 取消事件的进一步捕获或冒泡。如果bubble为true，则可以使用这个方法
		target: element, 事件的目标
		type: string, 被触发的事件的类型
		view: AbstractView, 与事件关联的抽象视图



	IE事件对象的成员（只列举和DOM事件对象不同的）：
		cancelBubble: boolean, 默认值为false，设置为true就可以取消事件冒泡
		returnValue: boolean, 默认值为true， 设置为false就可以取消事件默认行为
		srcElement: element, 事件的目标	
*/

var EventUtil = {

	//添加事件
	addHandler: function(element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}
	},


	//移除事件
	removeHandler: function(element, type, handler) {
		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent) {
			element.detachEvent("on" + type, handler);
		} else {
			element["on" + type] = null;
		}
	},




	//获取事件
	getEvent: function(event) {
		return event ? event : window.event;
	},


	//获得事件的目标节点（触发该事件的节点）
	getTarget: function(event) {
		return event.target || event.srcElement;
	},


	//取消事件默认行为
	preventDefault: function(event) {
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	},



	//停止冒泡或捕获
	stopPropagation: function(event) {
		if (event.stopPropagation) {
			event.stopPropagation();
		} else { //IE事件只有冒泡阶段
			event.cancelBubble = true;
		}
	}
}