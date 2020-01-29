// To connect js scripts used plugin rigger included
// Connection occurs through the design //= folder-name/file-name.js
//-------- -------- -------- --------
//-------- js custom start
//-------- -------- -------- --------

jQuery(document).ready(function() {
    initBrowserDetect(true, true);
});

function initSmartMenu() {
    jQuery(".nav > ul").smartmenus({
        collapsibleBehavior: "accordion",
        mainMenuSubOffsetY: 5,
        subMenusMinWidth: "8em"
    });
}

// mobile menu init
function initMobileNav() {
    jQuery("body").mobileNav({
        menuActiveClass: "nav--active",
        menuOpener: ".nav-opener"
    }), "ontouchstart" in document.documentElement || jQuery(window).on("resize orientationchange", function() {
        jQuery("body").removeClass("nav--active"), jQuery.SmartMenus.hideAll();
    });
}

// slick init
function initSlickCarousel() {
    jQuery(".posts-carousel").slick({
        infinite: !1,
        slidesToScroll: 1,
        rows: 0,
        slidesToShow: 3,
        prevArrow: jQuery(".slick-prev-custom"),
        nextArrow: jQuery(".slick-next-custom"),
        responsive: [ {
            breakpoint: 667,
            settings: {
                infinite: !0,
                slidesToScroll: 1,
                slidesToShow: 1,
                centerMode: !0,
                centerPadding: "40px"
            }
        }, {
            breakpoint: 375,
            settings: {
                infinite: !0,
                slidesToScroll: 1,
                slidesToShow: 1,
                centerMode: !0,
                centerPadding: "20px"
            }
        } ]
    });
}


// open-close init
function initOpenClose() {
    var searchOpener = jQuery(".search-opener > a"), body = jQuery("body");
    jQuery(".header").openClose({
        activeClass: "search--active",
        opener: searchOpener,
        slider: ".search-slide",
        animSpeed: 400,
        hideOnClickOutside: !0,
        effect: "slide"
    }), searchOpener.on("click", function() {
        body.hasClass("nav--active") && body.removeClass("nav--active");
    });
}

//add fluid block for iframe video
function initFluidIframe() {
    jQuery(".wrapper").each(function() {
        jQuery(".fluid-iframe").wrap('<div class="iframe-fluid-holder" />');
    });
}

function initArticlesOffset() {
    var win = jQuery(window), wrapper = jQuery("#js-intro"), el = jQuery(".featured-posts"), elHeight = el.outerHeight();
    function resizeHandler() {
        window.matchMedia("(min-width: 768px)").matches ? (elHeight = el.outerHeight(),
        wrapper.css({
            "padding-bottom": elHeight
        })) : wrapper.css({
            "padding-bottom": 0
        });
    }
    resizeHandler(), win.on("resize orientationchange", resizeHandler);
}

function initScrollClass() {
    var body = jQuery("body"), win = jQuery(window);
    win.on("scroll resize orentationchange", function() {
        0 < win.scrollTop() ? body.addClass("page--scrolled") : body.removeClass("page--scrolled");
    });
}

