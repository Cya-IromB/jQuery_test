/*
正直大量に失敗した。
反省点

1.あとから複数のエラーの状態を表記する仕様変更でもあった際に大工事になる
2.エラーの種類を増やしづらい
3.テキスト表示の処理に最大文字数等を渡すのが回りくどくなっている。
4.定数にエラーメッセージを格納しつつフラグ管理も一緒にやらせるも、複数の変数を噛ませられなくなる手法だった
5.そもそも動かない。主に後述の致命的な間違い
6.ぶっちゃけ一つ処理書いてコピペした方が、可読性でも作業時間で見ても遥かにマシだった
7.今回関数にまとめるのはinfoTextとclassChangeあたりだけに留めておくべきだった

致命的なミス:
html側でjquery用ではなくバニラjs用のファイルを読み込んで作業する。
気づいたのがほぼ完成直後だったため、バグの量も多すぎるが故に全部作り直すほうが早くなる。
しかし気づいたことや気づいた失敗はそこそこあるし、決して無駄ではなかったけれど、本番でやったら…。

反省まとめ:
jQueryと自作関数の組み合わせで色々回りくどいやり方を試みすぎた。
そして読み込むファイルを間違える致命的なミスや確認不足。
せめて本流側を先に書いてから各パーツとなる関数を作る順番であればもう少し必要な関数を絞れたし、
確認しながらのコーディングだって出来たはず。
これまでで最も反省の多いファイルだった。

//これらの定数は後述のvalidTypeを判定する役割も持たせている。
//よく考えたらこの形式だとx文字以上y文字以下が表現できない。
*/

const ERROR_LENGTH_ZERO = '必須入力です！';
const ERROR_LENGTH_LESSTHAN = '文字以上で入力してください！';
const ERROR_LENGTH_OVER = '文字以内で入力してください！';
const ERROR_NOT_EMAIL = 'E.メールの形式で入力してください！';
const ERROR_NOT_HANKAKU = '入力は半角英数字のみ受け付けております！';

jQuery(function(){
  $('#js-zero').keyup(function () {
    let isSuccess = $(this).val().length === 0 ? false : true;
    $(this).validBase(this, isSuccess, ERROR_LENGTH_ZERO);
  });

  $('#js-over').keyup(function () {
    const MAX = 20;
    let isSuccess = $(this).val().length > MAX ? true : false;

    $(this).validBase(this, isSuccess, ERROR_LENGTH_OVER, MAX);
  });

  $('#js-email').keyup(function () {
    let isSuccess =
    $(this).val().match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) ? true : false;

    $(this).validBase(this, isSuccess, ERROR_NOT_EMAIL);
  });

  $('#js-eisuu').keyup(function () {
    let isSuccess = false;
    isSuccess = $(this).val().match(/^[a-zA-Z0-9]+$/) ? true : false;

    $(this).validBase(this, isSuccess, ERROR_NOT_HANKAKU);
  });

  $('#js-zero-over').keyup(function () {
    let isSuccess = true;
    const MAX = 30;

    //文字数0
    if($(this).val().length === 0){
      isSuccess = false;
      $(this).validBase(this, isSuccess, ERROR_LENGTH_ZERO);
    }

    ///文字数超過
    if(isSuccess && $(this).val().length > MAX){
      isSuccess = false;
      $(this).validBase(this, isSuccess, ERROR_LENGTH_OVER, MAX);
    }
  });
});

//バリデーション処理の基本となる関数。
function validBase(target, isSuccess, validType, val1, val2) {
  $(target).keyup(function(){
    const form = $(target).closest();

    if(isSuccess){
      form.classChange_ok(form);
    }else{
      form.classChange_ng(form);
    }

    let text = '';
    switch(validType){
      case ERROR_LENGTH_ZERO : text = ERROR_LENGTH_ZERO ;break;
      case ERROR_LENGTH_LESSTHAN : text = val1 + ERROR_LENGTH_LESSTHAN ;break;
      case ERROR_LENGTH_OVER : text = val1 + ERROR_LENGTH_OVER ;break;
      case ERROR_NOT_EMAIL : text = ERROR_NOT_EMAIL ;break;
      case ERROR_NOT_HANKAKU : text = ERROR_NOT_HANKAKU ;break;
      default : text = '※未知のエラーです！！' ;break;
    }

    infoText(form, text);
  });
}

//=========================================================================

//完成
function classChange_ok(selector) {
  $(selector).
  removeClass('.js-error-none').
  removeClass('.js-error-ng').
  addClass('.js-error-ok');
}
//完成
function classChange_ng(selector) {
  $(selector).
  removeClass('.js-error-none').
  removeClass('.js-error-ok').
  addClass('.js-error-ng');
}

//現状、この関数では一つのメッセージしか表示できない。
//しかし表示するエラーメッセージは一つに絞るのが一般的であるため、是非の議論はしない。
function infoText(form, str) {
  form.find('.info').text(str);
}
//=========================================================================
