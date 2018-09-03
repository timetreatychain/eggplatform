
var liyucode = (function() {
	function liyucode() {}

	liyucode.Pay_CLOSE = 20101; 
	liyucode.Pay_SUCCESS = 20102; 
	liyucode.Pay_FAIL = 20103; 
	liyucode.Pay_CANCEL = 20104; 
	liyucode.Pay_ERROR_DATA = 20105; 
	liyucode.Pay_ERROR_PARAM_NUM = 20106; 

	return liyucode;
})();

var liyusdk = (function() {
		
	function liyusdk() {}
	liyusdk.init = function() {
		var userParam=location.href.split("ly_open_id=")[1];
		liyusdk.open_id=userParam.split("&ly_access_token=")[0];
		liyusdk.access_token=userParam.split("&ly_access_token=")[1];
	};
	liyusdk.createRole = function(_roledata) {
		window.parent.postMessage(JSON.stringify(_roledata), "*");
	};
	liyusdk.pay = function(param) {
		window.parent.postMessage(JSON.stringify(param), "*");
	};
	liyusdk.transactions = function() {
		var param="tibi";
		window.parent.postMessage(JSON.stringify(param), "*");
	};
	
	return liyusdk;
})();