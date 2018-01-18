function get_random() {
    var result = Math.floor(Math.random() * 10);
    if (result != pre) {
        pre = result;
        return result;
    } else {
        return get_random();
    }
}

function openURL(url) {
    window.open(url);
}

function getQuote() {
    var num = get_random();
    quote = quotes[num].q;
    author = quotes[num].a;

    $("#quotecard").animate(
        {
            opacity: 0
        },
        300,
        function () {
            $("#quote").html(quote);
            $("#author").html(author);

            $(this).animate(
                {
                    opacity: 1
                },
                300
            );
        }
    );
}

function getFirstQuote() {
    var num = get_random();
    quote = quotes[num].q;
    author = quotes[num].a;
    $("#quote").html(quote);
    $("#author").html(author);
}

var quote = "";
var author = "";
var pre = -1;

var quotes = {
    0: {
        q:
            "A little anger is a good thing if it isn't on your own behalf, if it's for others deserving of your anger, your empathy.",
        a: "David Simon"
    },
    1: {
        q:
            "Don't walk behind me; I may not lead. Don't walk in front of me; I may not follow. Just walk beside me and be my friend.",
        a: "Albert Camus"
    },
    2: {
        q: "People sometimes get in the habit of being loyal to a mistake.",
        a: "Richard Russo"
    },
    3: {
        q:
            "Thunder is good, thunder is impressive; but it is lightning that does the work.",
        a: "Mark Twain"
    },
    4: {
        q:
            "Failure is simply the opportunity to begin again, this time more intelligently.",
        a: "Henry Ford"
    },
    5: {
        q:
            "Our ambition should be to rule ourselves, the true kingdom for each one of us; and true progress is to know more, and be more, and to do more.",
        a: "Oscar Wilde"
    },
    6: {
        q: "It always seems impossible until it's done.",
        a: "Nelson Mandela"
    },
    7: {
        q: "Not until we are lost do we begin to fully understand ourselves.",
        a: "Henry David Thoreau"
    },
    8: {
        q: "What you do speaks so loudly that I cannot hear what you say.",
        a: "Ralph Waldo Emerson"
    },
    9: {
        q: "I discover myself on the verge of a usual mistake.",
        a: "Walt Whitman"
    }
};

$(document).ready(function () {
    getFirstQuote();

    $("#c").fadeIn(100)

    $("#newQuote").on("click", getQuote);

    $("#tweet").on("click", function () {
        openURL(
            "https://twitter.com/intent/tweet?text=" +
            encodeURIComponent('"' + quote + '" -' + author)
        );
    });
});