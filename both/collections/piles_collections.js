/**
 * Created by chinhong on 6/29/15.
 */

Piles = new Mongo.Collection("piles");

if (Meteor.isClient) {
    Template.body.helpers({
        orders: function() {
            return Orders.find({});
        }
    })
}

Piles.allow({
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