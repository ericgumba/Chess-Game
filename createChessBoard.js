var cannon;
var chessMap = new Map();
var pieces = [];

function piece(color, pieceType, image, isCaptured, currentSquare) {

    this.color = color;
    this.pieceType = pieceType;
    this.image = image;
    this.isCaptured = isCaptured;
    this.currentSquare = currentSquare;

};


function dropPiece(ev) {
    if ($(ev.target).css("background-color") === "rgb(0, 128, 0)") {
        alert("good job eric");
        alert(cannon);
        ev.target.appendChild(cannon);
    } else {
        var k = $(".white_square").css("background-color");
        alert(k);
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {

    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}


function createBoard() {

    let strHTML = "";
    let alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    let strr = "asd"
    for (var row = 0; row < 8; row++) {
        strHTML += "<div>";
        for (var column = 0; column < 8; column++) {
            if ((column + row) % 2 === 0) {
                strHTML += `<div class="white_square" id="${alphabets[column]}${8-row}"
                ondrop="drop(event)" onclick="dropPiece(event)"></div>`;
            } else {
                strHTML += `<div class="black_square" id="${alphabets[column]}${8-row}"
                ondrop="drop(event)" onclick="dropPiece(event)"></div>`;
            }
        }
        strHTML += "</div>";
    }
    $("#chessboard").html(strHTML);
};


$(document).ready(function() {

    initializePieces();
    var whitePawn = new piece("white", "pawn", "/Users/ericgumba/Chess-Game/images/wP.png", false, ['a', 2]);
    var blackPawn = new piece("black", "pawn", "/Users/ericgumba/Chess-Game/images/bP.png", false, ['a', 7]);

    $("#whitePawn").html(`<img src=${whitePawn.image} width="50" height="50">`);
    $("#blackPawn").html(`<img src=${blackPawn.image} width="50" height="50">`);

    alert("you're amazing =)");


    $("#whitePawn").click(function() {
        resetColors();
        load(this);
        $("#a" + (whitePawn.currentSquare[1]) - 1).css("background-color", "green");

    });

    $("#blackPawn").click(function() {
        resetColors();
        load(this);
        $("#a" + (blackPawn.currentSquare[1] - 1).toString()).css("background-color", "green");

        blackPawn.currentSquare[1] = blackPawn.currentSquare[1] - 1;

    });
});

function initializePieces() {



};

function resetColors() {
    $(".white_square").each(function() {
        $(this).css("background-color", "#FFFFFF");
    });
    $(".black_square").each(function() {
        $(this).css("background-color", "#444444");
    });
};

function load(chessPiece) {
    cannon = chessPiece;
};