(function($){
	var $toggleHolder = $('#js-toggle-h-holder');
	if(!$toggleHolder.length) return false;
	$('body').on('click', '#js-toggle-h-holder', function (e){
		$(this).toggleClass('active').prev().slideToggle(300);
		return false;
	});
})(jQuery);
