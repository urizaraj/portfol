// let audioCtx = new (window.AudioContext || window.webkitAudioContext)()
let audioCtx = new AudioContext();
const a = '../static/app/notes/c.wav';
const b = '../static/app/notes/e.wav';
const c = '../static/app/notes/g.wav';
const d = '../static/app/notes/bflat.wav';
const color_url = [["#yellow", a], ["#red", b], ["#green", c], ["#blue", d]];
const colors = ["#yellow", "#red", "#green", "#blue"];
let loaded = 0;
let currentColors = [];
let currentLength = 1;
let pressed = [];
let keepTrack = false;
let strictMode = false;
let currentIndex = 0;
let invl;
let soundSource = {};
for (let [color, url] of color_url) {
    let ajaxRequest = new XMLHttpRequest();
    ajaxRequest.open("GET", url, true);
    ajaxRequest.responseType = "arraybuffer";
    ajaxRequest.onload = function () {
        let audioData = ajaxRequest.response;
        audioCtx.decodeAudioData(audioData, function (buffer) {
            soundSource[color] = buffer;
        }, function (e) {
            console.log("Error with decoding audio data" + e);
        });
        $(color).show();
        loaded++;
        if (loaded == 4) {
            $("#start").show();
        }
    };
    ajaxRequest.send();
}
function activateColor(color) {
    let sound = audioCtx.createBufferSource();
    sound.buffer = soundSource[color];
    sound.connect(audioCtx.destination);
    sound.start();
    $(color).switchClass("btn-lg", "btn-sm", 100).switchClass("btn-sm", "btn-lg", 200);
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
function startSimon() {
    $("#start").hide();
    $("#strict").hide();
    $("#1").slideUp();
    $("#2").slideDown();
    for (let n = 0; n < currentLength; n++) {
        let i = Math.floor(Math.random() * 4);
        currentColors.push(colors[i]);
    }
    invl = setInterval(playCurrentColors, 600);
    keepTrack = true;
}
function continueGame() {
    $("#success").slideUp();
    $("#tryagain").slideUp();
    $("#length").text(currentLength);
    if (currentColors.length < currentLength) {
        let i = Math.floor(Math.random() * 4);
        currentColors.push(colors[i]);
    }
    invl = setInterval(playCurrentColors, 600);
    keepTrack = true;
}
function playCurrentColors() {
    if (currentIndex < currentColors.length) {
        let color = currentColors[currentIndex];
        activateColor(color);
        currentIndex++;
    }
    else {
        clearInterval(invl);
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
    for (let color of colors) {
        $(color).on("click", function () { colorClick(color); });
    }
    $("#start").on("click", startSimon);
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
