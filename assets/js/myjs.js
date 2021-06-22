$( document ).ready(function(){
    $('td').addClass('bingocell');
    $('.bingocell').click(function(){
        $(this).addClass('checked');
    });
});