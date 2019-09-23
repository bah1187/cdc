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
Adding Aria Lable to Pagination for Accessibility
========================================================================= */

$(document).ready(function(){
  $('#pagination-bottom').attr('aria-label', 'pagination navigation');
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


// Close on Click outside of nav

$(document).click(function(e) {
	var container = $(".js-subnav,.js-nav");

  if (!container.is(e.target) // if the target of the click isn't the container...
       && container.has(e.target).length === 0) // ... nor a descendant of the container
   {
       $(".js-subnav").slideUp("fast");
       $(".js-subnav-btn").removeClass("active");
   }
});


/* =========================================================================
Sliders
========================================================================== */

$('.slider-for').slick({

  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  fade: true,
  autoplay: true,
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

/* =========================================================================
Smooth Scroll
========================================================================== */

$(function() {
$('a[href*="#"]:not([href="#"])').click(function() {
  if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000);
      return false;
    }
  }
});
});


/* =========================================================================
Event Calendar
========================================================================== */


$(function () {
    if(document.body.id == "events-calendar"){
    var initRan = false;
    var eMonth, eDay, eYear;
    // Begin Setting up Calendar & Filters for Events
    // ========================================

    // Global Variables used at different points to grab TODAY's information
    var curYear = new Date().getFullYear();
    var curMonth = new Date().getMonth() + 1;
    var curDay = new Date().getDate();
	var curFullDt = new Date(curYear, curMonth - 1, curDay);
    var curFullDate = curMonth + "/" + curDay + "/" + curYear;

    // Setting up the date picker ON CLICK and MONTH CHANGE functions included here
    $("#datepicker").datepicker({
        minDate: new Date(curYear, curMonth - 1, 1), // restrict to january of current year
        maxDate: new Date(curYear + 1, 12 - 1, 31), // not allowing calendar to go further than december of current year
        inline: true, // expressing that this is the inline version (no show/hide features will apply
        hideIfNoPrevNext: true, // hiding buttons when disabled
        duration: '',
        nextText: 'Click to view next month',
        prevText: 'Click to view previous month',

        // when user clicks on a day of the calendar
        onSelect: function (dateText, inst) {
            inst.inline = false;
            var dateAsObject = $(this).datepicker('getDate'); //the getDate method
            var dateAsString = dateText; //the first parameter of this function
                if ($("table td[data-handler='selectDay'][data-full-date='" + dateAsString + "']").hasClass("disabled")) {

                } else if ($("table td[data-handler='selectDay'][data-full-date='" + dateAsString + "']:not(.has-dates)").length) {
                    console.log("option 1");
                } else if (dateAsString == "NaN/NaN/NaN") {
                    console.log("option 2 " + dateAsString);
                } else {
                    console.log("option 3 " + dateAsString);
                    getPreview(dateAsObject.getMonth() + 1, dateAsObject.getDate(), dateAsObject.getFullYear())
                }

        },

        // when user changes months
        onChangeMonthYear: function (yearText, monthText, fullDate, inst) {
            setTimeout(setupMonth, 50);
            if (!initRan) {
                setTimeout(triggerInitial, 200);
            }
        }



    });
   // initialSetup();

    // Prevent page jumping when clicking on month navigation
    $("div.ui-datepicker-header > a").click(function (e) {
        e.preventDefault();
    });

    // ========================================
    // Setup Complete
    // ========================================
/*
    function initialSetup() {
        // Finding next upcoming event
        var availEvents = false;

        $("#eventsList ul li").each(function () {
            var activeDates = $(this).data('dates').split('/');
            var index = 0;
            for (index = 0; index <= activeDates.length; index++) {
    			//need to compare these as dates and not strings.
    			if (activeDates.length ) { dbreak = activeDates[index].split("/") };
    			//var activeIndy = new Date(dbreak[2], dbreak[0]-1, dbreak[1]);
    			var activeIndy = new Date(dbreak[2], dbreak[0], dbreak[1]);

                if (activeIndy >= curFullDt) {
                    newM = activeDates[index].split("/");
                    curM = curFullDate.split("/");

                    $("#datepicker").datepicker("setDate", activeDates[index]);
                    $(this).addClass("trigger-me").attr("data-trigger", activeDates[index]);
                    availEvents = true;
                    return false;
                }
            }
        });

        if (!availEvents) {
            $("#eventsList ul li:last-of-type").each(function () {
                var activeDates = $(this).data('dates').split(',');
                for (index = 0; index < activeDates.length; index++) {
                    if (activeDates[index] >= curFullDate) {
                        $("#datepicker").datepicker("setDate", activeDates[index]);
                        $(this).addClass("trigger-me").attr("data-trigger", activeDates[index]);
                        return false;
                    }
                }
            });
        }

        if (newM[0] == curM[0]) {
            setupMonth();
            triggerInitial();
        }


        $("td.disabled").unbind("click");

    }
*/
    function setupMonth() {
        $(".ui-datepicker-next > span, .ui-datepicker-prev > span").addClass("visuallyhidden");
        $(".ui-datepicker-next, .ui-datepicker-prev").attr("href", "#");
        $("table td[data-handler='selectDay']").each(function () {
            var newD = $(this).find("a").text();
            var newM = parseInt($(this).attr("data-month")) + 1; //+1
            var newY = $(this).attr("data-year");
            var newFull = newM + "/" + newD + "/" + newY;
            var newFullMonth = "";
            if (newM == "1") {
                newFullMonth = "January"
            } else if (newM == "2") {
                newFullMonth = "February"
            } else if (newM == "3") {
                newFullMonth = "March"
            } else if (newM == "4") {
                newFullMonth = "April"
            } else if (newM == "5") {
                newFullMonth = "May"
            } else if (newM == "6") {
                newFullMonth = "June"
            } else if (newM == "7") {
                newFullMonth = "July"
            } else if (newM == "8") {
                newFullMonth = "August"
            } else if (newM == "9") {
                newFullMonth = "September"
            } else if (newM == "10") {
                newFullMonth = "October"
            } else if (newM == "11") {
                newFullMonth = "November"
            } else if (newM == "12") {
                newFullMonth = "December"
            };
            var ariaLab = newFullMonth + ", " + newD + " " + newY;

            $(this).attr({ "data-full-date": newFull, "aria-label": ariaLab, "data-day": newD });
            $("table").attr({ "data-active-month": newM, "role": "grid" });
        });

        $("#eventsList ul li").each(function () {
            var activeDates = $(this).attr('data-dates').split(',');
            for (index = 0; index < activeDates.length; index++) {
                $("table td[data-full-date='" + activeDates[index] + "']").addClass("has-dates");
            }
        })

        var dayCount = $("table td.has-dates").length;
        $("table").attr("data-day-count", dayCount)
        $("table td.has-dates").each(function (i) {
            $(this).attr("data-id", i);
        })

        $("table td[data-handler='selectDay']:not('.has-dates')").each(function () {
            var c = "<span>" + $(this).attr("data-day") + "</span>";
            $(this).addClass("disabled").append(c).find("a").remove();
        })

        if (eMonth != null) {
            getPreview(eMonth, eDay, eYear);
        }

        // Prevent page jumping when clicking on month navigation
        $("div.ui-datepicker-header > a").click(function (e) {
            e.preventDefault();
        });


    }

    function triggerInitial() {
        var clickMe = $("li.trigger-me").attr("data-trigger");
        $("li.trigger-me").removeClass("trigger-me").attr("data-trigger", "");
        $("table td[data-full-date='" + clickMe + "']").trigger("click");
        initRan = true;
    }

    // destroys the current div in the preview pane and grabs the requested preview
    function getPreview(getMonth, getDay, getYear) {
        $("#focusPreview").focus();
        $('.default-text').addClass('show');
        var newMonth = getMonth - 1;
        var newFullDate = getMonth + "/" + getDay + "/" + getYear;
        $("#eventsPreview div:not('#preview-paging')").remove();
        $("#eventsList ul li, table td").removeClass("current-preview");
        $("#eventsList ul li").each(function () {
            var activeDates = $(this).attr('data-dates').split(',');
            for (index = 0; index < activeDates.length; index++) {
                if (activeDates[index] == newFullDate) {
                    $("table td[data-handler='selectDay']").removeClass("active");
                    $(this).addClass("current-preview").addClass("trigger-me").attr("data-trigger", activeDates[index]).find("div").clone().appendTo("#eventsPreview");
                    $("table td[data-handler='selectDay'][data-full-date='" + activeDates[index] + "']").addClass("current-preview")
                    for (index = 0; index < activeDates.length; index++) {
                        $("table td[data-handler='selectDay'][data-full-date='" + activeDates[index] + "']").addClass("active");
                    }
                }
            }
        });
        pagingButtons();
    }

    // paging for preview area
    $("#preview-paging a").click(function (e) {
        var curMonth = $("table").attr("data-active-month");
        if ($(this).hasClass("prev")) {
            if ($("#eventsList ul li.current-preview").prev().length) {

                var upperVal = $("#eventsList ul li.current-preview").length - 1;
                if (upperVal > 0) {
                    var newMonth = $("#eventsList ul li.current-preview").prev().attr("data-month").split(',');
                    var newDate = $("#eventsList ul li.current-preview").prev().attr("data-dates").split(',');

                } else {
                    var newMonth = $("#eventsList ul li.current-preview").prev("li").attr("data-month").split(',');
                    var newDate = $("#eventsList ul li.current-preview").prev("li").attr("data-dates").split(',');
                }

                var explodeDate = newDate[0].split('/');
                eMonth = explodeDate[0];
                eDay = explodeDate[1];
                eYear = explodeDate[2];

                var getNewMonth = "";

                for (index = 0; index < newMonth.length; index++) {
                    if (newMonth[index] != curMonth) {
                        getNewMonth = newDate[index];
                    }
                }
                if (getNewMonth.length) {
                    $("#datepicker").datepicker("setDate", getNewMonth);
                    // setTimeout(getPreview(eMonth, eDay, eYear), 2200);
                } else {
                    getPreview(eMonth, eDay, eYear);
                }
            }
        } else {
            if ($("#eventsList ul li.current-preview").next().length) {

                var upperVal = $("#eventsList ul li.current-preview").length - 1;
                if (upperVal > 0) {
                    var newMonth = $("#eventsList ul li.current-preview").next("li").next("li").attr("data-month").split(',');
                    var newDate = $("#eventsList ul li.current-preview").next("li").next("li").attr("data-dates").split(',');

                } else {
                    var newMonth = $("#eventsList ul li.current-preview").next("li").attr("data-month").split(',');
                    var newDate = $("#eventsList ul li.current-preview").next("li").attr("data-dates").split(',');
                }

                var explodeDate = newDate[0].split('/');
                eMonth = explodeDate[0];
                eDay = explodeDate[1];
                eYear = explodeDate[2];

                var getNewMonth = "";

                for (index = 0; index < newMonth.length; index++) {
                    if (newMonth[index] != curMonth) {
                        getNewMonth = newDate[index];
                    }
                }

                if (getNewMonth.length) {
                    $("#datepicker").datepicker("setDate", getNewMonth);
                    getPreview(eMonth, eDay, eYear);
                } else {
                    getPreview(eMonth, eDay, eYear);
                }

            }
        }
        pagingButtons();
        e.preventDefault();
    });

    // show or hide paging based on available events
    function pagingButtons() {
        if ($("#eventsList ul li.current-preview").next().length) {
            $("#preview-paging a.next").removeClass("disabled");
        } else {
            $("#preview-paging a.next").addClass("disabled");
        }

        if ($("#eventsList ul li.current-preview").prev().length) {
            $("#preview-paging a.prev").removeClass("disabled");
        } else {
            $("#preview-paging a.prev").addClass("disabled");
        }
    }


    // when user clicks on VIEW ALL EVENTS
    $("a#viewAll, a#viewMonth").click(function (e) {
        viewAllMode(this);
        e.preventDefault();
    });

    // View All Events
    function viewAllMode(newThis) {
        var pMode = $(newThis).parent().attr("data-cur-active");
        var cMode = $(newThis).attr("id");

        console.log(cMode + " & " + pMode);

        if (cMode != pMode) {
            if (cMode == "viewMonth") {
                console.log("view Month");
                $("#eventsPreview").slideToggle(600, function () {
                    $("#datepicker").fadeToggle(600, function () {
                        $("#focusCalendar").focus();
                    });
                    $("#eventsList").slideToggle(600);
                });
                $("#eventsList ul li").addClass("active");
            } else {
                console.log("View List");
                $("#datepicker").fadeToggle(600, function () {
                    $("#eventsList, #eventsPreview").slideToggle(600, function () {
                        $("#focusList").focus();
                    });
                });
                $("#eventsList ul li").addClass("active");
            }
        }
        $(newThis).parent().attr("data-cur-active", cMode);
        $("html, body").animate({ 'scrollTop': $('#mixedWrapper').offset().top }, 1200);
    }

}});
