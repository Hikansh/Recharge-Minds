(function($){
	var nav = $('#tt-nav'),
		navLine = $('#tt-nav__line');

	if(!nav.length && !navLine.length) return false;

	var determineSybMenu = (function(){
		nav.find('> ul > li').each(function(){
			if ($(this).children('ul').length != 0){
				$(this).addClass('subMenu');
			}
		});
	}());

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


	$(window).resize(debouncer(function(e){
		changePosition(nav.find('> ul > li.active'));
	}));

	var setValue = (function(){
		changePosition(nav.find('> ul > li.active'));
	}());

	function changePosition(obj){
		if (window.innerWidth <= 1239) return;
		var $this = obj.find('span');
		navLine.css({
			'top': parseInt($this.position().top + $this.height(), 10),
			'left': parseInt($this.position().left, 10),
			'width': parseInt($this.width(), 10),
		});
		if(obj.hasClass('subMenu')){
			obj.find('ul').css({
				'top': parseInt($this.position().top + $this.height(), 10),
				'left': parseInt($this.position().left, 10),
			});
		};
	};
	var hoverLi = (function(){
		if (window.innerWidth <= 1239) return;
		nav.find('> ul > li').on("mouseenter", function(){
			changePosition($(this));
		}).on('mouseleave', function() {
			changePosition(nav.find('> ul > li.active'));
		});
	}());
})(jQuery);
