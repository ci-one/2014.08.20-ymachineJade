'use strict';

var pageApp = angular.module('pageApp', [
    'ngRoute'
])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'ctrlRead',
                templateUrl: '/views/partials/mainContent.html'

            }).when('/insert',{
                controller: 'ctrlinsert',
                templateUrl: '/views/partials/write.html'
            }).when('/:id',{
                controller: 'ctrldetail',
                templateUrl: '/views/partials/detail.html'
            }).when('/update/:id',{
                controller: 'ctrlupdate',
                templateUrl: '/views/partials/write.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

pageApp.factory('items',function($http,$q,$upload) {
    var items = {};
    items.query = function () {
        var deferred = $q.defer();
        $http({
            method:'post',
            url:'/getlist'
        }
        ).success(function (data) {
                deferred.resolve(data.sending);
            }
        );
        return deferred.promise;
    };

    items.getone = function (id) {
        var deferred = $q.defer();
        $http({
                method:'post',
                url:'/getboard',
                data:{id:id}
            }
        ).success(function (data) {
                deferred.resolve(data.sending);
            }
        );
        return deferred.promise;
    };



    items.insertF = function($filess){
        var deferred = $q.defer();
        var fname='';
            var $file = $filess[0];
            $upload.upload({
                url: '/server/uploadFile',
                file: $file,
                progress: function(e){}
            }).then(function(data) {
                fname=data.data;
                deferred.resolve(fname);
            },function(data){
                alert(data.data);
            });

        ;
        return deferred.promise;
    };


    items.insert = function(title, writer, content, file){
        var deferred = $q.defer();
        $http({
            method:'post',
            url:'/insertboard',
            data:{title:title,writer:writer,content:content, file:file}
        }).success(function(data){
                deferred.resolve(data);
            }
        );
        return deferred.promise;
    };

    items.update = function(id, title, content){
        var deferred = $q.defer();

        $http({
            method:'post',
            url:'/updateboard',
            data:{id:id, title:title, content:content}
        }).success(function(data){
                deferred.resolve(data);
            }
        );
        return deferred.promise;
    };

    items.delete = function(id,file){
        var deferred = $q.defer();
        $http({
            method:'post',
            url:'/deleteboard',
            data:{id:id,file:file}
        }).success(function(data){
            deferred.resolve(data);
        }
        );
        return deferred.promise;
    };

    return items;
});

pageApp.controller('ctrlRead',function($scope, $filter, items) {
    $scope.itemsPerPage = 5;
    $scope.pagedItems = [];
    $scope.currentPage = 0;

    var getlist = function(){
        items.query().then(function (result) {

            $scope.items = result;
        }).then(function(){
                var searchMatch = function (haystack, needle) {
                    if (!needle) {
                        return true;
                    }
                    return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
                };
                // init the filtered items
                $scope.search = function () {
                    $scope.currentPage = 0;
                    // now group by pages
                    $scope.groupToPages();
                };
                // calculate page in place
                $scope.groupToPages = function () {
                    $scope.pagedItems = [];

                    for (var i = 0; i < $scope.items.length; i++) {
                        if (i % $scope.itemsPerPage === 0) {
                            $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.items[i] ];
                        } else {
                            $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.items[i]);
                        }
                    }
                };
                $scope.range = function (start, end) {
                    var ret = [];
                    if (!end) {
                        end = start;
                        start = 0;
                    }
                    for (var i = start; i < end; i++) {
                        ret.push(i);
                    }
                    return ret;
                };
                $scope.prevPage = function () {
                    if ($scope.currentPage > 0) {
                        $scope.currentPage--;
                    }
                };
                $scope.nextPage = function () {
                    if ($scope.currentPage < $scope.pagedItems.length - 1) {
                        $scope.currentPage++;
                    }
                };
                $scope.setPage = function () {
                    $scope.currentPage = this.n;
                };
                // functions have been describe process the data for display
                $scope.search();
            })
    };
    getlist();

    $scope.delete = function(id,fileN){
        items.delete(id,fileN).then(function(data){
            alert(data);
            getlist();
        })
    }
});

pageApp.controller('ctrldetail',function($scope, $routeParams, items){
    var i = $routeParams.id;
    items.getone(i).then(function(result){
        $scope.item = result[0];
    });
});

pageApp.controller('ctrlinsert',function($scope, items){
    var $filess;
    $scope.onFileSelect = function($files) {
        $filess = $files;
    };
    $scope.insert = function(){
        if($filess==null || $filess==''){
            var title = $scope.item.title;
            var writer = $scope.item.writer;
            var content = $scope.item.content;
            var fileN = 'no file';
            items.insert(title, writer, content, fileN).then(function(data){
                alert(data)
            });
            history.back();
        }else{
            items.insertF($filess).then(function(result){
                var title = $scope.item.title;
                var writer = $scope.item.writer;
                var content = $scope.item.content;
                var fileN = result;
                items.insert(title, writer, content, fileN).then(function(data){
                    alert(data)
                });
                history.back();
            },function(){
                alert('오류입니다.')
            });
        }
    };
});

pageApp.controller('ctrlupdate',function($scope, $routeParams, items){
    var i = $routeParams.id;
    items.getone(i).then(function(result){
        $scope.item = result[0];
    });
    $scope.insert = function(){
        var title = $scope.item.title;
        var content = $scope.item.content;
        items.update(i, title, content).then(function(data){
            alert(data);
            history.back();
        })
    }
});