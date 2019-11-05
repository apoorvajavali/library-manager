$(document).ready(function () {
    $('#addborrower').submit(function(event){
    event.preventDefault();
    var $inputs = $('#addborrower :input');
    var data = {
      fname: $inputs[0].value,
      lname: $inputs[1].value,
      ssn: $inputs[2].value,
      phone: $inputs[3].value,
      street: $inputs[4].value,
      city: $inputs[5].value,
      state: $inputs[6].value
    }
    $.ajax({
         method: "post",
         url: "/addborrower" ,
         json: true,
         data: data,
         success: function(res){
           if(res == "success"){
             $(".modal").modal("show");
           }else{
             alert(res.sqlMessage);
           }
         },
         error: function(err){
           console.log(err);
         }
      });
    });
});
