var firstPlayerMove = "";
var secondPlayerMove = "";
var scoreboard = document.getElementById("scoreboard");
var firstPlayerStatistics = document.getElementById("firstPlayerStatistics");
var secondPlayerStatistics = document.getElementById("secondPlayerStatistics");
var drawStatistics = document.getElementById("drawStatistics");
var gameMode = document.getElementById("gameMode");
var player1RockImage = document.getElementById("player1RockImage");
var player1PaperImage = document.getElementById("player1PaperImage");
var player1ScissorsImage = document.getElementById("player1ScissorsImage");
var player2RockImage = document.getElementById("player2RockImage");
var player2PaperImage = document.getElementById("player2PaperImage");
var player2ScissorsImage = document.getElementById("player2ScissorsImage");
var moves = ["rock", "paper", "scissors"];
var results = [];
var resultNumber = 0;

function move(player, move) {
    highlightChosenImage(player, move);
    if (player === 1) {
        firstPlayerMove = move;
    } else if (player === 2) {
        secondPlayerMove = move;
    }

    if (gameMode.innerHTML === "Player vs Computer" && firstPlayerMove !== "") {
        var awaitingMove = getRepeatedMove();
        if (awaitingMove != null) {
            secondPlayerMove = getCleverMove(awaitingMove);
        } else {
            secondPlayerMove = getRandomMove();
        }
        changeSecondPlayerImage(secondPlayerMove);
    }

    if (firstPlayerMove !== "" && secondPlayerMove !== "") {
        var result = getResult(firstPlayerMove, secondPlayerMove);
        printResult(result);
        saveResult(firstPlayerMove, secondPlayerMove, result);
        firstPlayerMove = "";
        secondPlayerMove = "";
        unhighlightImages(1);
        unhighlightImages(2);
    }
}

function highlightChosenImage(player, move) {
    unhighlightImages(player);
    if (player === 1) {
        if (move === "rock") {
            player1RockImage.setAttribute("style", "opacity: 0.5");
        } else if (move === "paper") {
            player1PaperImage.setAttribute("style", "opacity: 0.5");
        } else {
            player1ScissorsImage.setAttribute("style", "opacity: 0.5");
        }
    } else {
        if (move === "rock") {
            if (gameMode.innerHTML === "Player vs Player") {
                player2RockImage.setAttribute("style", "opacity: 0.5");
            }
        } else if (move === "paper") {
            player2PaperImage.setAttribute("style", "opacity: 0.5");
        } else {
            player2ScissorsImage.setAttribute("style", "opacity: 0.5");
        }
    }
}

function unhighlightImages(player) {
    if (player === 1) {
        player1RockImage.setAttribute("style", "opacity: 1");
        player1PaperImage.setAttribute("style", "opacity: 1");
        player1ScissorsImage.setAttribute("style", "opacity: 1");
    } else {
        player2RockImage.setAttribute("style", "opacity: 1");
        if (gameMode.innerHTML === "Player vs Player") {
            player2PaperImage.setAttribute("style", "opacity: 1");
            player2ScissorsImage.setAttribute("style", "opacity: 1");
        }
    }
}

function getRandomMove() {
    return moves[Math.floor(Math.random() * moves.length)];
}

function getRepeatedMove() {
    if (results.length > 1) {
        for (var i = results.length - 1; i > results.length - 2; i--) {
            if (results[i].player != results[i - 1].player) {
                return null;
            }
        }
        return results[results.length - 1].player;
    }
    return null;
}

function getCleverMove(awaitingMove) {
    if (awaitingMove === "rock") {
        return "paper";
    } else if (awaitingMove === "paper") {
        return "scissors";
    } else {
        return "rock";
    }
}

function changeSecondPlayerImage(secondPlayerMove) {
    if (secondPlayerMove === "rock") {
        player2RockImage.src = "rock_opp.png";
    } else if (secondPlayerMove === "paper") {
        player2RockImage.src = "paper_opp.png";
    } else {
        player2RockImage.src = "scissors_opp.png";
    }
}

function getResult(firstPlayerMove, secondPlayerMove) {
    if (firstPlayerMove === secondPlayerMove) {
        return "draw";
    } else if (firstPlayerMove === "rock" && secondPlayerMove === "scissors" ||
              firstPlayerMove === "paper" && secondPlayerMove === "rock" ||
              firstPlayerMove === "scissors" && secondPlayerMove === "paper") {
        return "player 1";
    } else {
        return "player 2";
    }
}

function printResult(result) {
    if (result === "player 1") {
        firstPlayerStatistics.innerHTML++;
    } else if (result === "player 2") {
        secondPlayerStatistics.innerHTML++;
    } else {
        drawStatistics.innerHTML++;
    }
}

function saveResult(firstPlayerMove, secondPlayerMove, result) {
    resultNumber++;
    var i;
    if (resultNumber < 11) {
        makeNewRow();
        i = resultNumber;
    } else {
        shiftScoreboard();
        i = 10;
    }
    scoreboard.rows[i].cells[0].innerHTML = firstPlayerMove;
    scoreboard.rows[i].cells[1].innerHTML = secondPlayerMove;
    scoreboard.rows[i].cells[2].innerHTML = result;

    results.push({player1: firstPlayerMove, player2: secondPlayerMove, res: result});
}

function makeNewRow() {
    var row = document.createElement('tr');
    row.innerHTML = '<td></td><td></td><td></td>';
    scoreboard.appendChild(row);
}

function shiftScoreboard() {
    for (var i = 1; i < 10; i++) {
        for (var j = 0; j < 3; j++) {
            scoreboard.rows[i].cells[j].innerHTML = scoreboard.rows[i + 1].cells[j].innerHTML;
        }
    }
}

function changeMode() {
    if (gameMode.innerHTML === "Player vs Player") {
        gameMode.innerHTML = 'Player vs Computer';
        player2PaperImage.style.display = "none";
        player2ScissorsImage.style.display = "none";
    } else {
        gameMode.innerHTML = 'Player vs Player';
        player2PaperImage.style.display = "inline";
        player2ScissorsImage.style.display = "inline";
    }
    restartGame();
}

function restartGame() {
    if (resultNumber >= 10) {
        var i = 10;
    } else {
        var i = resultNumber;
    }
    for (i; i > 0; i--) {
        scoreboard.deleteRow(i);
    }
    firstPlayerStatistics.innerHTML = 0;
    secondPlayerStatistics.innerHTML = 0;
    drawStatistics.innerHTML = 0;
    player2RockImage.src = "rock_opp.png";
    resultNumber = 0;
}
