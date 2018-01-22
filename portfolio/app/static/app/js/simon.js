var data = $("#data");
var a = new Audio('https://dl.dropboxusercontent.com/s/941sdrvc1peurt3/c.wav?dl=0');
var b = new Audio('https://dl.dropboxusercontent.com/s/r0uowyioitid3um/e.wav?dl=0');
var c = new Audio('https://dl.dropboxusercontent.com/s/68qewxq4ou3q30h/g.wav?dl=0');
var d = new Audio('https://dl.dropboxusercontent.com/s/9b7uiy2g5uvw2wy/b%20flat.wav?dl=0');
a.load();
b.load();
c.load();
d.load();
var buttons = { "#yellow": a, "#red": b, "#green": c, "#blue": d };
var colors = ["#yellow", "#red", "#green", "#blue"];
var boot = { "#yellow": "warning", "#red": "danger", "#green": "success", "#blue": "primary" };
var currentColors = [];
var currentLength = 1;
var pressed = [];
var keepTrack = false;
var strictMode = false;
var currentIndex = 0;
var interval;
function activateColor(color) {
    buttons[color].currentTime = 0;
    buttons[color].play();
    $(color).switchClass("btn-lg", "btn-sm", 200).switchClass("btn-sm", "btn-lg", 200);
}
function resetGame() {
    $(".container").slideUp(function () {
        currentColors = [];
        currentLength = 1;
        pressed = [];
        $("#length").text(1);
        $("#start").show();
        $("#strict").show();
        $("#1").show();
        $("#2").hide();
        $("#success").hide();
        $("#tryagain").hide();
        $("#victory").hide();
        keepTrack = false;
        $(".container").slideDown();
    });
}
function startGame() {
    $("#start").hide();
    $("#strict").hide();
    $("#1").slideUp();
    $("#2").slideDown();
    for (var n = 0; n < currentLength; n++) {
        var i = Math.floor(Math.random() * 4);
        currentColors.push(colors[i]);
    }
    interval = setInterval(playCurrentColors, 600);
    keepTrack = true;
}
function continueGame() {
    $("#success").slideUp();
    $("#tryagain").slideUp();
    $("#length").fadeOut(200, function () {
        $("#length").text(currentLength);
        $("#length").fadeIn(200);
    });
    if (currentColors.length < currentLength) {
        var i = Math.floor(Math.random() * 4);
        currentColors.push(colors[i]);
    }
    interval = setInterval(playCurrentColors, 600);
    keepTrack = true;
}
function playCurrentColors() {
    if (currentIndex < currentColors.length) {
        var color = currentColors[currentIndex];
        activateColor(color);
        currentIndex++;
    }
    else {
        clearInterval(interval);
        currentIndex = 0;
    }
}
function colorClick(color) {
    activateColor(color);
    if (keepTrack) {
        pressed.push(color);
        if (currentColors[pressed.length - 1] == color) {
            if (pressed.length == currentColors.length) {
                if (currentColors.length == 20) {
                    $("#victory").slideDown();
                }
                else {
                    $("#success").slideDown();
                    pressed = [];
                    currentLength++;
                    keepTrack = false;
                }
            }
        }
        else {
            $("#tryagain").slideDown();
            pressed = [];
        }
    }
}
function wrongChoice() {
    if (strictMode) {
        resetGame();
    }
    else {
        continueGame();
    }
}
$(document).ready(function () {
    $("#c").fadeIn(100);
    var _loop_1 = function (color) {
        $(color).on("click", function () { colorClick(color); });
    };
    for (var _i = 0, colors_1 = colors; _i < colors_1.length; _i++) {
        var color = colors_1[_i];
        _loop_1(color);
    }
    $("#start").on("click", startGame);
    $("#reset").on("click", resetGame);
    $("#victory").on("click", resetGame);
    $("#success").on("click", continueGame);
    $("#tryagain").on("click", wrongChoice);
    $("#strict").on("click", function () {
        $("#check").fadeOut(200, function () {
            $("#check").toggleClass("fa-square-o fa-check-square-o").fadeIn(200);
            strictMode = !strictMode;
        });
    });
});
