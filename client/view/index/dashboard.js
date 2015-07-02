/**
 * Created by chinhong on 6/29/15.
 */

Template.dashboard.created = function() {
};

Template.dashboard.rendered = function() {
    $('.content').show();

    Uploader.uploadUrl = Meteor.absoluteUrl("upload"); // Cordova needs absolute URL
};

Template.dashboard.events({
    // Logout
    'click .logout-btn': function() {
        log.show("Logout");
        Meteor.logout(function() {
            location = "/";
        });
    },

    // Navbar Events
    'click .nav-tab': function(e) {
        log.show("Select " + e.currentTarget.innerText + " tab");
        var _value = e.currentTarget.innerText;
        _value = _value.replace(/ /m, "");
        $('.nav-tab').parent().removeClass('active');
        e.currentTarget.parentElement.classList.add('active');
        $('.page-item').hide();
        $('#'+_value).find('alert').html("").hide();
        $('#'+_value).show();

        $('#AddPDF').find('input').val('');
        $('#AddPDF').find('input').eq(1).val(1);
    },

    // Add Sub Directory
    'click .add-sub-directory': function() {
        var _HTML_Val = $('#AddPDF_SubDir').find('input');
        console.log(_HTML_Val);
        var _length = _HTML_Val.length / 2;
        var _HTML = "";
        for(var i=0; i<_length; i++) {
            _HTML += "<div>" +
                "<button type='button' class='btn btn-warning btn-sm remove-sub-directory' style='width:2.7%; margin-left:3.5%; margin-right: 3.5%;'> - </button>" +
                "<div class='form-group' style='display:inline-block; width:50%;'>" +
                "<label>Sub Directory Name:</label>" +
                "<input type='text' class='form-control' placeholder='Sub Directory Name' value='"+_HTML_Val[i*2].value+"'>" +
                "</div>" +
                "<div class='form-group' style='display:inline-block; width:20%; margin-left:19.5%;'>" +
                "<label>Page:</label>" +
                "<input class='form-control' type='number' min='1' step='1' value='"+_HTML_Val[i*2+1].value+"'>" +
                "</div>" +
                "</div>";
        }
        _HTML += "<div>" +
            "<button type='button' class='btn btn-warning btn-sm remove-sub-directory' style='width:2.7%; margin-left:3.5%; margin-right: 3.5%;'> - </button>" +
            "<div class='form-group' style='display:inline-block; width:50%;'>" +
            "<label>Sub Directory Name:</label>" +
            "<input type='text' class='form-control' placeholder='Sub Directory Name'>" +
            "</div>" +
            "<div class='form-group' style='display:inline-block; width:20%; margin-left:19.5%;'>" +
            "<label>Page:</label>" +
            "<input class='form-control' type='number' min='1' step='1' value='1'>" +
            "</div>" +
            "</div>";
        $('#AddPDF_SubDir').html(_HTML);
    },

    // Remove Sub Directory
    'click .remove-sub-directory': function(e) {
        console.log(e);
        e.currentTarget.parentElement.remove();
    },

    // Click Upload
    'click .start': function (e) {
        log.show("Start Upload!");
        Uploader.startUpload.call(Template.instance(), e);
    },

    // Click Edit
    'click .edit-btn': function() {
        log.show("Open Log Model.");
        if(Meteor.user().username == this.createBy.name) {
            $('#EditModel').find('h4').eq(0).html(this.info.name);
            $('#EditModel').find('label').eq(0).html(this._id);
            $('#EditModel').find('input').eq(0).val(this.directory);
            $('#EditModel').find('input').eq(1).val(this.pageindex);
        } else {
            log.show(this.directory + ' is not belonged to ' + Meteor.user().username + '.');
            window.setTimeout(function() {
                $('#EditModel').hide();
                $('.modal-backdrop').remove();
                alert("You cannot edit other users things");
            }, 200);
        }
    },
    // Submit Edit
    'click #edit': function() {
        var _id = $('#EditModel').find('label').eq(0).html();
        var _directory = $('#EditModel').find('input').eq(0).val();
        if(_directory == null || _directory == "") {
            _directory = $('#EditModel').find('h4').eq(0).html();
        }
        var _index = parseInt($('#EditModel').find('input').eq(1).val());
        var _currentIndex = PDFFiles.findOne({pageindex: _index});
        while(_currentIndex != null && _currentIndex._id != _id) {
            var _new_index = parseInt(_currentIndex.pageindex)+1;
            var _nextIndex = PDFFiles.findOne({pageindex: _new_index});
            PDFFiles.update({_id: _currentIndex._id}, {$set:{pageindex:_new_index}});
            _currentIndex = _nextIndex;
        }
        PDFFiles.update({_id: _id}, {$set: {
            pageindex: _index,
            directory: _directory
        }}, function() {
            log.show("Finish edit data.");

            // Hide Edit Model
            $('#EditModel').hide();

            // Alert
            alert("Directory name changed successfully");


        });
    },

    // Delete a PDF
    'click .delete-btn': function() {
        log.show('Try Delete ' + this.directory);
        if(Meteor.user().username == this.createBy.name) {
            Meteor.call('deleteFile', this._id, function () {
                log.show('Delete ' + this.directory + ' successfully.');
            });
        } else {
            log.show(this.directory + ' is not belonged to ' + Meteor.user().username + '.');
            alert("You cannot delete other users things");
        }
    }
});

