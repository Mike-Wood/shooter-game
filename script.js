$(document).ready(function () {
    var player2 = document.getElementById("player2");
    var player1 = document.getElementById("player1");
    player2.style.left = "1800px";
    player1.style.left = "0px";
    document.getElementById("trophyP1").style.visibility = "hidden";
    document.getElementById("trophyP2").style.visibility = "hidden";
    if (!(localStorage.getItem("p1color"))) {
        localStorage.setItem("p1color", "red");
    } else if (!(localStorage.getItem("p2color"))) {
        localStorage.setItem("p2color", "blue");
    }
    document.getElementById("colorButtonP1").style.color = localStorage.getItem("p1color");
    document.getElementById("colorButtonP2").style.color = localStorage.getItem("p2color");
    document.getElementById("p1score").style.color = localStorage.getItem("p1color");
    document.getElementById("p2score").style.color = localStorage.getItem("p2color");
    document.getElementById("player1").style.background = localStorage.getItem("p1color");
    document.getElementById("player2").style.background = localStorage.getItem("p2color");
    document.getElementById("game_area").style.height = screen.height - 200 + "px";
    if (!(localStorage.getItem("numhit"))) {
        $("#NumHits").val(10);
        localStorage.setItem("numhit", $("#NumHits").val());
    } else {
        if (typeof parseInt(localStorage.getItem("numhit")) != "number") {
            $("#NumHits").val(10);
            localStorage.setItem("numhit", $("#NumHits").val());
        } else {
            $("#NumHits").val(localStorage.getItem("numhit"));
        }
    }
});
var colors = [
    "navy",
    "darkblue",
    "mediumblue",
    "blue",
    "darkgreen",
    "green",
    "teal",
    "darkcyan",
    "deepskyblue",
    "darkturquoise",
    "mediumspringgreen",
    "lime",
    "springgreen",
    "aqua",
    "cyan",
    "midnightblue",
    "dodgerblue",
    "lightseagreen",
    "forestgreen",
    "seagreen",
    "darkslategray",
    "limegreen",
    "mediumseagreen",
    "turquoise",
    "royalblue",
    "steelblue",
    "darkslateblue",
    "mediumturquoise",
    "indigo",
    "darkolivegreen",
    "cadetblue",
    "cornflowerblue",
    "rebeccapurple",
    "mediumaquamarine",
    "dimgray",
    "slateblue",
    "olivedrab",
    "slategray",
    "lightslategray",
    "mediumslateblue",
    "lawngreen",
    "chartreuse",
    "aquamarine",
    "maroon",
    "purple",
    "olive",
    "gray",
    "skyblue",
    "lightskyblue",
    "blueviolet",
    "darkred",
    "darkmagenta",
    "saddlebrown",
    "darkseagreen",
    "lightgreen",
    "mediumpurple",
    "darkviolet",
    "palegreen",
    "darkorchid",
    "yellowgreen",
    "sienna",
    "brown",
    "darkgray",
    "lightblue",
    "greenyellow",
    "paleturquoise",
    "lightsteelblue",
    "powderblue",
    "firebrick",
    "darkgoldenrod",
    "mediumorchid",
    "rosybrown",
    "darkkhaki",
    "silver",
    "mediumvioletred",
    "indianred",
    "peru",
    "chocolate",
    "tan",
    "lightgray",
    "thistle",
    "orchid",
    "goldenrod",
    "palevioletred",
    "crimson",
    "gainsboro",
    "plum",
    "burlywood",
    "lightcyan",
    "lavender",
    "darksalmon",
    "violet",
    "palegoldenrod",
    "lightcoral",
    "khaki",
    "sandybrown",
    "wheat",
    "beige",
    "salmon",
    "red",
    "fuchsia",
    "magenta",
    "deeppink",
    "orangered",
    "tomato",
    "hotpink",
    "coral",
    "darkorange",
    "lightsalmon",
    "orange",
    "lightpink",
    "pink",
    "gold",
    "peachpuff",
    "moccasin",
    "bisque",
    "mistyrose",
    "blanchedalmond",
    "papayawhip",
    "yellow"
];
var playerWidth = 100;
var idCounter = 0;
var score = true;
var scorePlayer1 = 0;
var scorePlayer2 = 0;
var dirMovedLastP1 = "left";
var dirMovedLastP2 = "right";
console.log(Math.round($(window).height() / playerWidth) * playerWidth);
console.log(Math.floor($(window).height() / playerWidth) * playerWidth);

