"use strict";

angular.module("ecs")

  .component("sessionizeSessionsRefiner", {
	  template: require("./sessionizeSessionsRefiner.tmpl.html"),
	  controller: "sessionizeSessionsRefinerController",
	  controllerAs: "vm",

	  restrict: "E",
	  bindings: {
		  vm: "=",
		  type: "=",
		  items: "="
	  },

  })

  .controller("sessionizeSessionsRefinerController", ["$sce", "$q", "$filter", "$location", "ecsService",
	  function ($sce, $q, $filter, $location, ecsService) {

		  var vm = this;

		  vm.data = ecsService.ecs;

		  vm.initialized = false;

		  vm.toggle = function(item) {

		  	vm.vm.filters[type].push(item);

		  };

		  vm.$onInit = function () {

		  };

	  }
  ]);