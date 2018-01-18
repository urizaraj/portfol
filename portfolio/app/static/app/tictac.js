var player;
var board;
var selection = 'x';
var mode = "human";
var cell = ["#1a", "#1b", "#1c", "#2a", "#2b", "#2c", "#3a", "#3b", "#3c"];
var cells = $("#1a,#1b,#1c,#2a,#2b,#2c,#3a,#3b,#3c");
var data = $("#data");
var possible = [
    ["#1a", "#1b", "#1c"],
    ["#2a", "#2b", "#2c"],
    ["#3a", "#3b", "#3c"],
    ["#1a", "#2a", "#3a"],
    ["#1b", "#2b", "#3b"],
    ["#1c", "#2c", "#3c"],
    ["#1a", "#2b", "#3c"],
    ["#3a", "#2b", "#1c"]
];
var gameOver = false;
function human() {
    if (mode == "computer") {
        mode = "human";
        $("#computer").removeClass("active", 100);
        $("#human").addClass("active", 100);
        $("#letter").fadeOut(100);
        $("#board").fadeOut(100);
    }
}
function computer() {
    if (mode == "human") {
        mode = "computer";
        $("#letter").fadeIn(100);
        $("#human").removeClass("active", 100);
        $("#computer").addClass("active", 100);
        $("#board").fadeOut(100);
    }
}
function selectXorY(a, b, c) {
    $(a).removeClass("active", 100);
    $(b).addClass("active", 100);
    selection = c;
    $("#board").fadeOut();
}
function startGame() {
    $("#title").slideUp();
    $("#board").fadeOut(function () {
        initializeGame();
        $("#board").fadeIn();
    });
}
function initializeGame() {
    player = "x";
    gameOver = false;
    board = { "#1a": "", "#1b": "", "#1c": "", "#2a": "", "#2b": "", "#2c": "", "#3a": "", "#3b": "", "#3c": "" };
    $(".space").html("&nbsp;");
    cells.removeClass("bg-primary text-light border-primary");
    $("#victory").hide();
    if (mode == 'computer' && selection != 'x') {
        computerTurn();
    }
}
function change(id) {
    if (board[id] == "") {
        $(id)
            .find("h1")
            .text(player);
        board[id] = player;
        checkForMatch();
        player = { o: 'x', x: 'o' }[player];
        var boardFilled = Object.values(board).every(function (value) { return value != ''; });
        if (boardFilled && !gameOver) {
            $("#message").text("it's a tie!");
            $("#victory").fadeIn();
            gameOver = true;
        }
        if (mode == 'computer' && selection != player) {
            computerTurn();
        }
    }
}
function checkForMatch() {
    possible.forEach(function (entry) {
        var a = board[entry[0]];
        var b = board[entry[1]];
        var c = board[entry[2]];
        if ((a == b) && (b == c) && (a != "")) {
            $(entry.join()).addClass("bg-primary text-light border-primary", 200);
            $("#message").text(a + " wins!");
            $("#victory").fadeIn();
            gameOver = true;
        }
    });
}
function computerTurn() {
    if (!gameOver) {
        var available = [];
        for (var _i = 0, possible_1 = possible; _i < possible_1.length; _i++) {
            var entry = possible_1[_i];
            var numOpponent = 0;
            var idAvailable = void 0;
            for (var _a = 0, entry_1 = entry; _a < entry_1.length; _a++) {
                var id_1 = entry_1[_a];
                if (board[id_1] == selection)
                    numOpponent++;
                else if (board[id_1] == '')
                    idAvailable = id_1;
            }
            if (numOpponent == 2 && idAvailable) {
                available.push(idAvailable);
            }
        }
        if (available.length == 0) {
            available = cell.filter(function (value) { return (board[value] == ''); });
        }
        var id_2 = available[Math.floor(Math.random() * available.length)];
        setTimeout(function () { change(id_2); }, 500);
    }
}
$(document).ready(function () {
    $("#c").fadeIn(100);
    $("#human").on("click", human);
    $("#computer").on("click", computer);
    $("#selectX").on("click", function () { selectXorY("#selectO", "#selectX", 'x'); });
    $("#selectO").on("click", function () { selectXorY("#selectX", "#selectO", 'o'); });
    $("#refresh,#victory").on("click", startGame);
    cells.on("click", function (event) {
        if ((mode != 'computer' || player == selection) && !gameOver) {
            change("#" + event.currentTarget.id);
        }
    });
});
