module.exports = ['$scope', 'BaseService', '$rootScope', function($scope, BaseService, $rootScope) {
    console.log('aaaaaaaaa');
    $scope.publishIsShow = $scope.loginIsShow = $scope.signupIsShow = false;
    $scope.item = {};
    $scope.imgs = [0];
    $scope.showPublish = function(){
        $rootScope.$broadcast('showPublish');
    }
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
                $scope.publishLoaderIsShow = false;
                $scope.publishIsShow = false;
                $rootScope.$broadcast('item-publish');
            });

        }
        if (!($scope.item.name && $scope.item.detail && $scope.item.category && $scope.item.price && $scope.item.tel)) {
            alert('发布失败，好像有重要信息缺失哦？');
            $scope.publishLoaderIsShow = false;
            return;
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

        $scope.publishLoaderIsShow = true;
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
    $scope.test = function() {
        BaseService.user.login('13307130321@fudan.edu.cn', '123456').then(function(result) {
            console.log(result);
        });
    }
    $scope.test2 = function() {
        BaseService.user.signup('starkwang', '123456', '13307130321@fudan.edu.cn').then(function(result) {
            console.log(result);
        });
    }
    $scope.test3 = function() {
        BaseService.user.logout().then(function(result) {
            console.log(result);
        });
    }
    $scope.changeLoginShow = function($event) {
        console.log($event);
        if ($event.target.id == "change-show") {
            $scope.loginIsShow = !$scope.loginIsShow;
        }
    }
    $scope.login = function(){
        if(!$scope.user.username||!$scope.user.password){
            return;
        }
        BaseService.user.login($scope.user.username, $scope.user.password).then(function(result) {
            console.log(result);
            if(result.data.success){
                window.location.pathname = '/';
            }else{
                alert('账号不存在，或者密码错误！');
                $scope.loginIsShow = false;
            }
        });
    }
    $scope.logout = function(){
        BaseService.user.logout().then(function(result) {
            window.location.pathname = '/';
        });
    }
    $scope.changeSignupShow = function($event){
        console.log($event);
        if ($event.target.id == "change-show") {
            $scope.signupIsShow = !$scope.signupIsShow;
        }
    }
    $scope.signup = function(){
        if(!$scope.signupInfo.email){
            alert('请填入正确的复旦邮箱！');
            return;
        }
        if(!$scope.signupInfo.password||!$scope.signupInfo.name){
            alert('密码或用户名不能为空！');
            return;
        }
        BaseService.user.signup($scope.signupInfo.name, $scope.signupInfo.password, $scope.signupInfo.email).then(function(result) {
            if(result.data.success){
                alert('注册成功！');
                $scope.signupIsShow = false;
                $scope.user.username = $scope.signupInfo.email;
                $scope.loginIsShow = true;
            }else{
                alert('注册失败');
            }
        });
    }
}]
