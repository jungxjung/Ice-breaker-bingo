
// Load questions to the bingo table randomly from json
function loadQuestion(){
    var questionsFL = [];
    for (let i = 0; i<questions.edx.length; i++){
    questionsFL[i]=questions.edx[i];
        }
    // Randomly select 25 questions from the full 
    // question list and populate the table
    for (let i =0; i<$('.bingocell').length; i++){
        let random_num = Math.floor(Math.random() * questionsFL.length);
        $('.bingocell')[i].innerHTML = questionsFL[random_num];
        questionsFL.splice(random_num, 1);
    }

    $('.bingocell').removeClass('bg-primary text-white');
    countCheckedCell();
    countCheckedLine();
}

// Add player's name to the bingo cell
function addName(cell){
    if (cell.children('span').length==0){
        if($('#dialog').children('input')[0].value != ""){
            cell.prepend(document.createElement('span'));
            cell.children('span').text($('#dialog').children('input')[0].value);
        } else{
            return false;
        }
    }else{
        if($('#dialog').children('input')[0].value == ""){
            cell.children('span')[0].remove();
        }else{
            cell.children('span').text($('#dialog').children('input')[0].value);
        }
    }
}

function clearName(cell){
    $('#dialog').children('input')[0].value = "";
    if(cell.children('span').length>0){
        cell.children('span')[0].remove();
    }
}

function countCheckedCell(){
    let counter=0;
    $('.bingocell').each(function(){
        if($(this).hasClass('bg-primary')){
            counter++;
        }
    })

    if (counter == 1 && counter > $("#num-cell-checked").text()){
        $("#bingoAlert").html("<b>Congratulation!</b>&#127881; You finished your first box!");
        $("#bingoAlert").show(800, function(){
            setTimeout(function(){$("#bingoAlert").hide(500);},2000);
        });
    }else if (counter>0 && counter%5 == 0 && counter > $("#num-cell-checked").text()){
        $("#bingoAlert").html("&#9994;Good job! You finished <b>"+ counter +"</b> boxes!");
        $("#bingoAlert").show(800, function(){
            setTimeout(function(){$("#bingoAlert").hide(500);},2000);
        });
    }

    $('#num-cell-checked').text(counter);
}



function countCheckedLine(){
    let counter=0;
    $('#bingo tr').each(function(){
        if($(this).children('.bg-primary').length==$(this).children('td').length){
            counter++;
        }
        
    });

    var bingoTR = document.querySelectorAll('#bingo tr');
    let tempCounter2 = 0; // counter for cells on the diagonal line
    let tempCounter3 = 0; // counter for cells on the diagonal line
    for (let i = 0; i < bingoTR.length; i++){
        let tempCounter = 0;
        // Check Vertical lines
        for (let j =0; j < bingoTR.length; j++){
            if (bingoTR[j].children[i].classList.contains('bg-primary')){
                tempCounter++;
            }
        }
        if(tempCounter == 5){
            counter++;
        }

        // Check diagonal line 1
        if (bingoTR[i].children[i].classList.contains('bg-primary')){
            tempCounter2++;
        }
        if (tempCounter2==5){
            counter++;
        }

        // Check diagonal line 2
        if(bingoTR[i].children[4-i].classList.contains('bg-primary')){
            tempCounter3++;
        }
        if (tempCounter3==5){
            counter++;
        }
    }

    // when user completed a new line, show a alert box
    if(counter > $("#num-line-checked").text()){
        $("#bingoAlert").html(" &#127942; &#127942;<b>Congratulation!</b>&#128047; You finished " + counter + " line(s)!");
        $("#bingoAlert").show(800, function(){
            setTimeout(function(){$("#bingoAlert").hide(500);},2000);
        });
    }
    $('#num-line-checked').text(counter);
}

//change the color of the cell if it is selected
function markCellColor(cell){
    if(cell.children('span').length>0 && !cell.hasClass('bg-primary')){
        cell.addClass('bg-primary text-white');
    }else if(cell.children('span').length==0 && cell.hasClass('bg-primary')){
        cell.removeClass('bg-primary text-white');
    }
}


$( document ).ready(function(){
    var user = prompt("Please enter your name", "Harry Potter");
    if (user != null){
        $('#greet').text('Hello, '+ user + "!");
        $('#bingo-heading').text(user+"'s bingo card");
    }


    // To enable tooltips
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })

    // build a empty bingo table
    var tableContent;
    var num_row, num_col;
    num_row = 5;
    num_col = num_row;
    tableContent = "<table class='table table-bordered text-center'><tbody>";
    for (let i=0; i<num_row; i++){
        tableContent += "<tr>";
        for (let j = 0; j<num_col; j++){
            tableContent += "<td></td>";
        }
        tableContent += "</tr>";
    }
    tableContent += "</tbody></table>"

    $("#bingo").append(tableContent); // append the table to the main html
    
    $('td').addClass('bingocell'); // give each cell a classname bingocell

    loadQuestion();  // populate the table with questions


    $('.bingocell').click(function(){
        var $thisCell = $(this);

        //if there was a name, user will see the name in the input box. If not, then blank. 
        if($thisCell.children('span').length==0){
            $('#dialog').children('input')[0].value = "";
        }else{
            $('#dialog').children('input')[0].value = $thisCell.children('span')[0].innerHTML;
        }
        var $cellQ = $thisCell.contents().filter(function() {
            return this.nodeType == Node.TEXT_NODE;
          }).text();
          $('#dialog').children('p').text($cellQ);

        //$('#dialog').children('p').text($thisCell[0].childNodes[0].nodeValue);
        
        $('#dialog').dialog({
            buttons: [
                {
                    id: "sendNameBtn",
                    text: "Ok",
                    click: function() {
                        addName($thisCell);
                        markCellColor($thisCell);
                        countCheckedCell();
                        countCheckedLine();
                        $( this ).dialog( "destroy" );
                    }
                },
                {
                    text: "Clear",
                    click: function(){
                        clearName($thisCell);
                        markCellColor($thisCell);
                        countCheckedCell();
                        countCheckedLine();
                        $( this ).dialog( "destroy" );
                    }
                },
                {
                    text: "Close",
                    click: function() {
                        $( this ).dialog( "close" );
                    }
                }
            ]
        });
        $('#dialog').keydown(function(e) {
            if (e.which == 13){
                $('#sendNameBtn').click();
            }
        });
    });
});