Template.dashboard.helpers({
    // Check is logined or not
    IsLogin: function() {
        if(Meteor.userId() != null) {
            return true;
        } else {
            return false;
        }
    },

    // Get PDF Data
    pdf_data: function() {
        return PDFFiles.find({}, {sort: {pageindex: 1}});
    },

    // Get User Data
    userData: function() {
        return Meteor.users.find({}, {sort: {username: 1}});
    },


    // Callback after upload
    uploadFinished: function() {
        return {
            finished: function(index, fileInfo, context) {
                log.show("Upload Finish!")
                var _directory = $('#AddPDF').find('input').eq(0).val();
                if(_directory == null || _directory == "") {
                    _directory = fileInfo.name;
                }
                var _sub_dirs_Array = $('#AddPDF_SubDir').find('input');
                var _sub_dirs = [];
                for(var i=0; i<_sub_dirs_Array.length/2; i++) {
                    _sub_dirs.push({
                        name: _sub_dirs_Array[i*2].value,
                        page: parseInt(_sub_dirs_Array[i*2+1].value)
                    })
                }
                var _index = parseInt($('#AddPDF').find('input').eq(1).val());
                var _currentIndex = PDFFiles.findOne({pageindex: _index});
                while(_currentIndex != null) {
                    var _new_index = parseInt(_currentIndex.pageindex)+1;
                    var _nextIndex = PDFFiles.findOne({pageindex: _new_index});
                    PDFFiles.update({_id: _currentIndex._id}, {$set:{pageindex:_new_index}});
                    _currentIndex = _nextIndex;
                }
                var _date = new Date().toUTCString();
                var _userId = Meteor.userId();
                var _user = Meteor.user().username;

                // Inset data to database
                PDFFiles.insert({
                    pageindex: _index,
                    directory: _directory,
                    sub_dir:   _sub_dirs,
                    createAt:  _date,
                    createBy: {
                        id:   _userId,
                        name: _user
                    },
                    info: fileInfo
                }, function() {
                    log.show("Finish insert data to database.");

                    // Show the Overview Page
                    //$('#AddPDF').hide();
                    //$('#Overview').show();
                    //
                    //// Active the tab of overview
                    //$('.nav-tab').eq(0).addClass('active');
                    //$('.nav-tab').eq(1).removeClass('active');

                    // Alert
                    alert(fileInfo.name + " is uploaded successfully");

                    // Refresh
                    location.reload();
                });
            }
        }
    }
});

// Show Log
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