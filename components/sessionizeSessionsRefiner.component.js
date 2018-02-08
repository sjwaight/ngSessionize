"use strict";

angular.module("ecs")

  .component("sessionizeSessionsRefiner", {

	  template: require("./sessionizeSessionsRefiner.tmpl.html"),

	  restrict: "E",
	  bindings: {
		  vm: "=",
		  refinertype: "=",
		  items: "="
	  },

	  controller: function () {

		  var self = this;

		  self.toggle = function (item) {

			  self.vm.filters[refinertype].push(item);

		  };

		  self.$onInit = function () {

			  console.log(self.refinertype);

		  };

	  }
  });