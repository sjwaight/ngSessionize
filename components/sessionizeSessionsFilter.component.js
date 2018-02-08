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

		  vm.filters = {};
		  vm.filters.formats = [];
		  vm.filters.tracks = [];
		  vm.filters.levels = [];
		  vm.filters.tags = [];

		  vm.filteredSessions = [];

		  vm.initialized = false;

		  vm.getSpeakerPhoto = function(speakerId) {
		  	return $filter("filter")(vm.data.speakers, { id: speakerId } )[0].profilePicture;
		  };

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

		  vm.toggle = function (item) {

			  item.selected = !item.selected;

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
  ])

  .filter("filteredSessions", function () {
	  return function (sessions, filters) {
		  var filtered = [];

		  for (var i = 0; i < sessions.length; i++) {

			  var session = sessions[i];



			  filtered.push(session);

		  }
		  return filtered;
	  };
  });



require("./sessionizeSessionsRefiner.component");