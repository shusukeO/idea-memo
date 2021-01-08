$(function () {
  //既にあるメモの場合、そのメモidをひかえておく
  const memo_id = $(".memo_id").val();

  var memoData = "";
  var last_memoData = "";

  setInterval(function () {
    // console.log("3秒ごとのチェック");
    memoData = $.trim($(".js-text_field").val());
    if(last_memoData != memoData){
    // console.log("変更があったので解析");
      last_memoData = memoData;
      mainFunc(memoData);
    }
  }, 3000);

  function mainFunc(memoData){
    //textareが空白のときは検索しない
    if (memoData == "") {
      $(".js-memos li").remove();
      return;
    }

    //形態素解析
    kuromoji.builder({ dicPath: "/dict" }).build(function (err, tokenizer) {
      if (err) {
        console.log(err);
        return;
      }

      var tokens = tokenizer.tokenize(memoData);

      //検索単語リスト
      var words = [];

      for (var item in tokens) {
        //名詞かつ代名詞ではない単語を検索単語リストに加える
        if (
          tokens[item]["pos"] == "名詞" &&
          (tokens[item]["pos_detail_1"] == "固有名詞" ||
            tokens[item]["pos_detail_1"] == "一般" ||
            tokens[item]["pos_detail_1"] == "サ変接続" ||
            tokens[item]["pos_detail_1"] == "形容動詞語幹" ||
            tokens[item]["pos_detail_1"] == "副詞可能" ||
            tokens[item]["pos_detail_1"] == "数")
        ) {
          words.push(tokens[item]["surface_form"]);
        }
      }

      //検索対象の単語がなければ通信しない
      if (words.length == 0) {
        $(".js-memos li").remove();
        return;
      }

      $.ajax({
        type: "GET",
        url: "/searches",
        data: { memoData: JSON.stringify(words) },
        dataType: "json",
      }).done(function (data) {
        $(".js-memos li").remove();
        $(data).each(function (i, memo) {
          //そのメモ自身の場合はスキップ
          if (memo.id == memo_id) return;
          $(".js-memos").append(`<li class="memo">${memo.content}</li>`);
        });
      });
    });
  }
});
