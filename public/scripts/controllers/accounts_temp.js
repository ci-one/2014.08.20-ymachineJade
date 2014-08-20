/**
 * Created by ci-one on 2014-08-04.
 */
//var loginModule = angular.module



var accounts = [
    {
        id: 'gildong',
        name: '길동이',
        pswd: '123'
    },
    {
        id: 'gilmoo',
        name: '길무이',
        pswd: '123'
    },
    {
        id: 'gilsam',
        name: '길삼이',
        pswd: '123'
    }
    ,
    {
        id: 'dong2dong2',
        name: '길똥이',
        pswd: '123'
    }
    ,
    {
        id: 'asd',
        name: '망나니',
        pswd: 'asd'
    }
];
/*
function LoginController ($scope, $location, Accounts) {
    $scope.login_check = function() {

        for(i=0; i<accounts.length; i++){
            if($scope.login_id==accounts[i].id){
                if($scope.login_pwd==accounts[i].pswd){

                    alert("1");
                    Accounts.setName(accounts[i].name);

                    alert("2");

                    $location.path("/");

                    return;
                }
            }
        }
        alert("로그인에 실패하였습니다." + "\n아이디와 비밀번호를 확인하세요.");

    }
}
*/