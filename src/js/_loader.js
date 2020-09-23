(function($){
	var $body = $('body');
	setTimeout(function (){
		$body.addClass('loaded');
	}, 1500);
	$(window).on('load', function(){
		$body.addClass('loaded');
		return false;
	});
})(jQuery);
