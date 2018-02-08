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

		  vm.filters = {
			  "Session format": [],
			  "Track": [],
			  "Level": [],
			  "Tags": [],
		  };
		  vm.filterCount = 0;

		  vm.filteredSessions = [];

		  vm.initialized = false;

		  vm.getSpeakerPhoto = function (speakerId) {
			  return $filter("filter")(vm.data.speakers, {id: speakerId})[0].profilePicture;
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
						  newItem.selected = false;
						  newItem.count = 1;
						  list.push(newItem);

					  }

				  }

			  }

			  return list;

		  };

		  vm.filterSessions = function () {

			  var match = true;
			  var showSessions = [];

			  for (var s = 0; s < vm.data.sessions.length; s++) {

			  	var thisSession = vm.data.sessions[s];

				  for (var f in vm.filters) {
					  if (vm.filters.hasOwnProperty(f)) {

						  var filterVals = vm.filters[f].filter(function (item) {
							return item.selected;
						  }).map(function(item) {
						  	return item.id;
						  });

						  for (var i = 0; i < filterVals.length; i++) {
							  var thisCategoryItems = $filter("filter")(thisSession.categories, { name: f });
							  if(thisCategoryItems.indexOf(filterVals[i]) === -1) {
								  match = false;
							  }
						  }
					  }
				  }

				  if (match) {
					  showSessions.push(session);
				  }

			  }

			  vm.filteredSessions = showSessions;

		  };

		  vm.toggle = function (item) {
			  if (item.selected) {
				  vm.filterCount--;
				  item.selected = false;
			  } else {
				  vm.filterCount++;
				  item.selected = true;
			  }
			  vm.filterSessions();
		  };

		  vm.clearAll = function () {

			  // Clear the filter values
			  for (var f in vm.filters) {
				  if (vm.filters.hasOwnProperty(f)) {

					  for (var i = 0; i < vm.filters[f].length; i++) {
						  vm.filters[f][i].selected = false;
					  }
				  }
			  }
			  vm.filterCount = 0;
			  vm.filteredSessions = vm.data.sessions;

		  };

		  vm.$onInit = function () {

			  vm.statusMessage = "Loading sessions...";

			  ecsService.initEcs().then(function () {

				  // Get the filter values
				  for (var f in vm.filters) {
					  if (vm.filters.hasOwnProperty(f)) {
						  vm.filters[f] = vm.createList(f);
					  }
				  }
				  vm.filteredSessions = vm.data.sessions;
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