/**
 * Created by chinhong on 6/29/15.
 */

Template.dashboard.created = function() {
};

Template.dashboard.rendered = function() {
    $(document).ready(function() {
        $('#summernote').summernote();
    });

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

        $('#PageTableBody').html("");

        $('#ChapterTable').show();
        $('#PageTable').hide();

        $('#AddPage').find('input').val('');
        $('#AddPage').find('input').eq(1).val("");
        $('#AddPage').find('input').eq(2).val(1);
    },

    // Press Add Chapter
    'click .chapter-add-btn': function() {
        // Blank the Column
        $('#AddChapterModel').find('label').eq(0).html("");
        $('#AddChapterModel').find('input').eq(0).val("");
        $('#AddChapterModel').find('input').eq(1).val(1);
        // Hide Alert Message
        $('#AddChapterModel').find('.alert').hide();
        // Hide Edit Button
        $('#AddChapterModel').find('.chapter-edit-submit-btn').hide();
    },

    'change #AddChapterIcon': function() {

    },

    // Submit Add Chapter
    'click .chapter-submit-btn': function() {
        // Get value from the form
        var _chapter = $('#AddChapterModel').find('input').eq(0).val().trim();
        var _index = parseInt($('#AddChapterModel').find('input').eq(1).val());
        var _icon = $('#AddChapterIcon').attr('src');
        if(_chapter == "" || _chapter == null) {
            // Show if Chapter Name is Empty
            $('#AddChapterModel').find('.alert').html("<strong>Please defind a name for the new chapter!</strong>").show();
        } else if(isNaN(_index)) {
            // Show if page index is not a number
            $('#AddChapterModel').find('.alert').html("<strong>Please make sure that the page column is a number</strong>").show();
        } else if(_icon == "" || _icon == null) {
            // Show if no icon
            $('#AddChapterModel').find('.alert').html("<strong>Please upload an image as icon</strong>").show();
        } else {
            // Let the origin index to be the next one
            var _currentIndex = _index;
            var _currentChapter = ChapterInfo.findOne({index: _currentIndex});
            while(_currentChapter != null) {
                var _nextIndex = _currentIndex + 1;
                var _nextChapter = ChapterInfo.findOne({index: _nextIndex});
                ChapterInfo.update({_id: _currentChapter._id}, {$set: {
                    index: _nextIndex
                }});
                _currentIndex = _nextIndex;
                _currentChapter = _nextChapter;
            }
            // Insert Data
            ChapterInfo.insert({
                name: _chapter,
                index: _index,
                icon: _icon
            }, function() {
                location.reload();
            });
        }
    },

    // Press Add Chapter
    'click .chapter-edit-btn': function() {
        // Fill the Column
        $('#AddChapterModel').find('label').eq(0).html(this._id);
        $('#AddChapterModel').find('input').eq(0).val(this.name);
        $('#AddChapterModel').find('input').eq(1).val(this.index);
        // Hide Alert Message
        $('#AddChapterModel').find('.alert').hide();
        // Hide Edit Button
        $('#AddChapterModel').find('.chapter-submit-btn').hide();
    },

    // Save Change of Chapter
    'click .chapter-edit-submit-btn': function() {
        // Get value from the form
        var _id = $('#AddChapterModel').find('label').eq(0).html();
        var _chapter = $('#AddChapterModel').find('input').eq(0).val().trim();
        var _index = parseInt($('#AddChapterModel').find('input').eq(1).val());
        if(_chapter == "" || _chapter == null) {
            // Show if Chapter Name is Empty
            $('#AddChapterModel').find('.alert').html("<strong>Please defind a name for the new chapter!</strong>").show();
        } else if(isNaN(_index)) {
            // Show if page index is not a number
            $('#AddChapterModel').find('.alert').html("<strong>Please make sure that the page column is a number</strong>").show();
        } else {
            // Let the origin index to be the next one
            var _currentIndex = _index;
            var _currentChapter = ChapterInfo.findOne({index: _currentIndex});
            while(_currentChapter != null) {
                var _nextIndex = _currentIndex + 1;
                var _nextChapter = ChapterInfo.findOne({index: _nextIndex});
                ChapterInfo.update({_id: _currentChapter._id}, {$set: {
                    index: _nextIndex
                }});
                _currentIndex = _nextIndex;
                _currentChapter = _nextChapter;
            }
            // Insert Data
            ChapterInfo.update({_id:_id}, {$set: {
                name: _chapter,
                index: _index
            }}, function() {
                location.reload();
            });
        }
    },

    // Delete a chapter
    'click .chapter-delete-btn': function() {
        ChapterInfo.remove({_id:this._id});
    },

    // See Chapter Information
    'click .chapter-each': function() {
        var PageHTML = "";

        var _data = PagesInfo.find({chapter:this.name});
        if(_data != null) {
            var _dataArray = _data.fetch();
            for(var i=0; i<_dataArray.length; i++) {
                PageHTML += "<tr>" +
                    "<td>"+_dataArray[i].page+"</td>" +
                    "<td>"+_dataArray[i].directory+"</td>" +
                    "<td><button type='button' class='btn btn-info btn-sm page-edit-btn'  data-toggle='modal' data-target='#EditPageModel'>Edit</button></td>" +
                    "<td><button type='button' class='btn btn-danger btn-sm page-delete-btn'>X</button></td>" +
                    "</tr>";
            }
        }

        $('#PageTableBodyBody').html(PageHTML);

        $('#ChapterTable').hide();
        $('#PageTable').show();
    },

    // Open Dropdown Menu
    'click .dropdown-toggle': function(e) {
        if(e.currentTarget.parentElement.children[1].style.display == "" ||
            e.currentTarget.parentElement.children[1].style.display == "none" ||
            e.currentTarget.parentElement.children[1].style.display == null) {
            e.currentTarget.parentElement.children[1].style.display = "block";
        } else {
            e.currentTarget.parentElement.children[1].style.display = "none";
        }
    },

    // Close Dropdown Menu
    'click .btn, click .formatBlock, click .dropdown-menu, click a': function(e) {
        log.show(e.currentTarget.parentElement.parentElement.classList[0]);
        if(e.currentTarget.parentElement.parentElement.classList[0] == "dropdown-menu") {
            e.currentTarget.parentElement.parentElement.style.display = "none";
        }
    },

    // Submit Page
    'click .submit-page': function() {
        var _directory = $('#AddPage').find('input').eq(0).val();
        var _chapter = $('#AddPage').find('input').eq(1).val();
        var _page = $('#AddPage').find('input').eq(2).val();
        var _code = $('#summernote').code();
        log.show("Directory: " + _directory);
        log.show("Chapter: " + _chapter);
        log.show("Page: " + _page);

        if(isNaN(_page)) {
            $('#AddPage').find('.alert').html("Incorrect Page").show();
        } else {
            var _date = new Date();
            var _userId = Meteor.userId();
            var _user = Meteor.user().username;
            PagesInfo.insert({
                userId: _userId,
                username: _user,
                directory: _directory,
                chapter: _chapter,
                page: _page,
                code: _code,
                createAt: _date
            }, function() {
                // Callback
                alert("Page Added Successfully!");
                location.reload();
            });
        }
    },

    // Add Sub Directory
    'click .add-sub-directory': function() {
        var _HTML_Val = $('#AddPDF_SubDir').find('input');
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

            var _subDirHTML = "";
            for(var i=0; i<this.sub_dir.length; i++) {
                _subDirHTML += "<div>" +
                    "<button type='button' class='btn btn-warning btn-sm remove-sub-directory' style='width:2.7%; margin-left:3.5%; margin-right: 3.5%;'> - </button>" +
                    "<div class='form-group' style='display:inline-block; width:50%;'>" +
                    "<label>Sub Directory Name:</label>" +
                    "<input type='text' class='form-control' placeholder='Sub Directory Name' value='"+this.sub_dir[i].name+"'>" +
                    "</div>" +
                    "<div class='form-group' style='display:inline-block; width:20%; margin-left:10%;'>" +
                    "<label>Page:</label>" +
                    "<input class='form-control' type='number' min='1' step='1' value='"+this.sub_dir[i].page+"'>" +
                    "</div>" +
                    "</div>";
            }
            $('#Edit_SubDir').html(_subDirHTML);
        } else {
            log.show(this.directory + ' is not belonged to ' + Meteor.user().username + '.');
            window.setTimeout(function() {
                $('#EditModel').hide();
                $('.modal-backdrop').remove();
                alert("You cannot edit other users things");
            }, 200);
        }
    },
    // Add Sub Directory in Edit Model
    'click .edit-add-sub-directory': function() {
        var _HTML_Val = $('#Edit_SubDir').find('input');
        var _length = _HTML_Val.length / 2;
        var _HTML = "";
        for(var i=0; i<_length; i++) {
            _HTML += "<div>" +
                "<button type='button' class='btn btn-warning btn-sm remove-sub-directory' style='width:2.7%; margin-left:3.5%; margin-right: 3.5%;'> - </button>" +
                "<div class='form-group' style='display:inline-block; width:50%;'>" +
                "<label>Sub Directory Name:</label>" +
                "<input type='text' class='form-control' placeholder='Sub Directory Name' value='"+_HTML_Val[i*2].value+"'>" +
                "</div>" +
                "<div class='form-group' style='display:inline-block; width:20%; margin-left:10%;'>" +
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
            "<div class='form-group' style='display:inline-block; width:20%; margin-left:10%;'>" +
            "<label>Page:</label>" +
            "<input class='form-control' type='number' min='1' step='1' value='1'>" +
            "</div>" +
            "</div>";
        $('#Edit_SubDir').html(_HTML);
    },
    // Submit Edit
    'click #edit': function() {
        var _id = $('#EditModel').find('label').eq(0).html();
        var _directory = $('#EditModel').find('input').eq(0).val();
        if(_directory == null || _directory == "") {
            _directory = $('#EditModel').find('h4').eq(0).html();
        }
        var _sub_dirs_Array = $('#Edit_SubDir').find('input');
        var _sub_dirs = [];
        for(var i=0; i<_sub_dirs_Array.length/2; i++) {
            _sub_dirs.push({
                name: _sub_dirs_Array[i*2].value,
                page: parseInt(_sub_dirs_Array[i*2+1].value)
            })
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
            directory: _directory,
            sub_dir: _sub_dirs
        }}, function() {
            log.show("Finish edit data.");

            // Hide Edit Model
            $('#EditModel').hide();

            // Alert
            alert("Directory name changed successfully");

            // Remove the Darker Cover
            $('.modal-backdrop').remove();
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
    //pdf_data: function() {
    //    return PDFFiles.find({}, {sort: {pageindex: 1}});
    //},

    // Get Chapter Data
    chapter_data: function() {
        return ChapterInfo.find({}, {sort: {index: 1}});
    },

    // Get Page Data
    page_data: function() {
        return PagesInfo.find({}, {sort: {page: 1}});
    },

    // Get Sub Directory
    //sub_dir: function() {
    //
    //},

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