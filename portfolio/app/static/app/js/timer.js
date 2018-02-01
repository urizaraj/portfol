let sessionLength = 25;
let breakLength = 5;
let timeLeft = 0;
let totalTime;
let phase = "";
let interval;
function displayTime() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    // seconds = seconds.toString().padStart(2,'0')
    let secstring = seconds.toString();
    if (secstring.length == 1) {
        secstring = '0' + secstring;
    }
    $("#time").text(minutes + ":" + secstring);
}
function updateTimer() {
    if (timeLeft > 1) {
        timeLeft -= 1;
        let p = Math.round((timeLeft / totalTime) * 100);
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
    invl = setInterval(updateTimer, 1000);
}
function stopTimer() {
    clearInterval(invl);
    phase = '';
    $("#disp").slideUp();
    $("#settings").slideDown();
}
$(document).ready(function () {
    $("#c").fadeIn(100);
    $("#start").on("click", start);
    $("#stop").on("click", stopTimer);
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
