// goal: implement capturable pieces. 
// sub-goal: highlight a piece if it contains a capturable piece    dropPiece is the place to focus on


var cannon;
var chessMap = new Map();
var pieces = [];
var playerTurn = 1;

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
    var please = $(ev.target).parents().css("background-color");
    var tease = $(ev.target).parent().attr("id");
    if (please === "rgb(0, 128, 0)") {
        var squareAlphabet = ev.target.parent().id.charAt(0);
        var squareNumber = parseInt(ev.target.id.charAt(1));
        var pieceMoved = chessMap.get(cannon.id);
        ev.target.remove();

        ev.target.append(cannon);

        pieceMoved.currentSquare[0] = squareAlphabet;
        pieceMoved.currentSquare[1] = squareNumber;
        if (pieceMoved instanceof pawn) {
            pieceMoved.canAdvanceTwice = false;
        }

        switchTurns();
        resetColors();

    } else if ($(ev.target).css("background-color") === "rgb(0, 128, 0)") {
        var squareAlphabet = ev.target.id.charAt(0);
        var squareNumber = parseInt(ev.target.id.charAt(1));
        var pieceMoved = chessMap.get(cannon.id);

        ev.target.append(cannon);

        pieceMoved.currentSquare[0] = squareAlphabet;
        pieceMoved.currentSquare[1] = squareNumber;
        if (pieceMoved instanceof pawn) {
            pieceMoved.canAdvanceTwice = false;
        }

        switchTurns();
        resetColors();
    }
};

function switchTurns() {

    if (playerTurn === 1) {
        playerTurn = 2;
    } else {
        playerTurn = 1;
    }
}

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

    // todo: hashmap this bitch.
    for (var i = 0; i < 16; i++) {
        if (i < 8) {
            pieces.push(new pawn("white", "pawn", "/Users/ericgumba/Chess-Game/images/wP.png", false, [alphabets[i], 2], true));
            $("#" + alphabets[i] + "2").append(`<img src="/Users/ericgumba/Chess-Game/images/wP.png" id="whitePawn${i+1}" class="pawn" onclick="highlightedWP(event)" width="50" height="50">`);
            chessMap.set(`whitePawn${i+1}`, pieces[i]);
        } else {
            pieces.push(new pawn("black", "pawn", "/Users/ericgumba/Chess-Game/images/bP.png", false, [alphabets[i - 8], 7], true));
            $("#" + alphabets[i - 8] + "7").append(`<img src="/Users/ericgumba/Chess-Game/images/bP.png" id="blackPawn${i-7}" class="pawn" onclick="highlightedBP(event)" width="50" height="50">`);
            chessMap.set(`blackPawn${i-7}`, pieces[i]);
        }
    }



};

// This function highlights possible square moves and is called when a piece is clicked on. The onClick function 
// is declared in initializePieces()

function highlightedWP(event) {
    if (playerTurn === 1) {
        resetColors();
        load(event.target);
        var currentHighlightedPiece = chessMap.get(event.target.id);

        // data structure to use would be a map... Or... 
        // array?
        // linked list?
        var pawnAttackPositions = new Map();
        var pawnAttackPositionKeys = new Map();
        let alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        for (var i = 0; i < alphabets.length; i++) {
            pawnAttackPositions.set(alphabets[i], i);
            pawnAttackPositionKeys.set(i, alphabets[i]);
        }

        // now we check to see if the pawn can attack diagonally 
        var letter = currentHighlightedPiece.currentSquare[0];
        var attackLeft = pawnAttackPositionKeys.get(pawnAttackPositions.get(letter) - 1);
        var attackRight = pawnAttackPositionKeys.get(pawnAttackPositions.get(letter) + 1);

        var diagLeftOccupantSize = $(`#${attackLeft}${currentHighlightedPiece.currentSquare[1]+1}`).children().length;
        var diagRightOccupantSize = $(`#${attackRight}${currentHighlightedPiece.currentSquare[1]+1}`).children().length;

        var forward = `${currentHighlightedPiece.currentSquare[1]+1}`;


        var diagLeft = $(`#${attackLeft}${forward}`);
        var diagRight = $(`#${attackRight}${forward}`);



        if (currentHighlightedPiece.canAdvanceTwice === true) {
            $(`#${currentHighlightedPiece.currentSquare[0]}${currentHighlightedPiece.currentSquare[1]+1}`).css("background-color", "green");
            $(`#${currentHighlightedPiece.currentSquare[0]}${currentHighlightedPiece.currentSquare[1]+2}`).css("background-color", "green");
        } else if (diagLeftOccupantSize === 1 || diagRightOccupantSize == 1) {

            if (diagLeftOccupantSize === 1) {
                diagLeft.css("background-color", "green");
            }

            if (diagRightOccupantSize === 1) {
                diagRight.css("background-color", "green");
            }

        } else {
            if ($(`#${currentHighlightedPiece.currentSquare[0]}${currentHighlightedPiece.currentSquare[1]+1}`).children().length == 0)
                $(`#${currentHighlightedPiece.currentSquare[0]}${currentHighlightedPiece.currentSquare[1]+1}`).css("background-color", "green");
        }
    }
};

// highlights possible black pawn moves when clicked
function highlightedBP(event) {

    if (playerTurn === 2) {
        resetColors();
        load(event.target);
        var currentHighlightedPiece = chessMap.get(event.target.id);


        // 
        if (currentHighlightedPiece.canAdvanceTwice === true) {
            // highlight the two possible square  
            $(`#${currentHighlightedPiece.currentSquare[0]}${currentHighlightedPiece.currentSquare[1]-1}`).css("background-color", "green");
            $(`#${currentHighlightedPiece.currentSquare[0]}${currentHighlightedPiece.currentSquare[1]-2}`).css("background-color", "green");

        } else {
            // highlight the one square if there isn't a piece in the way

            if ($(`#${currentHighlightedPiece.currentSquare[0]}${currentHighlightedPiece.currentSquare[1]+1}`).parents().length == 0) {
                $(`#${currentHighlightedPiece.currentSquare[0]}${currentHighlightedPiece.currentSquare[1]-1}`).css("background-color", "green");
            }
        }

    }
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