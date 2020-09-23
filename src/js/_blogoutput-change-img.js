(function($){
	var wrapperCarusel = $('#js-init-blogoutput'),
		wrapperImg = $('#js-change-img'),
		imgLeft = wrapperImg.find('.tt-img-left img'),
		imgRight = wrapperImg.find('.tt-img-right img');

	if (wrapperCarusel.length && wrapperImg.length){
		$('#js-init-blogoutput').on('afterChange', function(event, slick, currentSlide){
			changeImg();
		});
	};
	function changeImg(){
		var obj = wrapperCarusel.find('.slick-current .blog-output');

		imgLeft.attr('src', obj.attr('data-img01'));
		imgRight.attr('src', obj.attr('data-img02'));
	};
})(jQuery);