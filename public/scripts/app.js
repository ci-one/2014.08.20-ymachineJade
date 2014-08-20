'use strict';
var app = angular.module('mcApp', [
    'ngRoute'
    , 'ui.bootstrap'
    , 'angularFileUpload'
    , 'ngCookies'
    , 'ngAnimate'
]);

app.animation('.slide-animation', function () {
    return {
        addClass: function (element, className, done) {
            if (className == 'ng-hide') {
                TweenMax.to(element, 0.5, {left: element.parent().width(), onComplete: done });
            }
            else {
                done();
            }
        },
        removeClass: function (element, className, done) {
            if (className == 'ng-hide') {
                element.removeClass('ng-hide');

                TweenMax.set(element, { left: element.parent().width() });
                TweenMax.to(element, 0.5, {left: 0, onComplete: done });
            }
            else {
                done();
            }
        }
    };
});

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            redirectTo: '/ym'
        })
        .when('/ym', {
            templateUrl: '/views/1100_main/050-1100-M_main.html',
            controller: 'newListCtrl'
        })
        .when('/ym/company', {
            templateUrl: '/views/1200_company/050-1200-S_company.html'
        })
        .when('/ym/company/introduce', {
            templateUrl: '/views/1200_company/050-1210-S_company_introduce.html'
        })
        .when('/ym/company/direction', {
            templateUrl: '/views/1200_company/050-1220-S_company_directions.html'
        })


        .when('/ym/product/new', {
            templateUrl: '/views/1300_newProduct/050-1300-S_new.html',
            controller: 'ctrlRead'
        })
        .when('/ym/product/new/list', {
            templateUrl: '/views/1300_newProduct/050-1310-S_new_list.html',
            controller: 'newListCtrl'
        })
        .when('/ym/product/new/list/:id', {
            templateUrl: '/views/1300_newProduct/050-1310-S_new_list.html',
            controller: 'newListCtrl'
        })
        .when('/ym/product/new/write', {
            redirectTo: '/ym/product/new/write/0'
        })
        .when('/ym/product/new/write/:id', {
            templateUrl: '/views/1300_newProduct/050-1330-S_new_write.html',
            controller: 'newWriteCtrl'
        })
        .when('/ym/product/new/category', {
            templateUrl: '/views/1300_newProduct/050-1340-S_new_category.html'
        })
        .when('/ym/product/new/:id', {
            templateUrl: '/views/1300_newProduct/050-1320-S_new_detail.html',
            controller: 'nPro_Detail'
        })


        .when('/ym/product/used', {
            templateUrl: '/views/1400_usedProduct/050-1400-S_used.html'
        })
        .when('/ym/product/used/list', {
            templateUrl: '/views/1400_usedProduct/050-1410-S_used_list.html',
            controller: 'oldListCtrl'
        })
        .when('/ym/product/used/list/:id', {
            templateUrl: '/views/1400_usedProduct/050-1410-S_used_list.html',
            controller: 'oldListCtrl'
        })
        .when('/ym/product/used/write', {
            redirectTo: '/ym/product/used/write/0'
        })
        .when('/ym/product/used/write/:id', {
            templateUrl: '/views/1400_usedProduct/050-1430-S_used_write.html',
            controller: 'oldWriteCtrl'
        })
        .when('/ym/product/used/category', {
            templateUrl: '/views/1400_usedProduct/050-1440-S_used_category.html'
        })
        .when('/ym/product/used/:id', {
            templateUrl: '/views/1400_usedProduct/050-1420-S_used_detail.html',
            controller: 'oPro_Detail'
        })


        .when('/ym/request/new', {
            templateUrl: '/views/1500_request/050-1500-S_request.html',
            controller: 'askWriteCtrl'
        })
        .when('/ym/request/new/write', {
            templateUrl: '/views/1500_request/050-1510-S_request_write.html',
            controller: 'askWriteCtrl'
        })
        .when('/ym/request/new/list', {
            templateUrl: '/views/1500_request/050-1520-S_request_list.html',
            controller: 'askListCtrl'
        })
        .when('/ym/request/new/:id', {
            templateUrl: '/views/1500_request/050-1530-S_request_detail.html',
            controller: 'askDetailCtrl'
        })
        .when('/ym/request/used', {
            templateUrl: '/views/1600_requestUsed/050-1600-S_request_used.html',
            controller: 'usedAskWriteCtrl'
        })
        .when('/ym/request/used/write', {
            templateUrl: '/views/1600_requestUsed/050-1610-S_request_used_write.html',
            controller: 'usedAskWriteCtrl'
        })
        .when('/ym/request/used/list', {
            templateUrl: '/views/1600_requestUsed/050-1620-S_request_used_list.html',
            controller: 'usedAskListCtrl'
        })
        .when('/ym/request/used/:id', {
            templateUrl: '/views/1600_requestUsed/050-1630-S_request_used_detail.html',
            controller: 'usedAskDetailCtrl'
        })


        .when('/ym/notice', {
            templateUrl: '/views/1700_notice/050-1700-S_notice.html'
        })
        .when('/ym/notice/list', {
            templateUrl: '/views/1700_notice/050-1710-S_notice_list.html'
        })
        .when('/ym/notice/write', {
            templateUrl: '/views/1700_notice/050-1730-S_notice_write.html',
            controller: 'Notice_Write'
        })
        .when('/ym/notice/:id', {
            templateUrl: '/views/1700_notice/050-1720-S_notice_detail.html'
        })
        .when('/ym/notice/write/:id', {
            templateUrl: '/views/1700_notice/050-1730-S_notice_write.html',
            controller: 'Notice_Update'
        })
        .when('/ym/sitemap', {
            templateUrl: '/views/3100_sitemap/050-3100-S_sitemap.html'
        })
        .when('/ym/login', {
            templateUrl: '/views/4100_login/050-4100-S_login.html'
        }).when('/lease', {
            templateUrl: '/views/2100_main/050-2100-M_main.html'
        })

});

