/**
 * Created by chinhong on 6/30/15.
 */

Meteor.startup(function () {
    UploadServer.init({
        tmpDir: process.env.PWD + '/.uploads/tmp',
        uploadDir: process.env.PWD + '/.uploads/',
        checkCreateDirectories: true //create the directories for you
    })
});

if (Meteor.isServer) {
    Meteor.methods({
        // Delete uploaded files and database information by id
        'deleteFile': function(_id) {
            check(_id, String);

            var upload = PDFFiles.findOne(_id);
            if (upload == null) {
                throw new Meteor.Error(404, 'Upload not found'); // maybe some other code
            }

            UploadServer.delete(upload.info.path);
            PDFFiles.remove(_id);
        }
    });
}