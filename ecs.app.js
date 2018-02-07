"use strict";

// Branding
import "./scss/ecs.scss";

import "./services";

angular.module("ecs", [
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
			template: "<sessionize-sessions-filter></sessionize-sessions-filter>",
			component: "ecs"
		})

		.otherwise({
			redirectTo: "/"
		});

  });

ecs.init = function() {
	angular.bootstrap(document, ['ecs-app']);
};

require("./components");