$(document).ready(function () {
    $('#search_loans').submit(function(event){
    event.preventDefault();
    var $inputs = $('#search_loans :input');
    var str = $inputs[0].value;
    $.ajax({
         method: "post",
         url: "/searchbookloan/" + str,
         success: function(res){
           $('#loan_table').html(res);
         },
         error: function(err){
           console.log(err);
         }
      });
    });
});
