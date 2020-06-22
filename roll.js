function showArticle(){
	$(".article").each(function(){
	if(!!yiliaConfig.isHome) {
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
	})
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