app.factory('noticeService', function ($http, $q, $upload,$timeout) {
    var noticeService = {};
    noticeService.list = function () {
        var deferred = $q.defer();

        $http({
                method: 'post',
                url: '/noticeList'
            }
        ).success(function (data) {
                deferred.resolve(data.sending);
            }
        );
        return deferred.promise;
    };

    noticeService.one = function (id) {

        var deferred = $q.defer();
        $http({
                method: 'post',
                url: '/noticeOne',
                data: {id: id}
            }
        ).success(function (data) {
                deferred.resolve(data.sending);
            }
        );
        return deferred.promise;
    };


    noticeService.insertF = function ($filess) {
        var deferred = $q.defer();
        var fname = '';

        var process = function(){
            for (var i = 0; i < $filess.length; i++) {
                $upload.upload({
                    url: '/noticeInsertF',
                    file: $filess[i],
                    progress: function (e) {
                    }
                }).then(function (data) {
                    fname += data.data + '/';
                }, function (data) {
                    alert(data.data);
                });
            }
        }

        if($filess.length<=3){
            process();
            $timeout(function(){deferred.resolve(fname)}, 1500);
        }else if($filess.length<=5){
            process();
            $timeout(function(){deferred.resolve(fname)}, 3000);
        }else if($filess.length<=8){
            process();
            $timeout(function(){deferred.resolve(fname)}, 5000);
        }else if($filess.length<=10){
            process();
            $timeout(function(){deferred.resolve(fname)}, 7000);
        }else if($filess.length<=15){
            process();
            $timeout(function(){deferred.resolve(fname)}, 10000);
        }else if($filess.length>15){
            alert('업로드는 15개까지만 허용합니다.');
            return null;
        }

        return deferred.promise;
    };


    noticeService.insert = function (title, content, images) {

        var deferred = $q.defer();
        $http({
            method: 'post',
            url: '/noticeInsert',
            data: {title: title, content: content, images: images}
        }).success(function (data) {
                deferred.resolve(data);
            }
        );

        return deferred.promise;
    };

    noticeService.update = function (id, title, content) {
        var deferred = $q.defer();

        $http({
            method: 'post',
            url: '/noticeUpdate',
            data: {id: id, title: title, content: content}
        }).success(function (data) {
                deferred.resolve(data);
            }
        );
        return deferred.promise;
    };

    noticeService.deleteF = function (images) {
        var image = images.split('/');
        var deferred = $q.defer();

        for (var file = 0; file < image.length; file++) {
            if (image[file] != '') {
                $http({
                    method: 'post',
                    url: '/noticeDeleteF',
                    data: {file: image[file]}
                }).success(function (data) {
                        deferred.resolve(data);
                    }
                );
            }
        }

        return deferred.promise;
    };

    noticeService.delete = function (id) {
        var deferred = $q.defer();
        $http({
            method: 'post',
            url: '/noticeDelete',
            data: {id: id}
        }).success(function (data) {
                deferred.resolve(data);
            }
        );
        return deferred.promise;
    };

    return noticeService;
});

