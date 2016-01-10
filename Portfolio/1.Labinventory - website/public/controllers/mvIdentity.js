
angular.module('myApp').factory('mvIdentity', function()
{
    return{
        currentUser: undefined,
        isAuthenticated: function(){
            return !!this.currentUser;
        }
    }
})