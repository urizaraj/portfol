let player;
let board;
let selection = 'x';
let mode = "human";
let cell = ["#1a", "#1b", "#1c", "#2a", "#2b", "#2c", "#3a", "#3b", "#3c"];
let cells = $("#1a,#1b,#1c,#2a,#2b,#2c,#3a,#3b,#3c");
let data = $("#data");
let possible = [
    ["#1a", "#1b", "#1c"],
    ["#2a", "#2b", "#2c"],
    ["#3a", "#3b", "#3c"],
    ["#1a", "#2a", "#3a"],
    ["#1b", "#2b", "#3b"],
    ["#1c", "#2c", "#3c"],
    ["#1a", "#2b", "#3c"],
    ["#3a", "#2b", "#1c"]
];
let gameOver = false;
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
        let boardFilled = Object.values(board).every(function (value) { return value != ''; });
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
        let a = board[entry[0]];
        let b = board[entry[1]];
        let c = board[entry[2]];
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
        let available = [];
        for (let entry of possible) {
            let numOpponent = 0;
            let idAvailable;
            for (let id of entry) {
                if (board[id] == selection)
                    numOpponent++;
                else if (board[id] == '')
                    idAvailable = id;
            }
            if (numOpponent == 2 && idAvailable) {
                available.push(idAvailable);
            }
        }
        if (available.length == 0) {
            available = cell.filter(function (value) { return (board[value] == ''); });
        }
        let id = available[Math.floor(Math.random() * available.length)];
        setTimeout(function () { change(id); }, 500);
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
