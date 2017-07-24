function createBoard() {

    let strHTML = "";
    let alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    strHTML = '<div id="chessboard">';
    for (var row = 0; row < 8; row++) {
        strHTML += "<div>";
        for (var column = 0; column < 8; column++) {

            if ((column + row) % 2 == 0) {
                strHTML += `<div class="white_square" id="${alphabets[column]}${8-row}"></div>`;
            } else {
                strHTML += `<div class="black_square" id="${alphabets[column]}${8-row}"></div>`;
            }
        }
        strHTML += "</div>";
    }

    strHTML += "</div>";


    document.getElementById('chessboard2').innerHTML = strHTML;
};
// createBoard();