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

  $(document).ready( function(){

    var get_ssr = fetch(`/ws/schema/table/S_UT_STU_X/${psData.studentDcid}?projection=*`, {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => response.json())

    var get_ell = fetch(`/ws/schema/table/U_DEF_EXT_STUDENTS/${psData.studentDcid}?projection=*`, {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => response.json())

    var page_fragment = fetch('/scripts/special-programs-checkboxes/html/spcheckboxes.html')
      .then(response => response.text())

    Promise.all([get_ssr, get_ell, page_fragment])
      .then(function([state_student_record, ell, body]) {
        $(".box-round").before(body);
          // Special Education checkbox control
          if(state_student_record.tables.s_ut_stu_x.special_ed_indicator === "true"){
            $("#sped").prop('checked', true);
          }
          if(ell.tables.u_def_ext_students.ell_indicator === "true"){
            $("#ell").prop('checked', true);
          }

          $("#sped").on("change", function(){
            var value = $("#sped").is(":checked") ? "1" : "0";
            var record = {
              "id": state_student_record.id,
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
          // ELL checkbox control
          $("#ell").on("change", function(){
            var value = $("#ell").is(":checked") ? "1" : "0";
            var record = {
              "id": ell.id,
              "name": "U_DEF_EXT_STUDENTS",
               "tables":{
              	  "U_DEF_EXT_STUDENTS":{
              		 "ell_indicator": value
              	  }
               }
            }

            $.put("/ws/schema/table/U_DEF_EXT_STUDENTS/"+psData.studentDcid, JSON.stringify(record), function(data){
              console.log("Changes have been saved!");
            }, "json", "application/json; charset=utf-8");

          })
        })
      })
})($j);
