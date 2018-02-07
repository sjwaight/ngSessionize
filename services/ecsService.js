"use strict";

angular.module("ecsService", [])

  .service("ecsService", ["$q", "$http", "$rootScope", "$filter",
	  function ($q, $http, $rootScope, $filter) {

		  var self = this;

		  self.ecs = {};
		  self.ecs.initialized = false;

		  self.initEcs = function() {

		  	var deferred = $q.defer();

		  	$http({
			    method: "GET",
			    url: "https://sessionize.com/api/v2/57c0xuih/view/sessions"
		    }).then(function(response) {

		    	deferred.resolve(response);

		    });

		  	return deferred.promise();

		  }

	  }
  ]);