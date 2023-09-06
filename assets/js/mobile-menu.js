$(document).ready(function () {
    $(".button9").click(function () {
        $(".dropdown9 a").removeClass("clicked");
        $(".dropdown9 a").children("span").removeClass("clicked");
        $(".arrow").toggleClass("open");
        $(".dropdown9").toggleClass("open");
    });

    $(".dropdown9 a").click(function () {
        $(".dropdown9 a").removeClass("clicked");
        $(".dropdown9 a").children("span").removeClass("clicked");
        $(this).toggleClass("clicked"); $(this).children("span").toggleClass("clicked");
    });
});