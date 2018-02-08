"use strict";

angular.module("ecs")

  .component("sessionizeSessionsRefiner", {
	  template: require("./sessionizeSessionsRefiner.tmpl.html"),
	  controllerAs: "vm",

	  restrict: "E",
	  bindings: {
		  vm: "=",
		  type: "=",
		  items: "="
	  },

	  controller: function (sdbService, $filter, $location) {

		  var vm = this;

		  vm.data = ecsService.ecs;

		  vm.initialized = false;

		  vm.toggle = function (item) {

			  vm.vm.filters[type].push(item);

		  };

		  vm.$onInit = function () {

			  console.log(vm.type);

		  };

	  }
  });