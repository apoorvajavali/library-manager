$(document).ready(function () {

  $(".clickable-row").click(function(e) {
    var data = $(this).children("td").map(function() {
        return $(this).text();
    }).get();
    if(data[3] == "No"){
      e.stopPropagation();
      $("#cannotCheckoutModal").modal("show");
    }
  });

  $(function(){
      $('#checkoutModal').modal({
          keyboard: true,
          backdrop: "static",
          show:false
      }).on('show.bs.modal', function(event){
            $("#card_id").val("");
            var isbn = $(event.relatedTarget).find('td:first-child').text();
            $("#isbn").val(isbn);
            var current_date = new Date;
            $("#date_out").val(current_date.toLocaleDateString());
            current_date.setDate(current_date.getDate() + 14);
            var due_date = current_date;
            $("#due_date").val(due_date.toLocaleDateString());
      });

      $('#successModal').modal({
          keyboard: true,
          backdrop: "static",
          show:false
      }).on('hidden.bs.modal', function(event){
            $('#search_books').submit();
      });
  });

  $("#submitBookloan").click(function(event){
    var data = {
                  isbn: $("#isbn").val(),
                  card_id: $("#card_id").val(),
                  date_out: $("#date_out").val(),
                  due_date: $("#due_date").val()
              }
    $.ajax({
         method: "post",
         url: "/addbookloan" ,
         json: true,
         data: data,
         success: function(res){
           $("#checkoutModal").modal('toggle');
           if(res == "success"){
             $("#successModal").modal('show');
           }
          else if(res == "exceeded"){
            $("#exceedModal").modal('show');
          }else{
            alert((res.sqlMessage))
          }
         },
         error: function(err){
           console.log(err);
         }
      });
  });

});
