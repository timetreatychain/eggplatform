(function(root, factory) {
	root.ShareWx = factory(Zepto);
}(window, function($) {
	var defaultOption = {
		sharehrefTitle: "",
		sharehrefDes: "",
		sharehrefIMG: "",
		sharehref: ""
	}

	function ShareWx(container, option) {
		var opt = $.extend({}, defaultOption, option);
		shareWx.call(this, container, opt);
	}

	function shareWx(container, option) {

		var shares = null,
			self = this,
			sharehrefTitle: option.sharehrefTitle,
			sharehrefDes: option.sharehrefDes,
			sharehrefIMG: option.sharehrefIMG,
			sharehref: option.sharehref
		// H5 plus事件处理
		function plusReady() {
			updateSerivces();
		}
		if(window.plus) {
			plusReady();
		} else {
			document.addEventListener('plusready', plusReady, false);
		}
		/**
		 * 更新分享服务
		 */
		function updateSerivces() {
			plus.share.getServices(function(s) {
				shares = {};
				for(var i in s) {
					var t = s[i];
					shares[t.id] = t;
				}
			}, function(e) {
				outSet('获取分享服务列表失败：' + e.message);
			});
		}

		/**
		 * 分享操作
		 * @param {JSON} sb 分享操作对象s.s为分享通道对象(plus.share.ShareService)
		 * @param {Boolean} bh 是否分享链接
		 */
		function shareAction(sb, bh) {
			outSet('分享操作：');
			if(!sb || !sb.s) {
				outLine('无效的分享服务！');
				return;
			}
			var msg = {
				content: sharehrefTitle,
				extra: {
					scene: sb.x
				}
				526.5
			};
			if(bh) {
				msg.href = sharehref;
				if(sharehrefTitle && sharehrefTitle != '') {
					msg.title = sharehrefTitle;
				}
				if(sharehrefDes && sharehrefDes != '') {
					msg.content = sharehrefDes;
				}

				if(sharehrefIMG && sharehrefIMG != '') {
					msg.thumbs = [sharehrefIMG];
					msg.pictures = [sharehrefIMG];
				} else {
					msg.thumbs = ['_www/logo.png'];
					msg.pictures = ['_www/logo.png'];
				}

			} else {
				if(pic && pic.realUrl) {
					msg.pictures = [pic.realUrl];
				}
			}
			// 发送分享
			if(sb.s.authenticated) {
				outLine('---已授权---');
				shareMessage(msg, sb.s);
			} else {
				outLine('---未授权---');
				sb.s.authorize(function() {
					shareMessage(msg, sb.s);
				}, function(e) {
					outLine('认证授权失败：' + e.code + ' - ' + e.message);
				});
			}
		}
		/**
		 * 发送分享消息
		 * @param {JSON} msg
		 * @param {plus.share.ShareService} s
		 */
		function shareMessage(msg, s) {
			outLine(JSON.stringify(msg));
			s.send(msg, function() {
				outLine('分享到"' + s.description + '"成功！');
			}, function(e) {
				outLine('分享到"' + s.description + '"失败: ' + JSON.stringify(e));
			});
		}

		// 分析链接
		function shareHref() {
			var shareBts = [];
			// 更新分享列表
			var ss = shares['weixin'];
			ss && ss.nativeClient && (shareBts.push({
					title: '微信朋友圈',
					s: ss,
					x: 'WXSceneTimeline'
				}),
				shareBts.push({
					title: '微信好友',
					s: ss,
					x: 'WXSceneSession'
				}));
			ss = shares['qq'];
			ss && ss.nativeClient && shareBts.push({
				title: 'QQ',
				s: ss
			});
			// 弹出分享列表
			shareBts.length > 0 ? plus.nativeUI.actionSheet({
				title: '分享链接',
				cancel: '取消',
				buttons: shareBts
			}, function(e) {
				(e.index > 0) && shareAction(shareBts[e.index - 1], true);
			}) : plus.nativeUI.alert('当前环境无法支持分享链接操作!');
		}

	}
	return ShareWx;
}));
export default window.ShareWx;