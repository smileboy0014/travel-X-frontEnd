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
	
	$(document).on('click', '.js-SortOpen, .ReviewFilterValueItem', SortPop);
	
	// FilterPop
	//==================================================*
	function FilterPop() {
		$('#FilterPop').addClass('is-View');
		$('html').addClass('is-Hidden');
	}
	
	$(document).on('click', '.js-FilterOpen', FilterPop);
	
	// MyReviewMorePop
	//==================================================*
	function MyReviewMorePop() {
		$('#RewviewMorePop').addClass('is-View');
		$('html').addClass('is-Hidden');
	}
	
	$(document).on('click', '.ReviewPostMore', MyReviewMorePop);
	
	// reviewClosePop
	//==================================================*
	function reviewClosePop() {
		$('#reviewClosePop').addClass('is-View');
		$('html').addClass('is-Hidden');
	}
	
	$(document).on('click', '.ReviewPostClose', reviewClosePop);
	
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
	
	// CenterPopClose
	//==================================================*
	function CenterPopClose() {
		$('.CenterPop').removeClass('is-View');
		$('html').removeClass('is-Hidden');
	}
	
	$(document).on('click', '.CenterPopBoxHeader-close, .CenterPopDim', CenterPopClose);
	
	
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
	
	// Accordion
	//==================================================*
	function ListAccordion() {
		var Select = $(this).closest('.ResultSection-inner');
		if(Select.hasClass('is-Open')){
			Select.removeClass('is-Open');
		}else{
			Select.addClass('is-Open');
		}
	}
	
	$(document).on('click', 'button.ResultSectionTitle-text', ListAccordion);
	
	function ListRewviewAccordion() {
		var Select = $(this).closest('.ReviewHeader-inner');
		if(Select.hasClass('is-Open')){
			Select.removeClass('is-Open');
		}else{
			Select.addClass('is-Open');
		}
	}
	
	$(document).on('click', 'button.ReviewHeaderTitleGrade', ListRewviewAccordion);
	
	
	// Review Click TextDown
	//==================================================*
	function ReviewTextDown() {
		$(this).fadeOut(140).parent('.ReviewPostItemText').addClass('is-View');
		
	}
	
	$(document).on('click', '.ReviewPostItemTextBtn', ReviewTextDown);
	
	// ReviewSlide
	//==================================================*
	$(".ReviewSlide .swiper-container").each(function(index, element){
		var $this = $(this);
		$this.addClass("instance-" + index);
		var productSlide = new Swiper(".instance-" + index, {
			slidesPerView: 'auto',
			observer: true,
			observeParents: true,
			watchOverflow: true,
		});
	});
	
	// LayerGallerySlide
	//==================================================*
	if($('.LayerGallerySlide').length > 0){
		var productSlide = new Swiper(".LayerGallerySlide-container", {
			slidesPerView: 1,
			observer: true,
			observeParents: true,
			watchOverflow: true,
			pagination: {
			  el: ".LayerGallerySlide-pagination",
			},
		});
	}
	
	// LayerGallerySlidePop
	//==================================================*
	function LayerGallerySlidePop() {
		$('.LayerGallery').addClass('is-View');
		$('html').addClass('is-Hidden');
	}
	
	$(document).on('click', '.ReviewSlide-link', LayerGallerySlidePop);
	
	// LayerGallerySlideClose
	//==================================================*
	function LayerGallerySlideClose() {
		$('.LayerGallery').removeClass('is-View');
		$('html').removeClass('is-Hidden');
	}
	
	$(document).on('click', '.LayerGallery-close', LayerGallerySlideClose);
	
	// Qna
	//==================================================*
	function Qna() {
		var _parent = $(this).closest('.QnaList-item');
		if($(_parent).hasClass('is-Active')){
			$(_parent).removeClass('is-Active').siblings('.QnaList-item').removeClass('is-Active');
		}else{
			$(_parent).addClass('is-Active').siblings('.QnaList-item').removeClass('is-Active');
		}
	 }
	 
	 $(document).on('click', '.QnaListItemTitle-link', Qna);
	 
	 // ContactAco
	//==================================================*
	function ContactAco() {
		var _parent = $(this).closest('.ContactList-item');
		if($(_parent).hasClass('is-Active')){
			$(_parent).removeClass('is-Active').siblings('.ContactList-item').removeClass('is-Active');
		}else{
			$(_parent).addClass('is-Active').siblings('.ContactList-item').removeClass('is-Active');
		}
	 }
	 
	 $(document).on('click', '.ContactListItemTitle-link', ContactAco);
	 
	  // EditImageSlide
	//==================================================*
	if($('.EditImageSlide').length > 0){
		var EditImageSlide = new Swiper(".EditImageSlide-container", {
			observer: true,
			observeParents: true,
			watchOverflow: true,
			slidesPerView: 'auto',
		});
	}
	
	// Checkbox Check(All)
	//==================================================*
	/**
	 * Checkbox Check(All): All Check
	 */
	function allCheck() {
		var label = $(this).find('input[type="checkbox"]');
		$(label).change(function(){
			if($(label).is( ":checked") == true) {
				$('.AgreeFormList .AgreeFormLabel-input:not(:disabled)').prop("checked",true);
			} else {
				$('.AgreeFormList .AgreeFormLabel-input:not(:disabled)').prop("checked",false);
			}
		});
	};
	$(document).on('click', '.LageAgreeFormLabel', allCheck);
	
	/**
	 * Checkbox Check(All): Item Check
	 */
	function allCheckItem() {
		var label = $(this).find(".AgreeFormLabel-input");
		var subInput = $('.AgreeFormList .AgreeFormLabel-input');
		
		$(label).change(function(){
			if (subInput.length > subInput.filter(":checked").length) {
				$('.LageAgreeFormLabel .LageAgreeFormLabel-input:not(:disabled)').prop("checked",false);
			} else {
				$('.LageAgreeFormLabel .LageAgreeFormLabel-input:not(:disabled)').prop("checked",true);
			}
		});
	};
	$(document).on('click', '.AgreeFormLabel', allCheckItem);
	
	// HeaderScrollEvent
	//==================================================*
	if($('.BttonFixButton.no-Scroll').length > 0){
		function BtnNoScroll() {
			if ($(window).scrollTop() > 0) {
				$('.BttonFixButton').removeClass("no-Scroll"); 
			} else { 
				$('.BttonFixButton').addClass("no-Scroll"); 
			}
		}
		
		$(window).on('scroll', BtnNoScroll);
	}
	
	// MemberFormItem
	//==================================================*
	if($('.MemberFormReg').length > 0){
		function MemberFormReg() {
			if( $(this).val() == '' ) {
				$(this).closest('.MemberFormItem').removeClass('is-Active');
			}else{
				$(this).closest('.MemberFormItem').addClass('is-Active');
			}
		};
		$(document).on('input', '.MemberFormReg-input', MemberFormReg);
	}
	
	// BirthdaySlide
	//==================================================*
	$(".BirthdaySlide .swiper-container").each(function(index, element){
		var $this = $(this);
		$this.addClass("instance-" + index);
		var BirthdaySlide = new Swiper(".instance-" + index, {
			observer: true,
			observeParents: true,
			watchOverflow: true,
			direction: "vertical",
			loop:true,
		});
	});
	
	// BirthdayPop
	//==================================================*
	function BirthdayPop() {
		$('#BirthdayPop').addClass('is-View');
		$('html').addClass('is-Hidden');
	}
	
	$(document).on('click', '.MemberFormBirthday, .ReservationBirthday', BirthdayPop);
	
	// BirthdayClosePop
	//==================================================*
	function BirthdayClosePop() {
		$('#BirthdayPop').removeClass('is-View');
		$('html').removeClass('is-Hidden');
	}
	
	$(document).on('click', '.BirthdayPopHeader-close', BirthdayClosePop);
	
	// AddressPop
	//==================================================*
	function AddressPop() {
		$('.AddressPop').addClass('is-View');
		$('html').addClass('is-Hidden');
	}
	
	$(document).on('click', '.MemberFormAddress-link', AddressPop);
	
	// AddressClosePop
	//==================================================*
	function AddressClosePop() {
		$('.AddressPop').removeClass('is-View');
		$('html').removeClass('is-Hidden');
	}
	
	$(document).on('click', '.AddressPopHeaderTitle-close', AddressClosePop);
	
	// VisibilityBtn
	//==================================================*
	function VisibilityBtn() {
		if($(this).hasClass('is-View')){
			$(this).removeClass('is-View');
			$(this).closest('.MemberFormRegSetting').find('.MemberFormReg-input').attr('type',"password");
		}else{
			$(this).addClass('is-View');
			$(this).closest('.MemberFormRegSetting').find('.MemberFormReg-input').attr('type',"text");
		}
	}
	
	$(document).on('click', '.MemberFormRegSetting-btn', VisibilityBtn);
	
	// EmailReset
	//==================================================*
	function EmailReset() {
		$(this).closest('.MemberFormItem').removeClass('is-Active').find('.MemberFormReg-input').val('');
	}
	
	$(document).on('click', '.LoginEmailBtn-btn', EmailReset);
	
})(jQuery);