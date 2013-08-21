(function() {

  // ----------
  // Model
  // ----------
  var Task = Backbone.Model.extend({
    defaults: { // defaultsでModelの初期値を与えることができる
      title: "do something!",
      completed: false
    },
    /*
     * toggle: function() { // メソッド
     *   this.set('completed', !this.get('completed'));
     * },
     * validate: function(attrs) {
     *   if (_.isEmpty(attrs.title)) { // underscore.jsの機能
     *     return 'title must not be empty!';
     *   }
     * }
     */
  });

  /*
   * var task1 = new Task({
   *   completed: true
   * });
   */

  /*
   * task1.set('title', 'newTitle'); // モデルのセッター
   * var title = task1.get('title'); // モデルのゲッター
   * console.log(title); 
   */

  /*
   * console.log(task1.toJSON()); // toJSON()でいらない情報をださずにデバッグ
   * task1.set({title : ''}, {validate: true}); // setterをオブジェクトで渡してvalidateionを有効にする
   * // task1.toggle();
   * console.log(task1.toJSON());
   */
  var task = new Task();

  // ----------
  // View
  // View = WebApplicationFrameworkでいうController みたいなもんかな
  // ----------
  var TaskView = Backbone.View.extend({
    tagName : 'li',
    // className : 'liClass', // classとidもつけることができる
    // id : 'liId',
    // template : _.template("<%- title %>"), // underscore.jsは便利なライブラリ集
    template : _.template($('#task-template').html()), // 上記のテンプレート文字列を外部化してindex.htmlに書く。
    render: function() {
      var template = this.template(this.model.toJSON()); //task.titleをテンプレートに流し込んだ結果が入る
      this.$el.html(template);
      return this; // チェーン的に呼び出したいので、thisを返すのがベストプラクティス
    },
    /*
     * events: {
     *   // 'click' : 'sayHello' // clickイベント時にコールされるメソッド名
     *   'click .command' : 'sayHello' // clickイベント時にコールされるメソッド名（イベントを発生させるセレクタ指定することもできる）
     * },
     * sayHello: function() {
     *   alert('Hello!');
     * }
     */
  });

/*
 *   var taskView = new TaskView({model : task}); // Viewで扱うモデルを渡している。
 *   // console.log(taskView.el);  // elはビューが載るタグ。<li></li>
 *   // console.log(taskView.$el); // $elは、elをjQueryのオブジェクトとして返す
 *   console.log(taskView.render().el); // <li>do something!</li>
 * 
 *   // テンプレートレンダリング結果をHTMLへ
 *   $('body').append(taskView.render().el);
 */


  // ----------
  // Collection
  //  複数のModelをまとめて扱うことができる
  // ----------
  var Tasks = Backbone.Collection.extend({
    model : Task // Taskモデルのコレクション、という意味
  });
  var TasksView = Backbone.View.extend({
    tagName : 'ul',
    render: function() {
      // インスタンス生成時にcollectionをもらう
      this.collection.each(function(task) {
        var taskView = new TaskView({model: task});
        // ulの子要素にliを入れてく
        this.$el.append(taskView.render().el);
      }, this); // callbackでeach中を引き回すのはulなのでthisを指定
      return this;
    }
  });

  var tasks = new Tasks([
    {
      title : 'task1',
      completed : true
    },
    {
      title : 'task2'
    },
    {
      title : 'task3'
    }
  ]);
  console.log(tasks.toJSON());

  // モデルつくる
  // ビューにモデルを渡す
  // モデル内のデータを使ってビューのレンダリング（テンプレートをつかう）
  //
  // 複数のモデルを扱うコレクションをつくる
  //
  // 上記を１セットとして今度はビューにコレクションを渡す
  // ビューをレンダリング
  var tasksView = new TasksView({collection: tasks});
  $('#tasks').html(tasksView.render().el);


})();