function block_collision(block_id, bullet_id) {
    var block1 = document.getElementById(block_id);
    var bullet1 = document.getElementById(bullet_id);
    if (parseInt(bullet1.style.left, 10) > parseInt(block1.style.left, 10) &&
        parseInt(bullet1.style.left, 10) < (parseInt(block1.style.left, 10) + playerWidth) &&
        parseInt(bullet1.style.top, 10) > parseInt(block1.style.top, 10) + 100 &&
        parseInt(bullet1.style.top, 10) < (parseInt(block1.style.top, 10) + playerWidth + 100)) {

        $("#" + bullet_id).remove();
    }
}

function shoot(id) {
    var player = document.getElementById(id);
    if (id == "player1") {
        $("<div id='bullet" + idCounter + "' class='bullet player1Bullet direction" + dirMovedLastP1 + "'></div>").appendTo("body");
    } else if (id == "player2") {
        $("<div id='bullet" + idCounter + "' class='bullet player2Bullet direction" + dirMovedLastP2 + "'></div>").appendTo("body");
    }

    document.getElementById("bullet" + idCounter).style.top = parseInt(player.style.top, 10) + 140 + "px";
    document.getElementById("bullet" + idCounter).style.left = parseInt(player.style.left, 10) + 25 + "px";
    idCounter++;
}

function reset() {

    scorePlayer1 = 0;
    scorePlayer2 = 0;
    document.getElementById("p1score").innerText = "score: " + scorePlayer1;
    document.getElementById("p2score").innerText = "score: " + scorePlayer2;
    document.getElementById("player1").children[0].innerHTML = "score: " + scorePlayer1;
    document.getElementById("player2").children[0].innerHTML = "score: " + scorePlayer2;
    $("#player2").show('explode', { pieces: 25 }, 600);
    $("#player1").show('explode', { pieces: 25 }, 600);
    if ($("#player1Win").length > 0) {
        $("#player1Win").remove();
    }
    if ($("#player2Win").length > 0) {
        $("#player2Win").remove();
    }

}

function changeColor(playerNum) {
    var color = prompt("color");
    if (colors.indexOf(color) != -1) {

        document.getElementById("player" + playerNum).style.background = color;
        document.getElementById("colorButtonP" + playerNum).style.color = color;
        document.getElementById("p" + playerNum + "score").style.color = color;

        localStorage.setItem("p" + playerNum + "color", color);
    }
}

function checkWin() {
    var NumHits = document.getElementById("NumHits").value;
    if (scorePlayer1 >= NumHits) {
        $("#player2").hide("explode");
        if (!($("#player1Win").length > 0)) {
            $("<p id=\"player1Win\" style=\"font-size: 400%; padding-top: 170px; color: " + localStorage.getItem("p1color") + "\">PLAYER 1 WINS!!</p>").appendTo("body");
        }
    } else if (scorePlayer2 >= NumHits) {
        $("#player1").hide("explode");
        if (!($("#player2Win").length > 0)) {
            $("<p id=\"player2Win\" style=\"font-size: 400%; padding-top: 170px; color: " + localStorage.getItem("p2color") + "\">PLAYER 2 WINS!!</p>").appendTo("body");
        }
    }
    if ($("#player2Win").length > 0 && $("#player1Win").length > 0) {
        $("#player2Win").remove();
        $("#player1Win").remove();
        $("<p id=\"draw\" style=\"font-size: 400%; color: purple\">DRAW!!</p>").appendTo("body");
    }
}

