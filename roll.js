function showArticle(){
	$(".article").each(function(){
	if(!!yiliaConfig.isHome) {
    if(!!browser.versions.mobile){
        
    } else {
        	if( $(this).offset().top <= $(window).scrollTop()+$(window).height() && !($(this).hasClass('show')) ) {
			$(this).css("visibility","visible");
			$(this).addClass("is-hiddened"); 
			$(this).css("transform-origin","right");
			$(this).css("transform","rotate3d(300, 200, 200, 360deg)");
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
            trident: u.indexOf('Trident') > -1, //IE�ں�
            presto: u.indexOf('Presto') > -1, //opera�ں�
            webKit: u.indexOf('AppleWebKit') > -1, //ƻ�����ȸ��ں�
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //����ں�
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //�Ƿ�Ϊ�ƶ��ն�
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios�ն�
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android�ն˻���uc�����
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //�Ƿ�ΪiPhone���߰�׿QQ�����
            iPad: u.indexOf('iPad') > -1, //�Ƿ�ΪiPad
            webApp: u.indexOf('Safari') == -1 ,//�Ƿ�ΪwebӦ�ó���û��ͷ����ײ�
            weixin: u.indexOf('MicroMessenger') == -1 //�Ƿ�Ϊ΢�������
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