app.factory('newProductService', function ($http, $q, $upload,$timeout) {
    var newProductService = {};
    newProductService.cate = function (select) {
        var deferred = $q.defer();
        $http({
                method: 'post',
                url: '/getCateN',
                data: {select: select}
            }
        ).success(function (data) {
                deferred.resolve(data.sending);
            }
        );
        return deferred.promise;
    };

    newProductService.list = function (select) {
        var deferred = $q.defer();
        $http({
                method: 'post',
                url: '/nitemList',
                data: {select: select}
            }
        ).success(function (data) {
                deferred.resolve(data.sending);
            }
        );
        return deferred.promise;
    };

    newProductService.listall = function () {
        var deferred = $q.defer();
        $http({
                method: 'post',
                url: '/nitemListall'
            }
        ).success(function (data) {
                deferred.resolve(data.sending);
            }
        );
        return deferred.promise;
    };

    newProductService.one = function (id) {
        var deferred = $q.defer();
        $http({
                method: 'post',
                url: '/nitemOne',
                data: {id: id}
            }
        ).success(function (data) {
                deferred.resolve(data.sending);
            }
        );
        return deferred.promise;
    };
    newProductService.mlist = function (id) {
        var deferred = $q.defer();
        $http({
                method: 'post',
                url: '/nmodelList',
                data: {id: id}
            }
        ).success(function (data) {
                deferred.resolve(data.sending);
            }
        );
        return deferred.promise;
    };

    newProductService.minsert = function (proId, name, option) {
        var deferred = $q.defer();
        $http({
            method: 'post',
            url: '/nmodelInsert',
            data: { proId: proId, name: name, option: option
            }
        }).success(function (data) {
                deferred.resolve(data);
            }
        );
        return deferred.promise;
    };

    newProductService.insert = function (name, comp, content, images, select) {
        var deferred = $q.defer();
        $http({
            method: 'post',
            url: '/nitemInsert',
            data: { name: name, comp: comp, content: content, images: images, select: select }
        }).success(function (data) {
                deferred.resolve(data);
            }
        );
        return deferred.promise;
    };
    newProductService.onefor = function (name, company) {
        var deferred = $q.defer();
        $http({
                method: 'post',
                url: '/nitemOneFor',
                data: {name: name, comp: company}
            }
        ).success(function (data) {
                deferred.resolve(data.sending);
            }
        );
        return deferred.promise;
    };

    newProductService.insertF = function ($filess) {
        var deferred = $q.defer();
        var fname = '';

        var process = function(){
            for (var i = 0; i < $filess.length; i++) {
                $upload.upload({
                    url: '/nitemInsertF',
                    file: $filess[i],
                    progress: function (e) {
                    }
                }).then(function (data) {
                    fname += data.data + '/';
                }, function (data) {
                    alert(data.data);
                });
            }
        }

        if($filess.length<=3){
            process();
            $timeout(function(){deferred.resolve(fname)}, 1500);
        }else if($filess.length<=5){
            process();
            $timeout(function(){deferred.resolve(fname)}, 3000);
        }else if($filess.length<=8){
            process();
            $timeout(function(){deferred.resolve(fname)}, 5000);
        }else if($filess.length<=10){
            process();
            $timeout(function(){deferred.resolve(fname)}, 7000);
        }else if($filess.length<=15){
            process();
            $timeout(function(){deferred.resolve(fname)}, 10000);
        }else if($filess.length>15){
            alert('업로드는 15개까지만 허용합니다.');
            return null;
        }

        return deferred.promise;
    };


    newProductService.deleteF = function (images) {
        var image = images.split('/');
        var deferred = $q.defer();
        for (var file = 0; file < image.length; file++) {
            if (image[file] != '') {
                $http({
                    method: 'post',
                    url: '/nitemDeleteF',
                    data: {file: image[file]}
                }).success(function (data) {
                        deferred.resolve(data);
                    }
                );
            }
        }

        return deferred.promise;
    };

    newProductService.delete = function (id) {
        var deferred = $q.defer();
        $http({
            method: 'post',
            url: '/nitemDelete',
            data: {id: id}
        }).success(function (data) {
                deferred.resolve(data);
            }
        );
        return deferred.promise;
    };
    newProductService.mdelete = function (id) {
        var deferred = $q.defer();
        $http({
            method: 'post',
            url: '/nmodelDelete',
            data: {id: id}
        }).success(function (data) {
                deferred.resolve(data);
            }
        );
        return deferred.promise;
    };

    return newProductService;
});


