"use strict";

(function() {
	$(function() {



		//--AOS
		AOS.init({
			offset: 100,
			once: true,
			duration: 1100,
			delay: 150
		});
		setTimeout(function() { AOS.refresh(); }, 1000);
			// SKROLLR
	if( !isMobile ){
		skrollr.init({
			smoothScrolling: false,
			forceHeight: false,
			mobileDeceleration: 0.004
		});
	}


		//--MMENU
		$("#min-menu").mmenu({
			extensions: [
				"pagedim-black", // wrapper-bg black
				"theme-dark",
				//"fullscreen",
				//"listview-50",
				//"fx-panels-slide-up",
				//"fx-listitems-drop",
				"border-offset",
				"position-front",
				"position-right"
			],
			navbar: {
				title: "Меню"
			},
			navbars: [{
					height: 2,
					content: [
						'<div class="close-btn close-content bar">' +
						'<a  href="#page" ><span class="icon-bar"></span><span class="icon-bar"></span></a>' +
						"</div>"
					]
				},
				{
					content: ["prev", "title"]
				}
			]
		}, {});

		//--Flikity Carousel
		function flickityPrevNext(className) {
			var carouselWrapper =   $(className);
			var carousel =          carouselWrapper.find(".carousel-items");
			var carouselPrevNext =  carouselWrapper.find(".carousel-prev-next");
			var btnNext =           carouselPrevNext.find(".next");
			var btnPrev =           carouselPrevNext.find(".prev");
			var flkty =             carousel.data("flickity");
			var selected;
			btnNext.on("click", function() {
				carousel.flickity("next", true);
			});
			btnPrev.on("click", function() {
				carousel.flickity("previous", true);
			});
			carousel.on("select.flickity", function() {
				selected = $(flkty.selectedElement);
				selected.siblings().addBack().removeClass("is-next is-prev");
				selected.next().addClass("is-next");
				selected.prev().addClass("is-prev");
			});
		}

		var arrowStyle = {
			x0: 10,
			x1: 60,
			y1: 50,
			x2: 70,
			y2: 40,
			x3: 30
		};

		//carpetsVerticalCarousel
		function carpetsVerticalCarousel(crs, f){
			//if( !crs ) return;
			var $carousel = crs.find('.carousel').flickity({
				imagesLoaded: true,
				autoPlay: false,
				pauseAutoPlayOnHover: true,
				arrowShape: arrowStyle,
				initialIndex: 0,
				prevNextButtons: false,
				friction: 1,
				selectedAttraction: 1,
				draggable: false,
				wrapAround: true,
				pageDots: false,
				contain: false,
				percentPosition: true,
				cellAlign: 'center'
			});
			var $carouselNav = crs.find('.carousel-nav');
			var $carouselNavCells = $carouselNav.find('.carousel-cell');

			$carouselNav.on( 'click', '.carousel-cell', function( event ) {
				var index = $( event.currentTarget ).index();
				$carousel.flickity( 'select', index );
			});

			var flkty = $carousel.data('flickity');
			var navTop  = $carouselNav.position().top;
			var navCellHeight = $carouselNavCells.height();
			var navHeight = $carouselNav.height();

			$carousel.on( 'select.flickity', function() {
				// set selected nav cell
				$carouselNav.find('.is-nav-selected').removeClass('is-nav-selected');
				var $selected = $carouselNavCells.eq( flkty.selectedIndex ).addClass('is-nav-selected');
				// scroll nav
				var scrollY = $selected.position().top +
					$carouselNav.scrollTop() - ( navHeight + navCellHeight ) / 2;
				$carouselNav.animate({
					//scrollTop: scrollY
				});

			});
			var tabId = $carousel.closest(".tab-pane").attr("id");
			$('.short-carpets-carousel a[href="#'+tabId+'"]').on('show.bs.tab', function (e) {
				setTimeout(function(){
					$carousel.flickity("resize");
				}, 200)
			})
		}
		var carpetsVerticalEl = $('.carpets-vertical-carousel') || null;
		if( carpetsVerticalEl )
			for (var i = 0; i < $('.carpets-vertical-carousel').length; i++)
				carpetsVerticalCarousel( $('.carpets-vertical-carousel').eq(i) );


		
		



		function carpetsCarousel(){
			var itemsWidth = 0;
			var carousel = $(".short-carpets-carousel");
			var carouselWidth = carousel.width();
			var carouselWidthPersent = 100/carouselWidth;

			carousel.find("li").map(function(i, el){
				itemsWidth += ($(el).outerWidth()+35);
			})
			carousel.find(".carousel-wrapper").css({ width: itemsWidth+"px" })
			carousel.on("mousemove", function(e){
				var offset = (itemsWidth - carouselWidth)*100/itemsWidth;
				var mouseX = e.clientX;
				var mousePersent =  -(roundFix((offset/94)*(carouselWidthPersent*mouseX), 3)-1)
				carousel.find(".carousel-wrapper").css({'transform': 'translateX('+mousePersent+'%)'})
			})
		}
		if( !checkSm() ){
				carpetsCarousel();
		}
		else{
			var $carousel = $('.short-carpets-carousel .carousel-wrapper ul').flickity({
				imagesLoaded: true,
				autoPlay: false,
				pauseAutoPlayOnHover: true,
				arrowShape: arrowStyle,
				initialIndex: 0,
				prevNextButtons: true,
				draggable: checkSm(),
				wrapAround: true,
				pageDots: false,
				contain: false,
				percentPosition: true,
				cellAlign: 'center'
			});
		}

		$(".short-carpets-carousel .hover-content a").on("click", function(){
			var carpetsTabTop = $(".carpets-tab-items").offset().top
    	$("html").animate({
    	    scrollTop: !checkSm() ?  carpetsTabTop-80 : carpetsTabTop+500
    	}, 500)

		})
		// FANCYBOX
		if ($("[data-fancybox='gallery']").length != 0)
			$("[data-fancybox='gallery']").fancybox({
				afterShow: function(instance, current) {},
				transitionEffect: "zoom-in-out"
			});

		//carouselArticle
		window.carouselArticle = function() {
			if ($(".carousel-article").length >= 0) {
				var carouselMain = $(".carousel-article .carousel-main"),
					carouselNav = $(".carousel-article .carousel-nav");
				for (var i = 0; i < carouselMain.length; i++) {
					var crs = $(carouselMain).eq(i).flickity({
							imagesLoaded: true,
							prevNextButtons: checkSm(),
							cellAlign: "center",
							bgLazyLoad: 1,
							//friction: 1,
							//selectedAttraction: 1,
							initialIndex: 1,
							draggable: false,
							contain: true,
							pageDots: false
						});
					var flkty = crs.data("flickity");
					var crsNav = $(carouselNav).eq(i).flickity({
							imagesLoaded: true,
							initialIndex: 0,
							asNavFor: $(carouselMain)[i],
							prevNextButtons: !checkSm(),
							draggable: true,
							cellAlign: "center",
							adaptiveHeight: true,
							contain: false,
							pageDots: false
						});
					$("[data-fancybox]").fancybox({
						afterShow: function(instance, current) {
							this.$content.find(".carousel-main").flickity("resize");
							this.$content.find(".carousel-nav").flickity("resize");
						}
					});
				}
			}
		};
		carouselArticle();

		function onLoaded() {
			//MASONRY
			if ($(".grid-img").length != 0) {
				var $grid = $(".grid-img").masonry({
					itemSelector: ".grid-img-item",
					columnWidth: ".grid-img-sizer",
					percentPosition: true
				});
			}
		}
		var index = $(".rev-slider:not(.banner-slider)").length || null;
		if (!index) $(".header-scroll").addClass("header-pages");

		//SCROLL
		var minMenu = $(".header-scroll") || null;
		var headerRange = false;
		$(window).on("scroll", function(e) {
			if ($(window).scrollTop() > 200 && headerRange == false) {
				headerRange = true;
				if (minMenu) minMenu.addClass("scrolled").addClass("down");
			} else if ($(window).scrollTop() < 200 && headerRange == true) {
				headerRange = !true;
				if (minMenu) minMenu.removeClass("scrolled");
			} //.originalEvent.wheelDelta
		});

		$(window).on("mousewheel", function(event) {
			if (!headerRange) return;
			if (event.originalEvent.wheelDelta >= 0) {
				//minMenu.removeClass("up");
			} else {
				//minMenu.addClass("up");
			}
		});

		window.preLoader = {
			preBox: ".pre-box",
			enter: false,
			status: $(".pre-box").hasClass("in"),

			preToggle: function(bool, func) {
				var endtime = 600;
				if (!this.enter) return;
				if (typeof func === "function")
					setTimeout(function() {
						func();
					}, endtime);
				var preBox = $(this.preBox);

				bool || this.status ?
					preBox.removeClass("in").setTimeout(function() {
						$(preBox).hide();
					}, endtime) :
					preBox
					.show()
					.addClass("in")
					.find(".box-content");

				return (this.status = !this.status);
			},

			preImg: function(img) {
				var images = img || document.images,
					imagesTotalCount = images.length,
					imagesLoadedCount = 0,
					preloadPercent = $(".percent").text("0 %");

				if (imagesTotalCount == 0) {
					preOnload();
					$(preloadPercent).text("100 %");
				}

				for (var i = 0; i < imagesTotalCount; i++) {
					var image_clone = new Image();
					image_clone.onload = image_loaded;
					image_clone.onerror = image_loaded;
					image_clone.src = images[i].src;
				}

				function preOnload() {
					onLoaded();
				}

				function image_loaded() {
					imagesLoadedCount++;

					var per = (100 / imagesTotalCount * imagesLoadedCount) << 0;

					setTimeout(function() {
						//console.log(per);
						$(preloadPercent).text(per + "%");
					}, 1);

					if (imagesLoadedCount >= imagesTotalCount) preOnload();
				}
			}
		};

		preLoader.preImg();









		var revSlider = $('.rev-slider') || null;
		var bannerSlider = $('.rev-slider').hasClass("banner-slider") || null;

		onResized(function() {
			if (revSlider.length != 0)
				revSlider.revolution({
					delay: 6000,
					startwidth: checkSm() ? $(window).width() : checkMd() ? 970 : 1170,
					startheight: checkSm() ? 450 : bannerSlider ? 400 : 615,
					autoHeight: "off",
					fullScreenAlignForce: "off",

					onHoverStop: "on",

					thumbWidth: 100,
					thumbHeight: 50,
					thumbAmount: 3,

					hideThumbsOnMobile: "on",
					hideBulletsOnMobile: "on",
					hideArrowsOnMobile: "on",
					hideThumbsUnderResoluition: 0,

					hideThumbs: 500,
					hideTimerBar: "on",

					keyboardNavigation: "off",

					navigationType: "bullet",
					navigationArrows: "solo",
					navigationStyle: "round",

					navigationHAlign: "center",
					navigationVAlign: "bottom",
					navigationHOffset: 0,
					navigationVOffset: 30,

					soloArrowLeftHalign: "left",
					soloArrowLeftValign: "center",
					soloArrowLeftHOffset: 30,
					soloArrowLeftVOffset: 0,

					soloArrowRightHalign: "right",
					soloArrowRightValign: "center",
					soloArrowRightHOffset: 30,
					soloArrowRightVOffset: 0,


					touchenabled: "off",
					swipe_velocity: "0.7",
					swipe_max_touches: "1",
					swipe_min_touches: "1",
					drag_block_vertical: "false",

					stopAtSlide: -1,
					stopAfterLoops: -1,
					hideCaptionAtLimit: 0,
					hideAllCaptionAtLilmit: 0,
					hideSliderAtLimit: 0,

					fullWidth: "on",
					fullScreen: "off",
					fullScreenOffsetContainer: "#header",

					dottedOverlay: "none",
					forceFullWidth: "off",

					shadow: 0

				})


		});
		if (revSlider.length) {
			var prevnext = $(".tparrows").append('<svg viewBox="0 0 100 100"><path d="M 10,50 L 50,85 L 55,75 L 30,50  L 55,25 L 50,15 Z" class="arrow"></path></svg>')
			$(".arrow-container.container").append(prevnext).css("top", "350");
			$(".arrow-container.container").css("top", "-" + ($(".rev-slider").css("height").match(/(\d+)/gim)[0] / 2) + "px");
		}











	});
})(jQuery);

