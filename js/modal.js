$(document).ready(function() {

    // Функція для показу контенту у повноекранному режимі (зображення або відео)
    function showFullscreenContent(src, isVideo) {
        if (isVideo) {
            var $video = $('#modal-video');
            $video.attr('src', src);
            $video.css('display', 'block');
        } else {
            var $img = $('#modal-img');
            $img.attr('src', src);
            $img.css('display', 'block');
        }
        $('#myModal').css('display', 'block'); // Показуємо модальне вікно
        $('body').css('overflow', 'hidden'); // Забороняємо прокрутку тіла
    }

    // Обробник кліку на зображення або відео для показу у повноекранному режимі
    $('.slider__item').click(function() {
        var $element = $(this).find('.slider__image, .slider__video');
        var src = $element.attr('src');
        var isVideo = $element.is('video');
        showFullscreenContent(src, isVideo);
    });

    // Закриваємо модальне вікно при кліку на "close"
    $('.close').click(function() {
        $('#myModal').css('display', 'none');
        $('body').css('overflow', 'auto'); // Дозволяємо прокрутку тіла
        $('#modal-img').css('display', 'none'); // Ховаємо велике зображення
        $('#modal-video').css('display', 'none'); // Ховаємо відео
        $('#modal-video').attr('src', ''); // Скидаємо src відео, щоб зупинити відтворення
    });

    // Закриваємо модальне вікно при кліці за межі вікна зображення
    $('#myModal').click(function(event) {
        if (event.target.id === 'myModal') {
            $('#myModal').css('display', 'none');
            $('body').css('overflow', 'auto'); // Дозволяємо прокрутку тіла
            $('#modal-img').css('display', 'none'); // Ховаємо велике зображення
            $('#modal-video').css('display', 'none'); // Ховаємо відео
            $('#modal-video').attr('src', ''); // Скидаємо src відео, щоб зупинити відтворення
        }
    });

    // Закриваємо модальне вікно при натисканні клавіші Escape
    $(document).keydown(function(event) {
        if (event.key === "Escape") {
            $('#myModal').css('display', 'none');
            $('body').css('overflow', 'auto'); // Дозволяємо прокрутку тіла
            $('#modal-img').css('display', 'none'); // Ховаємо велике зображення
            $('#modal-video').css('display', 'none'); // Ховаємо відео
            $('#modal-video').attr('src', ''); // Скидаємо src відео, щоб зупинити відтворення
        }
    });

});