//-------- -------- -------- --------
//-------- js custom end
//-------- -------- -------- --------
//-------- -------- -------- --------
//-------- included js libs start
//-------- -------- -------- --------
jQuery(function() {
    initSmartMenu(), initMobileNav(), initSlickCarousel(), initOpenClose(), initScrollClass();
}), jQuery(window).on("load", function() {
    jQuery("html").addClass("page--loaded"), initFluidIframe(),
    initArticlesOffset();
}),
//-------- -------- -------- --------
//-------- js custom end
//-------- -------- -------- --------
//-------- -------- -------- --------
//-------- included js libs start
//-------- -------- -------- --------
function(factory) {
    "use strict";
    "function" == typeof define && define.amd ? define([ "jquery" ], factory) : "undefined" != typeof exports ? module.exports = factory(require("jquery")) : factory(jQuery);
}(function($) {
    "use strict";
    var instanceUid, Slick = window.Slick || {};
    instanceUid = 0, (Slick = function(element, settings) {
        var dataSettings, _ = this;
        _.defaults = {
            accessibility: !0,
            adaptiveHeight: !1,
            appendArrows: $(element),
            appendDots: $(element),
            arrows: !0,
            asNavFor: null,
            prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
            nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
            autoplay: !1,
            autoplaySpeed: 3e3,
            centerMode: !1,
            centerPadding: "50px",
            cssEase: "ease",
            customPaging: function(slider, i) {
                return $('<button type="button" />').text(i + 1);
            },
            dots: !1,
            dotsClass: "slick-dots",
            draggable: !0,
            easing: "linear",
            edgeFriction: .35,
            fade: !1,
            focusOnSelect: !1,
            focusOnChange: !1,
            infinite: !0,
            initialSlide: 0,
            lazyLoad: "ondemand",
            mobileFirst: !1,
            pauseOnHover: !0,
            pauseOnFocus: !0,
            pauseOnDotsHover: !1,
            respondTo: "window",
            responsive: null,
            rows: 1,
            rtl: !1,
            slide: "",
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 500,
            swipe: !0,
            swipeToSlide: !1,
            touchMove: !0,
            touchThreshold: 5,
            useCSS: !0,
            useTransform: !0,
            variableWidth: !1,
            vertical: !1,
            verticalSwiping: !1,
            waitForAnimate: !0,
            zIndex: 1e3
        }, _.initials = {
            animating: !1,
            dragging: !1,
            autoPlayTimer: null,
            currentDirection: 0,
            currentLeft: null,
            currentSlide: 0,
            direction: 1,
            $dots: null,
            listWidth: null,
            listHeight: null,
            loadIndex: 0,
            $nextArrow: null,
            $prevArrow: null,
            scrolling: !1,
            slideCount: null,
            slideWidth: null,
            $slideTrack: null,
            $slides: null,
            sliding: !1,
            slideOffset: 0,
            swipeLeft: null,
            swiping: !1,
            $list: null,
            touchObject: {},
            transformsEnabled: !1,
            unslicked: !1
        }, $.extend(_, _.initials), _.activeBreakpoint = null, _.animType = null, _.animProp = null,
        _.breakpoints = [], _.breakpointSettings = [], _.cssTransitions = !1, _.focussed = !1,
        _.interrupted = !1, _.hidden = "hidden", _.paused = !0, _.positionProp = null, _.respondTo = null,
        _.rowCount = 1, _.shouldClick = !0, _.$slider = $(element), _.$slidesCache = null,
        _.transformType = null, _.transitionType = null, _.visibilityChange = "visibilitychange",
        _.windowWidth = 0, _.windowTimer = null, dataSettings = $(element).data("slick") || {},
        _.options = $.extend({}, _.defaults, settings, dataSettings), _.currentSlide = _.options.initialSlide,
        _.originalSettings = _.options, void 0 !== document.mozHidden ? (_.hidden = "mozHidden",
        _.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (_.hidden = "webkitHidden",
        _.visibilityChange = "webkitvisibilitychange"), _.autoPlay = $.proxy(_.autoPlay, _),
        _.autoPlayClear = $.proxy(_.autoPlayClear, _), _.autoPlayIterator = $.proxy(_.autoPlayIterator, _),
        _.changeSlide = $.proxy(_.changeSlide, _), _.clickHandler = $.proxy(_.clickHandler, _),
        _.selectHandler = $.proxy(_.selectHandler, _), _.setPosition = $.proxy(_.setPosition, _),
        _.swipeHandler = $.proxy(_.swipeHandler, _), _.dragHandler = $.proxy(_.dragHandler, _),
        _.keyHandler = $.proxy(_.keyHandler, _), _.instanceUid = instanceUid++, _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/,
        _.registerBreakpoints(), _.init(!0);
    }).prototype.activateADA = function() {
        this.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        });
    }, Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {
        var _ = this;
        if ("boolean" == typeof index) addBefore = index, index = null; else if (index < 0 || index >= _.slideCount) return !1;
        _.unload(), "number" == typeof index ? 0 === index && 0 === _.$slides.length ? $(markup).appendTo(_.$slideTrack) : addBefore ? $(markup).insertBefore(_.$slides.eq(index)) : $(markup).insertAfter(_.$slides.eq(index)) : !0 === addBefore ? $(markup).prependTo(_.$slideTrack) : $(markup).appendTo(_.$slideTrack),
        _.$slides = _.$slideTrack.children(this.options.slide), _.$slideTrack.children(this.options.slide).detach(),
        _.$slideTrack.append(_.$slides), _.$slides.each(function(index, element) {
            $(element).attr("data-slick-index", index);
        }), _.$slidesCache = _.$slides, _.reinit();
    }, Slick.prototype.animateHeight = function() {
        var _ = this;
        if (1 === _.options.slidesToShow && !0 === _.options.adaptiveHeight && !1 === _.options.vertical) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(!0);
            _.$list.animate({
                height: targetHeight
            }, _.options.speed);
        }
    }, Slick.prototype.animateSlide = function(targetLeft, callback) {
        var animProps = {}, _ = this;
        _.animateHeight(), !0 === _.options.rtl && !1 === _.options.vertical && (targetLeft = -targetLeft),
        !1 === _.transformsEnabled ? !1 === _.options.vertical ? _.$slideTrack.animate({
            left: targetLeft
        }, _.options.speed, _.options.easing, callback) : _.$slideTrack.animate({
            top: targetLeft
        }, _.options.speed, _.options.easing, callback) : !1 === _.cssTransitions ? (!0 === _.options.rtl && (_.currentLeft = -_.currentLeft),
        $({
            animStart: _.currentLeft
        }).animate({
            animStart: targetLeft
        }, {
            duration: _.options.speed,
            easing: _.options.easing,
            step: function(now) {
                now = Math.ceil(now), !1 === _.options.vertical ? animProps[_.animType] = "translate(" + now + "px, 0px)" : animProps[_.animType] = "translate(0px," + now + "px)",
                _.$slideTrack.css(animProps);
            },
            complete: function() {
                callback && callback.call();
            }
        })) : (_.applyTransition(), targetLeft = Math.ceil(targetLeft), !1 === _.options.vertical ? animProps[_.animType] = "translate3d(" + targetLeft + "px, 0px, 0px)" : animProps[_.animType] = "translate3d(0px," + targetLeft + "px, 0px)",
        _.$slideTrack.css(animProps), callback && setTimeout(function() {
            _.disableTransition(), callback.call();
        }, _.options.speed));
    }, Slick.prototype.getNavTarget = function() {
        var asNavFor = this.options.asNavFor;
        return asNavFor && null !== asNavFor && (asNavFor = $(asNavFor).not(this.$slider)),
        asNavFor;
    }, Slick.prototype.asNavFor = function(index) {
        var asNavFor = this.getNavTarget();
        null !== asNavFor && "object" == typeof asNavFor && asNavFor.each(function() {
            var target = $(this).slick("getSlick");
            target.unslicked || target.slideHandler(index, !0);
        });
    }, Slick.prototype.applyTransition = function(slide) {
        var _ = this, transition = {};
        !1 === _.options.fade ? transition[_.transitionType] = _.transformType + " " + _.options.speed + "ms " + _.options.cssEase : transition[_.transitionType] = "opacity " + _.options.speed + "ms " + _.options.cssEase,
        !1 === _.options.fade ? _.$slideTrack.css(transition) : _.$slides.eq(slide).css(transition);
    }, Slick.prototype.autoPlay = function() {
        var _ = this;
        _.autoPlayClear(), _.slideCount > _.options.slidesToShow && (_.autoPlayTimer = setInterval(_.autoPlayIterator, _.options.autoplaySpeed));
    }, Slick.prototype.autoPlayClear = function() {
        this.autoPlayTimer && clearInterval(this.autoPlayTimer);
    }, Slick.prototype.autoPlayIterator = function() {
        var _ = this, slideTo = _.currentSlide + _.options.slidesToScroll;
        _.paused || _.interrupted || _.focussed || (!1 === _.options.infinite && (1 === _.direction && _.currentSlide + 1 === _.slideCount - 1 ? _.direction = 0 : 0 === _.direction && (slideTo = _.currentSlide - _.options.slidesToScroll,
        _.currentSlide - 1 == 0 && (_.direction = 1))), _.slideHandler(slideTo));
    }, Slick.prototype.buildArrows = function() {
        var _ = this;
        !0 === _.options.arrows && (_.$prevArrow = $(_.options.prevArrow).addClass("slick-arrow"),
        _.$nextArrow = $(_.options.nextArrow).addClass("slick-arrow"), _.slideCount > _.options.slidesToShow ? (_.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
        _.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), _.htmlExpr.test(_.options.prevArrow) && _.$prevArrow.prependTo(_.options.appendArrows),
        _.htmlExpr.test(_.options.nextArrow) && _.$nextArrow.appendTo(_.options.appendArrows),
        !0 !== _.options.infinite && _.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : _.$prevArrow.add(_.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }));
    }, Slick.prototype.buildDots = function() {
        var i, dot, _ = this;
        if (!0 === _.options.dots && _.slideCount > _.options.slidesToShow) {
            for (_.$slider.addClass("slick-dotted"), dot = $("<ul />").addClass(_.options.dotsClass),
            i = 0; i <= _.getDotCount(); i += 1) dot.append($("<li />").append(_.options.customPaging.call(this, _, i)));
            _.$dots = dot.appendTo(_.options.appendDots), _.$dots.find("li").first().addClass("slick-active");
        }
    }, Slick.prototype.buildOut = function() {
        var _ = this;
        _.$slides = _.$slider.children(_.options.slide + ":not(.slick-cloned)").addClass("slick-slide"),
        _.slideCount = _.$slides.length, _.$slides.each(function(index, element) {
            $(element).attr("data-slick-index", index).data("originalStyling", $(element).attr("style") || "");
        }), _.$slider.addClass("slick-slider"), _.$slideTrack = 0 === _.slideCount ? $('<div class="slick-track"/>').appendTo(_.$slider) : _.$slides.wrapAll('<div class="slick-track"/>').parent(),
        _.$list = _.$slideTrack.wrap('<div class="slick-list"/>').parent(), _.$slideTrack.css("opacity", 0),
        !0 !== _.options.centerMode && !0 !== _.options.swipeToSlide || (_.options.slidesToScroll = 1),
        $("img[data-lazy]", _.$slider).not("[src]").addClass("slick-loading"), _.setupInfinite(),
        _.buildArrows(), _.buildDots(), _.updateDots(), _.setSlideClasses("number" == typeof _.currentSlide ? _.currentSlide : 0),
        !0 === _.options.draggable && _.$list.addClass("draggable");
    }, Slick.prototype.buildRows = function() {
        var a, b, c, newSlides, numOfSlides, originalSlides, slidesPerSection, _ = this;
        if (newSlides = document.createDocumentFragment(), originalSlides = _.$slider.children(),
        0 < _.options.rows) {
            for (slidesPerSection = _.options.slidesPerRow * _.options.rows, numOfSlides = Math.ceil(originalSlides.length / slidesPerSection),
            a = 0; a < numOfSlides; a++) {
                var slide = document.createElement("div");
                for (b = 0; b < _.options.rows; b++) {
                    var row = document.createElement("div");
                    for (c = 0; c < _.options.slidesPerRow; c++) {
                        var target = a * slidesPerSection + (b * _.options.slidesPerRow + c);
                        originalSlides.get(target) && row.appendChild(originalSlides.get(target));
                    }
                    slide.appendChild(row);
                }
                newSlides.appendChild(slide);
            }
            _.$slider.empty().append(newSlides), _.$slider.children().children().children().css({
                width: 100 / _.options.slidesPerRow + "%",
                display: "inline-block"
            });
        }
    }, Slick.prototype.checkResponsive = function(initial, forceUpdate) {
        var breakpoint, targetBreakpoint, respondToWidth, _ = this, triggerBreakpoint = !1, sliderWidth = _.$slider.width(), windowWidth = window.innerWidth || $(window).width();
        if ("window" === _.respondTo ? respondToWidth = windowWidth : "slider" === _.respondTo ? respondToWidth = sliderWidth : "min" === _.respondTo && (respondToWidth = Math.min(windowWidth, sliderWidth)),
        _.options.responsive && _.options.responsive.length && null !== _.options.responsive) {
            for (breakpoint in targetBreakpoint = null, _.breakpoints) _.breakpoints.hasOwnProperty(breakpoint) && (!1 === _.originalSettings.mobileFirst ? respondToWidth < _.breakpoints[breakpoint] && (targetBreakpoint = _.breakpoints[breakpoint]) : respondToWidth > _.breakpoints[breakpoint] && (targetBreakpoint = _.breakpoints[breakpoint]));
            null !== targetBreakpoint ? null !== _.activeBreakpoint && targetBreakpoint === _.activeBreakpoint && !forceUpdate || (_.activeBreakpoint = targetBreakpoint,
            "unslick" === _.breakpointSettings[targetBreakpoint] ? _.unslick(targetBreakpoint) : (_.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]),
            !0 === initial && (_.currentSlide = _.options.initialSlide), _.refresh(initial)),
            triggerBreakpoint = targetBreakpoint) : null !== _.activeBreakpoint && (_.activeBreakpoint = null,
            _.options = _.originalSettings, !0 === initial && (_.currentSlide = _.options.initialSlide),
            _.refresh(initial), triggerBreakpoint = targetBreakpoint), initial || !1 === triggerBreakpoint || _.$slider.trigger("breakpoint", [ _, triggerBreakpoint ]);
        }
    }, Slick.prototype.changeSlide = function(event, dontAnimate) {
        var indexOffset, slideOffset, _ = this, $target = $(event.currentTarget);
        switch ($target.is("a") && event.preventDefault(), $target.is("li") || ($target = $target.closest("li")),
        indexOffset = _.slideCount % _.options.slidesToScroll != 0 ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll,
        event.data.message) {
          case "previous":
            slideOffset = 0 == indexOffset ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset,
            _.slideCount > _.options.slidesToShow && _.slideHandler(_.currentSlide - slideOffset, !1, dontAnimate);
            break;

          case "next":
            slideOffset = 0 == indexOffset ? _.options.slidesToScroll : indexOffset, _.slideCount > _.options.slidesToShow && _.slideHandler(_.currentSlide + slideOffset, !1, dontAnimate);
            break;

          case "index":
            var index = 0 === event.data.index ? 0 : event.data.index || $target.index() * _.options.slidesToScroll;
            _.slideHandler(_.checkNavigable(index), !1, dontAnimate), $target.children().trigger("focus");
            break;

          default:
            return;
        }
    }, Slick.prototype.checkNavigable = function(index) {
        var navigables, prevNavigable;
        if (prevNavigable = 0, index > (navigables = this.getNavigableIndexes())[navigables.length - 1]) index = navigables[navigables.length - 1]; else for (var n in navigables) {
            if (index < navigables[n]) {
                index = prevNavigable;
                break;
            }
            prevNavigable = navigables[n];
        }
        return index;
    }, Slick.prototype.cleanUpEvents = function() {
        var _ = this;
        _.options.dots && null !== _.$dots && ($("li", _.$dots).off("click.slick", _.changeSlide).off("mouseenter.slick", $.proxy(_.interrupt, _, !0)).off("mouseleave.slick", $.proxy(_.interrupt, _, !1)),
        !0 === _.options.accessibility && _.$dots.off("keydown.slick", _.keyHandler)), _.$slider.off("focus.slick blur.slick"),
        !0 === _.options.arrows && _.slideCount > _.options.slidesToShow && (_.$prevArrow && _.$prevArrow.off("click.slick", _.changeSlide),
        _.$nextArrow && _.$nextArrow.off("click.slick", _.changeSlide), !0 === _.options.accessibility && (_.$prevArrow && _.$prevArrow.off("keydown.slick", _.keyHandler),
        _.$nextArrow && _.$nextArrow.off("keydown.slick", _.keyHandler))), _.$list.off("touchstart.slick mousedown.slick", _.swipeHandler),
        _.$list.off("touchmove.slick mousemove.slick", _.swipeHandler), _.$list.off("touchend.slick mouseup.slick", _.swipeHandler),
        _.$list.off("touchcancel.slick mouseleave.slick", _.swipeHandler), _.$list.off("click.slick", _.clickHandler),
        $(document).off(_.visibilityChange, _.visibility), _.cleanUpSlideEvents(), !0 === _.options.accessibility && _.$list.off("keydown.slick", _.keyHandler),
        !0 === _.options.focusOnSelect && $(_.$slideTrack).children().off("click.slick", _.selectHandler),
        $(window).off("orientationchange.slick.slick-" + _.instanceUid, _.orientationChange),
        $(window).off("resize.slick.slick-" + _.instanceUid, _.resize), $("[draggable!=true]", _.$slideTrack).off("dragstart", _.preventDefault),
        $(window).off("load.slick.slick-" + _.instanceUid, _.setPosition);
    }, Slick.prototype.cleanUpSlideEvents = function() {
        var _ = this;
        _.$list.off("mouseenter.slick", $.proxy(_.interrupt, _, !0)), _.$list.off("mouseleave.slick", $.proxy(_.interrupt, _, !1));
    }, Slick.prototype.cleanUpRows = function() {
        var originalSlides, _ = this;
        0 < _.options.rows && ((originalSlides = _.$slides.children().children()).removeAttr("style"),
        _.$slider.empty().append(originalSlides));
    }, Slick.prototype.clickHandler = function(event) {
        !1 === this.shouldClick && (event.stopImmediatePropagation(), event.stopPropagation(),
        event.preventDefault());
    }, Slick.prototype.destroy = function(refresh) {
        var _ = this;
        _.autoPlayClear(), _.touchObject = {}, _.cleanUpEvents(), $(".slick-cloned", _.$slider).detach(),
        _.$dots && _.$dots.remove(), _.$prevArrow && _.$prevArrow.length && (_.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""),
        _.htmlExpr.test(_.options.prevArrow) && _.$prevArrow.remove()), _.$nextArrow && _.$nextArrow.length && (_.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""),
        _.htmlExpr.test(_.options.nextArrow) && _.$nextArrow.remove()), _.$slides && (_.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            $(this).attr("style", $(this).data("originalStyling"));
        }), _.$slideTrack.children(this.options.slide).detach(), _.$slideTrack.detach(),
        _.$list.detach(), _.$slider.append(_.$slides)), _.cleanUpRows(), _.$slider.removeClass("slick-slider"),
        _.$slider.removeClass("slick-initialized"), _.$slider.removeClass("slick-dotted"),
        _.unslicked = !0, refresh || _.$slider.trigger("destroy", [ _ ]);
    }, Slick.prototype.disableTransition = function(slide) {
        var _ = this, transition = {};
        transition[_.transitionType] = "", !1 === _.options.fade ? _.$slideTrack.css(transition) : _.$slides.eq(slide).css(transition);
    }, Slick.prototype.fadeSlide = function(slideIndex, callback) {
        var _ = this;
        !1 === _.cssTransitions ? (_.$slides.eq(slideIndex).css({
            zIndex: _.options.zIndex
        }), _.$slides.eq(slideIndex).animate({
            opacity: 1
        }, _.options.speed, _.options.easing, callback)) : (_.applyTransition(slideIndex),
        _.$slides.eq(slideIndex).css({
            opacity: 1,
            zIndex: _.options.zIndex
        }), callback && setTimeout(function() {
            _.disableTransition(slideIndex), callback.call();
        }, _.options.speed));
    }, Slick.prototype.fadeSlideOut = function(slideIndex) {
        var _ = this;
        !1 === _.cssTransitions ? _.$slides.eq(slideIndex).animate({
            opacity: 0,
            zIndex: _.options.zIndex - 2
        }, _.options.speed, _.options.easing) : (_.applyTransition(slideIndex), _.$slides.eq(slideIndex).css({
            opacity: 0,
            zIndex: _.options.zIndex - 2
        }));
    }, Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {
        var _ = this;
        null !== filter && (_.$slidesCache = _.$slides, _.unload(), _.$slideTrack.children(this.options.slide).detach(),
        _.$slidesCache.filter(filter).appendTo(_.$slideTrack), _.reinit());
    }, Slick.prototype.focusHandler = function() {
        var _ = this;
        _.$slider.off("focus.slick blur.slick").on("focus.slick", "*", function(event) {
            var $sf = $(this);
            setTimeout(function() {
                _.options.pauseOnFocus && $sf.is(":focus") && (_.focussed = !0, _.autoPlay());
            }, 0);
        }).on("blur.slick", "*", function(event) {
            $(this);
            _.options.pauseOnFocus && (_.focussed = !1, _.autoPlay());
        });
    }, Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {
        return this.currentSlide;
    }, Slick.prototype.getDotCount = function() {
        var _ = this, breakPoint = 0, counter = 0, pagerQty = 0;
        if (!0 === _.options.infinite) if (_.slideCount <= _.options.slidesToShow) ++pagerQty; else for (;breakPoint < _.slideCount; ) ++pagerQty,
        breakPoint = counter + _.options.slidesToScroll, counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow; else if (!0 === _.options.centerMode) pagerQty = _.slideCount; else if (_.options.asNavFor) for (;breakPoint < _.slideCount; ) ++pagerQty,
        breakPoint = counter + _.options.slidesToScroll, counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow; else pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
        return pagerQty - 1;
    }, Slick.prototype.getLeft = function(slideIndex) {
        var targetLeft, verticalHeight, targetSlide, coef, _ = this, verticalOffset = 0;
        return _.slideOffset = 0, verticalHeight = _.$slides.first().outerHeight(!0), !0 === _.options.infinite ? (_.slideCount > _.options.slidesToShow && (_.slideOffset = _.slideWidth * _.options.slidesToShow * -1,
        coef = -1, !0 === _.options.vertical && !0 === _.options.centerMode && (2 === _.options.slidesToShow ? coef = -1.5 : 1 === _.options.slidesToShow && (coef = -2)),
        verticalOffset = verticalHeight * _.options.slidesToShow * coef), _.slideCount % _.options.slidesToScroll != 0 && slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow && (verticalOffset = slideIndex > _.slideCount ? (_.slideOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth * -1,
        (_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight * -1) : (_.slideOffset = _.slideCount % _.options.slidesToScroll * _.slideWidth * -1,
        _.slideCount % _.options.slidesToScroll * verticalHeight * -1))) : slideIndex + _.options.slidesToShow > _.slideCount && (_.slideOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * _.slideWidth,
        verticalOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * verticalHeight),
        _.slideCount <= _.options.slidesToShow && (verticalOffset = _.slideOffset = 0),
        !0 === _.options.centerMode && _.slideCount <= _.options.slidesToShow ? _.slideOffset = _.slideWidth * Math.floor(_.options.slidesToShow) / 2 - _.slideWidth * _.slideCount / 2 : !0 === _.options.centerMode && !0 === _.options.infinite ? _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth : !0 === _.options.centerMode && (_.slideOffset = 0,
        _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2)), targetLeft = !1 === _.options.vertical ? slideIndex * _.slideWidth * -1 + _.slideOffset : slideIndex * verticalHeight * -1 + verticalOffset,
        !0 === _.options.variableWidth && (targetSlide = _.slideCount <= _.options.slidesToShow || !1 === _.options.infinite ? _.$slideTrack.children(".slick-slide").eq(slideIndex) : _.$slideTrack.children(".slick-slide").eq(slideIndex + _.options.slidesToShow),
        targetLeft = !0 === _.options.rtl ? targetSlide[0] ? -1 * (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) : 0 : targetSlide[0] ? -1 * targetSlide[0].offsetLeft : 0,
        !0 === _.options.centerMode && (targetSlide = _.slideCount <= _.options.slidesToShow || !1 === _.options.infinite ? _.$slideTrack.children(".slick-slide").eq(slideIndex) : _.$slideTrack.children(".slick-slide").eq(slideIndex + _.options.slidesToShow + 1),
        targetLeft = !0 === _.options.rtl ? targetSlide[0] ? -1 * (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) : 0 : targetSlide[0] ? -1 * targetSlide[0].offsetLeft : 0,
        targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2)), targetLeft;
    }, Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {
        return this.options[option];
    }, Slick.prototype.getNavigableIndexes = function() {
        var max, _ = this, breakPoint = 0, counter = 0, indexes = [];
        for (max = !1 === _.options.infinite ? _.slideCount : (breakPoint = -1 * _.options.slidesToScroll,
        counter = -1 * _.options.slidesToScroll, 2 * _.slideCount); breakPoint < max; ) indexes.push(breakPoint),
        breakPoint = counter + _.options.slidesToScroll, counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        return indexes;
    }, Slick.prototype.getSlick = function() {
        return this;
    }, Slick.prototype.getSlideCount = function() {
        var swipedSlide, swipeTarget, centerOffset, _ = this;
        return centerOffset = !0 === _.options.centerMode ? Math.floor(_.$list.width() / 2) : 0,
        swipeTarget = -1 * _.swipeLeft + centerOffset, !0 === _.options.swipeToSlide ? (_.$slideTrack.find(".slick-slide").each(function(index, slide) {
            var slideOuterWidth, slideOffset;
            if (slideOuterWidth = $(slide).outerWidth(), slideOffset = slide.offsetLeft, !0 !== _.options.centerMode && (slideOffset += slideOuterWidth / 2),
            swipeTarget < slideOffset + slideOuterWidth) return swipedSlide = slide, !1;
        }), Math.abs($(swipedSlide).attr("data-slick-index") - _.currentSlide) || 1) : _.options.slidesToScroll;
    }, Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {
        this.changeSlide({
            data: {
                message: "index",
                index: parseInt(slide)
            }
        }, dontAnimate);
    }, Slick.prototype.init = function(creation) {
        var _ = this;
        $(_.$slider).hasClass("slick-initialized") || ($(_.$slider).addClass("slick-initialized"),
        _.buildRows(), _.buildOut(), _.setProps(), _.startLoad(), _.loadSlider(), _.initializeEvents(),
        _.updateArrows(), _.updateDots(), _.checkResponsive(!0), _.focusHandler()), creation && _.$slider.trigger("init", [ _ ]),
        !0 === _.options.accessibility && _.initADA(), _.options.autoplay && (_.paused = !1,
        _.autoPlay());
    }, Slick.prototype.initADA = function() {
        var _ = this, numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow), tabControlIndexes = _.getNavigableIndexes().filter(function(val) {
            return 0 <= val && val < _.slideCount;
        });
        _.$slides.add(_.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }), null !== _.$dots && (_.$slides.not(_.$slideTrack.find(".slick-cloned")).each(function(i) {
            var slideControlIndex = tabControlIndexes.indexOf(i);
            if ($(this).attr({
                role: "tabpanel",
                id: "slick-slide" + _.instanceUid + i,
                tabindex: -1
            }), -1 !== slideControlIndex) {
                var ariaButtonControl = "slick-slide-control" + _.instanceUid + slideControlIndex;
                $("#" + ariaButtonControl).length && $(this).attr({
                    "aria-describedby": ariaButtonControl
                });
            }
        }), _.$dots.attr("role", "tablist").find("li").each(function(i) {
            var mappedSlideIndex = tabControlIndexes[i];
            $(this).attr({
                role: "presentation"
            }), $(this).find("button").first().attr({
                role: "tab",
                id: "slick-slide-control" + _.instanceUid + i,
                "aria-controls": "slick-slide" + _.instanceUid + mappedSlideIndex,
                "aria-label": i + 1 + " of " + numDotGroups,
                "aria-selected": null,
                tabindex: "-1"
            });
        }).eq(_.currentSlide).find("button").attr({
            "aria-selected": "true",
            tabindex: "0"
        }).end());
        for (var i = _.currentSlide, max = i + _.options.slidesToShow; i < max; i++) _.options.focusOnChange ? _.$slides.eq(i).attr({
            tabindex: "0"
        }) : _.$slides.eq(i).removeAttr("tabindex");
        _.activateADA();
    }, Slick.prototype.initArrowEvents = function() {
        var _ = this;
        !0 === _.options.arrows && _.slideCount > _.options.slidesToShow && (_.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, _.changeSlide), _.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, _.changeSlide), !0 === _.options.accessibility && (_.$prevArrow.on("keydown.slick", _.keyHandler),
        _.$nextArrow.on("keydown.slick", _.keyHandler)));
    }, Slick.prototype.initDotEvents = function() {
        var _ = this;
        !0 === _.options.dots && _.slideCount > _.options.slidesToShow && ($("li", _.$dots).on("click.slick", {
            message: "index"
        }, _.changeSlide), !0 === _.options.accessibility && _.$dots.on("keydown.slick", _.keyHandler)),
        !0 === _.options.dots && !0 === _.options.pauseOnDotsHover && _.slideCount > _.options.slidesToShow && $("li", _.$dots).on("mouseenter.slick", $.proxy(_.interrupt, _, !0)).on("mouseleave.slick", $.proxy(_.interrupt, _, !1));
    }, Slick.prototype.initSlideEvents = function() {
        var _ = this;
        _.options.pauseOnHover && (_.$list.on("mouseenter.slick", $.proxy(_.interrupt, _, !0)),
        _.$list.on("mouseleave.slick", $.proxy(_.interrupt, _, !1)));
    }, Slick.prototype.initializeEvents = function() {
        var _ = this;
        _.initArrowEvents(), _.initDotEvents(), _.initSlideEvents(), _.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, _.swipeHandler), _.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, _.swipeHandler), _.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, _.swipeHandler), _.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, _.swipeHandler), _.$list.on("click.slick", _.clickHandler), $(document).on(_.visibilityChange, $.proxy(_.visibility, _)),
        !0 === _.options.accessibility && _.$list.on("keydown.slick", _.keyHandler), !0 === _.options.focusOnSelect && $(_.$slideTrack).children().on("click.slick", _.selectHandler),
        $(window).on("orientationchange.slick.slick-" + _.instanceUid, $.proxy(_.orientationChange, _)),
        $(window).on("resize.slick.slick-" + _.instanceUid, $.proxy(_.resize, _)), $("[draggable!=true]", _.$slideTrack).on("dragstart", _.preventDefault),
        $(window).on("load.slick.slick-" + _.instanceUid, _.setPosition), $(_.setPosition);
    }, Slick.prototype.initUI = function() {
        var _ = this;
        !0 === _.options.arrows && _.slideCount > _.options.slidesToShow && (_.$prevArrow.show(),
        _.$nextArrow.show()), !0 === _.options.dots && _.slideCount > _.options.slidesToShow && _.$dots.show();
    }, Slick.prototype.keyHandler = function(event) {
        var _ = this;
        event.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === event.keyCode && !0 === _.options.accessibility ? _.changeSlide({
            data: {
                message: !0 === _.options.rtl ? "next" : "previous"
            }
        }) : 39 === event.keyCode && !0 === _.options.accessibility && _.changeSlide({
            data: {
                message: !0 === _.options.rtl ? "previous" : "next"
            }
        }));
    }, Slick.prototype.lazyLoad = function() {
        var loadRange, rangeStart, rangeEnd, _ = this;
        function loadImages(imagesScope) {
            $("img[data-lazy]", imagesScope).each(function() {
                var image = $(this), imageSource = $(this).attr("data-lazy"), imageSrcSet = $(this).attr("data-srcset"), imageSizes = $(this).attr("data-sizes") || _.$slider.attr("data-sizes"), imageToLoad = document.createElement("img");
                imageToLoad.onload = function() {
                    image.animate({
                        opacity: 0
                    }, 100, function() {
                        imageSrcSet && (image.attr("srcset", imageSrcSet), imageSizes && image.attr("sizes", imageSizes)),
                        image.attr("src", imageSource).animate({
                            opacity: 1
                        }, 200, function() {
                            image.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading");
                        }), _.$slider.trigger("lazyLoaded", [ _, image, imageSource ]);
                    });
                }, imageToLoad.onerror = function() {
                    image.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),
                    _.$slider.trigger("lazyLoadError", [ _, image, imageSource ]);
                }, imageToLoad.src = imageSource;
            });
        }
        if (!0 === _.options.centerMode ? rangeEnd = !0 === _.options.infinite ? (rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1)) + _.options.slidesToShow + 2 : (rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1)),
        _.options.slidesToShow / 2 + 1 + 2 + _.currentSlide) : (rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide,
        rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow), !0 === _.options.fade && (0 < rangeStart && rangeStart--,
        rangeEnd <= _.slideCount && rangeEnd++)), loadRange = _.$slider.find(".slick-slide").slice(rangeStart, rangeEnd),
        "anticipated" === _.options.lazyLoad) for (var prevSlide = rangeStart - 1, nextSlide = rangeEnd, $slides = _.$slider.find(".slick-slide"), i = 0; i < _.options.slidesToScroll; i++) prevSlide < 0 && (prevSlide = _.slideCount - 1),
        loadRange = (loadRange = loadRange.add($slides.eq(prevSlide))).add($slides.eq(nextSlide)),
        prevSlide--, nextSlide++;
        loadImages(loadRange), _.slideCount <= _.options.slidesToShow ? loadImages(_.$slider.find(".slick-slide")) : _.currentSlide >= _.slideCount - _.options.slidesToShow ? loadImages(_.$slider.find(".slick-cloned").slice(0, _.options.slidesToShow)) : 0 === _.currentSlide && loadImages(_.$slider.find(".slick-cloned").slice(-1 * _.options.slidesToShow));
    }, Slick.prototype.loadSlider = function() {
        var _ = this;
        _.setPosition(), _.$slideTrack.css({
            opacity: 1
        }), _.$slider.removeClass("slick-loading"), _.initUI(), "progressive" === _.options.lazyLoad && _.progressiveLazyLoad();
    }, Slick.prototype.next = Slick.prototype.slickNext = function() {
        this.changeSlide({
            data: {
                message: "next"
            }
        });
    }, Slick.prototype.orientationChange = function() {
        this.checkResponsive(), this.setPosition();
    }, Slick.prototype.pause = Slick.prototype.slickPause = function() {
        this.autoPlayClear(), this.paused = !0;
    }, Slick.prototype.play = Slick.prototype.slickPlay = function() {
        var _ = this;
        _.autoPlay(), _.options.autoplay = !0, _.paused = !1, _.focussed = !1, _.interrupted = !1;
    }, Slick.prototype.postSlide = function(index) {
        var _ = this;
        _.unslicked || (_.$slider.trigger("afterChange", [ _, index ]), _.animating = !1,
        _.slideCount > _.options.slidesToShow && _.setPosition(), _.swipeLeft = null, _.options.autoplay && _.autoPlay(),
        !0 === _.options.accessibility && (_.initADA(), _.options.focusOnChange && $(_.$slides.get(_.currentSlide)).attr("tabindex", 0).focus()));
    }, Slick.prototype.prev = Slick.prototype.slickPrev = function() {
        this.changeSlide({
            data: {
                message: "previous"
            }
        });
    }, Slick.prototype.preventDefault = function(event) {
        event.preventDefault();
    }, Slick.prototype.progressiveLazyLoad = function(tryCount) {
        tryCount = tryCount || 1;
        var image, imageSource, imageSrcSet, imageSizes, imageToLoad, _ = this, $imgsToLoad = $("img[data-lazy]", _.$slider);
        $imgsToLoad.length ? (image = $imgsToLoad.first(), imageSource = image.attr("data-lazy"),
        imageSrcSet = image.attr("data-srcset"), imageSizes = image.attr("data-sizes") || _.$slider.attr("data-sizes"),
        (imageToLoad = document.createElement("img")).onload = function() {
            imageSrcSet && (image.attr("srcset", imageSrcSet), imageSizes && image.attr("sizes", imageSizes)),
            image.attr("src", imageSource).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),
            !0 === _.options.adaptiveHeight && _.setPosition(), _.$slider.trigger("lazyLoaded", [ _, image, imageSource ]),
            _.progressiveLazyLoad();
        }, imageToLoad.onerror = function() {
            tryCount < 3 ? setTimeout(function() {
                _.progressiveLazyLoad(tryCount + 1);
            }, 500) : (image.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),
            _.$slider.trigger("lazyLoadError", [ _, image, imageSource ]), _.progressiveLazyLoad());
        }, imageToLoad.src = imageSource) : _.$slider.trigger("allImagesLoaded", [ _ ]);
    }, Slick.prototype.refresh = function(initializing) {
        var currentSlide, lastVisibleIndex, _ = this;
        lastVisibleIndex = _.slideCount - _.options.slidesToShow, !_.options.infinite && _.currentSlide > lastVisibleIndex && (_.currentSlide = lastVisibleIndex),
        _.slideCount <= _.options.slidesToShow && (_.currentSlide = 0), currentSlide = _.currentSlide,
        _.destroy(!0), $.extend(_, _.initials, {
            currentSlide: currentSlide
        }), _.init(), initializing || _.changeSlide({
            data: {
                message: "index",
                index: currentSlide
            }
        }, !1);
    }, Slick.prototype.registerBreakpoints = function() {
        var breakpoint, currentBreakpoint, l, _ = this, responsiveSettings = _.options.responsive || null;
        if ("array" === $.type(responsiveSettings) && responsiveSettings.length) {
            for (breakpoint in _.respondTo = _.options.respondTo || "window", responsiveSettings) if (l = _.breakpoints.length - 1,
            responsiveSettings.hasOwnProperty(breakpoint)) {
                for (currentBreakpoint = responsiveSettings[breakpoint].breakpoint; 0 <= l; ) _.breakpoints[l] && _.breakpoints[l] === currentBreakpoint && _.breakpoints.splice(l, 1),
                l--;
                _.breakpoints.push(currentBreakpoint), _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;
            }
            _.breakpoints.sort(function(a, b) {
                return _.options.mobileFirst ? a - b : b - a;
            });
        }
    }, Slick.prototype.reinit = function() {
        var _ = this;
        _.$slides = _.$slideTrack.children(_.options.slide).addClass("slick-slide"), _.slideCount = _.$slides.length,
        _.currentSlide >= _.slideCount && 0 !== _.currentSlide && (_.currentSlide = _.currentSlide - _.options.slidesToScroll),
        _.slideCount <= _.options.slidesToShow && (_.currentSlide = 0), _.registerBreakpoints(),
        _.setProps(), _.setupInfinite(), _.buildArrows(), _.updateArrows(), _.initArrowEvents(),
        _.buildDots(), _.updateDots(), _.initDotEvents(), _.cleanUpSlideEvents(), _.initSlideEvents(),
        _.checkResponsive(!1, !0), !0 === _.options.focusOnSelect && $(_.$slideTrack).children().on("click.slick", _.selectHandler),
        _.setSlideClasses("number" == typeof _.currentSlide ? _.currentSlide : 0), _.setPosition(),
        _.focusHandler(), _.paused = !_.options.autoplay, _.autoPlay(), _.$slider.trigger("reInit", [ _ ]);
    }, Slick.prototype.resize = function() {
        var _ = this;
        $(window).width() !== _.windowWidth && (clearTimeout(_.windowDelay), _.windowDelay = window.setTimeout(function() {
            _.windowWidth = $(window).width(), _.checkResponsive(), _.unslicked || _.setPosition();
        }, 50));
    }, Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {
        var _ = this;
        if (index = "boolean" == typeof index ? !0 === (removeBefore = index) ? 0 : _.slideCount - 1 : !0 === removeBefore ? --index : index,
        _.slideCount < 1 || index < 0 || index > _.slideCount - 1) return !1;
        _.unload(), !0 === removeAll ? _.$slideTrack.children().remove() : _.$slideTrack.children(this.options.slide).eq(index).remove(),
        _.$slides = _.$slideTrack.children(this.options.slide), _.$slideTrack.children(this.options.slide).detach(),
        _.$slideTrack.append(_.$slides), _.$slidesCache = _.$slides, _.reinit();
    }, Slick.prototype.setCSS = function(position) {
        var x, y, _ = this, positionProps = {};
        !0 === _.options.rtl && (position = -position), x = "left" == _.positionProp ? Math.ceil(position) + "px" : "0px",
        y = "top" == _.positionProp ? Math.ceil(position) + "px" : "0px", positionProps[_.positionProp] = position,
        !1 === _.transformsEnabled || (!(positionProps = {}) === _.cssTransitions ? positionProps[_.animType] = "translate(" + x + ", " + y + ")" : positionProps[_.animType] = "translate3d(" + x + ", " + y + ", 0px)"),
        _.$slideTrack.css(positionProps);
    }, Slick.prototype.setDimensions = function() {
        var _ = this;
        !1 === _.options.vertical ? !0 === _.options.centerMode && _.$list.css({
            padding: "0px " + _.options.centerPadding
        }) : (_.$list.height(_.$slides.first().outerHeight(!0) * _.options.slidesToShow),
        !0 === _.options.centerMode && _.$list.css({
            padding: _.options.centerPadding + " 0px"
        })), _.listWidth = _.$list.width(), _.listHeight = _.$list.height(), !1 === _.options.vertical && !1 === _.options.variableWidth ? (_.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow),
        _.$slideTrack.width(Math.ceil(_.slideWidth * _.$slideTrack.children(".slick-slide").length))) : !0 === _.options.variableWidth ? _.$slideTrack.width(5e3 * _.slideCount) : (_.slideWidth = Math.ceil(_.listWidth),
        _.$slideTrack.height(Math.ceil(_.$slides.first().outerHeight(!0) * _.$slideTrack.children(".slick-slide").length)));
        var offset = _.$slides.first().outerWidth(!0) - _.$slides.first().width();
        !1 === _.options.variableWidth && _.$slideTrack.children(".slick-slide").width(_.slideWidth - offset);
    }, Slick.prototype.setFade = function() {
        var targetLeft, _ = this;
        _.$slides.each(function(index, element) {
            targetLeft = _.slideWidth * index * -1, !0 === _.options.rtl ? $(element).css({
                position: "relative",
                right: targetLeft,
                top: 0,
                zIndex: _.options.zIndex - 2,
                opacity: 0
            }) : $(element).css({
                position: "relative",
                left: targetLeft,
                top: 0,
                zIndex: _.options.zIndex - 2,
                opacity: 0
            });
        }), _.$slides.eq(_.currentSlide).css({
            zIndex: _.options.zIndex - 1,
            opacity: 1
        });
    }, Slick.prototype.setHeight = function() {
        var _ = this;
        if (1 === _.options.slidesToShow && !0 === _.options.adaptiveHeight && !1 === _.options.vertical) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(!0);
            _.$list.css("height", targetHeight);
        }
    }, Slick.prototype.setOption = Slick.prototype.slickSetOption = function() {
        var l, item, option, value, type, _ = this, refresh = !1;
        if ("object" === $.type(arguments[0]) ? (option = arguments[0], refresh = arguments[1],
        type = "multiple") : "string" === $.type(arguments[0]) && (value = arguments[1],
        refresh = arguments[2], "responsive" === (option = arguments[0]) && "array" === $.type(arguments[1]) ? type = "responsive" : void 0 !== arguments[1] && (type = "single")),
        "single" === type) _.options[option] = value; else if ("multiple" === type) $.each(option, function(opt, val) {
            _.options[opt] = val;
        }); else if ("responsive" === type) for (item in value) if ("array" !== $.type(_.options.responsive)) _.options.responsive = [ value[item] ]; else {
            for (l = _.options.responsive.length - 1; 0 <= l; ) _.options.responsive[l].breakpoint === value[item].breakpoint && _.options.responsive.splice(l, 1),
            l--;
            _.options.responsive.push(value[item]);
        }
        refresh && (_.unload(), _.reinit());
    }, Slick.prototype.setPosition = function() {
        var _ = this;
        _.setDimensions(), _.setHeight(), !1 === _.options.fade ? _.setCSS(_.getLeft(_.currentSlide)) : _.setFade(),
        _.$slider.trigger("setPosition", [ _ ]);
    }, Slick.prototype.setProps = function() {
        var _ = this, bodyStyle = document.body.style;
        _.positionProp = !0 === _.options.vertical ? "top" : "left", "top" === _.positionProp ? _.$slider.addClass("slick-vertical") : _.$slider.removeClass("slick-vertical"),
        void 0 === bodyStyle.WebkitTransition && void 0 === bodyStyle.MozTransition && void 0 === bodyStyle.msTransition || !0 === _.options.useCSS && (_.cssTransitions = !0),
        _.options.fade && ("number" == typeof _.options.zIndex ? _.options.zIndex < 3 && (_.options.zIndex = 3) : _.options.zIndex = _.defaults.zIndex),
        void 0 !== bodyStyle.OTransform && (_.animType = "OTransform", _.transformType = "-o-transform",
        _.transitionType = "OTransition", void 0 === bodyStyle.perspectiveProperty && void 0 === bodyStyle.webkitPerspective && (_.animType = !1)),
        void 0 !== bodyStyle.MozTransform && (_.animType = "MozTransform", _.transformType = "-moz-transform",
        _.transitionType = "MozTransition", void 0 === bodyStyle.perspectiveProperty && void 0 === bodyStyle.MozPerspective && (_.animType = !1)),
        void 0 !== bodyStyle.webkitTransform && (_.animType = "webkitTransform", _.transformType = "-webkit-transform",
        _.transitionType = "webkitTransition", void 0 === bodyStyle.perspectiveProperty && void 0 === bodyStyle.webkitPerspective && (_.animType = !1)),
        void 0 !== bodyStyle.msTransform && (_.animType = "msTransform", _.transformType = "-ms-transform",
        _.transitionType = "msTransition", void 0 === bodyStyle.msTransform && (_.animType = !1)),
        void 0 !== bodyStyle.transform && !1 !== _.animType && (_.animType = "transform",
        _.transformType = "transform", _.transitionType = "transition"), _.transformsEnabled = _.options.useTransform && null !== _.animType && !1 !== _.animType;
    }, Slick.prototype.setSlideClasses = function(index) {
        var centerOffset, allSlides, indexOffset, remainder, _ = this;
        if (allSlides = _.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"),
        _.$slides.eq(index).addClass("slick-current"), !0 === _.options.centerMode) {
            var evenCoef = _.options.slidesToShow % 2 == 0 ? 1 : 0;
            centerOffset = Math.floor(_.options.slidesToShow / 2), !0 === _.options.infinite && (centerOffset <= index && index <= _.slideCount - 1 - centerOffset ? _.$slides.slice(index - centerOffset + evenCoef, index + centerOffset + 1).addClass("slick-active").attr("aria-hidden", "false") : (indexOffset = _.options.slidesToShow + index,
            allSlides.slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2).addClass("slick-active").attr("aria-hidden", "false")),
            0 === index ? allSlides.eq(allSlides.length - 1 - _.options.slidesToShow).addClass("slick-center") : index === _.slideCount - 1 && allSlides.eq(_.options.slidesToShow).addClass("slick-center")),
            _.$slides.eq(index).addClass("slick-center");
        } else 0 <= index && index <= _.slideCount - _.options.slidesToShow ? _.$slides.slice(index, index + _.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : allSlides.length <= _.options.slidesToShow ? allSlides.addClass("slick-active").attr("aria-hidden", "false") : (remainder = _.slideCount % _.options.slidesToShow,
        indexOffset = !0 === _.options.infinite ? _.options.slidesToShow + index : index,
        _.options.slidesToShow == _.options.slidesToScroll && _.slideCount - index < _.options.slidesToShow ? allSlides.slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder).addClass("slick-active").attr("aria-hidden", "false") : allSlides.slice(indexOffset, indexOffset + _.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
        "ondemand" !== _.options.lazyLoad && "anticipated" !== _.options.lazyLoad || _.lazyLoad();
    }, Slick.prototype.setupInfinite = function() {
        var i, slideIndex, infiniteCount, _ = this;
        if (!0 === _.options.fade && (_.options.centerMode = !1), !0 === _.options.infinite && !1 === _.options.fade && (slideIndex = null,
        _.slideCount > _.options.slidesToShow)) {
            for (infiniteCount = !0 === _.options.centerMode ? _.options.slidesToShow + 1 : _.options.slidesToShow,
            i = _.slideCount; i > _.slideCount - infiniteCount; i -= 1) slideIndex = i - 1,
            $(_.$slides[slideIndex]).clone(!0).attr("id", "").attr("data-slick-index", slideIndex - _.slideCount).prependTo(_.$slideTrack).addClass("slick-cloned");
            for (i = 0; i < infiniteCount + _.slideCount; i += 1) slideIndex = i, $(_.$slides[slideIndex]).clone(!0).attr("id", "").attr("data-slick-index", slideIndex + _.slideCount).appendTo(_.$slideTrack).addClass("slick-cloned");
            _.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                $(this).attr("id", "");
            });
        }
    }, Slick.prototype.interrupt = function(toggle) {
        toggle || this.autoPlay(), this.interrupted = toggle;
    }, Slick.prototype.selectHandler = function(event) {
        var _ = this, targetElement = $(event.target).is(".slick-slide") ? $(event.target) : $(event.target).parents(".slick-slide"), index = parseInt(targetElement.attr("data-slick-index"));
        index = index || 0, _.slideCount <= _.options.slidesToShow ? _.slideHandler(index, !1, !0) : _.slideHandler(index);
    }, Slick.prototype.slideHandler = function(index, sync, dontAnimate) {
        var targetSlide, animSlide, oldSlide, slideLeft, targetLeft, navTarget, _ = this;
        if (sync = sync || !1, !(!0 === _.animating && !0 === _.options.waitForAnimate || !0 === _.options.fade && _.currentSlide === index)) if (!1 === sync && _.asNavFor(index),
        targetSlide = index, targetLeft = _.getLeft(targetSlide), slideLeft = _.getLeft(_.currentSlide),
        _.currentLeft = null === _.swipeLeft ? slideLeft : _.swipeLeft, !1 === _.options.infinite && !1 === _.options.centerMode && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) !1 === _.options.fade && (targetSlide = _.currentSlide,
        !0 !== dontAnimate && _.slideCount > _.options.slidesToShow ? _.animateSlide(slideLeft, function() {
            _.postSlide(targetSlide);
        }) : _.postSlide(targetSlide)); else if (!1 === _.options.infinite && !0 === _.options.centerMode && (index < 0 || index > _.slideCount - _.options.slidesToScroll)) !1 === _.options.fade && (targetSlide = _.currentSlide,
        !0 !== dontAnimate && _.slideCount > _.options.slidesToShow ? _.animateSlide(slideLeft, function() {
            _.postSlide(targetSlide);
        }) : _.postSlide(targetSlide)); else {
            if (_.options.autoplay && clearInterval(_.autoPlayTimer), animSlide = targetSlide < 0 ? _.slideCount % _.options.slidesToScroll != 0 ? _.slideCount - _.slideCount % _.options.slidesToScroll : _.slideCount + targetSlide : targetSlide >= _.slideCount ? _.slideCount % _.options.slidesToScroll != 0 ? 0 : targetSlide - _.slideCount : targetSlide,
            _.animating = !0, _.$slider.trigger("beforeChange", [ _, _.currentSlide, animSlide ]),
            oldSlide = _.currentSlide, _.currentSlide = animSlide, _.setSlideClasses(_.currentSlide),
            _.options.asNavFor && (navTarget = (navTarget = _.getNavTarget()).slick("getSlick")).slideCount <= navTarget.options.slidesToShow && navTarget.setSlideClasses(_.currentSlide),
            _.updateDots(), _.updateArrows(), !0 === _.options.fade) return !0 !== dontAnimate ? (_.fadeSlideOut(oldSlide),
            _.fadeSlide(animSlide, function() {
                _.postSlide(animSlide);
            })) : _.postSlide(animSlide), void _.animateHeight();
            !0 !== dontAnimate && _.slideCount > _.options.slidesToShow ? _.animateSlide(targetLeft, function() {
                _.postSlide(animSlide);
            }) : _.postSlide(animSlide);
        }
    }, Slick.prototype.startLoad = function() {
        var _ = this;
        !0 === _.options.arrows && _.slideCount > _.options.slidesToShow && (_.$prevArrow.hide(),
        _.$nextArrow.hide()), !0 === _.options.dots && _.slideCount > _.options.slidesToShow && _.$dots.hide(),
        _.$slider.addClass("slick-loading");
    }, Slick.prototype.swipeDirection = function() {
        var xDist, yDist, r, swipeAngle, _ = this;
        return xDist = _.touchObject.startX - _.touchObject.curX, yDist = _.touchObject.startY - _.touchObject.curY,
        r = Math.atan2(yDist, xDist), (swipeAngle = Math.round(180 * r / Math.PI)) < 0 && (swipeAngle = 360 - Math.abs(swipeAngle)),
        swipeAngle <= 45 && 0 <= swipeAngle ? !1 === _.options.rtl ? "left" : "right" : swipeAngle <= 360 && 315 <= swipeAngle ? !1 === _.options.rtl ? "left" : "right" : 135 <= swipeAngle && swipeAngle <= 225 ? !1 === _.options.rtl ? "right" : "left" : !0 === _.options.verticalSwiping ? 35 <= swipeAngle && swipeAngle <= 135 ? "down" : "up" : "vertical";
    }, Slick.prototype.swipeEnd = function(event) {
        var slideCount, direction, _ = this;
        if (_.dragging = !1, _.swiping = !1, _.scrolling) return _.scrolling = !1;
        if (_.interrupted = !1, _.shouldClick = !(10 < _.touchObject.swipeLength), void 0 === _.touchObject.curX) return !1;
        if (!0 === _.touchObject.edgeHit && _.$slider.trigger("edge", [ _, _.swipeDirection() ]),
        _.touchObject.swipeLength >= _.touchObject.minSwipe) {
            switch (direction = _.swipeDirection()) {
              case "left":
              case "down":
                slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide + _.getSlideCount()) : _.currentSlide + _.getSlideCount(),
                _.currentDirection = 0;
                break;

              case "right":
              case "up":
                slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide - _.getSlideCount()) : _.currentSlide - _.getSlideCount(),
                _.currentDirection = 1;
            }
            "vertical" != direction && (_.slideHandler(slideCount), _.touchObject = {}, _.$slider.trigger("swipe", [ _, direction ]));
        } else _.touchObject.startX !== _.touchObject.curX && (_.slideHandler(_.currentSlide),
        _.touchObject = {});
    }, Slick.prototype.swipeHandler = function(event) {
        var _ = this;
        if (!(!1 === _.options.swipe || "ontouchend" in document && !1 === _.options.swipe || !1 === _.options.draggable && -1 !== event.type.indexOf("mouse"))) switch (_.touchObject.fingerCount = event.originalEvent && void 0 !== event.originalEvent.touches ? event.originalEvent.touches.length : 1,
        _.touchObject.minSwipe = _.listWidth / _.options.touchThreshold, !0 === _.options.verticalSwiping && (_.touchObject.minSwipe = _.listHeight / _.options.touchThreshold),
        event.data.action) {
          case "start":
            _.swipeStart(event);
            break;

          case "move":
            _.swipeMove(event);
            break;

          case "end":
            _.swipeEnd(event);
        }
    }, Slick.prototype.swipeMove = function(event) {
        var curLeft, swipeDirection, swipeLength, positionOffset, touches, verticalSwipeLength, _ = this;
        return touches = void 0 !== event.originalEvent ? event.originalEvent.touches : null,
        !(!_.dragging || _.scrolling || touches && 1 !== touches.length) && (curLeft = _.getLeft(_.currentSlide),
        _.touchObject.curX = void 0 !== touches ? touches[0].pageX : event.clientX, _.touchObject.curY = void 0 !== touches ? touches[0].pageY : event.clientY,
        _.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curX - _.touchObject.startX, 2))),
        verticalSwipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curY - _.touchObject.startY, 2))),
        !_.options.verticalSwiping && !_.swiping && 4 < verticalSwipeLength ? !(_.scrolling = !0) : (!0 === _.options.verticalSwiping && (_.touchObject.swipeLength = verticalSwipeLength),
        swipeDirection = _.swipeDirection(), void 0 !== event.originalEvent && 4 < _.touchObject.swipeLength && (_.swiping = !0,
        event.preventDefault()), positionOffset = (!1 === _.options.rtl ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1),
        !0 === _.options.verticalSwiping && (positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1),
        swipeLength = _.touchObject.swipeLength, (_.touchObject.edgeHit = !1) === _.options.infinite && (0 === _.currentSlide && "right" === swipeDirection || _.currentSlide >= _.getDotCount() && "left" === swipeDirection) && (swipeLength = _.touchObject.swipeLength * _.options.edgeFriction,
        _.touchObject.edgeHit = !0), !1 === _.options.vertical ? _.swipeLeft = curLeft + swipeLength * positionOffset : _.swipeLeft = curLeft + swipeLength * (_.$list.height() / _.listWidth) * positionOffset,
        !0 === _.options.verticalSwiping && (_.swipeLeft = curLeft + swipeLength * positionOffset),
        !0 !== _.options.fade && !1 !== _.options.touchMove && (!0 === _.animating ? (_.swipeLeft = null,
        !1) : void _.setCSS(_.swipeLeft))));
    }, Slick.prototype.swipeStart = function(event) {
        var touches, _ = this;
        if (_.interrupted = !0, 1 !== _.touchObject.fingerCount || _.slideCount <= _.options.slidesToShow) return !(_.touchObject = {});
        void 0 !== event.originalEvent && void 0 !== event.originalEvent.touches && (touches = event.originalEvent.touches[0]),
        _.touchObject.startX = _.touchObject.curX = void 0 !== touches ? touches.pageX : event.clientX,
        _.touchObject.startY = _.touchObject.curY = void 0 !== touches ? touches.pageY : event.clientY,
        _.dragging = !0;
    }, Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {
        var _ = this;
        null !== _.$slidesCache && (_.unload(), _.$slideTrack.children(this.options.slide).detach(),
        _.$slidesCache.appendTo(_.$slideTrack), _.reinit());
    }, Slick.prototype.unload = function() {
        var _ = this;
        $(".slick-cloned", _.$slider).remove(), _.$dots && _.$dots.remove(), _.$prevArrow && _.htmlExpr.test(_.options.prevArrow) && _.$prevArrow.remove(),
        _.$nextArrow && _.htmlExpr.test(_.options.nextArrow) && _.$nextArrow.remove(), _.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "");
    }, Slick.prototype.unslick = function(fromBreakpoint) {
        var _ = this;
        _.$slider.trigger("unslick", [ _, fromBreakpoint ]), _.destroy();
    }, Slick.prototype.updateArrows = function() {
        var _ = this;
        Math.floor(_.options.slidesToShow / 2), !0 === _.options.arrows && _.slideCount > _.options.slidesToShow && !_.options.infinite && (_.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
        _.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === _.currentSlide ? (_.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        _.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : _.currentSlide >= _.slideCount - _.options.slidesToShow && !1 === _.options.centerMode ? (_.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        _.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : _.currentSlide >= _.slideCount - 1 && !0 === _.options.centerMode && (_.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        _.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")));
    }, Slick.prototype.updateDots = function() {
        var _ = this;
        null !== _.$dots && (_.$dots.find("li").removeClass("slick-active").end(), _.$dots.find("li").eq(Math.floor(_.currentSlide / _.options.slidesToScroll)).addClass("slick-active"));
    }, Slick.prototype.visibility = function() {
        var _ = this;
        _.options.autoplay && (document[_.hidden] ? _.interrupted = !0 : _.interrupted = !1);
    }, $.fn.slick = function() {
        var i, ret, _ = this, opt = arguments[0], args = Array.prototype.slice.call(arguments, 1), l = _.length;
        for (i = 0; i < l; i++) if ("object" == typeof opt || void 0 === opt ? _[i].slick = new Slick(_[i], opt) : ret = _[i].slick[opt].apply(_[i].slick, args),
        void 0 !== ret) return ret;
        return _;
    };
}), function($) {
    function MobileNav(options) {
        this.options = $.extend({
            container: null,
            hideOnClickOutside: !1,
            menuActiveClass: "nav-active",
            menuOpener: ".nav-opener",
            menuDrop: ".nav-drop",
            toggleEvent: "click",
            outsideClickEvent: "click touchstart pointerdown MSPointerDown"
        }, options), this.initStructure(), this.attachEvents();
    }
    MobileNav.prototype = {
        initStructure: function() {
            this.page = $("html"), this.container = $(this.options.container), this.opener = this.container.find(this.options.menuOpener),
            this.drop = this.container.find(this.options.menuDrop);
        },
        attachEvents: function() {
            var self = this;
            activateResizeHandler && (activateResizeHandler(), activateResizeHandler = null),
            this.outsideClickHandler = function(e) {
                if (self.isOpened()) {
                    var target = $(e.target);
                    target.closest(self.opener).length || target.closest(self.drop).length || self.hide();
                }
            }, this.openerClickHandler = function(e) {
                e.preventDefault(), self.toggle();
            }, this.opener.on(this.options.toggleEvent, this.openerClickHandler);
        },
        isOpened: function() {
            return this.container.hasClass(this.options.menuActiveClass);
        },
        show: function() {
            this.container.addClass(this.options.menuActiveClass), this.options.hideOnClickOutside && this.page.on(this.options.outsideClickEvent, this.outsideClickHandler);
        },
        hide: function() {
            this.container.removeClass(this.options.menuActiveClass), this.options.hideOnClickOutside && this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
        },
        toggle: function() {
            this.isOpened() ? this.hide() : this.show();
        },
        destroy: function() {
            this.container.removeClass(this.options.menuActiveClass), this.opener.off(this.options.toggleEvent, this.clickHandler),
            this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
        }
    };
    var activateResizeHandler = function() {
        function removeClassHandler() {
            flag = !1, doc.removeClass("resize-active");
        }
        var flag, timer, win = $(window), doc = $("html");
        win.on("resize orientationchange", function() {
            flag || (flag = !0, doc.addClass("resize-active")), clearTimeout(timer), timer = setTimeout(removeClassHandler, 500);
        });
    };
    $.fn.mobileNav = function(opt) {
        var args = Array.prototype.slice.call(arguments), method = args[0];
        return this.each(function() {
            var $container = jQuery(this), instance = $container.data("MobileNav");
            "object" == typeof opt || void 0 === opt ? $container.data("MobileNav", new MobileNav($.extend({
                container: this
            }, opt))) : "string" == typeof method && instance && "function" == typeof instance[method] && (args.shift(),
            instance[method].apply(instance, args));
        });
    };
}(jQuery),
/*! SmartMenus jQuery Plugin - v1.1.0 - September 17, 2017
 * http://www.smartmenus.org/
 * Copyright Vasil Dinkov, Vadikom Web Ltd. http://vadikom.com; Licensed MIT */
function(t) {
    "function" == typeof define && define.amd ? define([ "jquery" ], t) : "object" == typeof module && "object" == typeof module.exports ? module.exports = t(require("jquery")) : t(jQuery);
}(function($) {
    function initMouseDetection(t) {
        var e = ".smartmenus_mouse";
        if (mouseDetectionEnabled || t) mouseDetectionEnabled && t && ($(document).off(e),
        mouseDetectionEnabled = !1); else {
            var i = !0, s = null, o = {
                mousemove: function(t) {
                    var e = {
                        x: t.pageX,
                        y: t.pageY,
                        timeStamp: new Date().getTime()
                    };
                    if (s) {
                        var o = Math.abs(s.x - e.x), a = Math.abs(s.y - e.y);
                        if ((0 < o || 0 < a) && o <= 2 && a <= 2 && e.timeStamp - s.timeStamp <= 300 && (mouse = !0,
                        i)) {
                            var n = $(t.target).closest("a");
                            n.is("a") && $.each(menuTrees, function() {
                                return $.contains(this.$root[0], n[0]) ? (this.itemEnter({
                                    currentTarget: n[0]
                                }), !1) : void 0;
                            }), i = !1;
                        }
                    }
                    s = e;
                }
            };
            o[touchEvents ? "touchstart" : "pointerover pointermove pointerout MSPointerOver MSPointerMove MSPointerOut"] = function(t) {
                isTouchEvent(t.originalEvent) && (mouse = !1);
            }, $(document).on(getEventsNS(o, e)), mouseDetectionEnabled = !0;
        }
    }
    function isTouchEvent(t) {
        return !/^(4|mouse)$/.test(t.pointerType);
    }
    function getEventsNS(t, e) {
        e = e || "";
        var i = {};
        for (var s in t) i[s.split(" ").join(e + " ") + e] = t[s];
        return i;
    }
    var menuTrees = [], mouse = !1, touchEvents = "ontouchstart" in window, mouseDetectionEnabled = !1, requestAnimationFrame = window.requestAnimationFrame || function(t) {
        return setTimeout(t, 1e3 / 60);
    }, cancelAnimationFrame = window.cancelAnimationFrame || function(t) {
        clearTimeout(t);
    }, canAnimate = !!$.fn.animate;
    return $.SmartMenus = function(t, e) {
        this.$root = $(t), this.opts = e, this.rootId = "", this.accessIdPrefix = "", this.$subArrow = null,
        this.activatedItems = [], this.visibleSubMenus = [], this.showTimeout = 0, this.hideTimeout = 0,
        this.scrollTimeout = 0, this.clickActivated = !1, this.focusActivated = !1, this.zIndexInc = 0,
        this.idInc = 0, this.$firstLink = null, this.$firstSub = null, this.disabled = !1,
        this.$disableOverlay = null, this.$touchScrollingSub = null, this.cssTransforms3d = "perspective" in t.style || "webkitPerspective" in t.style,
        this.wasCollapsible = !1, this.init();
    }, $.extend($.SmartMenus, {
        hideAll: function() {
            $.each(menuTrees, function() {
                this.menuHideAll();
            });
        },
        destroy: function() {
            for (;menuTrees.length; ) menuTrees[0].destroy();
            initMouseDetection(!0);
        },
        prototype: {
            init: function(t) {
                var e = this;
                if (!t) {
                    menuTrees.push(this), this.rootId = (new Date().getTime() + Math.random() + "").replace(/\D/g, ""),
                    this.accessIdPrefix = "sm-" + this.rootId + "-", this.$root.hasClass("sm-rtl") && (this.opts.rightToLeftSubMenus = !0);
                    var i = ".smartmenus";
                    this.$root.data("smartmenus", this).attr("data-smartmenus-id", this.rootId).dataSM("level", 1).on(getEventsNS({
                        "mouseover focusin": $.proxy(this.rootOver, this),
                        "mouseout focusout": $.proxy(this.rootOut, this),
                        keydown: $.proxy(this.rootKeyDown, this)
                    }, i)).on(getEventsNS({
                        mouseenter: $.proxy(this.itemEnter, this),
                        mouseleave: $.proxy(this.itemLeave, this),
                        mousedown: $.proxy(this.itemDown, this),
                        focus: $.proxy(this.itemFocus, this),
                        blur: $.proxy(this.itemBlur, this),
                        click: $.proxy(this.itemClick, this)
                    }, i), "a"), i += this.rootId, this.opts.hideOnClick && $(document).on(getEventsNS({
                        touchstart: $.proxy(this.docTouchStart, this),
                        touchmove: $.proxy(this.docTouchMove, this),
                        touchend: $.proxy(this.docTouchEnd, this),
                        click: $.proxy(this.docClick, this)
                    }, i)), $(window).on(getEventsNS({
                        "resize orientationchange": $.proxy(this.winResize, this)
                    }, i)), this.opts.subIndicators && (this.$subArrow = $("<span/>").addClass("sub-arrow"),
                    this.opts.subIndicatorsText && this.$subArrow.html(this.opts.subIndicatorsText)),
                    initMouseDetection();
                }
                if (this.$firstSub = this.$root.find("ul").each(function() {
                    e.menuInit($(this));
                }).eq(0), this.$firstLink = this.$root.find("a").eq(0), this.opts.markCurrentItem) {
                    var s = /(index|default)\.[^#\?\/]*/i, a = window.location.href.replace(s, ""), n = a.replace(/#.*/, "");
                    this.$root.find("a").each(function() {
                        var t = this.href.replace(s, ""), i = $(this);
                        t != a && t != n || (i.addClass("current"), e.opts.markCurrentTree && i.parentsUntil("[data-smartmenus-id]", "ul").each(function() {
                            $(this).dataSM("parent-a").addClass("current");
                        }));
                    });
                }
                this.wasCollapsible = this.isCollapsible();
            },
            destroy: function(t) {
                if (!t) {
                    var e = ".smartmenus";
                    this.$root.removeData("smartmenus").removeAttr("data-smartmenus-id").removeDataSM("level").off(e),
                    e += this.rootId, $(document).off(e), $(window).off(e), this.opts.subIndicators && (this.$subArrow = null);
                }
                this.menuHideAll();
                var i = this;
                this.$root.find("ul").each(function() {
                    var t = $(this);
                    t.dataSM("scroll-arrows") && t.dataSM("scroll-arrows").remove(), t.dataSM("shown-before") && ((i.opts.subMenusMinWidth || i.opts.subMenusMaxWidth) && t.css({
                        width: "",
                        minWidth: "",
                        maxWidth: ""
                    }).removeClass("sm-nowrap"), t.dataSM("scroll-arrows") && t.dataSM("scroll-arrows").remove(),
                    t.css({
                        zIndex: "",
                        top: "",
                        left: "",
                        marginLeft: "",
                        marginTop: "",
                        display: ""
                    })), 0 == (t.attr("id") || "").indexOf(i.accessIdPrefix) && t.removeAttr("id");
                }).removeDataSM("in-mega").removeDataSM("shown-before").removeDataSM("scroll-arrows").removeDataSM("parent-a").removeDataSM("level").removeDataSM("beforefirstshowfired").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeAttr("aria-expanded"),
                this.$root.find("a.has-submenu").each(function() {
                    var t = $(this);
                    0 == t.attr("id").indexOf(i.accessIdPrefix) && t.removeAttr("id");
                }).removeClass("has-submenu").removeDataSM("sub").removeAttr("aria-haspopup").removeAttr("aria-controls").removeAttr("aria-expanded").closest("li").removeDataSM("sub"),
                this.opts.subIndicators && this.$root.find("span.sub-arrow").remove(), this.opts.markCurrentItem && this.$root.find("a.current").removeClass("current"),
                t || (this.$root = null, this.$firstLink = null, this.$firstSub = null, this.$disableOverlay && (this.$disableOverlay.remove(),
                this.$disableOverlay = null), menuTrees.splice($.inArray(this, menuTrees), 1));
            },
            disable: function(t) {
                if (!this.disabled) {
                    if (this.menuHideAll(), !t && !this.opts.isPopup && this.$root.is(":visible")) {
                        var e = this.$root.offset();
                        this.$disableOverlay = $('<div class="sm-jquery-disable-overlay"/>').css({
                            position: "absolute",
                            top: e.top,
                            left: e.left,
                            width: this.$root.outerWidth(),
                            height: this.$root.outerHeight(),
                            zIndex: this.getStartZIndex(!0),
                            opacity: 0
                        }).appendTo(document.body);
                    }
                    this.disabled = !0;
                }
            },
            docClick: function(t) {
                return this.$touchScrollingSub ? void (this.$touchScrollingSub = null) : void ((this.visibleSubMenus.length && !$.contains(this.$root[0], t.target) || $(t.target).closest("a").length) && this.menuHideAll());
            },
            docTouchEnd: function() {
                if (this.lastTouch) {
                    if (!(!this.visibleSubMenus.length || void 0 !== this.lastTouch.x2 && this.lastTouch.x1 != this.lastTouch.x2 || void 0 !== this.lastTouch.y2 && this.lastTouch.y1 != this.lastTouch.y2 || this.lastTouch.target && $.contains(this.$root[0], this.lastTouch.target))) {
                        this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = 0);
                        var t = this;
                        this.hideTimeout = setTimeout(function() {
                            t.menuHideAll();
                        }, 350);
                    }
                    this.lastTouch = null;
                }
            },
            docTouchMove: function(t) {
                if (this.lastTouch) {
                    var e = t.originalEvent.touches[0];
                    this.lastTouch.x2 = e.pageX, this.lastTouch.y2 = e.pageY;
                }
            },
            docTouchStart: function(t) {
                var e = t.originalEvent.touches[0];
                this.lastTouch = {
                    x1: e.pageX,
                    y1: e.pageY,
                    target: e.target
                };
            },
            enable: function() {
                this.disabled && (this.$disableOverlay && (this.$disableOverlay.remove(), this.$disableOverlay = null),
                this.disabled = !1);
            },
            getClosestMenu: function(t) {
                for (var e = $(t).closest("ul"); e.dataSM("in-mega"); ) e = e.parent().closest("ul");
                return e[0] || null;
            },
            getHeight: function(t) {
                return this.getOffset(t, !0);
            },
            getOffset: function(t, e) {
                var i;
                "none" == t.css("display") && (i = {
                    position: t[0].style.position,
                    visibility: t[0].style.visibility
                }, t.css({
                    position: "absolute",
                    visibility: "hidden"
                }).show());
                var s = t[0].getBoundingClientRect && t[0].getBoundingClientRect(), o = s && (e ? s.height || s.bottom - s.top : s.width || s.right - s.left);
                return o || 0 === o || (o = e ? t[0].offsetHeight : t[0].offsetWidth), i && t.hide().css(i),
                o;
            },
            getStartZIndex: function(t) {
                var e = parseInt(this[t ? "$root" : "$firstSub"].css("z-index"));
                return !t && isNaN(e) && (e = parseInt(this.$root.css("z-index"))), isNaN(e) ? 1 : e;
            },
            getTouchPoint: function(t) {
                return t.touches && t.touches[0] || t.changedTouches && t.changedTouches[0] || t;
            },
            getViewport: function(t) {
                var e = t ? "Height" : "Width", i = document.documentElement["client" + e], s = window["inner" + e];
                return s && (i = Math.min(i, s)), i;
            },
            getViewportHeight: function() {
                return this.getViewport(!0);
            },
            getViewportWidth: function() {
                return this.getViewport();
            },
            getWidth: function(t) {
                return this.getOffset(t);
            },
            handleEvents: function() {
                return !this.disabled && this.isCSSOn();
            },
            handleItemEvents: function(t) {
                return this.handleEvents() && !this.isLinkInMegaMenu(t);
            },
            isCollapsible: function() {
                return "static" == this.$firstSub.css("position");
            },
            isCSSOn: function() {
                return "inline" != this.$firstLink.css("display");
            },
            isFixed: function() {
                var t = "fixed" == this.$root.css("position");
                return t || this.$root.parentsUntil("body").each(function() {
                    return "fixed" == $(this).css("position") ? !(t = !0) : void 0;
                }), t;
            },
            isLinkInMegaMenu: function(t) {
                return $(this.getClosestMenu(t[0])).hasClass("mega-menu");
            },
            isTouchMode: function() {
                return !mouse || this.opts.noMouseOver || this.isCollapsible();
            },
            itemActivate: function(t, e) {
                var i = t.closest("ul"), s = i.dataSM("level");
                if (1 < s && (!this.activatedItems[s - 2] || this.activatedItems[s - 2][0] != i.dataSM("parent-a")[0])) {
                    var o = this;
                    $(i.parentsUntil("[data-smartmenus-id]", "ul").get().reverse()).add(i).each(function() {
                        o.itemActivate($(this).dataSM("parent-a"));
                    });
                }
                if (this.isCollapsible() && !e || this.menuHideSubMenus(this.activatedItems[s - 1] && this.activatedItems[s - 1][0] == t[0] ? s : s - 1),
                this.activatedItems[s - 1] = t, !1 !== this.$root.triggerHandler("activate.smapi", t[0])) {
                    var a = t.dataSM("sub");
                    a && (this.isTouchMode() || !this.opts.showOnClick || this.clickActivated) && this.menuShow(a);
                }
            },
            itemBlur: function(t) {
                var e = $(t.currentTarget);
                this.handleItemEvents(e) && this.$root.triggerHandler("blur.smapi", e[0]);
            },
            itemClick: function(t) {
                var e = $(t.currentTarget);
                if (this.handleItemEvents(e)) {
                    if (this.$touchScrollingSub && this.$touchScrollingSub[0] == e.closest("ul")[0]) return this.$touchScrollingSub = null,
                    t.stopPropagation(), !1;
                    if (!1 === this.$root.triggerHandler("click.smapi", e[0])) return !1;
                    var i = $(t.target).is(".sub-arrow"), s = e.dataSM("sub"), o = !!s && 2 == s.dataSM("level"), a = this.isCollapsible(), n = /toggle$/.test(this.opts.collapsibleBehavior), r = /link$/.test(this.opts.collapsibleBehavior), h = /^accordion/.test(this.opts.collapsibleBehavior);
                    if (s && !s.is(":visible")) {
                        if ((!r || !a || i) && (this.opts.showOnClick && o && (this.clickActivated = !0),
                        this.itemActivate(e, h), s.is(":visible"))) return !(this.focusActivated = !0);
                    } else if (a && (n || i)) return this.itemActivate(e, h), this.menuHide(s), n && (this.focusActivated = !1),
                    !1;
                    return !(this.opts.showOnClick && o || e.hasClass("disabled") || !1 === this.$root.triggerHandler("select.smapi", e[0])) && void 0;
                }
            },
            itemDown: function(t) {
                var e = $(t.currentTarget);
                this.handleItemEvents(e) && e.dataSM("mousedown", !0);
            },
            itemEnter: function(t) {
                var e = $(t.currentTarget);
                if (this.handleItemEvents(e)) {
                    if (!this.isTouchMode()) {
                        this.showTimeout && (clearTimeout(this.showTimeout), this.showTimeout = 0);
                        var i = this;
                        this.showTimeout = setTimeout(function() {
                            i.itemActivate(e);
                        }, this.opts.showOnClick && 1 == e.closest("ul").dataSM("level") ? 1 : this.opts.showTimeout);
                    }
                    this.$root.triggerHandler("mouseenter.smapi", e[0]);
                }
            },
            itemFocus: function(t) {
                var e = $(t.currentTarget);
                this.handleItemEvents(e) && (!this.focusActivated || this.isTouchMode() && e.dataSM("mousedown") || this.activatedItems.length && this.activatedItems[this.activatedItems.length - 1][0] == e[0] || this.itemActivate(e, !0),
                this.$root.triggerHandler("focus.smapi", e[0]));
            },
            itemLeave: function(t) {
                var e = $(t.currentTarget);
                this.handleItemEvents(e) && (this.isTouchMode() || (e[0].blur(), this.showTimeout && (clearTimeout(this.showTimeout),
                this.showTimeout = 0)), e.removeDataSM("mousedown"), this.$root.triggerHandler("mouseleave.smapi", e[0]));
            },
            menuHide: function(t) {
                if (!1 !== this.$root.triggerHandler("beforehide.smapi", t[0]) && (canAnimate && t.stop(!0, !0),
                "none" != t.css("display"))) {
                    function e() {
                        t.css("z-index", "");
                    }
                    this.isCollapsible() ? canAnimate && this.opts.collapsibleHideFunction ? this.opts.collapsibleHideFunction.call(this, t, e) : t.hide(this.opts.collapsibleHideDuration, e) : canAnimate && this.opts.hideFunction ? this.opts.hideFunction.call(this, t, e) : t.hide(this.opts.hideDuration, e),
                    t.dataSM("scroll") && (this.menuScrollStop(t), t.css({
                        "touch-action": "",
                        "-ms-touch-action": "",
                        "-webkit-transform": "",
                        transform: ""
                    }).off(".smartmenus_scroll").removeDataSM("scroll").dataSM("scroll-arrows").hide()),
                    t.dataSM("parent-a").removeClass("highlighted").attr("aria-expanded", "false"),
                    t.attr({
                        "aria-expanded": "false",
                        "aria-hidden": "true"
                    });
                    var i = t.dataSM("level");
                    this.activatedItems.splice(i - 1, 1), this.visibleSubMenus.splice($.inArray(t, this.visibleSubMenus), 1),
                    this.$root.triggerHandler("hide.smapi", t[0]);
                }
            },
            menuHideAll: function() {
                this.showTimeout && (clearTimeout(this.showTimeout), this.showTimeout = 0);
                for (var t = this.opts.isPopup ? 1 : 0, e = this.visibleSubMenus.length - 1; t <= e; e--) this.menuHide(this.visibleSubMenus[e]);
                this.opts.isPopup && (canAnimate && this.$root.stop(!0, !0), this.$root.is(":visible") && (canAnimate && this.opts.hideFunction ? this.opts.hideFunction.call(this, this.$root) : this.$root.hide(this.opts.hideDuration))),
                this.activatedItems = [], this.visibleSubMenus = [], this.clickActivated = !1, this.focusActivated = !1,
                this.zIndexInc = 0, this.$root.triggerHandler("hideAll.smapi");
            },
            menuHideSubMenus: function(t) {
                for (var e = this.activatedItems.length - 1; t <= e; e--) {
                    var i = this.activatedItems[e].dataSM("sub");
                    i && this.menuHide(i);
                }
            },
            menuInit: function(t) {
                if (!t.dataSM("in-mega")) {
                    t.hasClass("mega-menu") && t.find("ul").dataSM("in-mega", !0);
                    for (var e = 2, i = t[0]; (i = i.parentNode.parentNode) != this.$root[0]; ) e++;
                    var s = t.prevAll("a").eq(-1);
                    s.length || (s = t.prevAll().find("a").eq(-1)), s.addClass("has-submenu").dataSM("sub", t),
                    t.dataSM("parent-a", s).dataSM("level", e).parent().dataSM("sub", t);
                    var o = s.attr("id") || this.accessIdPrefix + ++this.idInc, a = t.attr("id") || this.accessIdPrefix + ++this.idInc;
                    s.attr({
                        id: o,
                        "aria-haspopup": "true",
                        "aria-controls": a,
                        "aria-expanded": "false"
                    }), t.attr({
                        id: a,
                        role: "group",
                        "aria-hidden": "true",
                        "aria-labelledby": o,
                        "aria-expanded": "false"
                    }), this.opts.subIndicators && s[this.opts.subIndicatorsPos](this.$subArrow.clone());
                }
            },
            menuPosition: function(t) {
                var e, i, s = t.dataSM("parent-a"), o = s.closest("li"), a = o.parent(), n = t.dataSM("level"), r = this.getWidth(t), h = this.getHeight(t), u = s.offset(), l = u.left, c = u.top, d = this.getWidth(s), m = this.getHeight(s), p = $(window), f = p.scrollLeft(), v = p.scrollTop(), b = this.getViewportWidth(), S = this.getViewportHeight(), g = a.parent().is("[data-sm-horizontal-sub]") || 2 == n && !a.hasClass("sm-vertical"), M = this.opts.rightToLeftSubMenus && !o.is("[data-sm-reverse]") || !this.opts.rightToLeftSubMenus && o.is("[data-sm-reverse]"), w = 2 == n ? this.opts.mainMenuSubOffsetX : this.opts.subMenusSubOffsetX, T = 2 == n ? this.opts.mainMenuSubOffsetY : this.opts.subMenusSubOffsetY;
                if (i = g ? (e = M ? d - r - w : w, this.opts.bottomToTopSubMenus ? -h - T : m + T) : (e = M ? w - r : d - w,
                this.opts.bottomToTopSubMenus ? m - T - h : T), this.opts.keepInViewport) {
                    var y = l + e, I = c + i;
                    if (M && y < f ? e = g ? f - y + e : d - w : !M && f + b < y + r && (e = g ? f + b - r - y + e : w - r),
                    g || (h < S && v + S < I + h ? i += v + S - h - I : (S <= h || I < v) && (i += v - I)),
                    g && (v + S + .49 < I + h || I < v) || !g && S + .49 < h) {
                        var x = this;
                        t.dataSM("scroll-arrows") || t.dataSM("scroll-arrows", $([ $('<span class="scroll-up"><span class="scroll-up-arrow"></span></span>')[0], $('<span class="scroll-down"><span class="scroll-down-arrow"></span></span>')[0] ]).on({
                            mouseenter: function() {
                                t.dataSM("scroll").up = $(this).hasClass("scroll-up"), x.menuScroll(t);
                            },
                            mouseleave: function(e) {
                                x.menuScrollStop(t), x.menuScrollOut(t, e);
                            },
                            "mousewheel DOMMouseScroll": function(t) {
                                t.preventDefault();
                            }
                        }).insertAfter(t));
                        var A = ".smartmenus_scroll";
                        if (t.dataSM("scroll", {
                            y: this.cssTransforms3d ? 0 : i - m,
                            step: 1,
                            itemH: m,
                            subH: h,
                            arrowDownH: this.getHeight(t.dataSM("scroll-arrows").eq(1))
                        }).on(getEventsNS({
                            mouseover: function(e) {
                                x.menuScrollOver(t, e);
                            },
                            mouseout: function(e) {
                                x.menuScrollOut(t, e);
                            },
                            "mousewheel DOMMouseScroll": function(e) {
                                x.menuScrollMousewheel(t, e);
                            }
                        }, A)).dataSM("scroll-arrows").css({
                            top: "auto",
                            left: "0",
                            marginLeft: e + (parseInt(t.css("border-left-width")) || 0),
                            width: r - (parseInt(t.css("border-left-width")) || 0) - (parseInt(t.css("border-right-width")) || 0),
                            zIndex: t.css("z-index")
                        }).eq(g && this.opts.bottomToTopSubMenus ? 0 : 1).show(), this.isFixed()) {
                            var C = {};
                            C[touchEvents ? "touchstart touchmove touchend" : "pointerdown pointermove pointerup MSPointerDown MSPointerMove MSPointerUp"] = function(e) {
                                x.menuScrollTouch(t, e);
                            }, t.css({
                                "touch-action": "none",
                                "-ms-touch-action": "none"
                            }).on(getEventsNS(C, A));
                        }
                    }
                }
                t.css({
                    top: "auto",
                    left: "0",
                    marginLeft: e,
                    marginTop: i - m
                });
            },
            menuScroll: function(t, e, i) {
                var s, o = t.dataSM("scroll"), a = t.dataSM("scroll-arrows"), n = o.up ? o.upEnd : o.downEnd;
                if (!e && o.momentum) {
                    if (o.momentum *= .92, (s = o.momentum) < .5) return void this.menuScrollStop(t);
                } else s = i || (e || !this.opts.scrollAccelerate ? this.opts.scrollStep : Math.floor(o.step));
                var r = t.dataSM("level");
                if (this.activatedItems[r - 1] && this.activatedItems[r - 1].dataSM("sub") && this.activatedItems[r - 1].dataSM("sub").is(":visible") && this.menuHideSubMenus(r - 1),
                o.y = o.up && o.y >= n || !o.up && n >= o.y ? o.y : Math.abs(n - o.y) > s ? o.y + (o.up ? s : -s) : n,
                t.css(this.cssTransforms3d ? {
                    "-webkit-transform": "translate3d(0, " + o.y + "px, 0)",
                    transform: "translate3d(0, " + o.y + "px, 0)"
                } : {
                    marginTop: o.y
                }), mouse && (o.up && o.y > o.downEnd || !o.up && o.y < o.upEnd) && a.eq(o.up ? 1 : 0).show(),
                o.y == n) mouse && a.eq(o.up ? 0 : 1).hide(), this.menuScrollStop(t); else if (!e) {
                    this.opts.scrollAccelerate && o.step < this.opts.scrollStep && (o.step += .2);
                    var h = this;
                    this.scrollTimeout = requestAnimationFrame(function() {
                        h.menuScroll(t);
                    });
                }
            },
            menuScrollMousewheel: function(t, e) {
                if (this.getClosestMenu(e.target) == t[0]) {
                    var i = 0 < ((e = e.originalEvent).wheelDelta || -e.detail);
                    t.dataSM("scroll-arrows").eq(i ? 0 : 1).is(":visible") && (t.dataSM("scroll").up = i,
                    this.menuScroll(t, !0));
                }
                e.preventDefault();
            },
            menuScrollOut: function(t, e) {
                mouse && (/^scroll-(up|down)/.test((e.relatedTarget || "").className) || (t[0] == e.relatedTarget || $.contains(t[0], e.relatedTarget)) && this.getClosestMenu(e.relatedTarget) == t[0] || t.dataSM("scroll-arrows").css("visibility", "hidden"));
            },
            menuScrollOver: function(t, e) {
                if (mouse && !/^scroll-(up|down)/.test(e.target.className) && this.getClosestMenu(e.target) == t[0]) {
                    this.menuScrollRefreshData(t);
                    var i = t.dataSM("scroll"), s = $(window).scrollTop() - t.dataSM("parent-a").offset().top - i.itemH;
                    t.dataSM("scroll-arrows").eq(0).css("margin-top", s).end().eq(1).css("margin-top", s + this.getViewportHeight() - i.arrowDownH).end().css("visibility", "visible");
                }
            },
            menuScrollRefreshData: function(t) {
                var e = t.dataSM("scroll"), i = $(window).scrollTop() - t.dataSM("parent-a").offset().top - e.itemH;
                this.cssTransforms3d && (i = -(parseFloat(t.css("margin-top")) - i)), $.extend(e, {
                    upEnd: i,
                    downEnd: i + this.getViewportHeight() - e.subH
                });
            },
            menuScrollStop: function(t) {
                return this.scrollTimeout ? (cancelAnimationFrame(this.scrollTimeout), this.scrollTimeout = 0,
                t.dataSM("scroll").step = 1, !0) : void 0;
            },
            menuScrollTouch: function(t, e) {
                if (isTouchEvent(e = e.originalEvent)) {
                    var i = this.getTouchPoint(e);
                    if (this.getClosestMenu(i.target) == t[0]) {
                        var s = t.dataSM("scroll");
                        if (/(start|down)$/i.test(e.type)) this.menuScrollStop(t) ? (e.preventDefault(),
                        this.$touchScrollingSub = t) : this.$touchScrollingSub = null, this.menuScrollRefreshData(t),
                        $.extend(s, {
                            touchStartY: i.pageY,
                            touchStartTime: e.timeStamp
                        }); else if (/move$/i.test(e.type)) {
                            var o = void 0 !== s.touchY ? s.touchY : s.touchStartY;
                            if (void 0 !== o && o != i.pageY) {
                                this.$touchScrollingSub = t;
                                var a = i.pageY > o;
                                void 0 !== s.up && s.up != a && $.extend(s, {
                                    touchStartY: i.pageY,
                                    touchStartTime: e.timeStamp
                                }), $.extend(s, {
                                    up: a,
                                    touchY: i.pageY
                                }), this.menuScroll(t, !0, Math.abs(i.pageY - o));
                            }
                            e.preventDefault();
                        } else void 0 !== s.touchY && ((s.momentum = 15 * Math.pow(Math.abs(i.pageY - s.touchStartY) / (e.timeStamp - s.touchStartTime), 2)) && (this.menuScrollStop(t),
                        this.menuScroll(t), e.preventDefault()), delete s.touchY);
                    }
                }
            },
            menuShow: function(t) {
                if ((t.dataSM("beforefirstshowfired") || (t.dataSM("beforefirstshowfired", !0),
                !1 !== this.$root.triggerHandler("beforefirstshow.smapi", t[0]))) && !1 !== this.$root.triggerHandler("beforeshow.smapi", t[0]) && (t.dataSM("shown-before", !0),
                canAnimate && t.stop(!0, !0), !t.is(":visible"))) {
                    var e = t.dataSM("parent-a"), i = this.isCollapsible();
                    if ((this.opts.keepHighlighted || i) && e.addClass("highlighted"), i) t.removeClass("sm-nowrap").css({
                        zIndex: "",
                        width: "auto",
                        minWidth: "",
                        maxWidth: "",
                        top: "",
                        left: "",
                        marginLeft: "",
                        marginTop: ""
                    }); else {
                        if (t.css("z-index", this.zIndexInc = (this.zIndexInc || this.getStartZIndex()) + 1),
                        (this.opts.subMenusMinWidth || this.opts.subMenusMaxWidth) && (t.css({
                            width: "auto",
                            minWidth: "",
                            maxWidth: ""
                        }).addClass("sm-nowrap"), this.opts.subMenusMinWidth && t.css("min-width", this.opts.subMenusMinWidth),
                        this.opts.subMenusMaxWidth)) {
                            var s = this.getWidth(t);
                            t.css("max-width", this.opts.subMenusMaxWidth), s > this.getWidth(t) && t.removeClass("sm-nowrap").css("width", this.opts.subMenusMaxWidth);
                        }
                        this.menuPosition(t);
                    }
                    function o() {
                        t.css("overflow", "");
                    }
                    i ? canAnimate && this.opts.collapsibleShowFunction ? this.opts.collapsibleShowFunction.call(this, t, o) : t.show(this.opts.collapsibleShowDuration, o) : canAnimate && this.opts.showFunction ? this.opts.showFunction.call(this, t, o) : t.show(this.opts.showDuration, o),
                    e.attr("aria-expanded", "true"), t.attr({
                        "aria-expanded": "true",
                        "aria-hidden": "false"
                    }), this.visibleSubMenus.push(t), this.$root.triggerHandler("show.smapi", t[0]);
                }
            },
            popupHide: function(t) {
                this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = 0);
                var e = this;
                this.hideTimeout = setTimeout(function() {
                    e.menuHideAll();
                }, t ? 1 : this.opts.hideTimeout);
            },
            popupShow: function(t, e) {
                if (this.opts.isPopup) {
                    if (this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = 0),
                    this.$root.dataSM("shown-before", !0), canAnimate && this.$root.stop(!0, !0), !this.$root.is(":visible")) {
                        this.$root.css({
                            left: t,
                            top: e
                        });
                        function s() {
                            i.$root.css("overflow", "");
                        }
                        var i = this;
                        canAnimate && this.opts.showFunction ? this.opts.showFunction.call(this, this.$root, s) : this.$root.show(this.opts.showDuration, s),
                        this.visibleSubMenus[0] = this.$root;
                    }
                } else alert('SmartMenus jQuery Error:\n\nIf you want to show this menu via the "popupShow" method, set the isPopup:true option.');
            },
            refresh: function() {
                this.destroy(!0), this.init(!0);
            },
            rootKeyDown: function(t) {
                if (this.handleEvents()) switch (t.keyCode) {
                  case 27:
                    var e = this.activatedItems[0];
                    if (e) this.menuHideAll(), e[0].focus(), (i = e.dataSM("sub")) && this.menuHide(i);
                    break;

                  case 32:
                    var i, s = $(t.target);
                    if (s.is("a") && this.handleItemEvents(s)) (i = s.dataSM("sub")) && !i.is(":visible") && (this.itemClick({
                        currentTarget: t.target
                    }), t.preventDefault());
                }
            },
            rootOut: function(t) {
                if (this.handleEvents() && !this.isTouchMode() && t.target != this.$root[0] && (this.hideTimeout && (clearTimeout(this.hideTimeout),
                this.hideTimeout = 0), !this.opts.showOnClick || !this.opts.hideOnClick)) {
                    var e = this;
                    this.hideTimeout = setTimeout(function() {
                        e.menuHideAll();
                    }, this.opts.hideTimeout);
                }
            },
            rootOver: function(t) {
                this.handleEvents() && !this.isTouchMode() && t.target != this.$root[0] && this.hideTimeout && (clearTimeout(this.hideTimeout),
                this.hideTimeout = 0);
            },
            winResize: function(t) {
                if (this.handleEvents()) {
                    if (!("onorientationchange" in window) || "orientationchange" == t.type) {
                        var e = this.isCollapsible();
                        this.wasCollapsible && e || (this.activatedItems.length && this.activatedItems[this.activatedItems.length - 1][0].blur(),
                        this.menuHideAll()), this.wasCollapsible = e;
                    }
                } else if (this.$disableOverlay) {
                    var i = this.$root.offset();
                    this.$disableOverlay.css({
                        top: i.top,
                        left: i.left,
                        width: this.$root.outerWidth(),
                        height: this.$root.outerHeight()
                    });
                }
            }
        }
    }), $.fn.dataSM = function(t, e) {
        return e ? this.data(t + "_smartmenus", e) : this.data(t + "_smartmenus");
    }, $.fn.removeDataSM = function(t) {
        return this.removeData(t + "_smartmenus");
    }, $.fn.smartmenus = function(options) {
        if ("string" != typeof options) return this.each(function() {
            var dataOpts = $(this).data("sm-options") || null;
            if (dataOpts) try {
                dataOpts = eval("(" + dataOpts + ")");
            } catch (e) {
                dataOpts = null, alert('ERROR\n\nSmartMenus jQuery init:\nInvalid "data-sm-options" attribute value syntax.');
            }
            new $.SmartMenus(this, $.extend({}, $.fn.smartmenus.defaults, options, dataOpts));
        });
        var args = arguments, method = options;
        return Array.prototype.shift.call(args), this.each(function() {
            var t = $(this).data("smartmenus");
            t && t[method] && t[method].apply(t, args);
        });
    }, $.fn.smartmenus.defaults = {
        isPopup: !1,
        mainMenuSubOffsetX: 0,
        mainMenuSubOffsetY: 0,
        subMenusSubOffsetX: 0,
        subMenusSubOffsetY: 0,
        subMenusMinWidth: "10em",
        subMenusMaxWidth: "20em",
        subIndicators: !0,
        subIndicatorsPos: "append",
        subIndicatorsText: "",
        scrollStep: 30,
        scrollAccelerate: !0,
        showTimeout: 250,
        hideTimeout: 500,
        showDuration: 0,
        showFunction: null,
        hideDuration: 0,
        hideFunction: function(t, e) {
            t.fadeOut(200, e);
        },
        collapsibleShowDuration: 0,
        collapsibleShowFunction: function(t, e) {
            t.slideDown(200, e);
        },
        collapsibleHideDuration: 0,
        collapsibleHideFunction: function(t, e) {
            t.slideUp(200, e);
        },
        showOnClick: !1,
        hideOnClick: !0,
        noMouseOver: !1,
        keepInViewport: !0,
        keepHighlighted: !0,
        markCurrentItem: !1,
        markCurrentTree: !0,
        rightToLeftSubMenus: !1,
        bottomToTopSubMenus: !1,
        collapsibleBehavior: "default"
    }, $;
}), function($) {
    function OpenClose(options) {
        this.options = $.extend({
            addClassBeforeAnimation: !0,
            hideOnClickOutside: !1,
            activeClass: "active",
            opener: ".opener",
            slider: ".slide",
            animSpeed: 400,
            effect: "fade",
            event: "click"
        }, options), this.init();
    }
    OpenClose.prototype = {
        init: function() {
            this.options.holder && (this.findElements(), this.attachEvents(), this.makeCallback("onInit", this));
        },
        findElements: function() {
            this.holder = $(this.options.holder), this.opener = this.holder.find(this.options.opener),
            this.slider = this.holder.find(this.options.slider);
        },
        attachEvents: function() {
            // add handler
            var self = this;
            this.eventHandler = function(e) {
                e.preventDefault(), self.slider.hasClass(slideHiddenClass) ? self.showSlide() : self.hideSlide();
            }, self.opener.on(self.options.event, this.eventHandler),
            // hover mode handler
            "hover" === self.options.event && (self.opener.on("mouseenter", function() {
                self.holder.hasClass(self.options.activeClass) || self.showSlide();
            }), self.holder.on("mouseleave", function() {
                self.hideSlide();
            })),
            // outside click handler
            self.outsideClickHandler = function(e) {
                if (self.options.hideOnClickOutside) {
                    var target = $(e.target);
                    target.is(self.holder) || target.closest(self.holder).length || self.hideSlide();
                }
            },
            // set initial styles
            this.holder.hasClass(this.options.activeClass) ? $(document).on("click touchstart", self.outsideClickHandler) : this.slider.addClass(slideHiddenClass);
        },
        showSlide: function() {
            var self = this;
            self.options.addClassBeforeAnimation && self.holder.addClass(self.options.activeClass),
            self.slider.removeClass(slideHiddenClass), $(document).on("click touchstart", self.outsideClickHandler),
            self.makeCallback("animStart", !0), toggleEffects[self.options.effect].show({
                box: self.slider,
                speed: self.options.animSpeed,
                complete: function() {
                    self.options.addClassBeforeAnimation || self.holder.addClass(self.options.activeClass),
                    self.makeCallback("animEnd", !0);
                }
            });
        },
        hideSlide: function() {
            var self = this;
            self.options.addClassBeforeAnimation && self.holder.removeClass(self.options.activeClass),
            $(document).off("click touchstart", self.outsideClickHandler), self.makeCallback("animStart", !1),
            toggleEffects[self.options.effect].hide({
                box: self.slider,
                speed: self.options.animSpeed,
                complete: function() {
                    self.options.addClassBeforeAnimation || self.holder.removeClass(self.options.activeClass),
                    self.slider.addClass(slideHiddenClass), self.makeCallback("animEnd", !1);
                }
            });
        },
        destroy: function() {
            this.slider.removeClass(slideHiddenClass).css({
                display: ""
            }), this.opener.off(this.options.event, this.eventHandler), this.holder.removeClass(this.options.activeClass).removeData("OpenClose"),
            $(document).off("click touchstart", this.outsideClickHandler);
        },
        makeCallback: function(name) {
            if ("function" == typeof this.options[name]) {
                var args = Array.prototype.slice.call(arguments);
                args.shift(), this.options[name].apply(this, args);
            }
        }
    };
    // add stylesheet for slide on DOMReady
    var tabStyleSheet, tabStyleRule, slideHiddenClass = "js-slide-hidden";
    tabStyleSheet = $('<style type="text/css">')[0], tabStyleRule = "." + slideHiddenClass,
    tabStyleRule += "{}",
    tabStyleSheet.styleSheet ? tabStyleSheet.styleSheet.cssText = tabStyleRule : tabStyleSheet.appendChild(document.createTextNode(tabStyleRule)),
    $("head").append(tabStyleSheet);
    // animation effects
    var toggleEffects = {
        slide: {
            show: function(o) {
                o.box.stop(!0).hide().slideDown(o.speed, o.complete);
            },
            hide: function(o) {
                o.box.stop(!0).slideUp(o.speed, o.complete);
            }
        },
        fade: {
            show: function(o) {
                o.box.stop(!0).hide().fadeIn(o.speed, o.complete);
            },
            hide: function(o) {
                o.box.stop(!0).fadeOut(o.speed, o.complete);
            }
        },
        none: {
            show: function(o) {
                o.box.hide().show(0, o.complete);
            },
            hide: function(o) {
                o.box.hide(0, o.complete);
            }
        }
    };
    // jQuery plugin interface
        $.fn.openClose = function(opt) {
        var args = Array.prototype.slice.call(arguments), method = args[0];
        return this.each(function() {
            var $holder = jQuery(this), instance = $holder.data("OpenClose");
            "object" == typeof opt || void 0 === opt ? $holder.data("OpenClose", new OpenClose($.extend({
                holder: this
            }, opt))) : "string" == typeof method && instance && "function" == typeof instance[method] && (args.shift(),
            instance[method].apply(instance, args));
        });
    };
}(jQuery), function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.AOS = t();
}(this, function() {
    "use strict";
    function b() {
        return l.Date.now();
    }
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}, t = "Expected a function", n = NaN, o = "[object Symbol]", i = /^\s+|\s+$/g, a = /^[-+]0x[0-9a-f]+$/i, r = /^0b[01]+$/i, c = /^0o[0-7]+$/i, s = parseInt, u = "object" == typeof e && e && e.Object === Object && e, d = "object" == typeof self && self && self.Object === Object && self, l = u || d || Function("return this")(), f = Object.prototype.toString, m = Math.max, p = Math.min;
    function g(e) {
        var t = typeof e;
        return !!e && ("object" == t || "function" == t);
    }
    function w(e) {
        if ("number" == typeof e) return e;
        if (function(e) {
            return "symbol" == typeof e || function(e) {
                return !!e && "object" == typeof e;
            }(e) && f.call(e) == o;
        }(e)) return n;
        if (g(e)) {
            var t = "function" == typeof e.valueOf ? e.valueOf() : e;
            e = g(t) ? t + "" : t;
        }
        if ("string" != typeof e) return 0 === e ? e : +e;
        e = e.replace(i, "");
        var u = r.test(e);
        return u || c.test(e) ? s(e.slice(2), u ? 2 : 8) : a.test(e) ? n : +e;
    }
    function y(e, n, o) {
        var i = !0, a = !0;
        if ("function" != typeof e) throw new TypeError(t);
        return g(o) && (i = "leading" in o ? !!o.leading : i, a = "trailing" in o ? !!o.trailing : a),
        function(e, n, o) {
            var i, a, r, c, s, u, d = 0, l = !1, f = !1, v = !0;
            if ("function" != typeof e) throw new TypeError(t);
            function y(t) {
                var n = i, o = a;
                return i = a = void 0, d = t, c = e.apply(o, n);
            }
            function h(e) {
                var t = e - u;
                return void 0 === u || n <= t || t < 0 || f && r <= e - d;
            }
            function k() {
                var e = b();
                if (h(e)) return x(e);
                s = setTimeout(k, function(e) {
                    var t = n - (e - u);
                    return f ? p(t, r - (e - d)) : t;
                }(e));
            }
            function x(e) {
                return s = void 0, v && i ? y(e) : (i = a = void 0, c);
            }
            function O() {
                var e = b(), t = h(e);
                if (i = arguments, a = this, u = e, t) {
                    if (void 0 === s) return function(e) {
                        return d = e, s = setTimeout(k, n), l ? y(e) : c;
                    }(u);
                    if (f) return s = setTimeout(k, n), y(u);
                }
                return void 0 === s && (s = setTimeout(k, n)), c;
            }
            return n = w(n) || 0, g(o) && (l = !!o.leading, r = (f = "maxWait" in o) ? m(w(o.maxWait) || 0, n) : r,
            v = "trailing" in o ? !!o.trailing : v), O.cancel = function() {
                void 0 !== s && clearTimeout(s), i = u = a = s = void (d = 0);
            }, O.flush = function() {
                return void 0 === s ? c : x(b());
            }, O;
        }(e, n, {
            leading: i,
            maxWait: n,
            trailing: a
        });
    }
    function S() {
        return q.Date.now();
    }
    var O = /^\s+|\s+$/g, j = /^[-+]0x[0-9a-f]+$/i, E = /^0b[01]+$/i, N = /^0o[0-7]+$/i, z = parseInt, C = "object" == typeof e && e && e.Object === Object && e, A = "object" == typeof self && self && self.Object === Object && self, q = C || A || Function("return this")(), L = Object.prototype.toString, T = Math.max, M = Math.min;
    function D(e) {
        var t = typeof e;
        return !!e && ("object" == t || "function" == t);
    }
    function H(e) {
        if ("number" == typeof e) return e;
        if (function(e) {
            return "symbol" == typeof e || function(e) {
                return !!e && "object" == typeof e;
            }(e) && "[object Symbol]" == L.call(e);
        }(e)) return NaN;
        if (D(e)) {
            var t = "function" == typeof e.valueOf ? e.valueOf() : e;
            e = D(t) ? t + "" : t;
        }
        if ("string" != typeof e) return 0 === e ? e : +e;
        e = e.replace(O, "");
        var n = E.test(e);
        return n || N.test(e) ? z(e.slice(2), n ? 2 : 8) : j.test(e) ? NaN : +e;
    }
    function $(e, t, n) {
        var o, i, a, r, c, s, u = 0, d = !1, l = !1, f = !0;
        if ("function" != typeof e) throw new TypeError("Expected a function");
        function m(t) {
            var n = o, a = i;
            return o = i = void 0, u = t, r = e.apply(a, n);
        }
        function p(e) {
            var n = e - s;
            return void 0 === s || t <= n || n < 0 || l && a <= e - u;
        }
        function b() {
            var e = S();
            if (p(e)) return v(e);
            c = setTimeout(b, function(e) {
                var n = t - (e - s);
                return l ? M(n, a - (e - u)) : n;
            }(e));
        }
        function v(e) {
            return c = void 0, f && o ? m(e) : (o = i = void 0, r);
        }
        function g() {
            var e = S(), n = p(e);
            if (o = arguments, i = this, s = e, n) {
                if (void 0 === c) return function(e) {
                    return u = e, c = setTimeout(b, t), d ? m(e) : r;
                }(s);
                if (l) return c = setTimeout(b, t), m(s);
            }
            return void 0 === c && (c = setTimeout(b, t)), r;
        }
        return t = H(t) || 0, D(n) && (d = !!n.leading, a = (l = "maxWait" in n) ? T(H(n.maxWait) || 0, t) : a,
        f = "trailing" in n ? !!n.trailing : f), g.cancel = function() {
            void 0 !== c && clearTimeout(c), o = s = i = c = void (u = 0);
        }, g.flush = function() {
            return void 0 === c ? r : v(S());
        }, g;
    }
    var W = function() {};
    function P(e) {
        e && e.forEach(function(e) {
            var t = Array.prototype.slice.call(e.addedNodes), n = Array.prototype.slice.call(e.removedNodes);
            if (function e(t) {
                var n = void 0, o = void 0;
                for (n = 0; n < t.length; n += 1) {
                    if ((o = t[n]).dataset && o.dataset.aos) return !0;
                    if (o.children && e(o.children)) return !0;
                }
                return !1;
            }(t.concat(n))) return W();
        });
    }
    function Y() {
        return window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    }
    var __isSupported = function() {
        return !!Y();
    }, __ready = function(e, t) {
        var n = window.document, o = new (Y())(P);
        W = t, o.observe(n.documentElement, {
            childList: !0,
            subtree: !0,
            removedNodes: !0
        });
    }, F = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0),
                Object.defineProperty(e, o.key, o);
            }
        }
        return function(t, n, o) {
            return n && e(t.prototype, n), o && e(t, o), t;
        };
    }(), I = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
        }
        return e;
    }, K = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i, G = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i, J = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i, Q = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;
    function R() {
        return navigator.userAgent || navigator.vendor || window.opera || "";
    }
    function V(e, t) {
        var n = void 0;
        return U.ie11() ? (n = document.createEvent("CustomEvent")).initCustomEvent(e, !0, !0, {
            detail: t
        }) : n = new CustomEvent(e, {
            detail: t
        }), document.dispatchEvent(n);
    }
    function X(e) {
        return e.forEach(function(e, t) {
            return function(e, t) {
                var n = e.options, o = e.position, i = e.node, a = (e.data, function() {
                    e.animated && (function(e, t) {
                        t && t.forEach(function(t) {
                            return e.classList.remove(t);
                        });
                    }(i, n.animatedClassNames), V("aos:out", i), e.options.id && V("aos:in:" + e.options.id, i),
                    e.animated = !1);
                });
                n.mirror && t >= o.out && !n.once ? a() : t >= o.in ? e.animated || (function(e, t) {
                    t && t.forEach(function(t) {
                        return e.classList.add(t);
                    });
                }(i, n.animatedClassNames), V("aos:in", i), e.options.id && V("aos:in:" + e.options.id, i),
                e.animated = !0) : e.animated && !n.once && a();
            }(e, window.pageYOffset);
        });
    }
    function Z(e) {
        for (var t = 0, n = 0; e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop); ) t += e.offsetLeft - ("BODY" != e.tagName ? e.scrollLeft : 0),
        n += e.offsetTop - ("BODY" != e.tagName ? e.scrollTop : 0), e = e.offsetParent;
        return {
            top: n,
            left: t
        };
    }
    function ee(e, t, n) {
        var o = e.getAttribute("data-aos-" + t);
        if (void 0 !== o) {
            if ("true" === o) return !0;
            if ("false" === o) return !1;
        }
        return o || n;
    }
    function ne() {
        var e = document.querySelectorAll("[data-aos]");
        return Array.prototype.map.call(e, function(e) {
            return {
                node: e
            };
        });
    }
    function re() {
        return document.all && !window.atob;
    }
    function ce() {
        0 < arguments.length && void 0 !== arguments[0] && arguments[0] && (ie = !0), ie && (oe = function(e, t) {
            return e.forEach(function(e, n) {
                var o = ee(e.node, "mirror", t.mirror), i = ee(e.node, "once", t.once), a = ee(e.node, "id"), r = t.useClassNames && e.node.getAttribute("data-aos"), c = [ t.animatedClassName ].concat(r ? r.split(" ") : []).filter(function(e) {
                    return "string" == typeof e;
                });
                t.initClassName && e.node.classList.add(t.initClassName), e.position = {
                    in: function(e, t, n) {
                        var o = window.innerHeight, i = ee(e, "anchor"), a = ee(e, "anchor-placement"), r = Number(ee(e, "offset", a ? 0 : t)), c = a || n, s = e;
                        i && document.querySelectorAll(i) && (s = document.querySelectorAll(i)[0]);
                        var u = Z(s).top - o;
                        switch (c) {
                          case "top-bottom":
                            break;

                          case "center-bottom":
                            u += s.offsetHeight / 2;
                            break;

                          case "bottom-bottom":
                            u += s.offsetHeight;
                            break;

                          case "top-center":
                            u += o / 2;
                            break;

                          case "center-center":
                            u += o / 2 + s.offsetHeight / 2;
                            break;

                          case "bottom-center":
                            u += o / 2 + s.offsetHeight;
                            break;

                          case "top-top":
                            u += o;
                            break;

                          case "bottom-top":
                            u += o + s.offsetHeight;
                            break;

                          case "center-top":
                            u += o + s.offsetHeight / 2;
                        }
                        return u + r;
                    }(e.node, t.offset, t.anchorPlacement),
                    out: o && function(e, t) {
                        window.innerHeight;
                        var n = ee(e, "anchor"), o = ee(e, "offset", t), i = e;
                        return n && document.querySelectorAll(n) && (i = document.querySelectorAll(n)[0]),
                        Z(i).top + i.offsetHeight - o;
                    }(e.node, t.offset)
                }, e.options = {
                    once: i,
                    mirror: o,
                    animatedClassNames: c,
                    id: a
                };
            }), e;
        }(oe, ae), X(oe), window.addEventListener("scroll", y(function() {
            X(oe, ae.once);
        }, ae.throttleDelay)));
    }
    function se() {
        if (oe = ne(), de(ae.disable) || re()) return ue();
        ce();
    }
    var U = new (function() {
        function e() {
            !function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
            }(this, e);
        }
        return F(e, [ {
            key: "phone",
            value: function() {
                var e = R();
                return !(!K.test(e) && !G.test(e.substr(0, 4)));
            }
        }, {
            key: "mobile",
            value: function() {
                var e = R();
                return !(!J.test(e) && !Q.test(e.substr(0, 4)));
            }
        }, {
            key: "tablet",
            value: function() {
                return this.mobile() && !this.phone();
            }
        }, {
            key: "ie11",
            value: function() {
                return "-ms-scroll-limit" in document.documentElement.style && "-ms-ime-align" in document.documentElement.style;
            }
        } ]), e;
    }())(), oe = [], ie = !1, ae = {
        offset: 120,
        delay: 0,
        easing: "ease",
        duration: 400,
        disable: !1,
        once: !1,
        mirror: !1,
        anchorPlacement: "top-bottom",
        startEvent: "DOMContentLoaded",
        animatedClassName: "aos-animate",
        initClassName: "aos-init",
        useClassNames: !1,
        disableMutationObserver: !1,
        throttleDelay: 99,
        debounceDelay: 50
    }, ue = function() {
        oe.forEach(function(e, t) {
            e.node.removeAttribute("data-aos"), e.node.removeAttribute("data-aos-easing"), e.node.removeAttribute("data-aos-duration"),
            e.node.removeAttribute("data-aos-delay"), ae.initClassName && e.node.classList.remove(ae.initClassName),
            ae.animatedClassName && e.node.classList.remove(ae.animatedClassName);
        });
    }, de = function(e) {
        return !0 === e || "mobile" === e && U.mobile() || "phone" === e && U.phone() || "tablet" === e && U.tablet() || "function" == typeof e && !0 === e();
    };
    return {
        init: function(e) {
            return ae = I(ae, e), oe = ne(), ae.disableMutationObserver || __isSupported() || (console.info('\n      aos: MutationObserver is not supported on this browser,\n      code mutations observing has been disabled.\n      You may have to call "refreshHard()" by yourself.\n    '),
            ae.disableMutationObserver = !0), ae.disableMutationObserver || __ready("[data-aos]", se),
            de(ae.disable) || re() ? ue() : (document.querySelector("body").setAttribute("data-aos-easing", ae.easing),
            document.querySelector("body").setAttribute("data-aos-duration", ae.duration), document.querySelector("body").setAttribute("data-aos-delay", ae.delay),
            -1 === [ "DOMContentLoaded", "load" ].indexOf(ae.startEvent) ? document.addEventListener(ae.startEvent, function() {
                ce(!0);
            }) : window.addEventListener("load", function() {
                ce(!0);
            }), "DOMContentLoaded" === ae.startEvent && -1 < [ "complete", "interactive" ].indexOf(document.readyState) && ce(!0),
            window.addEventListener("resize", $(ce, ae.debounceDelay, !0)), window.addEventListener("orientationchange", $(ce, ae.debounceDelay, !0)),
            oe);
        },
        refresh: ce,
        refreshHard: se
    };
});

