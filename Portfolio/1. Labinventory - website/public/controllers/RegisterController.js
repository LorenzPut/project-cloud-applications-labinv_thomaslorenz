
myApp.controller('RegisterCtrl', function CheckLoginData ($scope, $http, mvIdentity, mvAuth, $location)
{
    $scope.register = function () {
        if($scope.RegisterForm.$valid)
        {
            $http.post('/register', $scope.user).success(function(response)
            {
                alert("U bent correct geregistreerd");
                $location.path('/');
            });

        }
    }
});