var Promise = require('bluebird');
module.exports = ['$scope', 'BaseService', '$rootScope', 'UserInfo', '$interval', '$document',
    function($scope, BaseService, $rootScope, UserInfo, $interval, $document) {

        UserInfo.init();

        if (window.location.pathname == '/usermanage/') {
            $scope.categoryIsHidden = true;
        }
        $scope.moreVertIsShow = false;
        $scope.amount = {};
        $('[data-position]').tooltip({
            delay: 50
        });


        $scope.notification = {
            tagIsShow: false,
            boxIsShow: false,
            amount: 0,
            newNotification: [],
            oldNotification: []
        }

        var originalTitle = document.title;

        function clearNewNotification(){
            if (window.location.pathname.split('/')[1] == 'item') {
                return BaseService.notification.clearNewNotification(window.location.pathname.split('/')[2]);
            }else{
                return Promise.resolve();
            }
        }

        function notificationInit() {
            // $timeout(function() {
            //     $scope.notification.isShow = true;
            //     $scope.notification.amount++;
            //     $document[0].title = "(" + $scope.notification.amount + "条新消息)" + originalTitle;
            // }, 2000);
            

            BaseService.notification.getNewNotification().then(function(result) {
                if (result.data.success) {
                    $scope.notification.amount = result.data.notifications.length;
                    if ($scope.notification.amount > 0) {
                        $scope.notification.tagIsShow = true;
                        $document[0].title = "(" + $scope.notification.amount + "条新消息)" + originalTitle;
                    } else {
                        $scope.notification.tagIsShow = false;
                        $document[0].title = originalTitle;
                    }
                    $scope.notification.newNotification = result.data.notifications;

                    //加入文字内容
                    for (var i = 0; i < $scope.notification.newNotification.length; i++) {
                        var item = $scope.notification.newNotification[i]

                        if (item.type == "comment") {
                            item.content = item.sponsor + " 评论了你的 " + item.itemName;
                        }

                        if (item.type == "reply") {
                            item.content = item.sponsor + " 在 " + item.itemName + " 下回复了你";
                        }
                    }
                }
            });
        }

        //$interval(function(){
        clearNewNotification().then(function(){
            notificationInit();
        })

        $interval(function(){
            notificationInit();
        },15000);
        
        //},2000);

        $scope.showNotificationBox = function() {
            if ($scope.notification.boxIsShow || $scope.notification.newNotification.length == 0) {
                $scope.notification.boxIsShow = false;
                return;
            }
            $scope.notification.boxIsShow = true;
        }

        $scope.showPublish = function() {
            $rootScope.$broadcast('showPublish');
        }
        $scope.showLogin = function() {
            $rootScope.$broadcast('showLogin');
        }
        $scope.showSignup = function() {
            $rootScope.$broadcast('showSignup');
        }
        $scope.changeMoreVertShow = function() {
            $scope.moreVertIsShow = !$scope.moreVertIsShow;
        }
        $scope.showVerifyMail = function() {
            $rootScope.$broadcast('showVerifyMail');
        }
        $scope.logout = function() {
            BaseService.user.logout().then(function(result) {
                window.location.reload(true);
            });
        }
        $scope.showChangeName = function() {
            $rootScope.$broadcast('showChangeName');
        }
    }
]
