/**
 * Created by user on 19/6/15.
 */

Router.route('/', function () {
    this.render('cover');
});

//Router.route('/cover', function () {
//    this.render('Cover');
//});
//
//Router.route('/navhowto', function () {
//    this.render('navhowto');
//});
Router.route('/indexpage', function () {
    this.render('indexpage');
});
//Router.route('/about', function () {
//    this.render('about');
//});
//Router.route('/thanks', function () {
//    this.render('thanks');
//});
Router.route('/dashboard', function () {
    this.render('dashboard');
});

Router.route('/page', function () {
    this.render('dashboard_page');
});
