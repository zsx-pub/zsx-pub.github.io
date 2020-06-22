function showArticle(){
	$(".article").each(function(){
		if( $(this).offset().top <= $(window).scrollTop()+$(window).height() && !($(this).hasClass('show')) ) {
			$(this).removeClass("hidden").addClass("show");
			$(this).addClass("is-hiddened");
		} else {
			if(!$(this).hasClass("is-hiddened")) {
				$(this).addClass("hidden");
			}
		}
	})
}



