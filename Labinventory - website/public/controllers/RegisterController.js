/**
 * Created by Lorenz Put on 24-11-2015.
 */
myApp.controller('RegisterCtrl', function CheckLoginData ($scope, $http, mvIdentity, mvAuth, $location)
{
    $scope.register = function () {
        if($scope.RegisterForm.$valid)
        {
            $http.post('/register', $scope.user).success(function(response)
            {
                console.log(response);
                alert("U bent correct geregistreerd");
                $location.path('/');
            });

        }
    }
});