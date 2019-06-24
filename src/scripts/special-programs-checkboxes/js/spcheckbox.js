import $ from 'jquery';
import template from '../html/spcheckboxes.html'
import '../css/special-checkboxes.css'

// Get State Student Record
var get_ssr = fetch(`/ws/schema/table/S_UT_STU_X/${psData.studentDcid}?projection=*`, {
  method: 'GET',
  credentials: 'same-origin',
  headers: {
    'Accept': 'application/json'
  }
}).then(response => response.json());
// Get ELL Exteneded Table
var get_ell = fetch(`/ws/schema/table/U_DEF_EXT_STUDENTS/${psData.studentDcid}?projection=*`, {
  method: 'GET',
  credentials: 'same-origin',
  headers: {
    'Accept': 'application/json'
  }
}).then(response => response.json());
// Get HTML page fragment to be loaded
// var page_fragment = fetch('/scripts/special-programs-checkboxes/html/spcheckboxes.html')
//   .then(response => response.text());

function put(loc, data) {
  fetch(loc, {
    method: 'PUT',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}

export default function () {
  $(() => {
    // Sets the location of program tables
    var sped_loc = "/ws/schema/table/S_UT_STU_X/" + psData.studentDcid;
    var ell_loc = "/ws/schema/table/U_DEF_EXT_STUDENTS/" + psData.studentDcid;

    // Resolve all the Fetch var
    Promise.all([get_ssr, get_ell, template])
      .then(function([state_student_record, ell, body]) {
        // Sets the current value of the program indicator
        var sped_check = state_student_record.tables.s_ut_stu_x.special_ed_indicator;
        var ell_check = ell.tables.u_def_ext_students.ell_indicator;
        // Insert above the table in the HTML page
        $(".box-round").before(body);
        //Checks to see if sped has already been checked and sets the checkbox
        if (sped_check === "true") {
          $("#sped").prop('checked', true);
        }
        //Checks to see if ell has already been checked and sets the checkbox
        if (ell_check === "true") {
          $("#ell").prop('checked', true);
        }
        // Special Education checkbox control
        $("#sped").on("change", function() {
            var value = $("#sped").is(":checked") ? "1" : "0";
            var record = {
              "id": state_student_record.id,
              "name": "S_UT_STU_X",
              "tables": {
                "S_UT_STU_X": {
                  "special_ed_indicator": value
                }
              }
            }
            put(sped_loc, record)
          })
          // ELL checkbox control
        $("#ell").on("change", function() {
          var value = $("#ell").is(":checked") ? "1" : "0";
          var record = {
            "id": ell.id,
            "name": "U_DEF_EXT_STUDENTS",
            "tables": {
              "U_DEF_EXT_STUDENTS": {
                "ell_indicator": value
              }
            }
          }
          put(ell_loc, record)
        })
      })
  });
}
