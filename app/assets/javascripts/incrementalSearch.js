$(function () {
  $(".js-text_field").on("keyup", function (e) {
    //Enter以外だったらスルー
    if (e.keyCode != 13) return;

    var memoData = $.trim($(this).val());
    // console.log(memoData);

    //textareが空白のときは検索しない
    if (memoData == "") {
      $(".js-memos li").remove();
      return;
    }

    // console.log("形態素解析スタート");

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

        // console.log(tokens[item]["surface_form"]);
        // console.log(tokens[item]["pos"]);
        // console.log(tokens[item]["pos_detail_1"]);
      }

      //検索対象の単語がなければ通信しない
      if (words.length == 0) {
        $(".js-memos li").remove();
        return;
      }

      var json = JSON.stringify(words);

      $.ajax({
        type: "GET",
        url: "/searches",
        data: { memoData: json },
        dataType: "json",
      }).done(function (data) {
        // console.log(data);
        $(".js-memos li").remove();
        $(data).each(function (i, memo) {
          $(".js-memos").append(`<li class="memo">${memo.content}</li>`);
        });
      });
    });
  });
});
