jQuery(function(){




});

function validBase(target, validType) {
  $(target).keyup(function(){
    const form = $(target).closest();

    if(validType){
      form.classChange_ok(form);
    }else{
      form.classChange_ng(form);
    }

    infoText(form, validType.msg);

  });
}

//=========================================================================
function classChange_ok(selector) {
  $(selector).
  removeClass('.js-error-none').
  removeClass('.js-error-ng').
  addClass('.js-error-ok');
}
function classChange_ng(selector) {
  $(selector).
  removeClass('.js-error-none').
  removeClass('.js-error-ok').
  addClass('.js-error-ng');
}
function infoText(form, str) {
  form.find('.info').text(str);

}
//=========================================================================
