(function($){
	$('#tt-pageContent [data-slick]').slick({
		lazyLoad: 'progressive',
		dots: true,
		arrows: false,
		infinite: true,
		speed: 300,
		autoplay:true,
		adaptiveHeight: true,
		slidesToScroll: 1,
		pauseOnFocus:false,
		pauseOnHover: false
	});
	$('a[data-toggle="tab"]').length && $('body').on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
		$('.slick-slider').each(function() {
			$(this).slick("getSlick").refresh();
		});
	});
})(jQuery);
(function($){
	function initSliderCarusel(){
		var slick04 = $('#tt-pageContent .js-init-carusel-mobile'),
			width = window.innerWidth || document.body.clientWidth;

		if (!slick04.length) return false;
		if (width <= 576){
			slick04.slick({
				lazyLoad: 'progressive',
				dots: true,
				arrows: false,
				infinite: true,
				speed: 300,
				slidesToShow: 1,
				slidesToScroll: 1,
				adaptiveHeight: true,
				autoplay:true,
				autoplaySpeed:4500,
				pauseOnFocus:false,
				pauseOnHover: false
			});
		} else {
			slick04.filter('.slick-initialized').slick('unslick');
		}
	};
	initSliderCarusel();
	$(window).resize(debouncer(function(e){
		initSliderCarusel();
	}));
})(jQuery);