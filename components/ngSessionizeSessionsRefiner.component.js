"use strict";

angular.module("ecs")

  .component("ngSessionizeSessionsRefiner", {

	  template: require("./ngSessionizeSessionsRefiner.html"),

	  restrict: "E",
	  bindings: {
		  vm: "=",
		  refinertype: "=",
		  items: "="
	  },

	  controller: function () {

		  var self = this;

		  self.$onInit = function () {

		  };

	  }
  });