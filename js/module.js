		var demoApp = angular.module("demoApp", ["ngRoute"]); //[] Means no dependancies

		demoApp.config(function($routeProvider){
			$routeProvider
				.when('/',{
					controller: 'SimpleController',
					templateUrl: '../Partials/View1.html'
				})
				.when('/view2',{
					controller: 'SimpleController',
					templateUrl: '../Partials/View2.html'
				})
				.otherwise({redirectTo: '/'});
		});

		demoApp.controller("SimpleController", function($scope){
			$scope.customers = [
				{
					name: 'Dave Smith',
					city: 'New York City'
				},
				{
					name: 'Alex Doe',
					city: 'Phoenix'
				}
			];

			$scope.addCustomer = function(){
				$scope.customers.push({
					name: $scope.newCustomer.name,
					city: $scope.newCustomer.city
				});
				console.log("test asdf");
			};

		});

		/* Could also be done as: 
		var controllers = {};
		controllers.SimpleController = function($scope){
			$scope.customers = [
				{
					name: 'Dave Smith',
					city: 'New York City'
				},
				{
					name: 'Alex Doe',
					city: 'Phoenix'
				}
			]
		};
		demoApp.controller(controllers); */