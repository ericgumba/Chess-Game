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
const row = ['1', '2', '3', '4', '5', '6', '7', '8'];

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

// 
var KingSearcher = {



}


var moveCreator = {

    genMoves: function(possibleMovesArray, colNumber, rowNumber) {

        var moveString = "#" + alphabetPositions.get(colNumber) + rowNumber.toString();
        possibleMovesArray.push(moveString);

    },

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////// These family of functions, //////////////////////////////////////////////////
    ////////////////////////diagBottomRight, diagTopLeft, traverseUp, traverseLeft//////////////////////////////////
    ///////////////// are used for the bishop, rook and queen pieces////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    diagBottomRight: function(possibleBishopMoves, currentColumnNumber, currentRowNumber) {

        while (currentColumnNumber < 9 && currentRowNumber > -1) {

            this.genMoves(possibleBishopMoves, currentColumnNumber, currentRowNumber);

            if ($(possibleBishopMoves[possibleBishopMoves.length - 1]).children().length === 1) {
                break;
            }

            currentColumnNumber += 1;
            currentRowNumber -= 1;

        }
    },
    diagBottomLeft: function(possibleBishopMoves, currentColumnNumber, currentRowNumber) {

        while (currentColumnNumber > -1 && currentRowNumber > -1) {

            this.genMoves(possibleBishopMoves, currentColumnNumber, currentRowNumber);

            if ($(possibleBishopMoves[possibleBishopMoves.length - 1]).children().length === 1) {
                break;
            }

            currentColumnNumber -= 1;
            currentRowNumber -= 1;

        }
    },
    diagTopLeft: function(possibleBishopMoves, currentColumnNumber, currentRowNumber) {

        while (currentColumnNumber > -1 && currentRowNumber < 9) {

            this.genMoves(possibleBishopMoves, currentColumnNumber, currentRowNumber);

            if ($(possibleBishopMoves[possibleBishopMoves.length - 1]).children().length === 1) {
                break;
            }

            currentColumnNumber -= 1;
            currentRowNumber += 1;

        }
    },

    diagTopRight: function(possibleBishopMoves, currentColumnNumber, currentRowNumber) {

        while (currentColumnNumber < 9 && currentRowNumber < 9) {

            this.genMoves(possibleBishopMoves, currentColumnNumber, currentRowNumber);
            if ($(possibleBishopMoves[possibleBishopMoves.length - 1]).children().length === 1) {
                break;
            }

            currentColumnNumber += 1;
            currentRowNumber += 1;
        }
    },
    traverseUp: function(possiblePieceMoves, currentColumn, currentRow) {

        if (currentRow === 9) { return; } else if ($(possiblePieceMoves[possiblePieceMoves.length - 1]).children().length === 1) { return; } else {
            this.genMoves(possiblePieceMoves, currentColumn, currentRow);
            this.traverseUp(possiblePieceMoves, currentColumn, currentRow + 1);
        }

    },
    traverseDown: function(possiblePieceMoves, currentColumn, currentRow) {

        if (currentRow === -1) { return; } else if ($(possiblePieceMoves[possiblePieceMoves.length - 1]).children().length === 1) { return; } else {
            this.genMoves(possiblePieceMoves, currentColumn, currentRow);
            this.traverseDown(possiblePieceMoves, currentColumn, currentRow - 1);
        }
    },

    /*
                                END FAMILY OF FUNCTIONS FOR BISHOP, ROOK & QUEEN
    */

    createPossibleRookMoves: function(column, row) {

        var possibleRookMoves = [];
        var columnNumber = alphabetPositionsKeys.get(column);
        var rowNumber = parseInt(row);

        this.traverseUp(possibleRookMoves, columnNumber, rowNumber + 1);

        this.traverseDown(possibleRookMoves, columnNumber, rowNumber - 1);


    },
    // returns the possible pawn moves as an array of strings. The strings are used to acces html.
    createPossiblePawnMoves: function(column, row, color) {

        var possiblePawnMoves = [];
        var columnNumber = alphabetPositionsKeys.get(column);
        var rowNumber = parseInt(row);

        for (var i = 0; i < 3; i++) {
            if (color === "white") {
                possiblePawnMoves.push("#" + alphabetPositions.get(columnNumber - 1 + i) + (rowNumber + 1).toString());
            } else if (color === "black") {
                possiblePawnMoves.push("#" + alphabetPositions.get(columnNumber - 1 + i) + (rowNumber - 1).toString());
            }
        }

        return possiblePawnMoves;

    },

    createPossibleQueenMoves: function(currentColumn, currentRow) {
        var possibleQueenMoves = [];
        var columnNumber = alphabetPositionsKeys.get(currentColumn);
        var rowNumber = parseInt(currentRow);

        // for or while loop must be decided here.

        // goal create an array of strings for the bishop or whatevs.

        this.diagTopRight(possibleQueenMoves, columnNumber + 1, rowNumber + 1);
        this.diagTopLeft(possibleQueenMoves, columnNumber - 1, rowNumber + 1);
        this.diagBottomLeft(possibleQueenMoves, columnNumber - 1, rowNumber - 1);
        this.diagBottomRight(possibleQueenMoves, columnNumber + 1, rowNumber - 1);


        return possibleQueenMoves;

    },

    createPossibleBishopMoves: function(currentColumn, currentRow) {
        var possibleBishopMoves = [];
        var columnNumber = alphabetPositionsKeys.get(currentColumn);
        var rowNumber = parseInt(currentRow);

        // for or while loop must be decided here.

        // goal create an array of strings for the bishop or whatevs.

        this.diagTopRight(possibleBishopMoves, columnNumber + 1, rowNumber + 1);
        this.diagTopLeft(possibleBishopMoves, columnNumber - 1, rowNumber + 1);
        this.diagBottomLeft(possibleBishopMoves, columnNumber - 1, rowNumber - 1);
        this.diagBottomRight(possibleBishopMoves, columnNumber + 1, rowNumber - 1);


        return possibleBishopMoves;

    },

    createPossibleKnightMoves: function(currentColumn, currentRow) {
        var possibleKnightMoves = [];
        var columnNumber = alphabetPositionsKeys.get(currentColumn);
        var rowNumber = parseInt(currentRow);

        for (var i = 0; i < 2; i++) {
            for (var j = 0; j < 2; j++) {

                possibleKnightMoves.push(("#" + alphabetPositions.get(columnNumber - (1 + i)) +
                    (rowNumber - 2 + i + (j * (4 - (i * 2)))).toString()));


                possibleKnightMoves.push(("#" + alphabetPositions.get(columnNumber + (1 + i)) +
                    (rowNumber - 2 + i + (j * (4 - (i * 2)))).toString()));
            }
        }

        return possibleKnightMoves;

    },

    createPossibleKingMoves: function(currentColumn, currentRow) {
        var possibleKingMoves = [
            [-1, -1],
            [0, -1],
            [1, -1],
            [-1, 0],
            [1, 0],
            [-1, 1],
            [0, 1],
            [1, 1]
        ]; // column, row 

        var columnNumber = alphabetPositionsKeys.get(currentColumn);
        var rowNumber = parseInt(currentRow);

        var death = possibleKingMoves.map(function(element) {
            return "#" +
                alphabetPositions.get(element[0] + columnNumber) +
                (element[1] + rowNumber).toString();
        });

        return death;

    },

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
        }

        if (piece.pieceType === "bishop") {
            this.highlightBishopSquares(piece);
        }

        if (piece.pieceType === "knight") {
            this.highlightKnightSquares(piece);
        }

        if (piece.pieceType === "king") {
            this.highlightKingSquares(piece);
        }

        if (piece.pieceType === "queen") {
            this.highlightQueenSquares(piece);
        }

        if (piece.pieceType === "rook") {
            this.highlightRookSquares(piece);
        }

    },

    highlightRookSquares: function(piece) {

        var possibleRookMoves = moveCreator.createPossibleRookMoves(piece.currentAlphabet, piece.currentNumber);
    },

    highlightPawnSquares: function(piece) {
        var possiblePawnMoves = moveCreator.createPossiblePawnMoves(piece.currentAlphabet, piece.currentNumber, piece.color);

        for (var i = 0; i < possiblePawnMoves.length; i++) {

            // a piece occupies top left or top right spot, so highlight it.
            if ($(possiblePawnMoves[i]).children().length === 1 && i !== 1) {
                chessBoard.highlight(possiblePawnMoves[i]);
            }
            // highlight forward square.
            else if ($(possiblePawnMoves[i]).children().length === 0 && i === 1) {
                chessBoard.highlight(possiblePawnMoves[i]);

                // Special case of double move for pawn 
                if (piece.doubleMoveUsed === false) {
                    var doubleMove;
                    if (piece.color == "white") {
                        doubleMove = parseInt(piece.currentNumber) + 2;
                    } else {
                        doubleMove = parseInt(piece.currentNumber) - 2;
                    }
                    parseInt(piece.currentNumber);
                    chessBoard.highlight(`#${piece.currentAlphabet}${doubleMove.toString()}`);
                }

            }

        }

    },

    highlightBishopSquares: function(piece) {
        var possibleBishopMoves = moveCreator.createPossibleBishopMoves(piece.currentAlphabet, piece.currentNumber);


        possibleBishopMoves.forEach(function(element) {
            chessBoard.highlight(element);
        }, this);
    },

    highlightKnightSquares: function(piece) {
        var possibleKnightMoves = moveCreator.createPossibleKnightMoves(piece.currentAlphabet, piece.currentNumber);

        possibleKnightMoves.forEach(function(element) {

            chessBoard.highlight(element);
        }, this);
    },

    highlightKingSquares: function(piece) {

        var possibleKingMoves = moveCreator.createPossibleKingMoves(piece.currentAlphabet, piece.currentNumber);

        possibleKingMoves.forEach(function(element) {
            chessBoard.highlight(element);
        }, this);

    },

    highlightQueenSquares: function(piece) {

        var possibleQueenMoves = moveCreator.createPossibleQueenMoves(piece.currentAlphabet, piece.currentNumber);

        possibleQueenMoves.forEach(function(element) {
            chessBoard.highlight(element);
        }, this);

    },

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

        chessBoard.resetColors();
        LegalMoveChecker.highlightSquares(event, this);
    }
};



