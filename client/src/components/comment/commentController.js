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
                console.log($scope);
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
        if ($scope.newComment) {
            var commentModel = {
                underWhichItem: window.location.pathname.split('/')[2],
                content: $scope.newComment,
            }
            BaseService.comment.add(commentModel).then(function(result) {
                if (result.data.success) {
                    //result.data.comment.time = moment(parseInt(result.data.comment.timeStamp)).format('YYYY/MM/DD HH:mm:ss');
                    $scope.comments.push(result.data.comment);
                    flush();
                    console.log($scope.comments);
                }
            })
        }
    }

    $scope.removeComment = function(commentTimeStamp) {
        console.log(commentTimeStamp);
        BaseService.comment.remove(commentTimeStamp).then(function(result) {
            console.log(result);
            if (result.data.success) {
                for (var i = 0; i < $scope.comments.length; i++) {
                    if ($scope.comments[i].timeStamp == commentTimeStamp) {
                        $scope.comments.splice(i, 1);
                    }
                }
            }
        })
    }
}]
