module.exports = ['$scope', '$rootScope', 'BaseService', function($scope, $rootScope, BaseService) {
    function init() {
        var itemID = window.location.pathname.split('/')[2];
        // BaseService.comment.get(itemID).then(function(result) {

        // });
        $scope.comments = [{
            underWhichItem: '12312412124',
            ownerID: '12345667',

            publisherName: 'starkwang',
            publisherID: '123123412413',

            isReply: false,
            targetName: '',
            targetID: '',

            content: '这是评论这是评论这是评论这是评论这是评论这是评论',
            time: '2015-10-20 12:43:43',

            haveBeenRead: false
        },{
            underWhichItem: '12312412124',
            ownerID: '12345667',

            publisherName: 'starkwang',
            publisherID: '123123412413',

            isReply: true,
            targetName: 'tony',
            targetID: '',

            content: '这是回复这是回复这是回复这是回复这是回复这是回复',
            time: '2015-10-20 12:43:43',

            haveBeenRead: false
        }];
    }
    init();
}]
