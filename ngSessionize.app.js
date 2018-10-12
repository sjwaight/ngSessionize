"use strict";

// Branding
import "./scss";

// Services
import "./services";

var ngSessionize = angular.module("ngSessionize", [
	"angular.filter",
	"ngSessionizeService"
])

  .config(function ($locationProvider) {


  });/**/

require("./components");