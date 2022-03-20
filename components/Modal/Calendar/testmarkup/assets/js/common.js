(function($){
	// FilterFocus
	//==================================================*
	function FilterFocus() {
		$('.ListFilter').addClass('is-Focus');
		$('.TotalSearch').addClass('is-Focus');
		$('.ListFilterValue').removeClass('is-None');
		$('html').addClass('is-Hidden');
	}
	
	$(document).on('focus', '.ListFilterSearch-text', FilterFocus);
	
	// FilterFocusOut
	//==================================================*
	function FilterFocusOut() {
		$('.ListFilter').removeClass('is-Focus');
		$('.TotalSearch').removeClass('is-Focus');
		$('html').removeClass('is-Hidden');
		if($('.MapSection').hasClass('is-View')){
			$('.ListFilterValue').addClass('is-None');
		}
	}
	
	$(document).on('click', '.ListFilterSearch-close', FilterFocusOut);
	
	// SortPop
	//==================================================*
	function SortPop() {
		$('#SortPop').addClass('is-View');
		$('html').addClass('is-Hidden');
	}
	
	$(document).on('click', '.ListFilterButtonItem-select', SortPop);
	
	// FilterPop
	//==================================================*
	function FilterPop() {
		$('#FilterPop').addClass('is-View');
		$('html').addClass('is-Hidden');
	}
	
	$(document).on('click', '.ListFilterButton-filter', FilterPop);
	
	// FilterNumberPop
	//==================================================*
	function FilterNumberPop() {
		$('#FilterNumberPop').addClass('is-View');
		$('html').addClass('is-Hidden');
	}
	
	$(document).on('click', '.ListFilterValueItem.icoPersonnel, .js-select-number', FilterNumberPop);
	
	// FilterPopClose
	//==================================================*
	function FilterPopClose() {
		$('.FilterPop').removeClass('is-View');
		$('html').removeClass('is-Hidden');
	}
	
	$(document).on('click', '.FilterPopHeader-close, .FilterPopDim', FilterPopClose);
	
	// MapSection
	//==================================================*
	function MapSection() {
		$('.MapSection').addClass('is-View');
		$('.ListFilterValue').addClass('is-None');
		$('html').addClass('is-Hidden');
	}
	
	$(document).on('click', '.MapFixButton', MapSection);
	
	// MapSectionClose
	//==================================================*
	function MapSectionClose() {
		$('.MapSection').removeClass('is-View');
		$('.ListFilterValue').removeClass('is-None');
		$('html').removeClass('is-Hidden');
	}
	
	$(document).on('click', '.ListFixButton', MapSectionClose);
	
	// ProductSlide
	//==================================================*
	$(".ProductSlide .swiper-container").each(function(index, element){
		var $this = $(this);
		$this.addClass("instance-" + index);
		$this.next(".ProductSlide-pagination").addClass("paging-" + index);
		var productSlide = new Swiper(".instance-" + index, {
			slidesPerView: 1,
			observer: true,
			observeParents: true,
			watchOverflow: true,
			loop:true,
			pagination: {
			  el: ".paging-" + index,
			},
		});
	});
	
	// DetailSlide
	//==================================================*
	var detailSlide = new Swiper(".DetailSlide-container", {
		slidesPerView: 1,
		observer: true,
		observeParents: true,
		watchOverflow: true,
		loop:true,
		pagination: {
		  el: ".DetailSlide-pagination",
		},
	});

	// HeaderScrollEvent
	//==================================================*
	function HeaderScroll() {
		if ($(window).scrollTop() > 0) {
			$('.site-header.Transparent').removeClass("is-Transparent"); 
		} else { 
			$('.site-header.Transparent').addClass("is-Transparent"); 
		}
	}
	
	$(window).on('scroll', HeaderScroll);
	
	// Calender Pop Open
	//==================================================*
	function CalenderPopOpen() {
		$('.CalenderPop').addClass('is-View');
		$('html').addClass('is-Hidden');
	}
	
	$(document).on('click', '.ListFilterValueItem.icoDate, .js-calender', CalenderPopOpen);
	
	// Calender Pop Close
	//==================================================*
	function CalenderPopClose() {
		$('.CalenderPop').removeClass('is-View');
		$('html').removeClass('is-Hidden');
	}
	
	$(document).on('click', '.CalenderPopHeaderTitle-close', CalenderPopClose);
	
	// Header Scroll Hidden
	//==================================================*
	var didScroll;
	var lastScrollTop = 0;
	var delta = 5;
	var navbarHeight = $('.ListFilter').outerHeight();
	
	$(window).scroll(function(event){
		didScroll = true;
	});
	
	setInterval(function() {
		if (didScroll) {
			hasScrolled();
			didScroll = false;
		}
	}, 250);
	
	function hasScrolled() {
		var thisSt = $(this).scrollTop();
		
		if(Math.abs(lastScrollTop - thisSt) <= delta)
			return;
		
		if (thisSt > lastScrollTop && thisSt > navbarHeight){
			$('.ListFilter').removeClass('is-Down').addClass('is-Up');
		} else {
			if(thisSt + $(window).height() < $(document).height()) {
				$('.ListFilter').removeClass('is-Up').addClass('is-Down');
			}
		}
		lastScrollTop = thisSt;
	}
})(jQuery);