var bulletMove = setInterval(function () {

    if (scorePlayer1 > scorePlayer2) {
        document.getElementById("trophyP1").style.visibility = "visible";
        document.getElementById("trophyP2").style.visibility = "hidden";
    } else if (scorePlayer1 < scorePlayer2) {
        document.getElementById("trophyP2").style.visibility = "visible";
        document.getElementById("trophyP1").style.visibility = "hidden";
    } else {
        document.getElementById("trophyP2").style.visibility = "hidden";
        document.getElementById("trophyP1").style.visibility = "hidden";
    }



    if (player1X < 0 || player1X > (Math.floor(screen.width/100)*100) - 100 || player1Y < 0 || player1Y > (Math.floor(screen.height/100)*100) - 100) {
        if (dirMovedLastP1 == "left") {
            document.getElementById("player1").style.left = "0px";
            player1X = 0;
        } else if (dirMovedLastP1 == "right") {
            document.getElementById("player1").style.left = "1800px";
            player1X = 1800;
        } else if (dirMovedLastP1 == "top") {
            document.getElementById("player1").style.top = "0px";
            player1Y = 0;
        } else if (dirMovedLastP1 == "bottom") {
            document.getElementById("player1").style.top = "900px";
            player1Y = 900;
        }

    }
    if (player2X < 0 || player2X > (Math.floor(screen.width/100)*100) - 100 || player2Y < 0 || player2Y > (Math.floor(screen.height/100)*100) - 100) {
        if (dirMovedLastP2 == "left") {
            document.getElementById("player2").style.left = "1800px";
            player2X = 1800;
        } else if (dirMovedLastP2 == "right") {
            document.getElementById("player2").style.left = "0px";
            player2X = 0;
        } else if (dirMovedLastP2 == "top") {
            document.getElementById("player2").style.top = "0px";
            player2Y = 0;
        } else if (dirMovedLastP2 == "bottom") {
            document.getElementById("player2").style.top = "900px";
            player2Y = 900;
        }

    }

    var allBullets = document.querySelectorAll(".bullet");
    for (var i = 0; i < allBullets.length; i++) {
        var bullet = allBullets[i];
        if ((bullet.className).indexOf("player2Bullet") != -1) {
            bullet.style.background = localStorage.getItem("p2color");
        } else if ((bullet.className).indexOf("player1Bullet") != -1) {
            bullet.style.background = localStorage.getItem("p1color");
        }
        var isPlayer2Bullet = false;
        if (bullet.className.indexOf("player2Bullet") != -1) isPlayer2Bullet = true;

        var player = document.getElementById("player2");

        if (isPlayer2Bullet) {
            player = document.getElementById("player1");
        }
        if (!(isPlayer2Bullet) && (bullet.className).indexOf("left") != -1) {
            $("#" + bullet.id).animate({"left": "+=100px"}, 90, "linear");
        } else if (!(isPlayer2Bullet) && (bullet.className).indexOf("right") != -1) {
            $("#" + bullet.id).animate({"left": "-=100px"}, 90, "linear");
        } else if ((bullet.className).indexOf("bottom") != -1) {
            $("#" + bullet.id).animate({"top": "-=100px"}, 90, "linear");
        } else if ((bullet.className).indexOf("top") != -1) {
            $("#" + bullet.id).animate({"top": "+=100px"}, 90, "linear");
        } else if (isPlayer2Bullet && (bullet.className).indexOf("left") != -1) {
            $("#" + bullet.id).animate({"left": "-=100px"}, 90, "linear");
        } else if (isPlayer2Bullet && (bullet.className).indexOf("right") != -1) {
            $("#" + bullet.id).animate({"left": "+=100px"}, 90, "linear");
        }
        if (parseInt(bullet.style.left, 10) > parseInt(player.style.left, 10) &&
            parseInt(bullet.style.left, 10) < (parseInt(player.style.left, 10) + playerWidth) &&
            parseInt(bullet.style.top, 10) > parseInt(player.style.top, 10) + 100 &&
            parseInt(bullet.style.top, 10) < (parseInt(player.style.top, 10) + playerWidth + 100)) {

            if (isPlayer2Bullet) {
                scorePlayer2++;
                document.getElementById("player2").children[0].innerHTML = "score: " + scorePlayer2;
                document.getElementById("p2score").innerHTML = "score: " + scorePlayer2;
                checkWin();
            } else {
                scorePlayer1++;
                document.getElementById("player1").children[0].innerHTML = "score: " + scorePlayer1;
                document.getElementById("p1score").innerHTML = "score: " + scorePlayer1;
                checkWin();
            }
        }
        block_collision("block", bullet.id);
        block_collision("block1", bullet.id);
        block_collision("block2", bullet.id);
        block_collision("block3", bullet.id);
        block_collision("block4", bullet.id);

        block_collision("block5", bullet.id);
        block_collision("block6", bullet.id);
        block_collision("block7", bullet.id);
        block_collision("block8", bullet.id);
        block_collision("block9", bullet.id);

        if (parseInt(bullet.style.left, 10) <= 0) {
            $("#" + bullet.id).remove();
        } else if (parseInt(bullet.style.left, 10) >= window.innerWidth) {
            $("#" + bullet.id).remove();
        } else if (parseInt(bullet.style.top, 10) <= 0) {
            $("#" + bullet.id).remove();
        } else if (parseInt(bullet.style.top, 10) >= window.innerHeight) {
            $("#" + bullet.id).remove();
        }
    }

}, 100);

