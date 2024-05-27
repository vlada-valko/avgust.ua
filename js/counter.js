$(document).ready(function() {
    function isScrolledIntoView(elem) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();
        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();

        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }

    $(window).on('scroll', function() {
        $('.counter').each(function() {
            var $this = $(this);
            if (isScrolledIntoView($this) && !$this.hasClass('counted')) {
                $this.addClass('counted');
                var countTo = $this.attr('data-count');
                $({ countNum: $this.text() }).animate({
                    countNum: countTo
                }, {
                    duration: 4000,
                    easing: 'linear',
                    step: function() {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $this.text(this.countNum);
                    }
                });
            }
        });
    });
});