/**
 * Created by Lorenz Put on 24-11-2015.
 */
myApp.controller('RegisterCtrl', function CheckLoginData ($scope, $http, mvIdentity, mvAuth, $location)
{
    $scope.register = function (firstname, lastname, username, password) {
        alert("You are registered");
    }
});