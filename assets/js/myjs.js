$( document ).ready(function(){

    // Add player's name to the bingo cell
    function addName(cell){
        if (cell.children('span').length==0){
            if($('#dialog').children('input')[0].value != ""){
                cell.append(document.createElement('span'));
                cell.children('span')[0].innerHTML=$('#dialog').children('input')[0].value;
            } else{
                return false;
            }
        }else{
            if($('#dialog').children('input')[0].value == ""){
                cell.children('span')[0].remove();
            }else{
                cell.children('span')[0].innerHTML=$('#dialog').children('input')[0].value;
            }
        }
    }

    //change the color of the cell
    function markCellColor(cell){
        if(cell.children('span').length>0 && !cell.hasClass('bg-primary')){
            cell.addClass('bg-primary text-white');
        }else if(cell.children('span').length==0 && cell.hasClass('bg-primary')){
            cell.removeClass('bg-primary text-white');
        }
    }

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

    // append the table to the main html
    $("#bingo").append(tableContent);
    // give each cell a classname bingocell
    $('td').addClass('bingocell');

    // Make a full question list from the json file
    const questionsFL = [];
    for (let i = 0; i<questions.cybervsr.length; i++){
        questionsFL[i]=questions.cybervsr[i];
    }

    // Randomly select 25 questions from the full 
    // question list and populate the table
    for (let i =0; i<$('.bingocell').length; i++){
        let random_num = Math.floor(Math.random() * questionsFL.length);
        $('.bingocell')[i].innerHTML = questionsFL[random_num];
        questionsFL.splice(random_num, 1);
    }


    $('.bingocell').click(function(){
        var $thisCell = $(this);

        //if there was a name, user will see the name in the input box. If not, then blank. 
        if($thisCell.children('span').length==0){
            $('#dialog').children('input')[0].value = "";
        }else{
            $('#dialog').children('input')[0].value = $thisCell.children('span')[0].innerHTML;
        }
        
        $('#dialog').dialog({
            buttons: [
                {
                    id: "sendNameBtn",
                    text: "Ok",
                    click: function() {
                        addName($thisCell);
                        markCellColor($thisCell);
                        $( this ).dialog( "close" );
                    }
                },
                {
                    text: "Cancel",
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