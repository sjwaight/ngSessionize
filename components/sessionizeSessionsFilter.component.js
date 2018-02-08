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

		  vm.filters = [];
		  vm.filteredSessions = [];

		  vm.initialized = false;

		  vm.createList = function (type) {

			  var list = [];

			  for (var i = 0; i < vm.data.sessions.length; i++) {
				  var session = vm.data.sessions[i];

				  var thisCategory = $filter("filter")(session.categories, {name: type})[0];

				  for (var j = 0; j < thisCategory.categoryItems.length; j++) {

					  var thisItem = thisCategory.categoryItems[j];

					  var thisListItem = $filter("filter")(list, {name: thisItem.name})[0];

					  if (thisListItem) {
						  thisListItem.count++;
					  } else {

						  var newItem = thisItem;
						  newItem.count = 1;
						  list.push(newItem);

					  }

				  }

			  }

			  return list;

		  };

		  vm.filterSessions = function () {

		  };

		  vm.$onInit = function () {

			  vm.statusMessage = "Loading sessions...";

			  ecsService.initEcs().then(function () {

				  vm.formats = vm.createList("Session format");
				  vm.tracks = vm.createList("Track");
				  vm.levels = vm.createList("Level");
				  vm.tags = vm.createList("Tags");

				  vm.initialized = true;

			  });

		  };

	  }
  ]);