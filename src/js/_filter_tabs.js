(function($){
	var filterNav = $('#filter-nav'),
		filterLayout = $('#filter-layout');

	if(!filterNav.length && !filterLayout.length) return false;

	var initFilter = (function(){
		var valueFilter = filterNav.find('.active a').attr('href');
		filterLayout.find('.' + valueFilter).addClass('show');
	}());

	$('body').on('click touchstart', '#filter-nav .gallery-navitem', function(e){
		e.preventDefault();
		if($(this).closest('li').hasClass('active')){
			return false
		} else {
			$(this).closest('li').addClass('active').siblings().removeClass('active');
			var valueFilter = filterNav.find('.active a').attr('href');

			filterLayout.find('.show').removeClass('show');
			filterLayout.find('.' + valueFilter).addClass('show');
		};
	});

	var moreWrapper = $('#js-more-include');
	if(!moreWrapper.length) return false;

	$('body').on('click touchstart', '#js-more-include > *', function(e){
		var includeValue = $('#js-more-include').data('include');
		e.preventDefault();
		$.ajax({
			url: includeValue,
			success: function(data) {
				var $item = $(data);
				var ajaxInclude = (function(){
					moreWrapper.parent().append($item);
					moreWrapper.remove();
				}());
			}
		});
	});
})(jQuery);
