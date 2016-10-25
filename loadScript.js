/**
 *  @kyrieliu
 *
 * 	you can use this function like：
 * 		loadScript(url_1, function(){
 * 			loadScript(url_2, function(){
 * 				loadScript(url_3, function(){
 * 					console.log("All script loaded.");
 * 				});
 * 			});
 * 		});
 *
 *
 *
 * 
 */
function loadScript(url, callback) {
	var script = document.createElement("script");
	script.setAttribute("type", "text/javascript");

	if (script.readyState) { //IE
		script.onreadystatechange = function() {
			if (script.readyState == "loaded" || script.readyState == "complete") {
				script.onreadystatechange = null;
				console.log("Script loaded");
				callback();
			}
		};
	} else { //others: chrome, safari, opera, firefox
		script.onload = function() {
			callback();
		};
	}



	script.setAttribute("src", url);
	document.getElementsByTagName("head")[0].appendChild(script);
}