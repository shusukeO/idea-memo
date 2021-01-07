$(function () {
  $(".js-text_field").on("keyup", function () {
    var memoData = $.trim($(this).val());
    // console.log(memoData);

    //textareが空白のときは検索しない
    if (memoData == "") {
      $(".js-memos li").remove();
      return;
    }

    //形態素解析
    var builder = kuromoji.builder({ dicPath: "/dict" });

    builder.build(function (err, tokenizer) {
      if (err) {
        console.log(err);
        return;
      }

      var tokens = tokenizer.tokenize(memoData);

      // 結果をカンマ区切りで横並びに出力
      for (var item in tokens) {
        var result = "";
        for (var key in tokens[item]) {
          if (result.length > 0) result += ",";
          result += tokens[item][key];
        }
        console.log(result);
      }
    });

    $.ajax({
      type: "GET",
      url: "/searches",
      data: { memoData: memoData },
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
