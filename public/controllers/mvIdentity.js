/**
 * Created by Lorenz Put on 1-12-2015.
 */
angular.module('myApp').factory('mvIdentity', function()
{
    return{
        currentUser: undefined,
        isAuthenticated: function(){
            return !!this.currentUser;
        }
    }
})