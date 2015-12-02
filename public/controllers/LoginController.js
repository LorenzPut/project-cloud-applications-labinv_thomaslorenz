/**
 * Created by Lorenz Put on 24-11-2015.
 */
app.controller('LoginCtrl', function CheckLoginData ($scope, $location)
{
    $scope.username = "";
    $scope.password = "";
    $scope.CheckLogin = function (username, password)
    {
        if(username == "Lorenz" && password == "Lol")
        {
            alert("Gelukt");
            $location.path('/dashboard');
        }
        else
        {
            alert("mislukt");
        }
    }
});