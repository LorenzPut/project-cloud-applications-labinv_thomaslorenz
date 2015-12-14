var myApp = angular.module("myApp",["ngRoute", "barcodeGenerator"]);

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


		var refresh = function() {
			$http.get('/componentlist').success(function(response)
			{
				console.log("I got the data I requested");
				$scope.componentList = response;
				$scope.component = "";
				console.log($scope.component.Type);

			});
		};


		$scope.addComponent = function ()
		{

				console.log($scope.component);
				$http.post('/componentlist', $scope.component).success(function (response) {
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
		$scope.converttype = function(type)
		{
			if(type == "Resistor")
			{
				return "Res";
			}
			else if(type == "Condensator")
			{
				return "Con";
			}
			else if(type == "Potentiometer")
			{
				return "Pot";
			}
			else if(type == "Arduino")
			{
				return "Ard";
			}
			else if(type == "Varia")
			{
				return "Var";
			}

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

		$scope.downloadbarcode = function(id) {
			html2canvas($("#" + id), {
				onrendered: function (canvas) {
					Canvas2Image.saveAsPNG(canvas);
				}
		});


	}
	refresh();

});

