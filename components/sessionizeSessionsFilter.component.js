"use strict";

angular.module("ecs")

  .component("sessionizeSessionsFilter", {
	  template: require("./sessionizeSessionsFilter.tmpl.html"),
	  controller: "sessionizeSessionsFilterController",
	  controllerAs: "vm"
  })

  .controller("sessionizeSessionsFilterController", ["$sce", "$q", "$filter", "$location", "ecsService",
	  function ($sce, $q, $filter, $location, ecsService) {

		  var vm = this;

		  vm.data = ecsService.ecs;

		  vm.initialized = false;

		  vm.$onInit = function () {

			  vm.statusMessage = "Loading sessions...";



			  ecsService.initEcs().then(function () {




			  });

		  };

	  }
  ]);