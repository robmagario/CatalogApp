/**
 * Created by chinhong on 6/29/15.
 */

PDFFiles = new Mongo.Collection("pdf_files");

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