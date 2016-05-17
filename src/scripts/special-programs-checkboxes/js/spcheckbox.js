(function ($){
  //init a put request
  function _ajax_request(url, data, callback, method) {
      return jQuery.ajax({
          url: url,
          type: method,
          data: data,
          success: callback
      });
  }
  jQuery.extend({
      put: function(url, data, callback) {
          return _ajax_request(url, data, callback, 'PUT');
  }});
  //gets state_student_record
  function get_state_student_record(){
    return $.get("/ws/schema/table/S_UT_STU_X/"+psData.studentDcid+"?projection=*").done(
      function (data){
        return data;
      }
    );
  }

  var state_student_record = get_state_student_record();

  $(document).ready( function(){
    //inserts html template before box-round element
    $(".box-round").before($("#spcheckbox").html());

    $("#sped").on("change", function(){
      var value = $("#sped").val();
      var record = {
         "tables":{
        	  "S_UT_STU_X":{
        		 "studentsdcid": psData.studentDcid,
        		 "special_ed_indicator": value
        	  }
         }
      }
      if(!_.property('tables.S_UT_STU_X.special_ed_indicator')(state_student_record)){
        $.post("/ws/schema/table/S_UT_STU_X", record, function(data){
          console.log(data);
        }, "json");
      }else {
        record.id = state_student_record;
        record.name = "S_UT_STU_X";
        $.put("/ws/schema/table/S_UT_STU_X/"+psData.studentDcid, record, function(data){
          console.log(data);
        }, "json");
      }

    })
  });

})($j);
