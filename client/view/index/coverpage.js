/**
 * Created by chinhong on 6/29/15.
 */

var MyBrowser;
var SidebarOpen = false;

Template.cover.rendered = function() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        MyBrowser = "Mobile";
    } else {
        MyBrowser = "Web";
    }

    // Set worker URL to package assets
    if (MyBrowser == "Mobile") {
    }
};

Template.cover.events({
    // Click Login
    'click .login-btn': function() {
        log.show("Open Login Model.");
        $('#LoginModel').find('.alert').hide();
    },
    // Submit Login
    'click #login': function() {
        log.show("Check Login Column.")
        var _email = $('#LoginModel').find('input').eq(0).val();
        var _password = $('#LoginModel').find('input').eq(1).val();

        var _error = "";
        if(_email == null || _email == "") {
            _error = "Please fill the email column";
        } else if(_password == null || _password == "") {
            _error = "Please fill the password column";
        }

        if(_error == "") {
            log.show("Try Login")
            Meteor.loginWithPassword(_email, _password, function(err, res) {
                if(err) {
                    // Show Error
                    log.show("Login fail. " + err.reason);
                    $('#LoginModel').find('.alert').html(err.reason).show();
                } else {
                    // Go to Dashboard
                    log.show("Login successfully.");
                    location = "/dashboard";
                }
            })
        } else {
            // Show Error
            log.show("Including blank column while login.");
            $('#LoginModel').find('.alert').html(_error).show();
        }
    },

    // Sidebar Events
    'click .glyphicon-menu-hamburger': function() {
        if(SidebarOpen) {
            log.show("Close Sidebar");
            $('.sidebar').css({left:'-40%', animation: 'SidebarClose 0.5s', '-webkit-animation': 'SidebarClose 0.5s'});
            SidebarOpen = false;
        } else {
            log.show("Open Sidebar");
            $('.sidebar').css({left:'0%', animation: 'SidebarOpen 0.5s', '-webkit-animation': 'SidebarOpen 0.5s'});
            SidebarOpen = true;
        }
    },
    'click .sidebar-home': function() {
        log.show("Select Home");
        $('#showframe').attr('src', 'indexpage');
        $('.sidebar').css({left:'-40%', animation: 'SidebarClose 0.5s', '-webkit-animation': 'SidebarClose 0.5s'});
        SidebarOpen = false;
        $('.sidebar-item').removeClass('active');
        $('.sidebar-item-sub').removeClass('active');
        $('.sidebar-home').addClass('active');
    },
    'click .sidebar-item': function(e) {
        log.show("Select " + this.directory);
        $('#showframe').attr('src', this.info.url);
        $('.sidebar').css({left:'-40%', animation: 'SidebarClose 0.5s', '-webkit-animation': 'SidebarClose 0.5s'});
        SidebarOpen = false;
        $('.sidebar-home').removeClass('active');
        $('.sidebar-item').removeClass('active');
        $('.sidebar-item-sub').removeClass('active');
        e.currentTarget.classList.add('active');
    },
    'click .sidebar-item-sub': function(e) {
        log.show("Select " + this.name);
        $('#showframe').attr('src', e.currentTarget.parentElement.id + '#page=' + this.page);
        $('.sidebar').css({left:'-40%', animation: 'SidebarClose 0.5s', '-webkit-animation': 'SidebarClose 0.5s'});
        SidebarOpen = false;
        $('.sidebar-home').removeClass('active');
        $('.sidebar-item').removeClass('active');
        $('.sidebar-item-sub').removeClass('active');
        e.currentTarget.classList.add('active');
    }
});

Template.cover.helpers({
    // Check is Web or Mobile
    IsWeb: function() {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            return false;
        } else {
            return true;
        }
    },
    IsMoblie: function() {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            return true;
        } else {
            return false;
        }
    },

    pdf_data: function() {
        return PDFFiles.find({}, {sort: {pageindex: 1}});
    }
});

// Show log
log = {
    active: false,
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