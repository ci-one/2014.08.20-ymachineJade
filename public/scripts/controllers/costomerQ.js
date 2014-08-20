/**
 * Created by user on 2014-08-05.
 */


function askListCtrl($scope, customerService) {

    $scope.itemsPerPage = 5;
    $scope.pagedItems = [];
    $scope.currentPage = 0;

    var getlist = function () {
        customerService.list().then(function (result) {
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
    };
    getlist();
}


function askDetailCtrl($scope, customerService, $routeParams) {
    customerService.one($routeParams.id).then(function (result) {
        $scope.Costomer_File = result[0];
    });

    $scope.remove = function (id) {
        customerService.delete(id).then(function (result) {
            alert(result[0]);
            history.back();
        })
    }
}

function askWriteCtrl($scope, customerService) {
    $scope.insertProcess = function (item) {
            customerService.insert(item).then(function(){
                alert('등록되었습니다.');
                item.title = '', item.content = '', item.writer = '', item.comp = '', item.email = '', item.contact = '';
            })
    }
}