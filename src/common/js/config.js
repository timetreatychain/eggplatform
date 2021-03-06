/**
 * 环境配置
 *
 * @param    {参数类型}  null
 * @returns  void
 * @date      2018.01.06
 * @author   Tom<Tom@liyunet.com>
 */


/*
 * 
 * dev
 * 
 * */
var contextBuild=true;
var contextPath = "http://192.168.0.6:8080/egg_game";
var contextPath1 = "http://192.168.0.16:8070/timetreaty_certification";
var contextOtcPath = "http://192.168.0.16:8060/timetreaty_push";
var eggContextPath = "http://192.168.0.61:8080/ttc-eggworld";
var imgContextPath = "http://static.liyugame.com/asset/";

/**
 * 获取地址
 *
 * @param    {参数类型}  url     location.search
 * @returns  void
 * 
 * @date      2017.
 * @author   Tom<Tom@liyunet.com>
 */
(function(w) {
	if(location.href=="http://testew.liyuyouxi.com/" || location.href=="http://ew.liyugame.com/"){
		if(location.href.indexOf('officialWeb')==-1){
			location.href="/officialWeb"
		}
	}
	w.getUrl = function(url) {
		var Request = new Object();
		if(url.indexOf("?") != -1) {
			var str = url.substr(1);
			str = str.split("?")[0];

			strs = str.split("&");
			for(var i = 0; i < strs.length; i++) {
				Request[i] = unescape(strs[i].split("=")[1]);
			}
		}
		return Request;
	}
	
	
	

	var calc = {
		Add: function(arg1, arg2) {
			arg1 = arg1.toString(), arg2 = arg2.toString();
			var arg1Arr = arg1.split("."),
				arg2Arr = arg2.split("."),
				d1 = arg1Arr.length == 2 ? arg1Arr[1] : "",
				d2 = arg2Arr.length == 2 ? arg2Arr[1] : "";
			var maxLen = Math.max(d1.length, d2.length);
			var m = Math.pow(10, maxLen);
			var result = Number(((arg1 * m + arg2 * m) / m).toFixed(maxLen));
			var d = arguments[2];
			return typeof d === "number" ? Number((result).toFixed(d)) : result;
		},
		Sub: function(arg1, arg2) {
			return Calc.Add(arg1, -Number(arg2), arguments[2]);
		},
		Mul: function(arg1, arg2) {
			var r1 = arg1.toString(),
				r2 = arg2.toString(),
				m, resultVal, d = arguments[2];
			m = (r1.split(".")[1] ? r1.split(".")[1].length : 0) + (r2.split(".")[1] ? r2.split(".")[1].length : 0);
			resultVal = Number(r1.replace(".", "")) * Number(r2.replace(".", "")) / Math.pow(10, m);
			return typeof d !== "number" ? Number(resultVal) : Number(resultVal.toFixed(parseInt(d)));
		},
		Div: function(arg1, arg2) {
			var r1 = arg1.toString(),
				r2 = arg2.toString(),
				m, resultVal, d = arguments[2];
			m = (r2.split(".")[1] ? r2.split(".")[1].length : 0) - (r1.split(".")[1] ? r1.split(".")[1].length : 0);
			resultVal = Number(r1.replace(".", "")) / Number(r2.replace(".", "")) * Math.pow(10, m);
			return typeof d !== "number" ? Number(resultVal) : Number(resultVal.toFixed(parseInt(d)));
		}
	};
	w.Calc = calc;

})(window)