app.factory('oldProductService', function ($http, $q, $upload ,$timeout) {
    var oldProductService = {};

    oldProductService.cate = function (select) {
        var deferred = $q.defer();
        $http({
                method: 'post',
                url: '/getCateO',
                data: {select: select}
            }
        ).success(function (data) {
                deferred.resolve(data.sending);
            }
        );
        return deferred.promise;
    };

    oldProductService.list = function (select) {
        var deferred = $q.defer();

        $http({
                method: 'post',
                url: '/oitemList',
                data: {select: select}
            }
        ).success(function (data) {
                deferred.resolve(data.sending);
            }
        );
        return deferred.promise;
    };
    oldProductService.listall = function () {
        var deferred = $q.defer();
        $http({
                method: 'post',
                url: '/oitemListall'
            }
        ).success(function (data) {
                deferred.resolve(data.sending);
            }
        );
        return deferred.promise;
    };

    oldProductService.one = function (id) {
        var deferred = $q.defer();
        $http({
                method: 'post',
                url: '/oitemOne',
                data: {id: id}
            }
        ).success(function (data) {
                deferred.resolve(data.sending);
            }
        );
        return deferred.promise;
    };

    oldProductService.mlist = function (id) {
        var deferred = $q.defer();
        $http({
                method: 'post',
                url: '/omodelList',
                data: {id: id}
            }
        ).success(function (data) {
                deferred.resolve(data.sending);
            }
        );
        return deferred.promise;
    };

    oldProductService.minsert = function (proId, name, option) {
        var deferred = $q.defer();
        $http({
            method: 'post',
            url: '/omodelInsert',
            data: { proId: proId, name: name, option: option
            }
        }).success(function (data) {
                deferred.resolve(data);
            }
        );
        return deferred.promise;
    };
    oldProductService.insert = function (name, comp, content, images, ai) {
        var deferred = $q.defer();
        $http({
            method: 'post',
            url: '/oitemInsert',
            data: { name: name, comp: comp, content: content, images: images, select: ai }
        }).success(function (data) {
                deferred.resolve(data);
            }
        );
        return deferred.promise;
    };
    oldProductService.onefor = function (name, company) {
        var deferred = $q.defer();
        $http({
                method: 'post',
                url: '/oitemOneFor',
                data: {name: name, comp: company}
            }
        ).success(function (data) {
                deferred.resolve(data.sending);
            }
        );
        return deferred.promise;
    };

    oldProductService.insertF = function ($filess) {
        var deferred = $q.defer();
        var fname = '';

        var process = function(){
            for (var i = 0; i < $filess.length; i++) {
                $upload.upload({
                    url: '/oitemInsertF',
                    file: $filess[i],
                    progress: function (e) {
                    }
                }).then(function (data) {
                    fname += data.data + '/';
                }, function (data) {
                    alert(data.data);
                });
            }
        }

        if($filess.length<=3){
            process();
            $timeout(function(){deferred.resolve(fname)}, 500);
        }else if($filess.length<=5){
            process();
            $timeout(function(){deferred.resolve(fname)}, 1000);
        }else if($filess.length<=8){
            process();
            $timeout(function(){deferred.resolve(fname)}, 5000);
        }else if($filess.length<=10){
            process();
            $timeout(function(){deferred.resolve(fname)}, 7000);
        }else if($filess.length<=15){
            process();
            $timeout(function(){deferred.resolve(fname)}, 10000);
        }else if($filess.length>15){
            alert('업로드는 15개까지만 허용합니다.');
            return null;
        }

        return deferred.promise;
    };


    oldProductService.deleteF = function (images) {
        var image = images.split('/');
        var deferred = $q.defer();
        for (var file = 0; file < image.length; file++) {
            if (image[file] != '') {
                $http({
                    method: 'post',
                    url: '/oitemDeleteF',
                    data: {file: image[file]}
                }).success(function (data) {
                        deferred.resolve(data);
                    }
                );
            }
        }

        return deferred.promise;
    };

    oldProductService.delete = function (id) {
        var deferred = $q.defer();
        $http({
            method: 'post',
            url: '/oitemDelete',
            data: {id: id}
        }).success(function (data) {
                deferred.resolve(data);
            }
        );
        return deferred.promise;
    };
    oldProductService.mdelete = function (id) {
        var deferred = $q.defer();
        $http({
            method: 'post',
            url: '/omodelDelete',
            data: {id: id}
        }).success(function (data) {
                deferred.resolve(data);
            }
        );
        return deferred.promise;
    };

    return oldProductService;
});