/*
 * Browser Detect script
 */
function initBrowserDetect(e,r){window.BrowserDetect=function(){var n,o,t=e,a=r,i={browsers:{edge:u(/ Edge\/([0-9\.]*)/),chrome:u(/Chrome\/([0-9\.]*)/),firefox:u(/Firefox\/([0-9\.]*)/),safari:u(/Version\/([0-9\.]*).*Safari/),opera:u(/Opera\/.*Version\/([0-9\.]*)/,/Opera\/([0-9\.]*)/),msie:u(/MSIE ([0-9\.]*)/,/Trident.*rv:([0-9\.]*)/)},engines:{edgehtml:p(" Edge/"),webkit:p("AppleWebKit"),trident:u(/(MSIE|Trident)/),gecko:p("Gecko"),presto:p("Presto")},platforms:{win:u(/Windows NT ([0-9\.]*)/),mac:u(/Mac OS X ([0-9_\.]*)/),linux:p("X11","Linux")}},s=navigator.userAgent,f={platform:c(i.platforms),browser:c(i.browsers),engine:c(i.engines)};function u(){var e=Array.prototype.slice.apply(arguments);return function(){for(var r,n=0;n<e.length;n++)if(r=e[n].exec(s))return r[1]}}function p(e){var r=Array.prototype.slice.apply(arguments);return function(){for(var e=0;e<r.length;e++)if(s.indexOf(r[e])<0)return;return!0}}function c(e){var r,n;for(r in e)if(e.hasOwnProperty(r)&&(n=e[r]()))return{name:r,value:n}}return n=function(e){var r=document.documentElement;r.className+=(r.className?" ":"")+e},o=function(e){return"string"==typeof e?e.replace(/\./g,"_"):"unknown"},f.platform&&(n(f.platform.name),t&&n(f.platform.name+"-"+o(f.platform.value))),f.engine&&n(f.engine.name),f.browser&&(n(f.browser.name),n(f.browser.name+"-"+parseInt(f.browser.value,10)),a&&n(f.browser.name+"-"+o(f.browser.value))),f}()}

//-------- -------- -------- --------
//-------- included js libs end
//-------- -------- -------- --------