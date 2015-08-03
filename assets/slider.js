var slider = new function(containerSelector, scaleClass, initialSlidePageNo) {
    var slideSpeed = 700,
        scaleSpeed = 300,
        timeGap    = 130,
        transAdded = false,
        count      = initialSlidePageNo,
        container  = $(containerSelector),
        slidePages = $(container).children();

    (function constructor() {
        setInitialSlidePage(initialSlidePageNo);
        setInterval(function() {
            $(window).on("resize", function() { resetSlides(); });
        }, 300);
    })();

    function init(_slideSpeed, _scaleSpeed, _timeGap) {
        slideSpeed = _slideSpeed || slideSpeed;
        scaleSpeed = _scaleSpeed || scaleSpeed;
        timeGap    = _timeGap    || timeGap;
    }

    function resetSlides() {
        var newMarginLeft = - $(window).width() * count;
        container.css('margin-left', newMarginLeft);
    }

    function setInitialSlidePage(number) {
        resetSlides();
    }

    function getCurrentMarginLeft() {
        var currentMarginLeft = container.css("margin-left");

        if (currentMarginLeft === "auto")
            currentMarginLeft = 0;

        return parseInt(currentMarginLeft);
    }

    function getNewMarginLeft(dir) {
        var toMove = $(window).width() * dir,
            currentMarginLeft = getCurrentMarginLeft();
        return currentMarginLeft - toMove;
    }

    function addTransition() {
        if (transAdded) return;
        transAdded = true;

        slidePages.css(
            "transition",
            "all " + (scaleSpeed / 1000).toFixed(2) + "s ease-in-out"
        );
    }

    // dir: direction for sliding,
    //      +1 for forward (default),
    //      -1 for backward
    function slide(dir) {
        if (!dir) dir = 1;
        count += dir;

        var newMarginLeft = getNewMarginLeft(dir);

        addTransition();
        slidePages.addClass(scaleClass);

        container.delay(scaleSpeed + timeGap).animate({
            marginLeft: newMarginLeft
        }, slideSpeed);

        setTimeout(function() {
            slidePages.removeClass(scaleClass);
        }, scaleSpeed + slideSpeed + 2 * timeGap);
    }

    function nextSlide() { slide(); }
    function prevSlide() { slide(-1); }


    // public members
    return {
        init: init,
        nextSlide: nextSlide,
        prevSlide: prevSlide
    };
}(".wrapper", "zoom-out", 0);