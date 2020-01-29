// To connect js scripts used plugin rigger included
// Connection occurs through the design //= folder-name/file-name.js

jQuery(function() {
	initSmartMenu();
	initMobileNav();
	initSlickCarousel();
	initOpenClose();
	initScrollClass();
});

jQuery(window).on('load', function() {
	jQuery('html').addClass('page--loaded');
	initAnimateOnScroll();
	initFluidIframe();
	initArticlesOffset();
});


//-------- -------- -------- --------
//-------- js custom start
//-------- -------- -------- --------

function initSmartMenu(){
	jQuery('.nav > ul').smartmenus({
		collapsibleBehavior: 'accordion',
		mainMenuSubOffsetY: 5,
		subMenusMinWidth: '8em',
		// showOnClick: true
	});
}

// mobile menu init
function initMobileNav() {
	jQuery('body').mobileNav({
		menuActiveClass: 'nav--active',
		menuOpener: '.nav-opener'
	});

	if(!('ontouchstart' in document.documentElement)){
		jQuery(window).on('resize orientationchange', function(){
			jQuery('body').removeClass('nav--active');
			$.SmartMenus.hideAll();
		});
	};
}


// slick init
function initSlickCarousel() {
	jQuery('.posts-carousel').slick({
		infinite: false,
		slidesToScroll: 1,
		rows: 0,
		slidesToShow: 3,
		prevArrow: jQuery('.slick-prev-custom'),
		nextArrow: jQuery('.slick-next-custom'),
		responsive: [
			{
				breakpoint: 667,
				settings: {
					infinite: true,
					slidesToScroll: 1,
					slidesToShow: 1,
					centerMode: true,
					centerPadding: '40px',
				}
			},
			{
				breakpoint: 375,
				settings: {
					infinite: true,
					slidesToScroll: 1,
					slidesToShow: 1,
					centerMode: true,
					centerPadding: '20px',
				}
			}
		]
	});
}

function initAnimateOnScroll() {
	AOS.init({
		startEvent: 'DOMContentLoaded',
		initClassName: 'aos-init',
		disable: 'phone',
		debounceDelay: 50,
		throttleDelay: 99,
		offset: 50,
		delay: 0,
		once: true,
		duration: 600,
		easing: 'ease'
	});
}

// open-close init
function initOpenClose() {
	var searchOpener = jQuery('.search-opener > a');
	var navActive = 'nav--active';
	var body = jQuery('body');

	jQuery('.header').openClose({
		activeClass: 'search--active',
		opener: searchOpener,
		slider: '.search-slide',
		animSpeed: 400,
		hideOnClickOutside: true,
		effect: 'slide'
	});

	searchOpener.on('click', function() {
		if (body.hasClass(navActive)) {
			body.removeClass(navActive);
		}
	});
}

//add fluid block for iframe video
function initFluidIframe() {
	jQuery('.wrapper').each(function() {
		jQuery('.fluid-iframe').wrap('<div class="iframe-fluid-holder" />');
	});
}

function initArticlesOffset() {
	var win = jQuery(window);
	var wrapper = jQuery('#js-intro');
	var el = jQuery('.featured-posts');
	var elHeight = el.outerHeight();

	function resizeHandler() {
		if (window.matchMedia('(min-width: 768px)').matches) {
			elHeight = el.outerHeight();
			wrapper.css({'padding-bottom': elHeight})
		} else {
			wrapper.css({'padding-bottom': 0})
		}
	}

	resizeHandler();

	win.on('resize orientationchange', resizeHandler);
}

function initScrollClass() {
	var scrollClass = 'page--scrolled';
	var body = jQuery('body');
	var win = jQuery(window);

	win.on('scroll resize orentationchange', function(){
		if (win.scrollTop() > 0) {
			body.addClass(scrollClass);
		} else {
			body.removeClass(scrollClass);
		}
	});
}

//-------- -------- -------- --------
//-------- js custom end
//-------- -------- -------- --------

//-------- -------- -------- --------
//-------- included js libs start
//-------- -------- -------- --------

//= vendors/slick.min.js
//= vendors/mobile-navigation.js
//= vendors/smartmenus.min.js
//= vendors/jquery.open-close.js
//= vendors/aos.min.js

//-------- -------- -------- --------
//-------- included js libs end
//-------- -------- -------- --------