var player1Y = 0;
var player2Y = 0;
var player1X = 0;
var player2X = 1800;
var divWidth = 100;
function move(direction) {
    var player1 = document.getElementById("player1");
    var player2 = document.getElementById("player2");
    if (direction == "up") {
        player1Y += divWidth;
        dirMovedLastP1 = "top";
    } else if (direction == "down") {
        player1Y -= divWidth;
        dirMovedLastP1 = "bottom";
    } else if (direction == "left") {
        player1X += divWidth;
        dirMovedLastP1 = "left";
    } else if (direction == "right") {
        player1X -= divWidth;
        dirMovedLastP1 = "right";
    } else if (direction == "up1") {
        player2Y += divWidth;
        dirMovedLastP2 = "top";
    } else if (direction == "down1") {
        player2Y -= divWidth;
        dirMovedLastP2 = "bottom";
    } else if (direction == "left1") {
        player2X -= divWidth;
        dirMovedLastP2 = "left";
    } else if (direction == "right1") {
        player2X += divWidth;
        dirMovedLastP2 = "right";
    }
    player1.style.top = player1Y + "px";
    player2.style.top = player2Y + "px";
    player1.style.left = player1X + "px";
    player2.style.left = player2X + "px";
}
window.addEventListener('keyup', function (e) {
    if (e.which == 38 ||
        e.which == 40 ||
        e.which == 39 ||
        e.which == 37 ||
        e.which == 87 ||
        e.which == 83 ||
        e.which == 65 ||
        e.which == 68 ||
        e.which == 96 ||
        e.which == 70) {
        $("#NumHits").blur();
    }
    console.log(e.which);
    if (e.which == 38) {
        move("down");
    } else if (e.which == 40) {
        move("up");
    } else if (e.which == 39) {
        move("left");
    } else if (e.which == 37) {
        move("right");
    } else if (e.which == 87) {
        move("down1");
    } else if (e.which == 83) {
        move("up1");
    } else if (e.which == 65) {
        move("left1");
    } else if (e.which == 68) {
        move("right1");
    } else if (e.which == 96) {
        shoot("player1");
    } else if (e.which == 70) {
        shoot("player2");
    }
});