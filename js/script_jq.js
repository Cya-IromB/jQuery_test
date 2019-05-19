$(function(){

  $('#js-zero').keyup(function(){
    let info = $(this).closest('label').find('.info');

    //チェックをパスする方を先に書いている。
    if(!($(this).val().length === 0)){
      classChange(true, info);
      $(info).text('OK!');

    }else{
      classChange(false, info);
      $(info).text('必須入力です');
    }
  });

  $('#js-over').keyup(function(){
    let info = $(this).closest('label').find('.info');
    const MAX = 10;

    if($(this).val().length > MAX){
      classChange(true, info);
      $(info).text('OK');

    }else{
      classChange(false, info);
      $(info).text(MAX + '字以上で入力してください!');
    }
  });

  $('#js-email').keyup(function(){
    let info = $(this).closest('label').find('.info');

    if($(this).val().match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
      classChange(true, info);
      $(info).text('OK');

    }else{
      classChange(false, info);
      $(info).text('email形式ではありません！');
    }
  });

  $('#js-eisuu').keyup(function(){
    let info = $(this).closest('label').find('.info');

    if($(this).val().match(/^[a-zA-Z0-9]+$/)){
      classChange(true, info);
      $(info).text('OK');

    }else{
      classChange(false, info);
      $(info).text('半角英数で入力してください！');
    }
  });

  $('#js-zero-over').keyup(function(){
    let isSuccess = true;
    let MAX = 10;
    let info = $(this).closest('label').find('.info');

    //必須入力パターン//=========================================================================
    //チェックをパスする方を先に書くため反転してる。
    if(!($(this).val().length === 0)){
      isSuccess = true;
      classChange(true, info);
      $(info).text('OK!');

    }else{
      isSuccess = false;
      classChange(false, info);
      $(info).text('必須入力です');
    }

    //文字数制限//=========================================================================
    if(isSuccess){
      if($(this).val().length < MAX){
        isSuccess = true;
        classChange(true, info);
        $(info).text('OK');

      }else{
        isSuccess = false;
        classChange(false, info);
        $(info).text(MAX + '文字以下で入力してください!');
      }

      //正直エラーの種類を関数化して複数個所で使えるようにしつつ、switchで分岐が良かった説
    }
  });



});

function classChange(isOk, info){
  if(isOk){
    $(info).
    removeClass('js-error-none').
    removeClass('js-error-ng').
    addClass('js-error-ok');

  }else{
    $(info).
    removeClass('js-error-none').
    removeClass('js-error-ok').
    addClass('js-error-ng');
  }
}
