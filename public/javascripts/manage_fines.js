$(document).ready(function (){

  $(".clickable").click(function(e) {
      var data = $(this).children("td").map(function() {
          return $(this).text();
      }).get();
      if(data[4] == "Yes"){
        e.stopPropagation();
        $("#paymentDoneModal").modal("show");
      }
  });

  $('#payModal').modal({
      keyboard: true,
      backdrop: "static",
      show:false
  }).on('show.bs.modal', function(event){
        var loan_id = $(event.relatedTarget).find('td:first-child').text();
        var amt = $(event.relatedTarget).children()[3].innerText
        $("#loan_id").val(loan_id);
        $("#fine_amount").val(amt);
  });

  $("#update").click(function(){
    $.ajax({
         method: "get",
         url: "/managefine/update",
         success: function(res){
           if(res == "success"){
             $("#updateModal").modal("show");
             $('#updateModal').modal({
                 keyboard: true,
                 backdrop: "static",
                 show:false
             }).on('hidden.bs.modal', function(event){
                   $("#allfineform").submit()
             });
           }
         },
         error: function(err){
           console.log(err);
         }
      });
  });

  $("#submitPayment").click(function(event){
    var data = {
                  fine_amount: $("#fine_amount").val(),
                  loan_id: $("#loan_id").val()
              }
    $.ajax({
         method: "post",
         url: "/managefine/pay" ,
         json: true,
         data: data,
         success: function(res){
           $("#payModal").modal('toggle');
           if(res == "success"){
             $("#successModal").modal('show');
             $('#successModal').modal({
                 keyboard: true,
                 backdrop: "static",
                 show:false
             }).on('hidden.bs.modal', function(event){
                   $('#allfineform').submit();
             });
           }else if(res == "notcheckedin"){
              $("#notcheckedinModal").modal('show');
           }else{
            alert((res.sqlMessage))
          }
         },
         error: function(err){
           console.log(err);
         }
      });
  });
})
