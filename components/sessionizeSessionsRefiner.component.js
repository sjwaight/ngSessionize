"use strict";

angular.module("ecs")

  .component("sessionizeSessionsRefiner", {
	  template: require("./sessionizeSessionsRefiner.tmpl.html"),
	  controller: "sessionizeSessionsRefinerController",
	  controllerAs: "vm",

	  restrict: "E",
	  bindings: {
	  	vm: "=",
		  items: "="
	  },


  })

  .controller("sessionizeSessionsRefinerController", ["$sce", "$q", "$filter", "$location", "ecsService",
	  function ($sce, $q, $filter, $location, ecsService) {

		  var vm = this;

		  vm.data = ecsService.ecs;

		  vm.initialized = false;


		  vm.$onInit = function () {


		  };

	  }
  ]);