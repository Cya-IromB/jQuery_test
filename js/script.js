/*
使用関数
closest()
addClass()
removeClass()
find()
text()
*/

window.addEventListener('DOMContentLoaded',
  function(){



    const MSG_ER_ZERO = "必須入力です";
    const MSG_ER_OVER = "文字以内で入力してください";
    const MSG_ER_EMAIL = "E.mail形式で入力してください";
    const MSG_ER_NOT_HANKAKU ="半角英数で入力してください。";
    const MSG_ER_OK = "OK!";

    const dom_zero = document.querySelector('#js-zero');
    const dom_over = document.querySelector('#js-over');
    const dom_email = document.querySelector('#js-email');
    const dom_hankaku = document.querySelector('#js-eisuu');
    const dom_zero_over = document.querySelector('#js-zero-over');

    dom_zero.addEventListener('keyup',function(){
      isOk = validZero(dom_zero);
    });

    dom_over.addEventListener('keyup',function(){
      isOk = validOver(dom_over, 20);
    });

    dom_email.addEventListener('keyup',function(){
      validEmail(dom_email);
    });

    dom_hankaku.addEventListener('keyup',function(){
      validHankaku(dom_hankaku);
    });

    dom_zero_over.addEventListener('keyup',function(){
      let isOk = false;
      isok = validZero(dom_zero_over);
      if(isok){
        isok = validOver(dom_zero_over, 30);
      }
    });


    //=========================================================================
    function validZero(dom){
      let info = dom.parentNode.querySelector('.info');

      if (dom.value.length === 0) {
        classChanger_ng(info);
        info.textContent = MSG_ER_ZERO;
        return false;

      }else{
        classChanger_ok(info);
        info.textContent = MSG_ER_OK;
        return true;
      }
    }

    function validOver(dom, max){
      let info = dom.parentNode.querySelector('.info');

      if (dom.value.length > max) {
        classChanger_ng(info);
        info.textContent = MSG_ER_OVER + ' : ' + max + '文字以内';
        return false;

      }else{
        classChanger_ok(info);
        info.textContent = MSG_ER_OK;
        return true;
      }
    }

    function validEmail(dom){
      let info = dom.parentNode.querySelector('.info');

      if (dom.value.match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
        classChanger_ok(info);
        info.textContent = MSG_ER_OK;
        return true;

      }else{
        classChanger_ng(info);
        info.textContent = MSG_ER_EMAIL;
        return false;
      }
    }

    function validHankaku(dom){
      let info = dom.parentNode.querySelector('.info');

      if (dom.value.match(/^[a-zA-Z0-9]+$/)){
        classChanger_ok(info);
        info.textContent = MSG_ER_OK;
        return true;

      }else{
        classChanger_ng(info);
        info.textContent = MSG_ER_NOT_HANKAKU;
        return false;
      }
    }

    //=========================================================================

    function classChanger_ok(dom){
      dom.classList.remove('js-error-none');
      dom.classList.remove('js-error-ng');
      dom.classList.add('js-error-ok');
    };

    function classChanger_ng(dom){
      dom.classList.remove('js-error-none');
      dom.classList.remove('js-error-ok');
      dom.classList.add('js-error-ng');
    };

  },false
);
