/*
*   Author: beshleyua
*   Author URL: http://themeforest.net/user/beshleyua
*/


/*
	Preloader
*/

$(window).on("load", function() {
	var preload = $('.preloader');
	preload.find('.spinner').fadeOut(function(){
		preload.fadeOut();
	});
});

$(function () {
	'use strict';


	/*
		Vars
	*/

	var container = $('.container');
	var card_items = $('.card-inner');
	var animation_in = container.data('animation-in');
	var animation_out = container.data('animation-out');
	var has_home = $('#home-card').length > 0;


	/*
		Open card by id (desktop: animated card switch, mobile: smooth scroll)
	*/

	function openCard(id) {
		var card_item = $(id);
		var menu_items = $('.top-menu li');
		var menu_item = $('.top-menu a[href="'+id+'"]').closest('li');

		if(!has_home || !card_item.length) return;

		if($(window).width() >= 1024) {
			if(!menu_item.hasClass('active')) {

				/* close card items */
				menu_items.removeClass('active');
				card_items.removeClass('animated '+animation_in);

				if(container.hasClass('opened')) {
					card_items.addClass('animated '+animation_out);
				}

				/* open card item */
				menu_item.addClass('active');
				container.addClass('opened');
				card_item.removeClass('animated '+animation_out);
				card_item.addClass('animated '+animation_in);

				card_items.addClass('hidden');

				card_item.removeClass('hidden');
				card_item.addClass('active');
			}
		} else {
			$('body,html').animate({
				scrollTop: card_item.offset().top - 76
			}, 800);
		}
	}


	/*
		Header Menu
	*/

	$('.top-menu').on('click', 'a', function(){
		openCard($(this).attr('href'));
		return false;
	});

	$('.lnks').on('click', '.lnk.discover', function(){
		openCard('#contacts-card');
		return false;
	});


	/*
		Mobile: highlight active menu item on scroll
	*/

	$(window).on('scroll', function(){
		if(!has_home || $(window).width() >= 1024) return;

		var scrollPos = $(window).scrollTop();
		$('.top-menu ul li a').each(function () {
			var currLink = $(this);
			var refElement = $(currLink.attr("href"));
			if (refElement.length && refElement.offset().top - 76 <= scrollPos) {
				$('.top-menu ul li').removeClass("active");
				currLink.closest('li').addClass("active");
			}
		});
	});

	$(window).on('resize', function(){
		if($(window).width() < 1024) {
			card_items.removeClass('hidden animated '+animation_out);
		}
		else {
			$($('.top-menu li.active a').attr('href')).addClass('active');
		}
	});


	/*
		Circle Skills Line
	*/

	var skills_circles = $('.skills-list.circles .progress');
	if(skills_circles.length){
		skills_circles.append('<div class="slice"><div class="bar"></div><div class="fill"></div></div>');
	}


	/*
		Wrap First Title Word
	*/

	$('.content .title').each(function() {
		var title = $(this).text().split(' ');
		if(title.length>1){
			var firstWord = title[0];
			var replaceWord = '<span class="first-word">' + firstWord + '</span>';
			var newString = $(this).html().replace(firstWord, replaceWord);
			$(this).html(newString);
		} else {
			$(this).html('<div class="first-letter">'+ $(this).html() + '</div>');
		}
	});

});
