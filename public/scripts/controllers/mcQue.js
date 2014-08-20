/**
 * Created by ci-one on 2014-08-05.
 */

//'use strict';


function usedAskListCtrl($scope, machineQuestionService) {

    $scope.itemsPerPage = 5;
    $scope.pagedItems = [];
    $scope.currentPage = 0;

    var getlist = function () {
        machineQuestionService.list().then(function (result) {
            $scope.items = result;
        }).then(function () {
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
        });
    }
    getlist();

}

function usedAskDetailCtrl($scope, $routeParams, machineQuestionService) {
    machineQuestionService.one($routeParams.id).then(function (result) {
        $scope.item = result[0];
        var images = $scope.item.images.split('/');
        var images2 = [];
        for (var i = 0; i < images.length; i++) {
            if (images[i] != '') {
                images2.push(images[i]);
            }
        }
        $scope.item_image = images2;
    });
}

function usedAskWriteCtrl($scope, machineQuestionService) {
    var $filess;
    $scope.onFileSelect = function ($files) {
        var chk = 1;
        for (var i = 0; i < $files.length; i++) {
            if ($files[i].size >= 2000000) {
                alert('개별파일당 2mb까지만 업로드가능합니다.');
                chk = 0;
                return;
            }
        }

        if (chk == 1) {
            $filess = $files;
        } else {
            $filess = null;
        }
    };

    $scope.insert = function (item) {
        if ($filess == null || $filess == '') {
            var images = 'no file';
            machineQuestionService.insert(item, images).then(function (data) {
                alert('등록되었습니다.');
                item.title = '', item.content = '', item.writer = '', item.comp = '', item.email = '', item.contact = '';
            });
        } else {
            machineQuestionService.insertF($filess).then(function (result) {
                var images = result;
                machineQuestionService.insert(item, images).then(function (data) {
                    alert('등록되었습니다.');
                    item.title = '', item.content = '', item.writer = '', item.comp = '', item.email = '', item.contact = '';
                });
            }, function () {
                alert('잘못된 등록이 발생하였습니다.')
            });
        }
    }
}