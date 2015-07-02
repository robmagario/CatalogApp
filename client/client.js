/**
 * Created by chinhong on 6/30/15.
 */

this.Helpers = {};

Meteor.startup(function() {
    //Uploader.finished = function(index, fileInfo, templateContext) {
    //    console.log(fileInfo);
    //}
});

_.each(Helpers, function (helper, key) {
    Handlebars.registerHelper(key, helper);
});