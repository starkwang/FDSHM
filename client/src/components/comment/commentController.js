var moment = require('moment');
module.exports = ['$scope', '$rootScope', 'BaseService', 'UserInfo', function($scope, $rootScope, BaseService, UserInfo) {

    $scope.comments = [];

    function init() {
        var itemID = window.location.pathname.split('/')[2];
        BaseService.comment.getItemComment(itemID).then(function(result) {
            $scope.loadingComplete = true;
            if (result.data.success) {
                $scope.comments = result.data.comments;
                flush();
            }
        });
    }
    init();

    //设置时间、识别是否是自己的评论
    function flush() {
        for (var i = 0; i < $scope.comments.length; i++) {
            var tmp = $scope.comments[i];

            tmp.time = moment(parseInt(tmp.timeStamp)).format('YYYY/MM/DD HH:mm:ss');

            if (tmp.publisherID == UserInfo.data.userID) {
                tmp.isMyComment = true;
            }
        }
    }
    $scope.$on('userInfoGet', function() {
        if ($scope.loadingComplete) {
            flush();
        }
    })

    $scope.addComment = function() {
        if (!UserInfo.data.login) {
            $rootScope.$broadcast('showLogin');
            return;
        }
        if ($scope.newComment) {
            var commentModel = {
                itemID: window.location.pathname.split('/')[2],
                content: $scope.newComment,
            }
            BaseService.comment.add(commentModel).then(function(result) {
                if (result.data.success) {
                    //result.data.comment.time = moment(parseInt(result.data.comment.timeStamp)).format('YYYY/MM/DD HH:mm:ss');
                    $scope.comments.push(result.data.comment);
                    flush();
                    Materialize.toast('评论成功', 3000, 'rounded');
                    $scope.newComment = "";
                }
            })
        }
    }

    $scope.addReply = function() {
        if (!UserInfo.data.login) {
            $rootScope.$broadcast('showLogin');
            return;
        }
        var _this = this
        if (this.reply) {
            var replyModel = {
                itemID: window.location.pathname.split('/')[2],
                content: this.reply,

                isReply: true,
                targetName: this.comment.publisherName,
                targetID: this.comment.publisherID,
            }
            BaseService.comment.reply(replyModel).then(function(result) {
                if (result.data.success) {
                    //result.data.comment.time = moment(parseInt(result.data.comment.timeStamp)).format('YYYY/MM/DD HH:mm:ss');
                    $scope.comments.push(result.data.comment);
                    flush();
                    _this.replyInputIsShow = false;
                    Materialize.toast('回复成功', 3000, 'rounded');
                    _this.reply = "";
                }
            })
        }
    }

    $scope.removeComment = function(commentTimeStamp) {
        BaseService.comment.remove(commentTimeStamp).then(function(result) {
            if (result.data.success) {
                for (var i = 0; i < $scope.comments.length; i++) {
                    if ($scope.comments[i].timeStamp == commentTimeStamp) {
                        $scope.comments.splice(i, 1);
                    }
                }
            }
        })
    }

    $scope.replyComment = function() {
        if (this.replyInputIsShow == true) {
            this.replyInputIsShow = false;
            return;
        }
        this.replyInputIsShow = true;
    }


}]
