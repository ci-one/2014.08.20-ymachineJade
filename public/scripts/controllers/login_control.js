/**
 * Created by ci-one on 2014-08-06.
 */


function loginStatueManager($scope, Accounts) {
    $scope.$watch(Accounts.getName, function () {
        $scope.active_account = Accounts.getName();
        $scope.login_button = "로그인";
        if (Accounts.getName()) {
            $scope.active_greet = "님 환영합니다!";
            $scope.login_button = "로그아웃";
            $scope.loginSuccess();
        }
    });
}

function doLogoff($scope, Accounts) {
    Accounts.setName("");
    Accounts.logout();
    $scope.login_button = "로그인";
}