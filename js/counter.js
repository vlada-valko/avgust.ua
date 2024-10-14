fetch("https://docs.google.com/spreadsheets/d/1q4l60xlMyc-1n8BP9DKrlC-YCAawaOy-JI3i8di-7NQ/export?format=csv")
    .then((response) => response.text())
    .then((data) => {
        // Розбиваємо CSV на рядки
        const rows = data.trim().split("\n");

        // Визначаємо останній рядок, щоб отримати останній порядковий номер (першу колонку)
        const lastRow = rows[rows.length - 1].split(",");
        
        // Перевіряємо, чи є перша колонка числом (порядковий номер)
        const lastNumber = !isNaN(lastRow[0]) ? parseInt(lastRow[0]) : 0;

        // Встановлюємо кількість працівників у .emp-counter
        const empCounter = document.querySelector(".emp-counter");

        // Перевірка, щоб не було NaN і завжди було число
        const countValue = lastNumber > 0 ? lastNumber : 0;
        empCounter.dataset.count = countValue;

        // Оновлюємо видиме значення з анімацією
        animateCounter(empCounter, countValue);

        console.log(countValue); // Виводимо кількість працівників
    })
    .catch((error) => {
        console.error("Error fetching the CSV file:", error);
    });

const yearofWork = new Date().getFullYear();
const yearCounter = document.querySelector(".yearofWork");
const StartYear = 1991;
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

                // Перевірка, щоб countTo було числом
                countTo = isNaN(parseInt(countTo)) ? 0 : parseInt(countTo);

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

function animateCounter(element, countValue) {
    $({ countNum: 0 }).animate({
        countNum: countValue
    }, {
        duration: 4000,
        easing: 'linear',
        step: function() {
            element.textContent = Math.floor(this.countNum);
        },
        complete: function() {
            element.textContent = this.countNum;
        }
    });
}
