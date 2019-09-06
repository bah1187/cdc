/* =========================================================================
global variables
========================================================================== */
//watchers for major breakpoint changes - move from small screen to large screen layout/styles
//these match up to
(function () {
    var mq = {
        end: window.matchMedia("(max-width: 999px)")
    }

    //container ID/class names called by specific functions
    var selectors = {
        searchForm: '.search-form',
        advancedSearchForm: '.banner-search-form',
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


$(document).ready(function(){
  $('.js-default-search-toggle').click(function(){
  $('.default-search-fields').slideToggle("fast");
  });
});

/* =========================================================================
slideout filters for search results on small screens
========================================================================= */
if ($('#search-results').length == 1) window.APP.MODELS.FilterSlideOut.create({
    breakpoint: 800,
    animationSpeed: 200,
    pageWrapId: 'page',
    filterType: 'search',
    openToggle: 'Filters',
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
Client search toggle
========================================================================== */
$(document).ready(function(){
  $('.client-search-btn').click(function(){
  $('.client-search').slideToggle("fast");
  });
});

/* =========================================================================
Navigation
========================================================================== */
$(document).ready(function(){
  $('.js-menu').click(function(){
  $('.js-nav').slideToggle("fast");
  $('.menu-toggle').toggleClass("active");
  });

  $('.js-subnav-btn').click(function(){
  $(this).toggleClass("active");
  $(this).next('.js-subnav').slideToggle("fast");
  $(this).parent().toggleClass("active");
  });

});





$('.slider-for').slick({

  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  fade: true,
  asNavFor: '.slider-nav'
});
$('.slider-nav').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  asNavFor: '.slider-for',
  dots: true,
  arrows: false,
  focusOnSelect: true
});


$('.single-item').slick({

slide: 'li',
dots: false,
slidesToShow: 1,
slidesToScroll: 1,
adaptiveHeight: true,
autoplay: false,
autoplaySpeed: 5000,

});