var isWebkit = /Webkit/i.test(navigator.userAgent),
	isChrome = /Chrome/i.test(navigator.userAgent),
	isMac = /Mac/i.test(navigator.userAgent),
	isMobile = !!("ontouchstart" in window),
	isAndroid = /Android/i.test(navigator.userAgent);

// COMMON FUNCTION

setTimeout(function() {
	//jQuery FUNCITON
	$.fn.onResized = function() {
		onResized(function() {
			this;
		});
		return this;
	};
}, 10);

function checkSm() {
	return $(document).width() <= 991;
}
function checkXs() {
	return $(document).width() <= 767;
}
function checkMd() {
	return $(document).width() < 1199 && !checkSm();
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomIntFloat(min, max) {
	return Math.random() * (max - min) + min;
}

function onResized(f) {
	if (typeof f === "function") f();
	$(window).on("resize", function(e) {
		if (typeof f === "function") f();
	});
	return this;
}

function scrolledDiv(el) {
	try {
		var docViewTop = $(window).scrollTop(),
			docViewBottom = docViewTop + $(window).height(),
			elTop = $(el).offset().top,
			elBottom = elTop + $(el).height() / 1.8;
	} catch (err) {
		console.error();
	}

	return elBottom <= docViewBottom && elTop >= docViewTop;
}
function roundFix( num, cnt ){
	num = num+""
	cnt = cnt + (/./.test(num) || null ? 1 : 0);
	return num.substring( 0,  cnt)*1
}