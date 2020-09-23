(function($){
	var $toggleHolder = $('#js-toggle-orderform');
	if(!$toggleHolder.length) return false;
	$('body').on('click', '#js-toggle-orderform', function (e){
		$(this).toggleClass('active').next().slideToggle(300);
		return false;
	});
})(jQuery);
