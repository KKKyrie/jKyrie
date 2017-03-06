 /*
  *@kyrieliu
  *
  *
  ** opts: {'可选参数'}
  ** method: 请求方式:GET/POST,默认值:'GET';
  ** url:    发送请求的地址, 默认值: 当前页地址;
  ** data: string,json;
  ** async: 是否异步:true/false,默认值:true;
  ** cache: 是否缓存：true/false,默认值:true;
  ** contentType: HTTP头信息，默认值：'application/x-www-form-urlencoded';
  ** success: 请求成功后的回调函数;
  ** error: 请求失败后的回调函数;
  */

 function ajax(opts) {

   //默认参数
   var defaults = {
     method: "GET",
     url: "",
     data: "",
     async: true,
     // cache: true,
     contentType: "application/x-www-form-urlencoded",
     success: function() {},
     error: function() {}
   };

   //用户参数覆盖默认参数
   for (var key in opts) {
     defaults[key] = opts[key];
   }

   //处理data（object => string）
   if (typeof(defaults.data) === 'object') {
     var str = "";
     for (var key in defaults.data) {
       str += key + "=" + defaults.data[key] + "&";
     }
     defaults.data = str.substring(0, str.length - 1);
   }

   //处理方法
   defaults.method = defaults.method.toUpperCase();


   //处理url
   if (defaults.method === "GET" && defaults.data) {
     defaults.url += "?" + defaults.data;
   }

   //ajax
   var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

   xhr.open(defaults.method, defaults.url, defaults.async);

   if (defaults.method === "GET") {
     xhr.send(null);
   } else if (defaults.method === "POST") {
     xhr.setRequestHeader("Content-type", defaults.contentType);
     xhr.send(defaults.data);
   }

   xhr.onreadystatechange = function() {
     if (xhr.readyState === 4) {
       if (xhr.status === 200) {
         defaults.success.call(xhr, xhr.responseText);
       } else {
         defaults.error();
       }
     }
   };
 }
