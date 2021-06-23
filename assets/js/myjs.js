$( document ).ready(function(){
    $('td').addClass('bingocell');

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

    function markCellColor(cell){
        if(cell.children('span').length>0 && !cell.hasClass('bg-primary')){
            cell.addClass('bg-primary text-white');
        }else if(cell.children('span').length==0 && cell.hasClass('bg-primary')){
            cell.removeClass('bg-primary text-white');
        }
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