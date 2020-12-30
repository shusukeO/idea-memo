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

- BootStrap samples https://getbootstrap.com/docs/4.3/examples/

- 上のメニューバーテンプレート https://getbootstrap.com/docs/4.3/examples/pricing/

- Devise への Bootstrap の適用 https://url4u.jp/rails-523-devise-bootstrap/
