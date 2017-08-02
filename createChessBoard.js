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

     for (var row = 0; row < 8; row++) {
         strHTML += "<div>";
         for (var column = 0; column < 8; column++) {
             if ((column + row) % 2 === 0) {
                 if (row === 1) {
                     strHTML += `<div class="white_square" id="${alphabets[column]}${8-row}"
                ondrop="drop(event)" ondragover="allowDrop(event)">
                <img src="images/wP.png" 
                draggable="true" ondragstart="drag(event)" id="p${row}${column}" width="50" height="50">
                </div>`;

                 } else if (row === 6) {
                     strHTML += `<div class="white_square" id="${alphabets[column]}${8-row}"
                ondrop="drop(event)" ondragover="allowDrop(event)">
                <img src="images/bP.png" 
                draggable="true" ondragstart="drag(event)" id="p${row}${column}" width="50" height="50">
                </div>`;
                 } else {
                     strHTML += `<div class="white_square" id="${alphabets[column]}${8-row}"
                ondrop="drop(event)" ondragover="allowDrop(event)"></div>`;
                 }
             } else {

                 if (row === 1) {
                     strHTML += `<div class="black_square" id="${alphabets[column]}${8-row}"
                ondrop="drop(event)" ondragover="allowDrop(event)">
                <img src="images/wP.png" 
                draggable="true" ondragstart="drag(event)" id="p${row}${column}" width="50" height="50">
                </div>`;


                 } else if (row === 6) {
                     var piece = "p" + row + column;
                     strHTML += `<div class="black_square" id="${alphabets[column]}${8-row}"
                ondrop="drop(event)" ondragover="allowDrop(event)">
                <img src="images/bP.png" 
                draggable="true" ondragstart="drag(event)" id="p${row}${column}" width="50" height="50">
                </div>`;
                 } else {
                     strHTML += `<div class="black_square" id="${alphabets[column]}${8-row}"
                ondrop="drop(event)" ondragover="allowDrop(event)"></div>`;
                 }
             }
         }
         strHTML += "</div>";
     }
     // document.getElementById('chessboard').innerHTML = strHTML;
     $("#chessboard").html(strHTML);
 };

 $("#myName").on("click", function() {
     $(this).slideUp();
 });

 function cool() {
     $("#myName").hide();
 };

 function factorial(n) {
     if (n === 1) {
         return 1;
     }
     return n * factorial(n - 1);
 }

 $(document).ready(function() {


     function piece(color, pieceType, image, isCaptured, currentSquare) {

         this.color = color;
         this.pieceType = pieceType;
         this.image = image;
         this.isCaptured = isCaptured;
         this.currentSquare = currentSquare;

     };



     var pawn = new piece("white", "pawn", "/Users/ericgumba/Chess-Game/images/wP.png", false, ['a', '2']);


     $("#pawn").html(`<img src=${pawn.image} width="50" height="50">`);

     alert("you're amazing =)");
     // Your code here.

     $("#drag").click(function() {
         $(this).drag();
     });


     $("#myName").click(function() {

         alert("wow! =D");
     });

 });