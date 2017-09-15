/////////////////////////////////////////////////////////////////////////////////
////////////////////////GLOBAL VARIABLES OF THE PROGRAM//////////////////////////
/////////////////////////////////////////////////////////////////////////////////

var chessMap = new Map();
var pieces = [];
var playerTurn = 1;
var isWhiteKingChecked = false; // unecessary?
var isBlackKingChecked = false; // unnecessary?
var cannon;
const alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const row = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

var alphabetPositions = new Map();
var alphabetPositionsKeys = new Map();
for (var i = 0; i < alphabets.length; i++) {
    alphabetPositionsKeys.set(alphabets[i], i);
    alphabetPositions.set(i, alphabets[i]);
}


/////////////////////////////////////////////////////////////////////////////////
////////////////////////OBJECTS OF THE PROGRAM///////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// each piece has a KingSearcher, which will be used after the end of each turn.
// AS IN, after the end of each turn 

var unitTest = {

}

var KingSearcher = {



}


var moveCreator = {

    // returns the possible pawn moves as an array of strings. The strings are used to acces html.
    createPossiblePawnMoves: function(piece) {
        var possiblePawnMoves = [];

        var k = parseInt(piece.currentNumber).toString();

        for (var i = 0; i < 3; i++) {

            if (piece.color === "white") {
                possiblePawnMoves.push(
                    "#" +
                    alphabetPositions.get(
                        alphabetPositionsKeys.get(
                            piece.currentAlphabet
                        ) - 1 + i
                    ) + (parseInt(piece.currentNumber) + 1).toString()
                );
            } else if (piece.color === "black") {
                possiblePawnMoves.push(
                    "#" +
                    alphabetPositions.get( //gets letter
                        alphabetPositionsKeys.get(
                            piece.currentAlphabet
                        ) - 1 + i
                    ) + (parseInt(piece.currentNumber) - 1).toString() //gets number
                );
            }

        }

        return possiblePawnMoves;

    }

};

// Each piece has a legal move checker, which will check each square to see if said piece
// can move to that square. 
var LegalMoveChecker = {



    /* This function iterates through the entire board, and highlights the possible moves for
    the specific piece type.  
    */
    highlightSquares: function(event, piece) {

        cannon = event.target;
        var currentSquare = `#${piece.currentAlphabet}${piece.currentNumber}`;

        if (piece.pieceType === "pawn") {
            this.highlightPawnSquares(piece);
        };

    },

    highlightPawnSquares: function(piece) {
        var possiblePawnMoves = moveCreator.createPossiblePawnMoves(piece);

        for (var i = 0; i < possiblePawnMoves.length; i++) {

            // a piece occupies this spot, so highlight it.
            if ($(possiblePawnMoves[i]).children().length === 1 && i !== 1) {
                highlight(possiblePawnMoves[i]);
            }
            // highlight forward square.
            else if ($(possiblePawnMoves[i]).children().length === 0) {
                highlight(possiblePawnMoves[i]);
            }

        }
    }

};

function Piece(color, pieceType, image, isCaptured, currentAlphabet, currentNumber) {

    this.color = color; // string
    this.pieceType = pieceType; // string
    this.image = image; // string
    this.isCaptured = isCaptured; // bool
    this.currentAlphabet = currentAlphabet; // char
    this.currentNumber = currentNumber; // char
    this.threatensKing = false;

    if (pieceType == "pawn") {
        this.doubleMoveUsed = false;
    }

    this.highlightSquares = function(event) {

        LegalMoveChecker.highlightSquares(event, this);

    }


};



/////////////////////////////////////////////////
var chessBoard = {

    createBoard: function() {

        let strHTML = "";
        let alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

        let strr = "asd"
        for (var row = 0; row < 8; row++) {
            strHTML += "<div>";
            for (var column = 0; column < 8; column++) {
                if ((column + row) % 2 === 0) {
                    strHTML += `<div class="white_square" id="${alphabets[column]}${8-row}"
                    onclick="dropPiece(event)"></div>`;
                } else {
                    strHTML += `<div class="black_square" id="${alphabets[column]}${8-row}"
                    onclick="dropPiece(event)"></div>`;
                }
            }
            strHTML += "</div>";
        }
        $("#chessboard").html(strHTML);
    },

    initializePieces: function() {

        this.initializePawns();
    },

    initializePawns: function() {

        for (var i = 0; i < 16; i++) {
            if (i < 8) {
                pieces.push(new Piece("white", "pawn", "/Users/ericgumba/Chess-Game/images/wP.png", false, alphabets[i], row[1]));
                $("#" + alphabets[i] + "2").append(`<img src="/Users/ericgumba/Chess-Game/images/wP.png" id="whitePawn${i+1}" class="pawn" onclick="pieces[${i}].highlightSquares(event)" width="50" height="50">`);
                chessMap.set(`whitePawn${i+1}`, pieces[i]);
            } else {
                pieces.push(new Piece("black", "pawn", "/Users/ericgumba/Chess-Game/images/bP.png", false, alphabets[i - 8], row[6]));
                $("#" + alphabets[i - 8] + "7").append(`<img src="/Users/ericgumba/Chess-Game/images/bP.png" id="blackPawn${i-7}" class="pawn" onclick="wtf()" width="50" height="50">`);
                chessMap.set(`blackPawn${i-7}`, pieces[i]);
            }
        }
    },
    initializeWhiteBishops: function() {

    },
    initializeBlackBishops: function() {

    },
    initializeWhiteKnights: function() {

    },
    initializeBlackKnights: function() {

    },
    initializeKings: {}
};
///////////////////////////////////////////////////////////////////////
/////////////////////////// ENTRY POINT OF PROGRAM/////////////////////
///////////////////////////////////////////////////////////////////////
$(document).ready(function() {

    chessBoard.createBoard();
    chessBoard.initializePieces();

    alert("you're amazing =)");

});


//////////////////////////////////////////////////////////////////////
/////////////////////////FUNCTIONS OF PROGRAM ////////////////////////
//////////////////////////////////////////////////////////////////////

function resetColors() {
    $(".white_square").each(function() {
        $(this).css("background-color", "#FFFFFF");
    });
    $(".black_square").each(function() {
        $(this).css("background-color", "#444444");
    });
};

function highlight(square) {
    $(square).css("background-color", "green");
};


function dropPiece(event) {


    var occupiedSquareColor = $(event.target).parents().css("background-color");
    var squareColor = $(event.target).css("background-color");
    var colorGreen = "rgb(0, 128, 0)";
    var occupiedSquareID = $(event.target).parent().attr("id");

    if (occupiedSquareColor === colorGreen) {

        var squareAlphabet = occupiedSquareID.charAt(0);
        var squareNumber = parseInt(occupiedSquareID.charAt(1));
        var pieceMoved = chessMap.get(cannon);

        captureEnemyAndDropPieceAtNewSquare(event);

        pieceMoved.currentAlphabet = squareAlphabet;
        pieceMoved.currentNumber = squareNumber;

        switchTurns();
        resetColors();


    } else if (squareColor === colorGreen) {
        var squareAlphabet = event.target.id.charAt(0);
        var squareNumber = parseInt(event.target.id.charAt(1));
        var pieceMoved = chessMap.get(cannon.id);

        dropPieceAtNewSquare(event);
    }
}

function dropPieceAtNewSquare(event) {
    event.target.append(cannon);
}

function captureEnemyAndDropPieceAtNewSquare(event) {
    $(event.target).parent().append(cannon);
    event.target.remove();
}

function wtf() {
    alert("t");
}