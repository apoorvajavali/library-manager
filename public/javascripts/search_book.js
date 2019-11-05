$(document).ready(function () {
    $('#search_books').submit(function(event){
    event.preventDefault();
    var $inputs = $('#search_books :input');
    var str = $inputs[0].value;
    $.ajax({
         method: "post",
         url: "/searchbook/" + str,
         success: function(res){
           $('#res_table').html(res);
         },
         error: function(err){
           console.log(err);
         }
      });
    });
});