app.factory('machineQuestionService', function ($http, $q, $upload,$timeout) {
    var machineQuestionService = {};
    machineQuestionService.list = function () {
        var deferred = $q.defer();

        $http({
                method: 'post',
                url: '/mcqList'
            }
        ).success(function (data) {
                deferred.resolve(data.sending);
            }
        );
        return deferred.promise;
    };

    machineQuestionService.one = function (id) {
        var deferred = $q.defer();
        $http({
                method: 'post',
                url: '/mcqOne',
                data: {id: id}
            }
        ).success(function (data) {
                deferred.resolve(data.sending);
            }
        );
        return deferred.promise;
    };


    machineQuestionService.insertF = function ($filess) {
        var deferred = $q.defer();
        var fname = '';

        var process = function(){
            for (var i = 0; i < $filess.length; i++) {
                $upload.upload({
                    url: '/mcqInsertF',
                    file: $filess[i],
                    progress: function (e) {
                    }
                }).then(function (data) {
                    fname += data.data + '/';
                }, function (data) {
                    alert(data.data);
                });
            }
        }

        if($filess.length<=3){
            process();
            $timeout(function(){deferred.resolve(fname)}, 1500);
        }else if($filess.length<=5){
            process();
            $timeout(function(){deferred.resolve(fname)}, 3000);
        }else if($filess.length<=8){
            process();
            $timeout(function(){deferred.resolve(fname)}, 5000);
        }else if($filess.length<=10){
            process();
            $timeout(function(){deferred.resolve(fname)}, 7000);
        }else if($filess.length<=15){
            process();
            $timeout(function(){deferred.resolve(fname)}, 10000);
        }else if($filess.length>15){
            alert('업로드는 15개까지만 허용합니다.');
            return null;
        }

        return deferred.promise;
    };


    machineQuestionService.insert = function (item, images) {
        var deferred = $q.defer();
        $http({
            method: 'post',
            url: '/mcqInsert',
            data: {title: item.title, writer: item.writer, comp: item.comp, contact: item.contact, email: item.email, content: item.content, images: images}
        }).success(function (data) {
                deferred.resolve(data);
            }
        );
        return deferred.promise;
    };
    return machineQuestionService;
});


