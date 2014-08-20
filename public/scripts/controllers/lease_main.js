'use strict';


angular.module('lsApp')
    .controller('MainCtrl2', function ($scope, $http,loginService, $cookieStore) {
        $http.get('/api/awesomeThings').success(function(awesomeThings) {
            $scope.awesomeThings = awesomeThings;
            $scope.lsMenuList = [
                {url:'lease/introduce', name:'회사소개'}
                , {url:'lease/business1', name:'리스금융'}
                , {url:'lease/business2', name:'할부금융렌탈'}
                , {url:'lease/business3', name:'담보및운전자금'}
                , {url:'lease/business4', name:'컨설팅업무'}
            ];

            $scope.ymTopMenuList = [
                {url:'sitemap', name:'사이트맵'}
                , {url:'login', name:'로그인'}
            ];

            $scope.ymAllMenuList = [
                {url:'main', name:'홈으로'}
                , {url:'company', name:'회사소개'}
                , {url:'company/introduce', name:'회사소개/인사말'}
                , {url:'company/direction', name:'회사소개/오시는길'}
                , {url:'product/new', name:'신제품소개'}
                , {url:'product/new/list', name:'신제품소개/목록'}
                , {url:'product/new/:id', name:'신제품소개/상세보기'}
                , {url:'product/new/write', name:'신제품소개/작성'}
                , {url:'product/new/category', name:'신제품소개/카테고리'}
                , {url:'product/used', name:'중고제품'}
                , {url:'product/used/list', name:'중고제품/목록'}
                , {url:'product/used/:id', name:'중고제품/상세보기'}
                , {url:'product/used/write', name:'중고제품/작성'}
                , {url:'product/used/category', name:'중고제품/카테고리'}
                , {url:'request/new', name:'고객문의'}
                , {url:'request/new/write', name:'고객문의/작성'}
                , {url:'request/new/list', name:'고객문의/목록'}
                , {url:'request/new/:id', name:'고객문의/상세보기'}
                , {url:'request/used', name:'중고장비문의'}
                , {url:'request/used/write', name:'중고장비문의/작성'}
                , {url:'request/used/list', name:'중고장비문의/목록'}
                , {url:'request/used/:id', name:'중고장비문의/상세보기'}
                , {url:'notice', name:'공지사항'}
                , {url:'notice/list', name:'공지사항/목록'}
                , {url:'notice/:id', name:'공지사항/상세보기'}
                , {url:'notice/write', name:'공지사항/작성'}
                , {url:'sitemap', name:'사이트맵'}
                , {url:'login', name:'로그인'}
                , {url:'main2', name:'금융리스메인'}
            ];
        });

        if($cookieStore.get('role')=='true'){
            $scope.role = true;
            $scope.login = '로그아웃';
        }else{
            $scope.role = false;
            $scope.login = '로그인';
        }
        $scope.login_check = function (id, pswd) {
            loginService.idChk(id, pswd).then(function (result) {
                if (result == 'success') {
                    $cookieStore.put('role','true');
                    $scope.role = true;
                    $scope.login = '로그아웃';
                    history.back();
                }else{
                    $scope.login = '로그인';
                    $scope.role = false;
                }
            });
        };
        $scope.doLogoff = function () {
            $cookieStore.remove('role');
            $scope.login_check('a', 'a');
        }
    });