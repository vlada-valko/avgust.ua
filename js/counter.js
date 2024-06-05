
fetch("json/file.json")
    .then((response) => response.json())
    .then((data) => {
        const lengthJson = data.length;
        console.log(lengthJson);

        const empCounter = document.querySelector(".emp-counter");
        empCounter.dataset.count = lengthJson;
    })
const yearofWork = new Date().getFullYear();

const yearCounter = document.querySelector(".yearofWork");
const StartYear = 2000;
yearCounter.dataset.count = yearofWork - StartYear;

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


