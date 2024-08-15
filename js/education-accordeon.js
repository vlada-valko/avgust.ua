$(document).ready(function() {
    $(".set > a").on("click", function() {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(this)
                .siblings(".content")
                .slideUp(200);
            $(this).find("i")
                .removeClass("fa-minus")
                .addClass("fa-plus");
        } else {
            $(this).find("i")
                .removeClass("fa-plus")
                .addClass("fa-minus");
            $(this).addClass("active");
            $(this)
                .siblings(".content")
                .slideDown(200);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.education__buttons');

    if (buttons.length === 0) {
        console.error('Не знайдено жодної кнопки з класом .education__buttons');
        return;
    }

    buttons.forEach(button => {
        const fileUrl = button.href;
        const fileExtension = fileUrl.split('.').pop().toLowerCase();
        const imgElement = button.closest('.content-wrapper')?.querySelector('img');

        if (!imgElement) {
            console.error('Не знайдено елемент img у найближчому батьківському елементі .content-wrapper');
            return;
        }

        let imgSrc = '';

        switch (fileExtension) {
            case 'pdf':
                imgSrc = '../img/education/pdf.png'; // Переконайтеся, що шлях правильний
                break;
            case 'mp4':
                imgSrc = '../img/education/video.png'; // Переконайтеся, що шлях правильний
                break;
            case "html":
                imgSrc = '../img/education/link.png'; // Переконайтеся, що шлях правильний
                break;
            default:
                imgSrc = '../img/education/default.png'; // Переконайтеся, що шлях правильний
                break;
        }

        console.log(`Змінюємо src для файлу з розширенням ${fileExtension} на ${imgSrc}`);
        imgElement.src = imgSrc;
    });
});




