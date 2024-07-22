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
