angular = require('angular');
angular.module('baseService', [])
    .factory('BaseService', ['$rootScope', '$http', '$q',
        function($rootScope, $http) {
            function GET(url, params) {
                return $http({
                    method: 'GET',
                    url: url,
                    params: params
                });
            }

            function POST(url, data) {
                return $http({
                    method: 'POST',
                    url: url,
                    data: data
                })
            }
            var item = {
                get: function(id) {
                    var params = {
                        id: id
                    };
                    return GET('/api/item/get', params);
                },
                publish: function(params) {
                    return POST('/api/item/publish', params);
                },
                uploadImg: function(file, callback) {
                    var fd = new FormData();
                    fd.append("file", file);
                    var xhr = new XMLHttpRequest();
                    xhr.addEventListener("load", callback, false);
                    xhr.open("POST", "/api/upload");
                    xhr.send(fd);
                },
                equalTo: function(params, start, amount, category) {
                    return POST('/api/item/equal_to')
                },
                update: function(itemTimeStamp, params) {
                    return POST('/api/item/update', {
                        itemTimeStamp: itemTimeStamp,
                        params: params
                    });
                },
                setStatus: function(itemTimeStamp, status) {
                    return POST('/api/item/set_status', {
                        itemTimeStamp: itemTimeStamp,
                        status: status
                    });
                },
                getTodayNewItemAmount:function(){
                    return GET('/api/item/get_today_new_item_amount');
                }
            }
            var waterfoo = {
                getItem: function(start, amount, category) {
                    var params = {
                        start: start,
                        amount: amount,
                        category: category
                    }
                    return GET('/api/item/collection', params);
                },
                getItemInUsermanage: function(start, amount, category) {
                    var params = {
                        start: start,
                        amount: amount,
                        category: category
                    }
                    return POST('/api/user/my_item', params);
                },
            };
            var user = {
                requsetTelVerify: function(tel) {
                    return POST('/api/user/request_tel_verify', {
                        tel: tel
                    });
                },
                login: function(username, password) {
                    return POST('/api/user/login', {
                        username: username,
                        password: password
                    });
                },
                signup: function(name, password, tel, captcha) {
                    //username为账户名，和email一致
                    //name为昵称
                    return POST('/api/user/signup', {
                        tel: tel,
                        password: password,
                        name: name,
                        captcha: captcha
                    });
                },
                logout: function() {
                    return POST('/api/user/logout');
                },
                requestMailVerify: function(mailAddress) {
                    return POST('/api/user/request_mail_verify', {
                        mailAddress: mailAddress
                    });
                },
                requestPasswordReset: function(tel) {
                    return POST('/api/user/request_password_reset', {
                        tel: tel
                    });
                },
                resetPassword: function(captcha, newPassword) {
                    return POST('/api/user/reset_password', {
                        captcha: captcha,
                        newPassword: newPassword
                    })
                }
            }
            return {
                waterfoo: waterfoo,
                item: item,
                user: user
            };
        }
    ])
