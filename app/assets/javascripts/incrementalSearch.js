$(function () {
  //既にあるメモの場合、そのメモidをひかえておく
  const memo_id = $(".memo_id").val();

  var memoData = "";
  var last_memoData = "";

  setInterval(function () {
    memoData = $.trim($(".js-text_field").val());
    if(last_memoData != memoData){
      last_memoData = memoData;
      mainFunc(memoData);
    }
  }, 5000);

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

      //名詞かつキーワードになる品詞を検索単語リストにいれる
      for (var item in tokens) {
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
        var html = "";
        for(var i = 0; i < data.length; i++){
          //そのメモ自身の場合はスキップ
          if (data[i].id == memo_id) continue;
          html += `<li class="memo">${data[i].content}</li>`;
        }
        $(".js-memos").prepend(html);
      });
    });
  }
});
