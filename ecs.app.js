"use strict";

// Branding
import "./scss/ecs.scss";

import "./services";

var ecs = angular.module("ecs", [
	"ngRoute",
	"angular.filter",
	"ecsService"
])

  .config(function ($routeProvider, $httpProvider, $locationProvider) {

	  $locationProvider.html5Mode({
		  enabled: true,
		  requireBase: true
	  }).hashPrefix("!");

	  $routeProvider

		.when("/", {
			template: "<ng-sessionize-sessions></ng-sessionize-sessions>",
			component: "ecs"
		})

		.otherwise({
			redirectTo: "/"
		});

  });

ecs.init = function () {
	angular.bootstrap(document, ["ecs"]);
};

require("./components");