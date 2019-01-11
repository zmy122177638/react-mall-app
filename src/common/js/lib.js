import wx from 'weixin-js-sdk';

export const isQQ = ()=>{
  let ua = navigator.userAgent.toLowerCase();
  return !!ua.match(/mqqbrowser|qzone|qqbrowser/i);
}

export const isWeixin  = ()=>{
  let ua = navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i)=="micromessenger") { //eslint-disable-line
      return true;
  } else {
      return false;
  }
}
export const isAndroid  = ()=>{
  let ua = navigator.userAgent;
  return ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1;
}
export const isIos  = ()=>{
  let ua = navigator.userAgent;
  return !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}
/**
 * 微信分享
 * @param {微信签名所需对象} sd
 * @param {分享所需字段} sharobj
 * @param {分享所需链接地址} href
 */
export const wxShare = (sd, sharobj, href, success) => {
  // 判断是否为微信浏览器
  if (!isWeixin()) return false
  wx.config({
    debug: false,
    appId: sd.appid,
    timestamp: sd.timestamp,
    nonceStr: sd.noncestr,
    signature: sd.signature,
    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'checkJsApi', 'openLocation', 'getLocation']
  })
  wx.ready(function () {
    wx.onMenuShareTimeline({
      title: sharobj.share_title, // 分享标题
      desc: sharobj.share_description, // 分享描述
      // link: window.location.origin + '/app/dmstore?store_id=' + _this.storeid, // 分享链接
      link: href, // 分享链接
      imgUrl: sharobj.thumb, // 分享图标
      success: function () {
        success && success()
        // alert("分享到朋友圈成功")
      },
      cancel: function () {
        // alert("分享失败,您取消了分享!")
      }
    })
    wx.onMenuShareAppMessage({
      title: sharobj.share_title, // 分享标题
      desc: sharobj.share_description, // 分享描述
      link: href, // 分享链接
      imgUrl: sharobj.thumb, // 分享图标
      success: function () {
        success && success()
        // alert("成功分享给朋友")
      },
      cancel: function () {
        // alert("分享失败,您取消了分享!")
      }
    })
    wx.onMenuShareQQ({
      title: sharobj.share_title, // 分享标题
      desc: sharobj.share_description, // 分享描述
      link: href, // 分享链接
      imgUrl: sharobj.thumb, // 分享图标
      success: function () {
        success && success()
      },
      cancel: function () {}
    })
    wx.onMenuShareWeibo({
      title: sharobj.share_title, // 分享标题
      desc: sharobj.share_description, // 分享描述
      link: href, // 分享链接
      imgUrl: sharobj.thumb, // 分享图标
      success: function () {
        success && success()
        // alert("成功分享给朋友")
      },
      cancel: function () {
        // alert("分享失败,您取消了分享!")
      }
    })
    wx.onMenuShareQZone({
      title: sharobj.share_title, // 分享标题
      desc: sharobj.share_description, // 分享描述
      link: href, // 分享链接
      imgUrl: sharobj.thumb, // 分享图标
      success: function () {
        success && success()
        // alert("成功分享给朋友")
      },
      cancel: function () {
        // alert("分享失败,您取消了分享!")
      }
    })
  })
  wx.error(function (res) {
    // alert(JSON.stringify(res))
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，
    // 对于SPA可以在这里更新签名。
  })
}

/**
 * 微信支付
 * @param {微信签名所需对象} sd
 * @param {支付所需字段} paysd
 * @param {回调函数} cb
 */
export const wxpay = (sd, paysd, cb, cancelCb) => {
  wx.config({
    debug: false,
    appId: sd.appId,
    timestamp: sd.timestamp,
    nonceStr: sd.nonceStr,
    signature: sd.signature,
    jsApiList: [
      'chooseWXPay'
    ]
  })
  wx.ready(function () {
    wx.chooseWXPay({
      timestamp: paysd.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
      nonceStr: paysd.nonceStr, // 支付签名随机串，不长于 32 位
      package: paysd.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
      signType: paysd.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
      paySign: paysd.paySign, // 支付签名
      success: function (res) {
        // 支付成功后的回调函数
        cb(res)
      },
      cancel: function (res) {
        // 取消支付后的回调函数
        cancelCb(res)
      }
    })
  })
  wx.error(function (res) {
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看
  })
}
/**
 * 图片预览
 * @param {数组中当前图片链接} src
 * @param {图片数组} imgPaths
 */
export const wximgview = (src, imgPaths) => {
  wx.previewImage({
    current: src,
    urls: imgPaths
  })
}
