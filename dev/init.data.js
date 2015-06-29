Meteor.startup(function () {
    if (typeof Meteor.users.findOne({
            username: "robmagario"
        }) === 'undefined') {
        Accounts.createUser({
            username: "robmagario",
            email: "robson@magario.com",
            password: "Blah124@"
        });
    }

    if (typeof Meteor.users.findOne({
            username: "abbeythorley"
        }) === 'undefined') {
        Accounts.createUser({
            username: "abbeythorley",
            email: "abbey.thorley@magario.com",
            password: "fongquiet"
        });
    }

    if (typeof Meteor.users.findOne({
            username: "Dranithix"
        }) === 'undefined') {
        Accounts.createUser({
            username: "Dranithix",
            email: "dranithix@gmail.com",
            password: "asdfghjkl"
        });
    }

    if (typeof Meteor.users.findOne({
            username: "DaveNg"
        }) === 'undefined') {
        Accounts.createUser({
            username: "DaveNg",
            email: "chinho.ng@magario.com",
            password: "12345678"
        });
    }
});