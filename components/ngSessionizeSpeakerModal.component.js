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

		  self.closeModal = function() {
		  	self.vm.showModal = false;
		  };

		  self.$onInit = function () {

		  	console.log(self.speaker);

		  };

	  }
  });