/**
 * Created by Lorenz Put on 1-12-2015.
 */
angular.module('myApp').factory('mvAuth',function($http, mvIdentity, $q){
    return{
        authenticateUser: function (username, password) {
            var dfd = $q.defer();
            $http.post('/login', {username: username, password: password}).then(function(response)
            {
                if(response.data.success)
                {
                    mvIdentity.currentUser = response.data.user;
                    dfd.resolve(true);
                }
                else
                {
                    dfd.resolve(false);
                }
            });
            return  dfd.promise;
        },
        logOutUser: function()
        {
            var dfd = $q.defer();
            $http.post('/logout', {logout:true}).then(function()
            {
               mvIdentity.currentUser = undefined;
                dfd.resolve();
            });
            return dfd.promise;
        }
    }
})