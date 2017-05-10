		var demoApp = angular.module("demoApp", ["ngRoute"]); //[] Means no dependancies

		demoApp.config(function($routeProvider){
			$routeProvider
				.when('/',{
					controller: 'SimpleController',
					templateUrl: 'src/partials/View1.html'
				})
				.when('/view2',{
					controller: 'SimpleController',
					templateUrl: 'src/partials/View2.html'
				})
				.otherwise({redirectTo: '/'});
		});

		demoApp.factory("simpleFactory", function(){
			var factory = {},
				customers = [
					{
						name: 'Dave Smith',
						city: 'New York City'
					},
					{
						name: 'Alex Doe',
						city: 'Phoenix'
					}
				];

			factory.getCustomers = function(){
				console.log("Factory returned customers");
				return customers;
			}
			return factory;
		});

		/*demoApp.service("simpleService", function(){
			var customers = [
					{
						name: 'Dave Smith',
						city: 'New York City'
					},
					{
						name: 'Alex Doe',
						city: 'Phoenix'
					}
				];
				
			this.getCustomers = function(){
				console.log("Service returned customers");
				return customers;
			}
		});*/

		demoApp.controller("SimpleController", function($scope, simpleFactory){
			$scope.customers = simpleFactory.getCustomers();

			$scope.addCustomer = function(){
				$scope.customers.push({
					name: $scope.newCustomer.name,
					city: $scope.newCustomer.city
				});
				console.log("Customer added");
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

		demoApp.directive("testdirective", function(){
			return {
				restrict: 'E',
				transclude: true,
				link: function(scope, element, attributes){
					console.log("Scope: ", scope);
					console.log("Element: ", element);
					console.log("Attributes: ", attributes);
				},
				template: '<h2>Custom directive</h2>'
			}
		});