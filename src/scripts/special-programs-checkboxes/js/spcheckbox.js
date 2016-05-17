(function ($){
  //init a put request
  function _ajax_request(url, data, callback, dataType, contentType, method) {
      return jQuery.ajax({
          url: url,
          type: method,
          data: data,
          success: callback,
          dataType: dataType,
          contentType: contentType
      });
  }
  jQuery.extend({
      put: function(url, data, callback, dataType, contentType) {
          return _ajax_request(url, data, callback, dataType, contentType, 'PUT');
  }});
  //gets state_student_record
  function get_state_student_record(){
    return $.getJSON("/ws/schema/table/S_UT_STU_X/"+psData.studentDcid+"?projection=*").done(
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
      var value = $("#sped").is(":checked") ? "1" : "0";
      var record = {
        "id": JSON.parse(state_student_record.responseText).id,
        "name": "S_UT_STU_X",
         "tables":{
        	  "S_UT_STU_X":{
        		 "special_ed_indicator": value
        	  }
         }
      }

      $.put("/ws/schema/table/S_UT_STU_X/"+psData.studentDcid, JSON.stringify(record), function(data){
        console.log("Changes have been saved!");
      }, "json", "application/json; charset=utf-8");

    })
  });

})($j);
