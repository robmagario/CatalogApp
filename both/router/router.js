/**
 * Created by user on 19/6/15.
 */

Router.route('/', function () {
    this.render('cover');
});

Router.route('/cover', function () {
    this.render('Cover');
});

Router.route('/navhowto', function () {
    this.render('navhowto');
});
Router.route('/index', function () {
    this.render('index');
});
Router.route('/about', function () {
    this.render('about');
});
Router.route('/thanks', function () {
    this.render('thanks');
});


