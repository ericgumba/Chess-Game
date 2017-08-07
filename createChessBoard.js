var cannon;
var chessMap = new Map();
var pieces = [];

function piece(color, pieceType, image, isCaptured, currentSquare) {

    this.color = color; // string
    this.pieceType = pieceType; // string
    this.image = image; // string
    this.isCaptured = isCaptured; // bool
    this.currentSquare = currentSquare; // tuple

};

function pawn(color, pieceType, image, isCaptured, currentSquare, canAdvanceTwice) {
    piece.call(this, color, pieceType, image, isCaptured, currentSquare);
    this.canAdvanceTwice = canAdvanceTwice;
};


function dropPiece(ev) {

    if ($(ev.target).css("background-color") === "rgb(0, 128, 0)") {


        var squareAlphabet = ev.target.id.charAt(0);
        var squareNumber = parseInt(ev.target.id.charAt(1));
        var pieceMoved = chessMap.get(cannon.id);


        ev.target.appendChild(cannon);

        pieceMoved.currentSquare[0] = squareAlphabet;
        pieceMoved.currentSquare[1] = squareNumber;
        if (pieceMoved instanceof pawn) {
            pieceMoved.canAdvanceTwice = false;
        }
        resetColors();
    }
};

function allowDrop(ev) {
    ev.preventDefault();
};

function drag(ev) {

    ev.dataTransfer.setData("text", ev.target.id);
};

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
};


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
    alert("you're amazing =)");



});

function initializePieces() {

    let alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    // this line is necessary because the for loop uses the properties of whitePawn to create images/ 
    var whitePawn = new pawn("white", "pawn", "/Users/ericgumba/Chess-Game/images/wP.png", false, ['a', 2], true);

    // todo: hashmap this bitch.
    for (var i = 0; i < 8; i++) {
        pieces.push(new pawn("white", "pawn", "/Users/ericgumba/Chess-Game/images/wP.png", false, [alphabets[i], 2], true));
        $("#" + alphabets[i] + "2").append(`<img src=${whitePawn.image} id="whitePawn${i+1}" class="pawn" onclick="highlightedWP(event)" width="50" height="50">`);
        chessMap.set(`whitePawn${i+1}`, pieces[i]);
    }


};

// This function highlights possible square moves and is called when a piece is clicked on. The onClick function 
// is declared in initializePieces()

function highlightedWP(event) {
    resetColors();
    load(event.target);
    var currentHighlightedPiece = chessMap.get(event.target.id);

    alert(currentHighlightedPiece.canAdvanceTwice);

    // 
    if (currentHighlightedPiece.canAdvanceTwice === true) {
        $(`#${currentHighlightedPiece.currentSquare[0]}${currentHighlightedPiece.currentSquare[1]+1}`).css("background-color", "green");
        $(`#${currentHighlightedPiece.currentSquare[0]}${currentHighlightedPiece.currentSquare[1]+2}`).css("background-color", "green");

    }
    $(`#${currentHighlightedPiece.currentSquare[0]}${currentHighlightedPiece.currentSquare[1]+1}`).css("background-color", "green");
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