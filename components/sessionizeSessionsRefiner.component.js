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

	  controller: function (ecsService, $filter) {

		  var self = this;

		  self.data = ecsService.ecs;

		  self.initialized = false;

		  self.toggle = function (item) {

			  self.vm.filters[type].push(item);

		  };

		  self.$onInit = function () {

			  console.log(self.type);

		  };

	  }
  });