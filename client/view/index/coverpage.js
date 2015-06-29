/**
 * Created by chinhong on 6/29/15.
 */

var MyBrowser;

Swiper = new Swipe(['page002', 'page003', 'page004', 'page005']);

Template.cover.rendered = function() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        MyBrowser = "Mobile";
    } else {
        MyBrowser = "Web";
    }

    $('.wrapper').css({width:innerWidth, height:innerHeight});

    // initial page
    Swiper.setInitialPage('page002');

    // page control
    Tracker.autorun(function() {
        if (Swiper.pageIs('page002')) {
            Swiper.leftRight(null, 'page003');
        }
    });
    Tracker.autorun(function() {
        if (Swiper.pageIs('page003')) {
            Swiper.leftRight('page002', 'page004');
        }
    });
    Tracker.autorun(function() {
        if (Swiper.pageIs('page004')) {
            Swiper.leftRight('page003', 'page005');
        }
    });
    Tracker.autorun(function() {
        if (Swiper.pageIs('page005')) {
            Swiper.leftRight('page004', null);
        }
    });
};

Template.cover.events({
    // Click Logon
    'click .login-btn': function() {
        $('#LoginModel').find('.alert').hide();
    },
    // Submit Login
    'click #login': function() {
        var _email = $('#LoginModel').find('input').eq(0).val();
        var _password = $('#LoginModel').find('input').eq(1).val();

        var _error = "";
        if(_email == null || _email == "") {
            _error = "Please fill the email column";
        } else if(_password == null || _password == "") {
            _error = "Please fill the password column";
        }

        if(_error == "") {
            Meteor.loginWithPassword(_email, _password, function(err, res) {
                if(err) {
                    // Show Error
                    $('#LoginModel').find('.alert').html(err.reason).show();
                } else {
                    // Go to Dashboard
                    location = "/dashboard";
                }
            })
        } else {
            // Show Error
            $('#LoginModel').find('.alert').html(_error).show();
        }
    },

    // Controls for the wrapper
    'click .wrapper': function(e,t) {
        if(e.screenX < innerWidth/2) {
            Swiper.moveLeft();
        } else {
            Swiper.moveRight();
        }
    }
});

Template.cover.helpers({
    Swiper: Swiper,
    IsWeb: function() {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            return false;
        } else {
            return true;
        }
    }
});

log = {
    active: true,
    show: function(message) {
        if(this.active) {
            console.log(message);
        }
    },
    alert: function(message) {
        if(this.active) {
            alert(message);
        }
    }
};