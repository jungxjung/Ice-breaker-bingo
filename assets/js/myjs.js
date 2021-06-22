$( document ).ready(function(){
    $('td').addClass('bingocell');
    $('.bingocell').click(function(){
        $(this).toggleClass('bg-primary text-white');
        if($(this).children('span').length==0){
            $('#dialog').dialog({
                buttons: [
                    {
                        text: "Ok",
                        click: function() {
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
        }
    });
});