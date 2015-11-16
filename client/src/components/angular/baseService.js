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
                login: function(username, password) {
                    return POST('/api/user/login', {
                        username: username,
                        password: password
                    })
                },
                signup: function(name, password, email) {
                    //username为账户名，和email一致
                    //name为昵称
                    return POST('/api/user/signup', {
                        username: email,
                        password: password,
                        email: email,
                        name: name
                    })
                },
                logout: function() {
                    return POST('/api/user/logout');
                },
            }
            return {
                waterfoo: waterfoo,
                item: item,
                user: user
            };
        }
    ])
