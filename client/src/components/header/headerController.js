module.exports = ['$scope', 'BaseService', '$rootScope', function($scope, BaseService, $rootScope) {
    console.log('aaaaaaaaa');
    $scope.publishIsShow = false;
    $scope.item = {};
    $scope.imgs = [0];
    $scope.changePublishShow = function($event) {
        if ($event.target.id == "change-show") {
            $scope.publishIsShow = !$scope.publishIsShow;
        }
    };
    $scope.publish = function() {
        var second = function() {
            BaseService.item.publish($scope.item).then(function(result) {
                console.log(result);
                if (result.data.success) {
                    alert('商品发布成功！');
                }
                $scope.showPublishLoader = false;
                $scope.publishIsShow = false;
                $rootScope.$broadcast('item-publish');
            });

        }
        if (!($scope.item.name && $scope.item.detail && $scope.item.category && $scope.item.price && $scope.item.tel && $scope.item.stuNo)) {
            alert('发布失败，好像有重要信息缺失哦？');
            $scope.showPublishLoader = false;
        }
        var total = $(".upload-img").length;
        var complete = 0;
        for (var i = 0; i < total; i++) {

            var file = $(".upload-img")[i].files[0];
            console.log(file);
            if (file == undefined) {
                alert('图片不能为空！');
                //second();
                return;
            }
        }

        $scope.showPublishLoader = true;
        $scope.item.imgPaths = [];
        for (var i = 0; i < total; i++) {
            var file = $(".upload-img")[i].files[0];
            BaseService.item.uploadImg(file, function(evt) {
                var result = JSON.parse(evt.target.responseText);
                if (result.success) {
                    $scope.item.imgPaths.push(result.path);
                    complete++;
                    if (complete == total) {
                        second();
                    }
                } else {
                    alert('图片上传失败!');
                }
            });
        }
    }

    $scope.addImg = function() {
        $scope.imgs.push(0);
    }

    $scope.deleteImg = function() {
        $scope.imgs.length = $scope.imgs.length - 1;
    }
}]
