$(function () {
  $('.js-text_field').on('keyup', function () {
    var memoData= $.trim($(this).val());
    // console.log(memoData);

    //textareが空白のときは検索しない
    if(memoData == "") return;

    $.ajax({
      type: 'GET',
      url: '/searches',
      data:  { memoData: memoData },
      dataType: 'json'
    })
    .done(function (data) {

      console.log(data);

      $('.js-memos li').remove();

      $(data).each(function(i,memo) {
        $('.js-memos').append(
          `<li class="memo">${memo.content}</li>`
        );
      });
    })

  });
});