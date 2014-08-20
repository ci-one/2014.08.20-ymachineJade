/**
 * Created by wealab04 on 2014-08-08.
 */
/**
 * Created by ci-one on 2014-08-04.
 */


function newListCtrl($scope, newProductService, $routeParams) {
    $scope.select = $routeParams.id;
    $scope.itemsPerPage = 5;
    $scope.pagedItems = [];
    $scope.currentPage = 0;
    var getlist = function () {
        if ($scope.select != null) {
            newProductService.cate($scope.select).then(function (result) {
                newProductService.list(result[0]).then(function (result) {
                    $scope.items = result;
                    for (i = 0; i < result.length; i++) {
                        $scope.items[i].images = result[i].images.split('/')[0];
                    }
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
            })
        } else {
            newProductService.listall().then(function (result) {
                $scope.items = result;
                for (var i = 0; i < result.length; i++) {
                    $scope.items[i].images = result[i].images.split('/')[0];
                }
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
    }
    getlist();
}

function nPro_Detail($scope, $routeParams, newProductService, $interval) {
    var ai = $routeParams.id;
    newProductService.one(ai).then(function (result) {
        $scope.item = result[0];
        var images = $scope.item.images.split('/');
        var images2 = [];
        for (var i = 0; i < images.length; i++) {
            if (images[i] != '') {
                images2.push(images[i]);
            }
        }
        $scope.images = images2;
        newProductService.mlist(ai).then(function (result) {
            $scope.model_item = result;
        })


    });

    $scope.currentIndex = 0;

    $scope.setCurrentSlideIndex = function (index) {
        $scope.currentIndex = index;
    };

    $scope.isCurrentSlideIndex = function (index) {
        return $scope.currentIndex === index;
    };

    $scope.prevSlide = function () {
        $scope.currentIndex = ($scope.currentIndex < $scope.images.length - 1) ? ++$scope.currentIndex : 0;
    };

    $scope.nextSlide = function () {
        $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.images.length - 1;
    };

    $interval(function () {
        var images = $scope.item.images.split('/');
        $scope.currentIndex = ($scope.currentIndex < images.length - 2) ? ++$scope.currentIndex : 0
    }, 3000);

    $scope.delete = function (id, images) {
        var input = confirm("삭제 하시겠습니까?");
        if (input) {
            if (images == 'no file') {
                newProductService.mdelete(id).then(function () {
                    newProductService.delete(id).then(function (result) {
                        alert(result);
                        history.back();
                    })
                })
            } else {
                newProductService.deleteF(images).then(function () {
                    newProductService.mdelete(id).then(function () {
                        newProductService.delete(id).then(function (result) {
                            alert(result);
                            history.back();
                        })
                    })
                })

            }
        }
    }

}

function newWriteCtrl($scope, newProductService, $routeParams) {
    if ($routeParams.id == 0 || $routeParams.id == '0') {
        $scope.ai = 1;
    } else {
        $scope.ai = $routeParams.id;
    }

    var $filess;
    $scope.model = [];

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

    $scope.modeladd = function () {
        var addmode = {name: $scope.modeint.name, option: $scope.modeint.option};
        $scope.model.push(addmode);
    }

    $scope.insert = function () {
        var input = confirm("등록 하시겠습니까?");
        if (input) {
            if ($filess == null || $filess == '') {
                var name = $scope.item.name;
                var company = $scope.item.company;
                var content = $scope.item.content;
                var images = 'no file';
                newProductService.cate($scope.ai).then(function (data) {
                    newProductService.insert(name, company, content, images, data[0]).then(function () {
                        newProductService.onefor(name, company).then(function (result) {
                            var itemId = result[0].id;
                            for (i = 0; i < $scope.model.length; i++) {
                                newProductService.minsert(itemId, $scope.model[i].name, $scope.model[i].option).then(function () {
                                    console.log(i);
                                });
                            }
                            alert('등록하였습니다.');
                            history.back();
                        })
                    });
                });

            } else {
                newProductService.insertF($filess).then(function (result) {
                    var name = $scope.item.name;
                    var company = $scope.item.company;
                    var content = $scope.item.content;
                    var images = result;
                    newProductService.cate($scope.ai).then(function (data) {
                        newProductService.insert(name, company, content, images, data[0]).then(function () {
                            newProductService.onefor(name, company).then(function (result) {
                                var itemId = result[0].id;
                                for (i = 0; i < $scope.model.length; i++) {
                                    newProductService.minsert(itemId, $scope.model[i].name, $scope.model[i].option).then(function () {
                                        console.log(i);
                                    });
                                }
                                alert('등록하였습니다.');
                                history.back();
                            })
                        });
                    }, function () {
                        alert('잘못된 등록이 발생하였습니다.')
                    });
                })
            }
        }
    };
}