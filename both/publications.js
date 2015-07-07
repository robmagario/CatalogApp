/**
 * Created by chinhong on 5/21/15.
 */

if (Meteor.isClient) {
    Meteor.subscribe("user_data");
    Meteor.subscribe("pdf_file_data");
    Meteor.subscribe("chapter_info_data");
    Meteor.subscribe("page_info_data");
}

if (Meteor.isServer) {
    Meteor.publish("user_data", function () {
        return Meteor.users.find({});
    });
    Meteor.publish("pdf_file_data", function () {
        return PDFFiles.find();
    });
    Meteor.publish("chapter_info_data", function () {
        return ChapterInfo.find();
    });
    Meteor.publish("page_info_data", function () {
        return PagesInfo.find();
    });
}