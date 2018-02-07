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


		  vm.createList = function(type) {

		  	var list = [];

		  	for(var i=0; i < vm.data.sessions.length; i++) {
		  		var session = vm.data.sessions[i];

				var thisCategory = $filter("filter")(session.categories, { name: type });

				for(var j=0; j < thisCategory.categoryItems.length; j++) {

					var thisItem = thisCategory.categoryItems[j];

					list.push(thisItem);

				}

		    }

		    return list;

		  };

		  vm.$onInit = function () {

			  vm.statusMessage = "Loading sessions...";

			  ecsService.initEcs().then(function () {

				  vm.formats = vm.createList("Session format");
				  vm.tracks = vm.createList("Track");
				  vm.tags = vm.createList("Tags");

				  vm.initialized = true;

			  });

		  };

	  }
  ]);