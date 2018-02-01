let random = Math.random;
let floor = Math.floor;
let card1;
let card2;
let step = 1;
let matched_cards = 0;
let n = 16;
let turn = 0;
// {card (starting at 1): pair (starting at 0)
let value;
let jturn = $("#turn");
let reset = $("#reset");
let resetm = $("#resetm");
let sm = $("#sm");
let dropdownitem = $(".dropdown-item");
let group = $("#group");
let comp = $("#comp").children().first();
let brk = $("#brk").children().first();
let container = $(".container");
var Icon;
(function (Icon) {
    Icon[Icon["fa-flask"] = 0] = "fa-flask";
    Icon[Icon["fa-globe"] = 1] = "fa-globe";
    Icon[Icon["fa-eye"] = 2] = "fa-eye";
    Icon[Icon["fa-bolt"] = 3] = "fa-bolt";
    Icon[Icon["fa-paper-plane"] = 4] = "fa-paper-plane";
    Icon[Icon["fa-leaf"] = 5] = "fa-leaf";
    Icon[Icon["fa-pencil"] = 6] = "fa-pencil";
    Icon[Icon["fa-gamepad"] = 7] = "fa-gamepad";
    Icon[Icon["fa-lock"] = 8] = "fa-lock";
    Icon[Icon["fa-magnet"] = 9] = "fa-magnet";
    Icon[Icon["fa-anchor"] = 10] = "fa-anchor";
    Icon[Icon["fa-book"] = 11] = "fa-book";
})(Icon || (Icon = {}));
function assign_pairs(n) {
    function shuffle(ar) {
        for (let i = ar.length - 1; i > 0; i--) {
            let j = floor(random() * (i + 1));
            [ar[i], ar[j]] = [ar[j], ar[i]];
        }
    }
    let ar = [];
    for (let i = 0; i < n; i++) {
        ar.push(i + 1);
    }
    shuffle(ar);
    let result = {};
    for (let i = 0; i < ar.length; i++) {
        let num = ar[i];
        result[num] = floor(i / 2);
    }
    return result;
}
function step1(card) {
    if (turn > 0) {
        for (let element of [card1, card2]) {
            $(element)
                .filter('.wrong')
                .removeClass("wrong")
                .find('i')
                .hide()
                .switchClass(Icon[value[element.id]], 'fa-diamond')
                .show();
        }
    }
    else {
        reset.removeClass('disabled');
    }
    $(card)
        .addClass('selected')
        .find("i")
        .hide()
        .switchClass('fa-diamond', Icon[value[card.id]])
        .show();
    card1 = card;
    step = 2;
}
function step2(card) {
    card2 = card;
    $(card)
        .find("i")
        .hide()
        .switchClass('fa-diamond', Icon[value[card.id]])
        .show();
    if (value[card1.id] == value[card2.id] && card1 != card2) {
        $(card1).switchClass('selected', 'matched');
        $(card2).addClass('matched');
        matched_cards += 2;
        if (matched_cards == n) {
            jturn.text('Score: ' + turn.toString() + ' turns');
            sm.modal();
        }
    }
    else {
        $(card1).switchClass('selected', 'wrong');
        $(card2).addClass('wrong');
    }
    step = 1;
    turn++;
}
function generate_cards() {
    let j = 4;
    group.empty();
    for (let i = 0; i < n; i++) {
        comp
            .clone()
            .appendTo('#group')
            .find('.card')
            .attr('id', (i + 1).toString());
        if ((i + 1) % j == 0) {
            brk.clone().appendTo('#group');
        }
    }
}
function resetMemory() {
    group.fadeOut(200, function () {
        matched_cards = 0;
        step = 1;
        turn = 0;
        value = assign_pairs(n);
        generate_cards();
        reset.addClass('disabled');
        group.fadeIn(200);
    });
}
$(document).ready(function () {
    group.on('click', '.game-card', function () {
        if (!$(this).hasClass('matched')) {
            if (step == 1) {
                step1(this);
            }
            else if (this != card1) {
                step2(this);
            }
        }
    });
    reset.on('click', function () {
        if (!reset.hasClass('disabled')) {
            resetMemory();
        }
    });
    dropdownitem.on('click', function () {
        let btn = $(this);
        n = parseInt(btn.text());
        dropdownitem.removeClass('active');
        btn.addClass('active');
        resetMemory();
        $("#button-label").text(n.toString() + ' cards');
    });
    resetm.on('click', function () {
        resetMemory();
        sm.modal('hide');
    });
    value = assign_pairs(n);
    generate_cards();
    container.fadeIn(200);
});
