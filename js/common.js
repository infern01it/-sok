$(function() {
	var imgSvgArray = {};

	function imgSvg() {
		$('img.img-svg').each(function () {
			var $img = $(this);
			var imgID = $img.attr('id');
			var imgClass = $img.attr('class');
			var imgURL = $img.attr('src');

			if (typeof imgSvgArray[imgURL] !== 'undefined') {
				var $svg = $(imgSvgArray[imgURL]);
				if (typeof imgClass !== 'undefined') {
					$svg = $svg.attr('class', imgClass + ' replaced-svg');
				}
				$img.replaceWith($svg);
			} else {
				$.ajax({
					url: imgURL,
					async: false,
					dataType: "xml",
					success: function (data) {
						var $svg = $(data).find('svg');
		
						if (typeof imgID !== 'undefined') {
							$svg = $svg.attr('id', imgID);
						}
		
						$svg = $svg.removeAttr('xmlns:a');
		
						if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
							$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
						}
		
						imgSvgArray[imgURL] = $svg[0].outerHTML;
		
						if (typeof imgClass !== 'undefined') {
							$svg = $svg.attr('class', imgClass + ' replaced-svg');
						}

						$img.replaceWith($svg);
					}
				});
			}
		});
	}

	imgSvg();

	$('.main').on("DOMNodeInserted", function() {
		imgSvg();
	});
	
	// Пример создания попапа
	// $('.popup').switchPopup({
	// 	btnClass: 'js-tgl-popup',
	// 	time: 300
	// });
	$('.header-screen__scroll').on('click', function(){
		$("html, body").animate({ scrollTop: $('header').height() }, 1000);
	});

	$('.slider__track').slick({
		infinite: true,
		nextArrow: '.slider__right',
		prevArrow: '.slider__left',
		arrows: true,
		dots: false,
		slidesToShow: 1,
	});

	for(var i = 1; i < 5; i++){
		$('#mini'+i).slick({
			infinite: true,
			prevArrow: '.left-'+ i,
			nextArrow: '.right-'+ i,
			arrows: true,
			dots: false,
			slidesToShow: 1,
		});
	};

	$('.slider__track').on('afterChange', function(event, slick, currentSlide, nextSlide){
		console.log(nextSlide);
		changeSliderInfo();
	  });
	function changeSliderInfo() {
		var allSlides1 = $('#slider-1 .slider__slide:not(.slick-cloned)');
		var currentSlide = $('#slider-1 .slick-active');
		var index = allSlides1.index($(currentSlide));
		$('.slider__current').empty().append(index + 1);
		$('.slider__all').empty().append('/' + allSlides1.length);
	}
	changeSliderInfo();
	
	
	
});

