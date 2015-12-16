module.exports = ['$scope', 'BaseService', '$rootScope', function($scope, BaseService, $rootScope) {
    $scope.publishIsShow = false;
    $scope.item = {};
    $scope.imgs = [0];
    $scope.$on('showPublish', function() {
        $scope.publishIsShow = true;
    })
    $scope.changePublishShow = function($event) {
        if ($event.target.id == "change-show") {
            $scope.publishIsShow = !$scope.publishIsShow;
        }
    };
    $scope.publish = function() {
        var second = function() {
            BaseService.item.publish($scope.item).then(function(result) {
                if (result.data.success) {
                    $rootScope.$broadcast('alert', '商品发布成功！');
                    $scope.publishLoaderIsShow = false;
                    $scope.publishIsShow = false;
                    $rootScope.$broadcast('item-publish');
                }
            });

        }

        if (!($scope.item.name && $scope.item.detail && $scope.item.category)) {
            $rootScope.$broadcast('alert', '好像有重要信息缺失哦？');
            $scope.publishLoaderIsShow = false;
            return;
        }
        if (!/^[1-9][0-9]{0,5}$|^[1-9][0-9]{0,5}\.[0-9]{1,2}$|^0\.[0-9]{1,2}$/.test($scope.item.price)) {
            $rootScope.$broadcast('alert', '商品价格不正确');
            $scope.publishLoaderIsShow = false;
            return;
        }
        if (!($scope.item.tel || $scope.item.wechat || $scope.item.qq)) {
            $rootScope.$broadcast('alert', '手机、微信、QQ至少填写一个');
            $scope.publishLoaderIsShow = false;
            return;
        }
        var total = $scope.total = $(".upload-img").length;
        var complete = 0;
        for (var i = 0; i < total; i++) {

            var file = $(".upload-img")[i].files[0];
            if (file == undefined) {
                $rootScope.$broadcast('alert', '图片不能为空！');
                return;
            }
        }

        $scope.publishLoaderIsShow = true;
        $scope.item.imgPaths = [];
        for (var i = 0; i < total; i++) {
            var file = $(".upload-img")[i].files[0];
            BaseService.item.uploadImg(file, function(evt) {
                var result = JSON.parse(evt.target.responseText);
                if (result.success) {
                    $scope.item.imgPaths.push(result.path);

                    complete++;
                    $scope.complete = complete;
                    if (complete == total) {
                        second();
                    }
                } else {
                    $rootScope.$broadcast('alert', '图片上传失败!');
                }
            }, function(err) {
                console.log(err);
                $rootScope.$broadcast('alert', '图片上传失败!');
                $scope.publishLoaderIsShow = false;
            });
        }
    }

    $scope.addImg = function() {
        $scope.imgs.push(0);
    }

    $scope.deleteImg = function() {
        $scope.imgs.length = $scope.imgs.length - 1;
    }
    $scope.cancel = function(){
        $scope.publishLoaderIsShow = false;
    }

}]