/////////////////////////////////////////////////
var chessBoard = {



    resetColors: function() {
        $(".white_square").each(function() {
            $(this).css("background-color", "#FFFFFF");
        });
        $(".black_square").each(function() {
            $(this).css("background-color", "#444444");
        });
    },

    highlight: function(square) {
        $(square).css("background-color", "green");
    },


    dropPiece: function(event) {


        var occupiedSquareColor = $(event.target).parents().css("background-color");
        var squareColor = $(event.target).css("background-color");
        var colorGreen = "rgb(0, 128, 0)";
        var occupiedSquareID = $(event.target).parent().attr("id");

        if (occupiedSquareColor === colorGreen) {

            var squareAlphabet = occupiedSquareID.charAt(0);
            var squareNumber = parseInt(occupiedSquareID.charAt(1));
            var pieceMoved = chessMap.get(cannon);

            this.captureEnemyAndDropPieceAtNewSquare(event);

            pieceMoved.currentAlphabet = squareAlphabet;
            pieceMoved.currentNumber = squareNumber;

            if (pieceMoved.pieceType === "pawn") {
                pieceMoved.doubleMoveUsed = true;
            }

            this.switchTurns();
            this.resetColors();


        } else if (squareColor === colorGreen) {
            var squareAlphabet = event.target.id.charAt(0);
            var squareNumber = parseInt(event.target.id.charAt(1));
            var pieceMoved = chessMap.get(cannon.id);

            this.dropPieceAtNewSquare(event);

            pieceMoved.currentAlphabet = squareAlphabet;
            pieceMoved.currentNumber = squareNumber;

            if (pieceMoved.pieceType === "pawn") {
                pieceMoved.doubleMoveUsed = true;
            }

            this.switchTurns();
            this.resetColors();
        }
    },


    switchTurns: function() {

        if (playerTurn === 1) { playerTurn = 2; }
        if (playerTurn === 2) { playerTurn = 1; }
    },

    captureEnemyAndDropPieceAtNewSquare: function(event) {

        $(event.target).parent().append(cannon);
        event.target.remove();
    },


    dropPieceAtNewSquare: function(event) {

        event.target.append(cannon);
    },

    createBoard: function() {

        let strHTML = "";
        let alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

        let strr = "asd"
        for (var row = 0; row < 8; row++) {
            strHTML += "<div>";
            for (var column = 0; column < 8; column++) {
                if ((column + row) % 2 === 0) {
                    strHTML += `<div class="white_square" id="${alphabets[column]}${8-row}"
                    onclick="chessBoard.dropPiece(event)"></div>`;
                } else {
                    strHTML += `<div class="black_square" id="${alphabets[column]}${8-row}"
                    onclick="chessBoard.dropPiece(event)"></div>`;
                }
            }
            strHTML += "</div>";
        }
        $("#chessboard").html(strHTML);
    },

    initializePieces: function() {

        this.initializePawns();
        this.initializeWhiteBishops();
        this.initializeBlackBishops();
        this.initializeWhiteKnights();
        this.initializeBlackKnights();
        this.initializeKings();
        this.initializeQueens();
        this.initializeBlackRooks();
    },

    // pieces array will be at length = 16
    initializePawns: function() {
        for (var i = 0; i < 16; i++) {
            if (i < 8) {
                pieces.push(new Piece("white", "pawn", "/Users/ericgumba/Chess-Game/images/wP.png", false, alphabets[i], row[1]));
                $("#" + alphabets[i] + "2").append(`<img src="/Users/ericgumba/Chess-Game/images/wP.png" id="whitePawn${i+1}" class="pawn" onclick="pieces[${i}].highlightSquares(event)" width="50" height="50">`);
                chessMap.set(`whitePawn${i+1}`, pieces[i]);
            } else {
                pieces.push(new Piece("black", "pawn", "/Users/ericgumba/Chess-Game/images/bP.png", false, alphabets[i - 8], row[6]));
                $("#" + alphabets[i - 8] + "7").append(`<img src="/Users/ericgumba/Chess-Game/images/bP.png" id="blackPawn${i-7}" class="pawn" onclick="pieces[${i}].highlightSquares(event)" width="50" height="50">`);
                chessMap.set(`blackPawn${i-7}`, pieces[i]);
            }
        }
    },

    // pieces array will be at length 18
    // left bishop = pieces[17], rightBishop = pieces[18]
    initializeWhiteBishops: function() {
        for (var i = 0; i < 2; i++) {
            pieces.push(new Piece("white", "bishop", "/Users/ericgumba/Chess-Game/images/wB", false, alphabets[2 + (i * 3)], '1'));
            $("#" + alphabets[2 + (i * 3)] + "1").append(`<img src="/Users/ericgumba/Chess-Game/images/wB.png" id=whiteBishop${1+i} class="bishop" onclick="pieces[${16+i}].highlightSquares(event)" width="50" height="50">`);
            chessMap.set(`whiteBishop${i+1}`, pieces[16 + i]);
        }

    },

    // pieces array will be at length 20
    initializeBlackBishops: function() {
        for (var i = 0; i < 2; i++) {
            pieces.push(new Piece("black", "bishop", "/Users/ericgumba/Chess-Game/images/wB", false, alphabets[2 + (i * 3)], '8'));
            $("#" + alphabets[2 + (i * 3)] + "8").append(`<img src="/Users/ericgumba/Chess-Game/images/bB.png" id=blackBishop${1+i} class="bishop" onclick="pieces[${18+i}].highlightSquares(event)" width="50" height="50">`);
            chessMap.set(`blackBishop${i+1}`, pieces[18 + i]);
            // IMPORTANT, id starts at 1 instead of 0.
        }
    },
    // pieces array will be at length 22
    initializeWhiteKnights: function() {
        for (var i = 0; i < 2; i++) {
            pieces.push(new Piece("white", "knight", "/Users/ericgumba/Chess-Game/images/wN", false, alphabets[1 + (i * 5)], '1'));
            $("#" + alphabets[1 + (i * 5)] + "1").append(`<img src="/Users/ericgumba/Chess-Game/images/wN.png" id=whiteKnight${1+i} class="knight" onclick="pieces[${20+i}].highlightSquares(event)" width="50" height="50">`);
            chessMap.set(`whiteKnight${i+1}`, pieces[20 + i]);
        }

    },
    // pieces array will be at length 25
    initializeBlackKnights: function() {
        for (var i = 0; i < 2; i++) {
            pieces.push(new Piece("black", "knight", "/Users/ericgumba/Chess-Game/images/bN", false, alphabets[1 + (i * 5)], '8'));
            $("#" + alphabets[1 + (i * 5)] + "8").append(`<img src="/Users/ericgumba/Chess-Game/images/bN.png" id=blackKnight${1+i} class="knight" onclick="pieces[${22+i}].highlightSquares(event)" width="50" height="50">`);
            chessMap.set(`blackKnight${i+1}`, pieces[22 + i]);
        }

    },

    // pieces array will be at length 27
    initializeKings: function() {
        pieces.push(new Piece("white", "king", "/Users/ericgumba/Chess-Game/images/wK", false, alphabets[4], '1'));
        $("#" + alphabets[4] + "1").append(`<img src="/Users/ericgumba/Chess-Game/images/wK.png" id=whiteKing class="king" onclick="pieces[${24}].highlightSquares(event)" width="50" height="50">`);
        chessMap.set(`whiteKing`, pieces[24]);


        pieces.push(new Piece("black", "king", "/Users/ericgumba/Chess-Game/images/bK", false, alphabets[4], '8'));
        $("#" + alphabets[4] + "8").append(`<img src="/Users/ericgumba/Chess-Game/images/bK.png" id=blackKing class="king" onclick="pieces[${25}].highlightSquares(event)" width="50" height="50">`);
        chessMap.set(`blackKing`, pieces[25]);

    },
    // pieces array will be at 29
    initializeQueens: function() {
        pieces.push(new Piece("white", "queen", "/Users/ericgumba/Chess-Game/images/wQ", false, alphabets[3], '1'));
        $("#" + alphabets[3] + "1").append(`<img src="/Users/ericgumba/Chess-Game/images/wQ.png" id=whiteQueen class="queen" onclick="pieces[${26}].highlightSquares(event)" width="50" height="50">`);
        chessMap.set(`whiteQueen`, pieces[26]);

        pieces.push(new Piece("black", "queen", "/Users/ericgumba/Chess-Game/images/bQ", false, alphabets[3], '8'));
        $("#" + alphabets[3] + "8").append(`<img src="/Users/ericgumba/Chess-Game/images/bQ.png" id=blackQueen class="queen" onclick="pieces[${27}].highlightSquares(event)" width="50" height="50">`);
        chessMap.set(`blackQueen`, pieces[27]);
    },

    initializeBlackRooks: function() {
        for (var i = 0; i < 2; i++) {
            pieces.push(new Piece("black", "rook", "/Users/ericgumba/Chess-Game/images/bR", false, alphabets[0 + (i * 7)], '8'));
            $("#" + alphabets[0 + (i * 7)] + "8").append(`<img src="/Users/ericgumba/Chess-Game/images/bR.png" id=blackKnight${1+i} class="rook" onclick="pieces[${28+i}].highlightSquares(event)" width="50" height="50">`);
            chessMap.set(`blackKnight${i+1}`, pieces[28 + i]);
        }


    },
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


function wtf() {
    alert("t");
}