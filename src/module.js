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
			
			/*console.log("Scope: ", scope);
			console.log("Element: ", element);
			console.log("Attributes: ", attributes);*/

			element.bind("mouseenter", function(){
				element[0].innerHTML = "They see me rollin'";
			});
		},
		template: '<h2>Custom directive</h2>'
	}
});

//Example of an element directive using other attribute directives:
demoApp.controller("AntariController", function($scope) {

	$scope.antari = [];

	this.addKell = function() {
		$scope.antari.push("Kell: Red London");
	};

	this.addLila = function() {
		$scope.antari.push("Lila: Grey London");
	};

	this.addHolland = function() {
		$scope.antari.push("Holland: White London");
	};
	this.addTest = function() {
		console.log("addTest");
	};

	console.log("AntariController Scope: ", $scope);
	console.log("AntariController This: ", this);

});

//Creates a container directive with a set controller and scope
demoApp.directive("antari", function(){
	return{
		restrict: "E",
		controller: "AntariController",
		scope: {},
		link: function(scope, element, attributes){
			element.bind("mouseenter", function(){
				console.log("Antari: ", scope.antari);
			})
		}
	}
});

//Creates attribute directives that can access the container directive's controller and therefore scope
demoApp.directive("kell",function() {
	return{
		require: "antari",
		link: function(scope, element, attributes, antariController) {
			antariController.addKell();
		}
	}
});
demoApp.directive("lila",function() {
	return{
		require: "antari",
		link: function(scope, element, attributes, antariController) {
			antariController.addLila();
		}
	}
});
demoApp.directive("holland",function() {
	return{
		require: "antari",
		link: function(scope, element, attributes, antariController) {
			antariController.addHolland();
		}
	}
});