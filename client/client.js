/**
 * Created by chinhong on 6/30/15.
 */

this.Helpers = {};

Meteor.startup(function() {
    //Uploader.finished = function(index, fileInfo, templateContext) {
    //    console.log(fileInfo);
    //}

});

Helpers.readURL = function(input, loc) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#'+loc)
                .attr('src', e.target.result)
                .width(150)
                .height(200);
            $('#'+loc).css({"width":"100%", "height":"100%"});
        };
        reader.readAsDataURL(input.files[0]);
    }
};

_.each(Helpers, function (helper, key) {
    Handlebars.registerHelper(key, helper);
});