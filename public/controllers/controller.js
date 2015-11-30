var myApp = angular.module("myApp",[]);

myApp.controller('Appcontrol',function ($scope, $http){
		console.log("Hello world from controller");
		var refresh = function() {
			$http.get('/resistorlist').success(function(response)
			{
				console.log("I got the data I requested");
				$scope.resistorlist = response;
				$scope.resistor = "";
			});
		};
		refresh();
		
		$scope.addResistor = function ()
		{
			console.log($scope.resistor);
			$http.post('/resistorlist', $scope.resistor).success(function(response)
				{					
					refresh();
					console.log(response);
				});
		};
		$scope.remove = function(id)
		{
			console.log(id);
			$http.delete("/resistorlist/" + id).success(function(response){
				refresh();
			});
		};
		$scope.edit = function(id)
		{
			console.log(id);
			$http.get('/resistorlist/' + id).success(function(response)
			{
				$scope.resistor = response;	
			});
		};
		$scope.update = function()
		{
			console.log($scope.resistor._id)
			$http.put("/resistorlist/" + $scope.resistor._id, $scope.resistor).success(function(response)
			{
				refresh();
			});
		};

		$scope.deselect = function()
		{
			$scope.resistor = "";
		};

	});

