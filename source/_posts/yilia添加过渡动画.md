---
title: yilia添加过渡动画
article_type: 0
tags:
  - yilia
  - ScrollReveal
abbrlink: a9fa2238
date: 2020-06-22 15:43:56
toc:
---

>喜欢yilia这个主题的简洁，但好像用的人没多少，想加点功能百度不出明了一点的资料，折腾完这个懒得动了。
>通过监控鼠标滚轮的状态，改变css元素的属性，实现文章滚动推出效果。
>scrollReveal可以实现，但是找不到该元素来装载，用了上面的方法来实现

参考文档:
[滚动动画库scrollReveal的介绍](https://blog.csdn.net/weixin_37787674/article/details/90791999)<!-- more -->
[js监听html页面的上下滚动事件方法](https://www.jb51.net/article/147217.htm)
[CSS3 transform 属性](https://www.w3school.com.cn/cssref/pr_transform.asp)
[moxfive-基于yilia升级的主题](http://moxfive.xyz/)
具体代码如下：
```html
<script src="https://cdn.bootcss.com/scrollReveal.js/4.0.5/scrollreveal.js"></script>
<script>


function showArticle(){
	$(".article").each(function(){
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
	})
}

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



var config = {
 	    reset: true,
            origin: 'top', 
            distance: '30px',
            duration: 1500, 
            delay: 0, 
            rotate: { x: 0, y: 200, z: 0 }, 
            container: document.documentElement,
            opacity: 0, 
            scale: 1,

        beforeReveal: function(domEl){
            console.log('动画执行了');	    
        },
  
        beforeReset: function(domEl){
            console.log('滚轮开始');	    
        },
   
        afterReveal: function(domEl){
            console.log('动画结束');	   
        },

        afterReset: function(domEl){
            console.log('滚动结束');	    
        }
    };
window.sr = ScrollReveal();
sr.reveal('.body-wrap',config);                        
</script>
```

>更改日期 06/23
>原因：
>1.在reveal装载元素`.body-wrap`元素后，文章内的目录会被置于最低，而不是跟随页面的滚动置于底部。
>2.监测鼠标的滚动显示文章，在手机端会出现文章不加载的现象

在`yilia/source`目录下添加`roll.js`文件，内容如下:
```java
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
```

修改`layout.ejs`文件,添加内容:
```html
<script src="https://cdn.bootcss.com/scrollReveal.js/4.0.5/scrollreveal.js"></script>
<script>

var config = {
 	    
            origin: 'top', 
            distance: '30px',
            duration: 1500, 
            delay: 0, 
            rotate: { x: 0, y: 200, z: 0 }, 
            scale: 1
    };
 if(!!browser.versions.mobile){
        window.sr = ScrollReveal();
	sr.reveal('.article.article-type-post.article-index',config);  
    }
                      
</script>
```