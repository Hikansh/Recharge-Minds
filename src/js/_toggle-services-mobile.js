(function($){
	var $objBtn = $('#js-services-btn'),
		$objCol = $('#js-services-col'),
		$body = $('body'),
		$html = $('html');

	if(!$objBtn.length && !$objCol.length) return false;
	$('body').on('click', '#js-services-btn', function (e){
		$(this).hasClass('tt-open-col') ? closeCol() : openCol();
	});
	function openCol($this){
		$objBtn.addClass('tt-open-col');
		var ttScrollValue = $body.scrollTop() || $html.scrollTop();
		$objCol.addClass('column-open').perfectScrollbar();
		$body.css("top", - ttScrollValue).addClass("no-scroll").append('<div id="modal-filter"></div>');
		var modalFilter = $('#modal-filter').fadeTo('fast',1);
		if (modalFilter.length) {
			modalFilter.on('click', function(){
				closeCol();
			})
		};
		return false;
	};
	function closeCol($this){
		$objCol.removeClass('column-open').perfectScrollbar('destroy');
		var top = parseInt($body.css("top").replace("px", ""), 10) * -1;
		$objBtn.removeClass('tt-open-col');
		$body.removeAttr("style").removeClass("no-scroll").scrollTop(top);
		$html.removeAttr("style").scrollTop(top);
		$("#modal-filter").off().remove();
		return false;
	};
	$(window).on('resize', function(){
		if($body.hasClass('no-scroll')){
			closeCol();
		};
	});
})(jQuery);
