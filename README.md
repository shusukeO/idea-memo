# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

- Ruby version

- System dependencies

- Configuration

- Database creation

- Database initialization

- How to run the test suite

- Services (job queues, cache servers, search engines, etc.)

- Deployment instructions

- ...

## 参考文献

- erb ファイルのコメントアウト。複数行コメントアウトがこれでできる。 http://rails.takayukikoyama.com/erb/erb-comment/

```erb
<% if false %>
コメントです。表示されません。
<%= @model.data %>
<% end %>
```

- ログインユーザによって表示を分ける。 create の際に自動で紐付けて、index での一覧表示の際に表示を制限し、url 直叩きで他人の投稿を edit 等されるのを防ぐ https://note.com/eugenenzv8/n/n48983aa56896

- redirect_to について https://pikawaka.com/rails/redirect_to

```rb
redirect_to  controller: :モデル名, action: :indexとか
```

- where でユーザのデータ取得 https://qiita.com/nakayuu07/items/3d5e2f8784b6f18186f2

```rb
@memos = Memo.where(user_id: current_user.id)
```

- rails に Bootstrap4 導入 https://freesworder.net/rails-bootstrap/

- BootStrap samples https://getbootstrap.com/docs/4.3/examples/

- 上のメニューバーテンプレート https://getbootstrap.com/docs/4.3/examples/pricing/

- Devise への Bootstrap の適用 https://url4u.jp/rails-523-devise-bootstrap/

- Bootstrap のボタンを押して、rails のアクションを実行 https://qiita.com/drwtsn64/items/4e94caeaa392fbe4f289

```erb
<%= button_to memo, method: :delete, data: { confirm: 'Are you sure?' }, class: 'btn btn-secondary' do%>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
          <% end%>
```

Destroy はこんな感じで書いた。アイコン付き。

- Bootstrap カラムの縦積みで、縦に余白をもたせる https://tonari-it.com/column-margin/

```erb
<div class="col-sm-3"　style="margin-bottom:10px;">
```

- css 横並び両端寄せ https://infoteck-life.com/a0366-css-left-right/
  一個上の階層にこれを書くだけで ok

```html
style="display: flex; justify-content: space-between;"
```

- db 確認 https://qiita.com/kouuuki/items/b6e1a4318d8feee24c9f

- 日本時間で作成日表示 https://qiita.com/jnchito/items/831654253fb8a958ec25

- footer の css https://www.tipdip.jp/tips_posts/production/2213/

- textare の css https://developer.mozilla.org/ja/docs/Web/HTML/Element/textarea

- rails6 jquery 導入。今回は昔ながらの assets に入れる方法を選択。 https://qiita.com/kazutosato/items/d47b7705ee545de4cb1a

- ↑ これにアセットをコンパイルするようにしなければならない https://qiita.com/sanriyochan/items/99d63e8a8691eb29fa4c

- rails + jquery インクリメンタルサーチ https://pikawaka.com/rails/ajax-jquery

- kuromoji.js で形態素解析 https://ushinji.hatenablog.com/entry/2017/11/29/225053

- ファイルの階層構造を意識した js スクリプトを書きたければ、そのファイルが含まれるフォルダを assets ではなく、public におく
