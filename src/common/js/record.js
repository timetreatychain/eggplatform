var fontSizes;
(function(win, doc) {

	/**
	 * @description 针对app以外的访问埋点日志
	 * @param     {Number}  type  页面类型  
	 * @param     {Number}  objId  产品索引
	 * @param     {String}  f  渠道缩写  
	 * @param     {String}  touchs  页面功能  
	 * @param     {Function}  fn  页面功能  
	 * @param     url 参数 fromChannel(渠道id)  buid(人员id)
	 * @date      2017.09.04
	 * @author   Tom<Tom@liyunet.com>
	 */
	win.writeLog = function(type, objId, f, touchs, fn) {
		var time = new Date().getTime();
		var u = navigator.userAgent;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
		var os = isAndroid ? "android" : (isiOS ? "ios" : "pc");
		var ff = location.href.split("fromChannel=")[1] ? location.href.split("fromChannel=")[1].split("&")[0] : "0";
		var userId = location.href.split("buid=")[1] ? location.href.split("buid=")[1].split("&")[0] : "0";
		//		alert(location.href);
		var ext = {
			"type": type,
			"objId": objId,
			"f": ff,
			"touchs": touchs,
			't': time,
			'os': os,
			"buid": userId
		};
		var extStr = escape(JSON.stringify(ext));
		$("body").append('<img src="http://www.liyugame.com:4080/liyu_game/static/data/ly.gif?ext=' + extStr + '&fromPage=1" class="lyhis"/>');
		setTimeout(function() {
			if(typeof(fn) != "undefined") {
				fn();
			}
		}, 1000)
	};
	/**
	 * @description  设置字体
	 * @param        NULL
	 * @date         2017.09.04
	 * @author       Tom<Tom@liyunet.com>
	 */

	win.setFontSize = function() {
		var winWidth = window.screen.availWidth;
		var dpr = window.devicePixelRatio;
		var u = navigator.userAgent;
		if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
			doc.documentElement.style.fontSize = (winWidth / 640) * 100 + 'px';
			fontSizes = (winWidth / 640) * 100;
		} else if(u.indexOf('iPhone') > -1 || u.indexOf('iPad') > -1) {
			doc.documentElement.style.fontSize = (winWidth / 640) * 100 + 'px';
			fontSizes = (winWidth / 640) * 100;
		} else if(u.indexOf('Windows Phone') > -1) {
			doc.documentElement.style.fontSize = (winWidth / 640) * 100 + 'px';
			fontSizes = (winWidth / 640) * 100;
		} else {
			doc.documentElement.style.fontSize = 100 + 'px';
			fontSizes = 100;
		}
	}

	var evt = 'onorientationchange' in win ? 'orientationchange' : 'resize';

	var timer = null;

	win.addEventListener(evt, function() {
		clearTimeout(timer);
		timer = setTimeout(setFontSize, 300);
	}, {
		passive: false
	});

	win.addEventListener("pageshow", function(e) {
		if(e.persisted) {
			clearTimeout(timer);
			timer = setTimeout(setFontSize, 300);
		}
	}, {
		passive: false
	});
	setFontSize();
	
	win.checkOS = function() {
		if(!navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)){
			if(location.href.indexOf('download')==-1){
				　location.href="/download";
			}
		}
	}
	checkOS();
	
}(window, document));