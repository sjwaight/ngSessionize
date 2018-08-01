"use strict";

// Configuration
import sessionize from './data/sessionize.json';

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