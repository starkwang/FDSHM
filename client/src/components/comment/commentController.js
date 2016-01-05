var moment = require('moment');
window.moment = moment;
module.exports = ['$scope', '$rootScope', 'BaseService', function($scope, $rootScope, BaseService) {
    function init() {
        var itemID = window.location.pathname.split('/')[2];
        BaseService.comment.getItemComment(itemID).then(function(result) {
            $scope.loadingComplete = true;
            if (result.data.success) {
                $scope.comments = result.data.comments;

                for(var i=0;i<$scope.comments.length;i++){
                    $scope.comments[i].time = moment(parseInt($scope.comments[i].timeStamp)).format('YYYY/MM/DD HH:mm:ss');
                }

                console.log($scope);
            }
        });
    }
    init();

    $scope.addComment = function() {
        if ($scope.newComment) {
            var commentModel = {
                underWhichItem: window.location.pathname.split('/')[2],
                //ownerID: $scope.ownerID,

                // publisherName: 'starkwang',
                // publisherID: '123123412413',

                // isReply: false,
                // targetName: '',
                // targetID: '',

                content: $scope.newComment,
                //time: ,
                //timeStamp:
            }
            BaseService.comment.add(commentModel).then(function(result){
                console.log(result);
                console.log($scope.comments);
                if(result.data.success){
                    $scope.comments.push(result.data.comment);
                    console.log($scope.comments);
                }
            })
        }
    }
}]
