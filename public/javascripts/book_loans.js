$(document).ready(function () {
  var loan_id;

  $(".clickable-row").click(function(e) {
    var data = $(this).children("td").map(function() {
        return $(this).text();
    }).get();
    if(data[6] == 'Yes'){
      e.stopPropagation();
      $("#infoModal").modal("show");
    }else{
      loan_id = data[0];
      isbn = data[1];
    }
  });

  $(function(){
      $('#successModal').modal({
          keyboard: true,
          backdrop: "static",
          show:false
      }).on('hidden.bs.modal', function(event){
            $('#search_loans').submit();
      });
  });

  $("#submitCheckIn").click(function(event){
    var data = {
                  loan_id: loan_id,
                  date_in: new Date().toLocaleDateString(),
                  isbn: isbn
              }
    $.ajax({
         method: "post",
         url: "/addcheckindate" ,
         json: true,
         data: data,
         success: function(res){
           $("#checkinModal").modal('toggle');
           if(res == "success"){
             $("#successModal").modal('show');
           }else{
            alert(res.sqlMessage)
          }
         },
         error: function(err){
           console.log(err);
         }
      });
  });

});
