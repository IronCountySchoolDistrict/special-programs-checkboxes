import $ from 'jquery';

export default function() {
  $(() => {
    const programSelect = $('select[special="lists.specprog"]');
    programSelect.unbind('change');
    programSelect.on('change', programIDOnChange);
  });
}
