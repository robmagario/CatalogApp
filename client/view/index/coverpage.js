/**
 * Created by chinhong on 6/29/15.
 */

var MyBrowser;

Swiper = new Swipe(['page002', 'page003', 'page004', 'page005']);
MoblieSwiper = new Swipe(['BlankTemp', 'PDFTemp']);

var pdfinfo = {
    PageMin: 1,
    PageMax: 2,
    PageCurrent: 1
}

Template.cover.rendered = function() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        MyBrowser = "Mobile";
    } else {
        MyBrowser = "Web";
    }

    $('.wrapper').css({width: innerWidth, height: innerHeight});

    // initial page
    //Swiper.setInitialPage('page002');

    // page control
    //Tracker.autorun(function() {
    //    if (Swiper.pageIs('page002')) {
    //        Swiper.leftRight(null, 'page003');
    //    }
    //});
    //Tracker.autorun(function() {
    //    if (Swiper.pageIs('page003')) {
    //        Swiper.leftRight('page002', 'page004');
    //    }
    //});
    //Tracker.autorun(function() {
    //    if (Swiper.pageIs('page004')) {
    //        Swiper.leftRight('page003', 'page005');
    //    }
    //});
    //Tracker.autorun(function() {
    //    if (Swiper.pageIs('page005')) {
    //        Swiper.leftRight('page004', null);
    //    }
    //});

    // Set worker URL to package assets
    if (MyBrowser == "Mobile") {
        $('#pdfcanvas').css({width: innerWidth, height: innerHeight});
        PDFJS.workerSrc = '/packages/pascoual_pdfjs/build/pdf.worker.js';
        // Create PDF
        PDFJS.getDocument("/upload/tmp/Testing.pdf").then(function getPdfHelloWorld(pdf) {
            // Fetch the first page
            console.log(pdf);
            pdf.getPage(1).then(function getPageHelloWorld(page) {
                var scale = 1;
                var viewport = page.getViewport(scale);

                // Prepare canvas using PDF page dimensions
                var canvas = document.getElementById('pdfcanvas');
                var context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // Render PDF page into canvas context
                page.render({canvasContext: context, viewport: viewport}).promise.then(function () {
                });
            });
        });

        //location = "/upload/tmp/Testing.pdf";
    }
};

function ReadPDF(p) {
    console.log(p)
    PDFJS.workerSrc = '/packages/pascoual_pdfjs/build/pdf.worker.js';
    // Create PDF
    PDFJS.getDocument("/upload/tmp/Testing.pdf").then(function getPdfHelloWorld(pdf) {
        // Fetch the first page
        console.log(pdf);
        pdf.getPage(p).then(function getPageHelloWorld(page) {
            var scale = 1;
            var viewport = page.getViewport(scale);

            // Prepare canvas using PDF page dimensions
            var canvas = document.getElementById('pdfcanvas');
            var context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Render PDF page into canvas context
            page.render({canvasContext: context, viewport: viewport}).promise.then(function () {
            });
        });
    });
}

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

    'click #PreviousPage': function() {
        if(pdfinfo.PageCurrent > pdfinfo.PageMin) {
            pdfinfo.PageCurrent--;
            ReadPDF(pdfinfo.PageCurrent);
        }
    },

    'click #NextPage': function() {
        if(pdfinfo.PageCurrent < pdfinfo.PageMax) {
            pdfinfo.PageCurrent++;
            ReadPDF(pdfinfo.PageCurrent);
        }
    },

    'click .content-item': function() {
        location = "/upload/tmp/Testing.pdf";
    },

    //'click .content-item': function() {
    //    console.log("!!!");
    //    if(MyBrowser == "Mobile") {
    //        Swiper.moveRight();
    //        $('.list-group').hide();
    //    }
    //    return null;
    //},

    // Controls for the wrapper
    'click .wrapper': function(e,t) {
        if (MyBrowser == "Web") {
            if (e.screenX < innerWidth / 2) {
                Swiper.moveLeft();
            } else {
                Swiper.moveRight();
            }
        }
    }
});

Template.cover.helpers({
    Swiper: Swiper,
    MoblieSwiper: MoblieSwiper,
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
    }
});

Template.PDFTemp.rendered = function() {
    // Set worker URL to package assets
    PDFJS.workerSrc = '/packages/pascoual_pdfjs/build/pdf.worker.js';
    // Create PDF
    PDFJS.getDocument("/upload/tmp/Testing.pdf").then(function getPdfHelloWorld(pdf) {
        // Fetch the first page
        pdf.getPage(1).then(function getPageHelloWorld(page) {
            var scale = 1;
            var viewport = page.getViewport(scale);

            // Prepare canvas using PDF page dimensions
            var canvas = document.getElementById('pdfcanvas');
            var context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Render PDF page into canvas context
            page.render({canvasContext: context, viewport: viewport}).promise.then(function () {
            });
        });
    });
};

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