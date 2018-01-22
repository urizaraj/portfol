$(document).ready(function () {
    $(".container").slideDown(200)

    $("#linkedin,#github,#email").on("mouseenter mouseleave", function () {
        $(this).clearQueue().toggleClass("blue-background", {
            duration: 100,
            children: true
        })
    })

    $("#pheader").on("click", function () {
        $("#projects").slideToggle(200)
        $("#arrow").toggleClass("fa-angle-down fa-angle-up")
    })

    $(".right-border").on("mouseenter mouseleave", function () {
        $(this).clearQueue().toggleClass("right-border-thick", 100)
    })
});