(function($){
	var nav = $('#f-nav');

	if(!nav.length) return false;

	var determineActive = (function(){
		var location = window.location.href.split('#')[0],
			cur_url = location.split('/').pop() || 'index.html';

		nav.find('li').each(function(){
			var link = $(this).find('a').attr('href');
			if (cur_url == link){
				$(this).addClass('active').closest('.subMenu').addClass('active');
				nav.addClass('defined-item');
			}
		});
	}());

	var missingItemActive = (function(){
		if(!nav.hasClass('defined-item')){
			nav.find('> ul > li:first-child').addClass('active');
		}
	}());
})(jQuery);
