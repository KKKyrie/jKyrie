var cookieUtil = {

	setCookie: function(name, value, expiresDays){
		var date = new Date();
		date.setDate(date.getDate() + expiresDays);
		document.cookie = name + "=" + escape(value) + ";" + ((expiresDays == null) ? "" : ";expires=" + date.toGMTString());
	},

	getCookie: function(name){
		var cookies = document.cookie;
		var start = cookies.indexOf(name + "=");

		if (start === -1){
			return "";
		}

		start = start + name.length + 1;
		var end = cookies.indexOf(";", start);

		//是最后一个键值对（末尾没有分号）
		if (end === -1){
			end = document.cookie.length;
		}

		return unescape(document.cookie.substring(start, end));

	},

	deleteCookie: function(name){
		//将过期日期设置为前一天
		this.setCookie(name, "", -1);
	}
}