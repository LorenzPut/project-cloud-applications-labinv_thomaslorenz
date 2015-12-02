/**
 * Created by Lorenz Put on 24-11-2015.
 */
myApp.controller('LoginCtrl', function CheckLoginData ($scope, $http, mvIdentity, mvAuth, $location)
{
    $scope.identity = mvIdentity;
    $scope.signin = function (username, password)
    {
        mvAuth.authenticateUser(username, password).then(function(success)
        {
            if(success) {
                alert("You are logged in");
            }
            else {
                alert("Login failed. Combination username/password is invalid");
            }
        })
    }
    $scope.signout = function()
    {
        mvAuth.logOutUser().then(function()
        {
            $scope.username = "";
            $scope.password = "";
            alert("You have succesfully signed out.");
            $location.path('/');
        })
    }
});