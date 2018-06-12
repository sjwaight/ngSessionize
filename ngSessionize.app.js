"use strict";

// Configuration
import sessionize from './data/sessionize.json';

// Branding
import "./scss/ngSessionize.scss";

// Services
import "./services";

var ngSessionize = angular.module("ngSessionize", [
	"ngRoute",
	"angular.filter",
	"ngSessionizeService"
])

  .config(function ($routeProvider, $httpProvider, $locationProvider) {

	  $locationProvider.html5Mode({
		  enabled: true,
		  requireBase: true
	  }).hashPrefix("!");

	  $routeProvider

		.when("/", {
			template: "<ng-sessionize-sessions></ng-sessionize-sessions>",
			component: "ngSessionize"
		})

		.otherwise({
			redirectTo: "/"
		});

  });

ngSessionize.init = function () {
	angular.bootstrap(document, ["ngSessionize"]);
};

require("./components");