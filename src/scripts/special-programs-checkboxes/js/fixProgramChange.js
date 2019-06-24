import $ from 'jquery';

const fixbox = () => {
  $(() => {
    const programSelect = $('select[special="lists.specprog"]');
    programSelect.unbind('change');
    programSelect.on('change', programIDOnChange);
  });
}
export default fixbox