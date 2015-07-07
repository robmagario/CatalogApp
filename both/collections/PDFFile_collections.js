/**
 * Created by chinhong on 6/29/15.
 */

PDFFiles = new Mongo.Collection("pdf_files");
ChapterInfo = new Mongo.Collection("chapters_info");
PagesInfo = new Mongo.Collection("pages_info");

if (Meteor.isClient) {
    Template.body.helpers({
        orders: function() {
            return Orders.find({});
        }
    })
}

PDFFiles.allow({
    'insert': function(userId, doc) {
        return true;
    },
    'update': function(userId, doc) {
        return true;
    },
    'remove': function(userId, doc) {
        return true;
    }
});

ChapterInfo.allow({
    'insert': function(userId, doc) {
        return true;
    },
    'update': function(userId, doc) {
        return true;
    },
    'remove': function(userId, doc) {
        return true;
    }
});

PagesInfo.allow({
    'insert': function(userId, doc) {
        return true;
    },
    'update': function(userId, doc) {
        return true;
    },
    'remove': function(userId, doc) {
        return true;
    }
});