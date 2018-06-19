/*
 *	封装cookie操作 cookieUtil
 *	1.添加 setCookie
 *	2.查询 getCookie
 * 	3.删除 deleteCookie
 *
 *  @kyrieliu
 */

var cookieUtil = {

	setCookie: function(name, value, expiresDays) {
		var date = new Date();
		date.setDate(date.getDate() + expiresDays);
		document.cookie = name + "=" + escape(value) + ((expiresDays == null) ? "" : ";expires=" + date.toGMTString());
	},

	getCookie: function(name) {
		var cookies = document.cookie;
		var start = cookies.indexOf(name + "=");

		if (start === -1) {
			return "";
		}

		start = start + name.length + 1;
		var end = cookies.indexOf(";", start);

		//是最后一个键值对（末尾没有分号）
		if (end === -1) {
			end = cookies.length;
		}

		return unescape(cookies.substring(start, end));

	},

	deleteCookie: function(name) {
		//将过期日期设置为前一天
		this.setCookie(name, "", -1);
	}
}
