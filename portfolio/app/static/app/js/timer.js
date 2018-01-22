var sessionLength = 25;
var breakLength = 5;
var timeLeft = 0;
var totalTime;
var phase = "";
var interval;
function displayTime() {
    var minutes = Math.floor(timeLeft / 60);
    var seconds = timeLeft % 60;
    seconds = seconds.toString().padStart(2, '0');
    $("#time").text(minutes + ":" + seconds);
}
function updateTimer() {
    if (timeLeft > 1) {
        timeLeft -= 1;
        var p = Math.round((timeLeft / totalTime) * 100);
        $("#bar").css("width", p + "%");
        displayTime();
    }
    else {
        changePhase();
    }
}
function changePhase() {
    if (phase == "break" || phase == '') {
        phase = "work";
        timeLeft = totalTime = sessionLength * 60;
        $("#phase").text("Work");
    }
    else if (phase == "work") {
        phase = "break";
        timeLeft = totalTime = breakLength * 60;
        $("#phase").text("Break");
    }
    displayTime();
    $("#bar").css("width", "100%");
}
function start() {
    changePhase();
    $("#disp").slideDown();
    $("#settings").slideUp();
    interval = setInterval(updateTimer, 1000);
}
function stop() {
    clearInterval(interval);
    phase = '';
    $("#disp").slideUp();
    $("#settings").slideDown();
}
$("#disp").hide();
$(document).ready(function () {
    $("#c").fadeIn(100);
    $("#start").on("click", start);
    $("#stop").on("click", stop);
    $("#bp").on("click", function () {
        breakLength += 1;
        $("#b").text(breakLength);
    });
    $("#bm").on("click", function () {
        breakLength -= 1;
        breakLength = Math.max(1, breakLength);
        $("#b").text(breakLength);
    });
    $("#sp").on("click", function () {
        sessionLength += 5;
        $("#s").text(sessionLength);
    });
    $("#sm").on("click", function () {
        sessionLength -= 5;
        sessionLength = Math.max(5, sessionLength);
        $("#s").text(sessionLength);
    });
});