app.factory('customerService', function ($http, $q) {
    var customerService = {};
    customerService.list = function () {
        var deferred = $q.defer();

        $http({
                method: 'post',
                url: '/customerList'
            }
        ).success(function (data) {
                deferred.resolve(data.sending);
            }
        );
        return deferred.promise;
    };

    customerService.one = function (id) {
        var deferred = $q.defer();
        $http({
                method: 'post',
                url: '/customerOne',
                data: {id: id}
            }
        ).success(function (data) {
                deferred.resolve(data.sending);
            }
        );
        return deferred.promise;
    };
    customerService.delete = function (id) {
        var deferred = $q.defer();
        $http({
                method: 'post',
                url: '/customerdelete',
                data: {id: id}
            }
        ).success(function (data) {
                deferred.resolve(data.sending);
            }
        );
        return deferred.promise;
    };

    customerService.insert = function (item) {
        var input = confirm("등록하시겠습니까?");

        if (input) {
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: '/customerInsert',
                data: {title: item.title, writer: item.writer, comp: item.comp, contact: item.contact, email: item.email, content: item.content}
            }).success(function (data) {
                    deferred.resolve(data);
                }
            );
            return deferred.promise;
        } else {

        }
    };
    return customerService;
});

app.factory('loginService', function ($http, $q) {
    var loginService = {};
    loginService.idChk = function (id, pswd) {
        var deferred = $q.defer();
        $http({
            url: '/idChk',
            method: 'post',
            data: {id: id, pswd: pswd}
        }).success(function (data) {
            deferred.resolve(data);
        }).error(function (status) {
            deferred.reject(status);
        });

        return deferred.promise;
    };
    return loginService;
});

app.factory('oldRecommService', function ($http, $q) {
    var oldRecommService = {};
    oldRecommService.list = function () {
        var deferred = $q.defer();

        $http({
                method: 'post',
                url: '/oldRecList'
            }
        ).success(function (data) {
                deferred.resolve(data.sending);
            }
        );
        return deferred.promise;
    };
    oldRecommService.chk = function (itemId) {
        var deferred = $q.defer();
        $http({
                method: 'post',
                url: '/oitemChk',
                data: {itemId: itemId }
            }
        ).success(function (data) {
                deferred.resolve(data);
            }
        );
        return deferred.promise;
    };

    oldRecommService.one = function (itemId) {
        var deferred = $q.defer();
        $http({
                method: 'post',
                url: '/oitemOne',
                data: {id: itemId }
            }
        ).success(function (data) {
                deferred.resolve(data.sending);
            }
        );
        return deferred.promise;
    };


    oldRecommService.update = function (id, itemId) {
        var deferred = $q.defer();
        $http({
            method: 'post',
            url: '/oldRecUpdate',
            data: { id: id, itemId: itemId }
        }).success(function (data) {
                deferred.resolve(data);
            }
        );
        return deferred.promise;
    };

    oldRecommService.delete = function (id) {
        var deferred = $q.defer();

        $http({
            method: 'post',
            url: '/oldRecDelete',
            data: {id: id }
        }).success(function (data) {
                deferred.resolve(data);
            }
        );
        return deferred.promise;
    };

    return oldRecommService;
});

app.factory('newRecommService', function ($http, $q) {
    var newRecommService = {};
    newRecommService.list = function () {
        var deferred = $q.defer();

        $http({
                method: 'post',
                url: '/newRecList'
            }
        ).success(function (data) {
                deferred.resolve(data.sending);
            }
        );
        return deferred.promise;
    };

    newRecommService.one = function (itemId) {
        var deferred = $q.defer();
        $http({
                method: 'post',
                url: '/nitemOne',
                data: {id: itemId }
            }
        ).success(function (data) {
                deferred.resolve(data.sending);
            }
        );
        return deferred.promise;
    };


    newRecommService.update = function (id, itemId) {
        var deferred = $q.defer();
        $http({
            method: 'post',
            url: '/newRecUpdate',
            data: { id: id, itemId: itemId }
        }).success(function (data) {
                deferred.resolve(data);
            }
        );
        return deferred.promise;
    };

    newRecommService.delete = function (id) {
        var deferred = $q.defer();

        $http({
            method: 'post',
            url: '/newRecDelete',
            data: {id: id }
        }).success(function (data) {
                deferred.resolve(data);
            }
        );
        return deferred.promise;
    };

    return newRecommService;
});
