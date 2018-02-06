let projects = $("#projects")
let about = $("#about")
let header = $("#aboutheader,#pheader")
let arrow = $("#arrow,#arrow-2")

$(document).ready(function () {
    $(".container").slideDown(200)

    header.on("click", function () {
        projects.slideToggle(200)
        about.slideToggle(200)
        arrow.toggleClass("fa-angle-down fa-angle-up")
    })
});