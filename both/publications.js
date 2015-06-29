/**
 * Created by chinhong on 5/21/15.
 */

if (Meteor.isClient) {
    Meteor.subscribe("user_data");
    Meteor.subscribe("pile_data");
}

if (Meteor.isServer) {
    Meteor.publish("user_data", function () {
        return Meteor.users.find({});
    });
    Meteor.publish("pile_data", function () {
        return Piles.find();
    });
}