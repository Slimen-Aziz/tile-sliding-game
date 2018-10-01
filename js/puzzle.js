var emptytilePosRow = 1;
var emptytilePosCol = 2;

var oldemptyPos = emptytilePosRow + "," + emptytilePosCol;

var cellDisplacement = "69px";

var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];

$(".cell").click(moveTile);

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function moveTile () {
    //get the position of the current element
    var pos = $(this).attr('data-pos');
    var posRow = parseInt(pos.split(',')[0]);
    var posCol = parseInt(pos.split(',')[1]);

    //Move UP
    if (posRow + 1 == emptytilePosRow && posCol == emptytilePosCol) {
        $(this).animate({'top' : "+=" + cellDisplacement});
        $('#empty').animate({'top' : "-=" + cellDisplacement});
        oldemptyPos = emptytilePosRow + "," + emptytilePosCol;
        emptytilePosRow -= 1;
        $(this).attr('data-pos', (posRow+1) + "," + posCol);
    }

    //Move Down
    if (posRow - 1 == emptytilePosRow && posCol == emptytilePosCol) {
        $(this).animate({'top' : "-=" + cellDisplacement});
        $('#empty').animate({'top' : "+=" + cellDisplacement});
        oldemptyPos = emptytilePosRow + "," + emptytilePosCol;
        emptytilePosRow += 1;
        $(this).attr('data-pos', (posRow-1) + "," + posCol);
    }

    //Move Left
    if (posRow == emptytilePosRow && posCol + 1 == emptytilePosCol) {
        $(this).animate({'right' : "-=" + cellDisplacement});
        $('#empty').animate({'right' : "+=" + cellDisplacement});
        oldemptyPos = emptytilePosRow + "," + emptytilePosCol;
        emptytilePosCol -= 1;
        $(this).attr('data-pos', posRow + "," + (posCol+1));
    }

    //Move Right
    if (posRow == emptytilePosRow && posCol - 1 == emptytilePosCol) {
        $(this).animate({'right' : "+=" + cellDisplacement});
        $('#empty').animate({'right' : "-=" + cellDisplacement});
        oldemptyPos = emptytilePosRow + "," + emptytilePosCol;
        emptytilePosCol += 1;
        $(this).attr('data-pos', posRow + "," + (posCol-1));
    }

    //Update the empty cell's position
    $('#empty').attr('data-pos', emptytilePosRow + "," + emptytilePosCol);

    //check if the game's done
    endGame();
}

function check(tileNum, TL, TC) {

    var tileID = (tileNum == 9) ? '#empty' : '#tile' + tileNum;
    var tilePOS = TL + "," + TC;
    var test;
    
    if ($(tileID).attr('data-pos') == tilePOS){
        $(tileID).addClass("correct");
        test = true;
    }
    else{
        $(tileID).removeClass("correct");
        test = false;
    }

    return test;

}

function endGame() {

    var l1 = check(1,0,0);
    var l2 = check(2,0,1);
    var l3 = check(3,0,2);
    var l4 = check(4,1,0);
    var l5 = check(5,1,1);
    var l6 = check(6,1,2);
    var l7 = check(7,2,0);
    var l8 = check(8,2,1);
    var l9 = check(9,2,2);

    if (l1 && l2 && l3 && l4 && l5 && l6 && l7 && l8 && l9) {
        modal.style.display = "block";
        //randomizeLoop(18);
    }
    
}

function randomize() {

    var switchers = [];

    var rowPlus = emptytilePosRow + 1;
    var colPlus = emptytilePosCol + 1;
    var rowMinus = emptytilePosRow - 1;
    var colMinus = emptytilePosCol - 1;

    if (rowPlus <= 2) {
        var rp = rowPlus + "," + emptytilePosCol;
        if (rp != oldemptyPos) {switchers.push(rp);}
    }

    if (colPlus <= 2) {
        var cp = emptytilePosRow + "," + colPlus;
        if (cp != oldemptyPos) {switchers.push(cp);}
    }

    if (rowMinus >= 0) {
        var rm = rowMinus + "," + emptytilePosCol;
        if (rm != oldemptyPos) {switchers.push(rm);}
    }

    if (colMinus >= 0) {
        var cm = emptytilePosRow + "," + colMinus;
        if (cm != oldemptyPos) {switchers.push(cm);}
    }

        var tiles = [];
        tiles = $(".cell[id]");

        var goto = Math.floor(Math.random() * switchers.length);
        var gotoX = parseInt(switchers[goto].split(',')[0]);
        var gotoY = parseInt(switchers[goto].split(',')[1]);
        var gotoTile;

        for (j=0;j<tiles.length;j++) {
            if ($(tiles[j]).attr('data-pos') == switchers[goto]) {
                gotoTile = tiles[j];
            }
        }

        //Move UP
        if (gotoX + 1 == emptytilePosRow && gotoY == emptytilePosCol) {
            $(gotoTile).animate({'top' : "+=" + cellDisplacement});
            $('#empty').animate({'top' : "-=" + cellDisplacement});
            oldemptyPos = emptytilePosRow + "," + emptytilePosCol;
            emptytilePosRow -= 1;
            $(gotoTile).attr('data-pos', (gotoX+1) + "," + gotoY);
        }

        //Move Down
        if (gotoX - 1 == emptytilePosRow && gotoY == emptytilePosCol) {
            $(gotoTile).animate({'top' : "-=" + cellDisplacement});
            $('#empty').animate({'top' : "+=" + cellDisplacement});
            oldemptyPos = emptytilePosRow + "," + emptytilePosCol;
            emptytilePosRow += 1;
            $(gotoTile).attr('data-pos', (gotoX-1) + "," + gotoY);
        }

        //Move Left
        if (gotoX == emptytilePosRow && gotoY + 1 == emptytilePosCol) {
            $(gotoTile).animate({'right' : "-=" + cellDisplacement});
            $('#empty').animate({'right' : "+=" + cellDisplacement});
            oldemptyPos = emptytilePosRow + "," + emptytilePosCol;
            emptytilePosCol -= 1;
            $(gotoTile).attr('data-pos', gotoX + "," + (gotoY+1));
        }

        //Move Right
        if (gotoX == emptytilePosRow && gotoY - 1 == emptytilePosCol) {
            $(gotoTile).animate({'right' : "+=" + cellDisplacement});
            $('#empty').animate({'right' : "-=" + cellDisplacement});
            oldemptyPos = emptytilePosRow + "," + emptytilePosCol;
            emptytilePosCol += 1;
            $(gotoTile).attr('data-pos', gotoX + "," + (gotoY-1));
        }

        //Update the empty cell's position
        $('#empty').attr('data-pos', emptytilePosRow + "," + emptytilePosCol);

        endGame();

}

function randomizeLoop(lpTime) {
    for (i=0;i<lpTime;i++) randomize();
}

//testing the modal
var btn = document.getElementById("myBtn");
btn.onclick = function() {
    modal.style.display = "block";
}
