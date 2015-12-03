var myApp = angular.module("myApp",["ngRoute"]);

myApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: '../partials/welcome.html',
		}).
		when('/componentList', {
			templateUrl: 'partials/componentList.html'
		}).
		when('/login', {
			templateUrl: 'partials/login.html'
		})
		.when('/register',{
			templateUrl: 'partials/register.html'
		});
	}]);

myApp.controller('Appcontrol',function ($scope, $http){
		console.log("Hello world from controller");
		var refresh = function() {
			$http.get('/componentlist').success(function(response)
			{
				console.log("I got the data I requested");
				$scope.componentList = response;
				$scope.component = "";

			});
		};

		$scope.addComponent = function ()
		{
			console.log($scope.component);
			$http.post('/componentlist', $scope.component).success(function(response)
				{					
					refresh();
					console.log("refresh fired.");
					console.log(response);
				});
		};
		$scope.remove = function(id)
		{
			console.log(id);
			$http.delete("/componentlist/" + id).success(function(response){
					refresh();
			});
		};
		$scope.edit = function(id)
		{
			console.log(id);
			$http.get('/componentlist/' + id).success(function(response)
			{
				$scope.component = response;
			});
		};
		$scope.update = function()
		{
			console.log($scope.component._id)
			$http.put("/componentlist/" + $scope.component._id, $scope.component).success(function(response)
			{
				refresh();
			});
		};

		$scope.deselect = function()
		{
			$scope.component = "";
		};
	refresh();



});

