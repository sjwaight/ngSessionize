"use strict";

angular.module("ngSessionize")

  .component("ngSessionizeSpeakerModal", {

	  template: require("./ngSessionizeSpeakerModal.tmpl.html"),

	  restrict: "E",
	  bindings: {
		  vm: "=",
		  speaker: "="
	  },

	  controller: function () {

		  var self = this;

		  self.$onInit = function () {

		  };

	  }
  });