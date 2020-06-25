function showArticle(){
	$(".article").each(function(){
	if(!!yiliaConfig.isHome) {
    if(!!browser.versions.mobile){
        
    } else {
        	if( $(this).offset().top <= $(window).scrollTop()+$(window).height() && !($(this).hasClass('show')) ) {
			$(this).css("visibility","visible");
			$(this).addClass("is-hiddened"); 
			$(this).css("transform-origin","right");
			$(this).css("transform","rotate3d(500, 100, 0, 360deg)");
			$(this).css("transition-duration","0.5s");
			
		} else {
			if(!$(this).hasClass("is-hiddened")) {
				$(this).css("visibility","hidden");

			}
		}
    }

	}
	})
}


var browser = {
        versions: function() {
        var u = window.navigator.userAgent;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者安卓QQ浏览器
            iPad: u.indexOf('iPad') > -1, //是否为iPad
            webApp: u.indexOf('Safari') == -1 ,//是否为web应用程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') == -1 //是否为微信浏览器
            };
        }()
    }

showArticle();
var scrollFunc = function (e) { 

e = e || window.event; 
if (e.wheelDelta) {   
if (e.wheelDelta < 0) { 
showArticle(); 
} 
} else if (e.detail) { 
if (e.detail< 0) {  
showArticle();
} 
} 
showArticle();
}

if (document.addEventListener) {
document.addEventListener('DOMMouseScroll', scrollFunc, false); 
} 
window.onmousewheel = document.onmousewheel = scrollFunc;

