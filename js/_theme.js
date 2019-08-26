/* =========================================================================
global variables
========================================================================== */
//watchers for major breakpoint changes - move from small screen to large screen layout/styles
//these match up to
(function () {
    var mq = {
        end: window.matchMedia("(max-width: 799px)")
    }

    //container ID/class names called by specific functions
    var selectors = {
        searchForm: '.search-form',
        advancedSearchForm: '.advanced-search-form',
        pageWrap: '#page',
        socialShare: '.social-share',
        socialShareMore: '.share-more'
    }

    /* =========================================================================
    search form panel
    ========================================================================== */
    //make search form expandable only on small screens
    function searchFormExpandable() {
        if (mq.end.matches) {
            $(selectors.searchForm).expandable('revive');
            $(selectors.advancedSearchForm).expandable('revive');
        }
        else {
            $(selectors.searchForm).expandable('kill');
            $(selectors.searchForm).children('div').removeAttr('style');
            $(selectors.advancedSearchForm).expandable('kill');
            $(selectors.advancedSearchForm).children('div').removeAttr('style');
        }
        return;
    }
    searchFormExpandable();
    mq.end.addListener(searchFormExpandable);

    /* =========================================================================
    slideout filters for search results on small screens
    ========================================================================= */
    if ($('#search-results').length == 1) window.APP.MODELS.FilterSlideOut.create({
        breakpoint: 800,
        animationSpeed: 200,
        pageWrapId: 'page',
        filterType: 'search',
        openToggle: 'Search Filter',
        closeToggle: 'Close'
    });

    /* =========================================================================
    social share open/close toggle
    ========================================================================== */
    $(selectors.socialShare)
        .on('click', selectors.socialShareMore, function () {
            var parent = $(this).parents(selectors.socialShare);
            parent.toggleClass('share-open');
            var moreText = $(this).attr('data-more-text');
            var lessText = $(this).attr('data-less-text');
            //on large screens, move the second list items into the first list, instead of sliding the list down
            if (parent.hasClass('share-open')) {
                $(this).text(lessText);
            }
            else {
                $(this).text(moreText);
            }
            return;
        });
})();

/* =========================================================================
Toggles
========================================================================== */
$(document).ready(function(){
  $('.toggle-button').click(function(){
  $(this).next('.toggle').slideToggle("fast");
  $(this).toggleClass('open');
  });
});

$(document).ready(function(){
  $('.up-toggler .toggle-button').click(function(){
  $(this).prev().slideToggle("fast");
  });
});

$(document).ready(function(){
  $('.ajd-nav-button').click(function(){
  $('.ajd_navigation').slideToggle("fast");
  $(this).toggleClass('x')
  });
});

/* =========================================================================
Footer links toggle
========================================================================== */

$('.footer-toggle').click(function(){
  if ( $(window).width() < 800) {
    $(this).next('.toggle-sm').slideToggle("fast");
    $(this).toggleClass('open');
    }
 });

/* =========================================================================
 Filter toggle - SR page
========================================================================== */
     $(document).ready(function(){
         $('.filter-btn').click(function(){
             $('.filter-toggle').slideToggle();
             $(this).toggleClass('open');
         });
     });

/* =========================================================================
AJD Benefits Tabs
========================================================================== */
$(document).ready(function(){

  $('.benefits-icon').hover(function(){
   var tab_id = $(this).attr('data-tab');

   $('.benefits-icon').removeClass('current');
   $('.tab-content').removeClass('current');

   $(this).addClass('current');
   $("#"+tab_id).addClass('current');
  })

})

/* =========================================================================
Location Tabs
========================================================================== */
$(document).ready(function(){

  $('.location-tabs .tab-link').click(function(){
   var tab_id = $(this).attr('data-tab');

   $('.location-tabs .tab-link').removeClass('current');
   $('.location-tabs .tab-content').removeClass('current');

   $(this).addClass('current');
   $("#"+tab_id).addClass('current');
  })

})

/* =========================================================================
Featured jobs animations
========================================================================== */
$(document).ready(function(){
      $('.featured-jobs ul').addClass('animateOnce');
     $('.featured-jobs ul').addClass('animatedParent');
     $('.featured-jobs ul').attr('data-sequence', '500');
     $('.featured-jobs li').addClass('animated');
     $('.featured-jobs li').addClass('fadeInDownShort');
     $('.featured-jobs li:first-child').attr('data-id', '1');
     $('.featured-jobs li:nth-child(2)').attr('data-id', '2');
     $('.featured-jobs li:last-child').attr('data-id', '3');

});


 /* =========================================================================
 Fancybox
 ========================================================================== */

 $(document).ready(function() {
         $('.vidpop').click(function(e){
             e.preventDefault();
         });
         $('.vidpop').fancybox({
             // maxWidth: 950,
             // autoSize : true,
             // autoWidth: true,
             // autoHeight: true,
             // fitToView: true,
             // type: 'iframe',
             // closeBtn: true,

             'width':851,
             'height':533,
             'autoScale':true,
             'transitionIn':'none',
             'transitionOut':'none',
             'type': 'iframe',
             'cyclic': true

         });
     });


 /* =========================================================================
 Related Content
 ========================================================================== */

 var relatedContentItems = $('.related-content a');
 relatedContentItems.each(function(){
 var linkUrl = $(this).attr('href');
 if(linkUrl.indexOf('youtube.com') > -1){

   $(this).parent().next().remove()
   $(this).parent().addClass('video-wrapper')
   $(this).append('<div class="playbutton-container"><span class="playbutton"></span><h4 class="click-to-play">Click to Play</h4></div>')
   // $(this).children().css('border-radius', '10px')


 	$(this).click(function(){
 		// $.fancybox.open('<iframe src="' + linkUrl + '" width="640" height="360"></iframe>');
 		// return false;
    $(this).addClass('vidpop');

 	});
 }
 });


 $(document).ready(function(){
      $('.related-content li').addClass('animated');
      $('.related-content li:first-child').addClass('fadeInLeftShort');
      $('.related-content li:last-child').addClass('fadeInRightShort');

 });


 /* =========================================================================
 sliders
 ========================================================================== */
 $('.content-img-slider').slick({
  dots: false,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: true,
autoplay: true,
arrows: true,

});

$('.content-text-slider').slick({
 dots: false,
 infinite: true,
 speed: 300,
 slidesToShow: 1,
 slidesToScroll: 1,
 infinite: true,
autoplay: true,
arrows: true,

});
