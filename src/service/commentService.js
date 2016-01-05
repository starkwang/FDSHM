var mongoose = require('mongoose');
var Promise = require('bluebird');

mongoose.connect('mongodb://localhost:27017');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('mongodb connection success!');
});
var commentSchema = mongoose.Schema({
    underWhichItem: String,
    ownerID: String,

    publisherName: String,
    publisherID: String,

    isReply: Boolean,
    targetName: String,
    targetID: String,

    content: String,

    haveBeenRead: Boolean,

    timeStamp: String
});
var Comment = mongoose.model('Comment', commentSchema);

// var onecomment = new Comment({

// });

// onecomment.save(function(err) {
//     if (err) // ...
//         console.log('meow');
// });

// Comment.find({
//     name: 'Silence'
// }, function(err, result) {
//     console.log(result);
// })


function add(commentParams) {
    var onecomment = new Comment(commentParams);
    return new Promise(function(resolve, reject) {
        onecomment.save(function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({
                    success: true
                });
            }
        })
    });
}

function find(params) {
    console.log(params);
    return new Promise(function(resolve, reject) {
        Comment.find(params, function(err, result) {
            if (err) {
                reject(err);
            }
            if (result) {
                console.log(result);
                resolve(result);
            }
        });
    });
}

function remove(commentTimeStamp, userid) {
    var params = {
        timeStamp: commentTimeStamp
    }
    return find(params).then(function(result) {
        var item = result[0];
        if (item.publisherID == userid) {
            return new Promise(function(resolve, reject) {
                Comment.remove(params, function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({
                            success: true
                        })
                    }
                })
            })
        } else {
            return Promise.resolve({
                success: false
            });
        }
    });
}

// add({
//     underWhichItem: '123',
//     ownerID: 'String',

//     publisherName: 'String',
//     publisherID: 'String',

//     isReply: true,
//     targetName: 'String',
//     targetID: 'String',

//     content: 'String',
//     time: 'String',
// }).then(function(result) {
//     console.log(result);
//     return find({
//         underWhichItem: '123'
//     });
// }).then(function(result) {
//     console.log(result);
// })


module.exports = {
    add: add,
    find: find,
    remove: remove
}
