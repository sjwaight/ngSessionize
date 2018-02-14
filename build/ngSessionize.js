/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module("ngSessionize")

  .component("ngSessionizeSessionsRefiner", {

	  template: __webpack_require__(10),

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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(4);
__webpack_require__(0);
__webpack_require__(5);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(7);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(12)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/index.js!./ngSessionize.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/index.js!./ngSessionize.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(13);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module("ngSessionize")

  .component("ngSessionizeSessions", {
	  template: __webpack_require__(9),
	  controller: "ngSessionizeSessionsController",
	  controllerAs: "vm"
  })

  .controller("ngSessionizeSessionsController", ["$sce", "$q", "$filter", "$location", "ngSessionizeService",
	  function ($sce, $q, $filter, $location, ngSessionizeService) {

		  var vm = this;

		  vm.data = ngSessionizeService.ngSessionize;

		  // The order of these properties determines the order of the refiners
		  vm.filters = {
			  "Session format": [],
			  "Track": [],
			  "Level": [],
			  "Tags": [],
		  };
		  vm.filterCount = 0;

		  vm.filteredSessions = [];

		  vm.showModal = false;
		  vm.selectedSpeaker = {};

		  vm.initialized = false;

		  vm.getSpeakerPhoto = function (speakerId) {
			  return $filter("filter")(vm.data.speakers, {id: speakerId})[0].profilePicture;
		  };

		  vm.getTags = function (type) {

			  var list = [];

			  for (var i = 0; i < vm.data.sessions.length; i++) {
				  var session = vm.data.sessions[i];

				  var thisCategory = $filter("filter")(session.categories, {name: type})[0];

				  for (var j = 0; j < thisCategory.categoryItems.length; j++) {

					  var thisItem = thisCategory.categoryItems[j];

					  var thisListItem = $filter("filter")(list, {name: thisItem.name})[0];

					  if (!thisListItem) {

						  var newItem = thisItem;
						  newItem.selected = false;
						  newItem.count = 0;
						  list.push(newItem);

					  }

				  }

			  }

			  return list;

		  };

		  vm.countTags = function (prop) {

			  // Clear the filter counts
			  for (var f in vm.filters) {
				  if (vm.filters.hasOwnProperty(f)) {

					  for (var i = 0; i < vm.filters[f].length; i++) {
						  vm.filters[f][i][prop] = 0;
					  }
				  }
			  }

			  // Count 'em
			  for (var i = 0; i < vm.filteredSessions.length; i++) {

				  var session = vm.filteredSessions[i];

				  for (var f in vm.filters) {
					  if (vm.filters.hasOwnProperty(f)) {

						  var thisCategory = $filter("filter")(session.categories, {name: f })[0];

						  for (var j = 0; j < thisCategory.categoryItems.length; j++) {

							  var thisItem = thisCategory.categoryItems[j];

							  var thisListItem = $filter("filter")(vm.filters[f], {name: thisItem.name})[0];

							  if (thisListItem) {
								  thisListItem[prop]++;
							  }

						  }
					  }
				  }

			  }

		  };

		  vm.filterSessions = function () {

			  var showSessions = [];

			  for (var s = 0; s < vm.data.sessions.length; s++) {

				  var matches = 0;
				  var thisSession = vm.data.sessions[s];

				  for (var f in vm.filters) {
					  if (vm.filters.hasOwnProperty(f)) {

						  var filterVals = vm.filters[f].filter(function (item) {
							return item.selected;
						  }).map(function(item) {
						  	return item.id;
						  });

						  for (var i = 0; i < filterVals.length; i++) {
							  var thisCategoryItems = $filter("filter")(thisSession.categories, { name: f })[0].categoryItems.map(function(item) {
							  	return item.id;
							  });
							  if(thisCategoryItems.indexOf(filterVals[i]) !== -1) {
								  matches++;
							  }
						  }
					  }
				  }

				  if (matches === vm.filterCount) {
					  showSessions.push(thisSession);
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

			  if(vm.filterCount > 0) {
				  vm.filterSessions();
			  } else {
				  vm.filteredSessions = vm.data.sessions;
			  }
			  vm.countTags("countFiltered");

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
			  vm.countTags("countFiltered");

		  };


		  vm.speakerModal = function(speaker) {

		  	    vm.showModal = true;
		  	    vm.selectedSpeaker = $filter("filter")(vm.data.speakers, { id: speaker.id })[0];

		  };

		  vm.$onInit = function () {

			  vm.statusMessage = "Loading sessions...";

			  ngSessionizeService.initNgSessionize().then(function () {

				  vm.filteredSessions = vm.data.sessions;

				  // Get the filter values and counts
				  for (var f in vm.filters) {
					  if (vm.filters.hasOwnProperty(f)) {
						  vm.filters[f] = vm.getTags(f);
						  vm.countTags("count");
						  vm.countTags("countFiltered");
					  }
				  }
				  vm.initialized = true;

			  });

		  };

	  }
  ]);

__webpack_require__(0);
__webpack_require__(5);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module("ngSessionize")

  .component("ngSessionizeSpeakerModal", {

	  template: __webpack_require__(11),

	  restrict: "E",
	  bindings: {
		  showmodal: "=",
		  speaker: "<"
	  },

	  controller: function () {

		  var self = this;

		  self.closeModal = function() {
		  	self.showmodal = false;
		  };

		  self.$onInit = function () {

		  	console.log(self.speaker);

		  };

		  self.$doCheck = function() {

			  console.log(self.speaker);

		  }

	  }
  });

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_ngSessionize_scss__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_ngSessionize_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__scss_ngSessionize_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__services__);


// Branding




var ngSessionize = angular.module("ngSessionize", [
	"ngRoute",
	"angular.filter",
	"ngSessionizeService"
])

  .config(function ($routeProvider, $httpProvider, $locationProvider) {

	  $locationProvider.html5Mode({
		  enabled: true,
		  requireBase: true
	  }).hashPrefix("!");

	  $routeProvider

		.when("/", {
			template: "<ng-sessionize-sessions></ng-sessionize-sessions>",
			component: "ngSessionize"
		})

		.otherwise({
			redirectTo: "/"
		});

  });

ngSessionize.init = function () {
	angular.bootstrap(document, ["ngSessionize"]);
};

__webpack_require__(1);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)();
// imports


// module
exports.push([module.i, ".clear {\n  clear: both; }\n\n/* Sessionize CSS */\n#sz-color-main {\n  color: #a5416f; }\n\n#sz-color-accent {\n  color: #843458; }\n\n#sz-color-text {\n  color: #111; }\n\n#sz-color-background {\n  color: #FFF; }\n\n#sz-color-main-text {\n  color: #EEE; }\n\n#sz-color-accent-text {\n  color: #EEE; }\n\n#sessionize.sessionize-wrapper {\n  font-family: sans-serif;\n  font-size: 16px;\n  line-height: 1.5;\n  color: #111; }\n\n#sessionize.sessionize-wrapper * {\n  box-sizing: border-box;\n  padding: 0;\n  margin: 0; }\n\n#sessionize.sessionize-wrapper *:before, #sessionize.sessionize-wrapper *:after, #sessionize.sessionize-wrapper ul li:before, #sessionize.sessionize-wrapper ul li:after {\n  content: none; }\n\n#sessionize.sessionize-wrapper ul {\n  list-style: none;\n  margin: 0;\n  padding: 0; }\n\n#sessionize.sessionize-wrapper a {\n  color: inherit;\n  text-decoration: none;\n  border-bottom: none;\n  transition: all .15s ease-in; }\n\n#sessionize.sessionize-wrapper a:hover, #sessionize.sessionize-wrapper a:focus, #sessionize.sessionize-wrapper a:active {\n  opacity: .9;\n  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.5); }\n\n#sessionize .sz-session__card {\n  height: 100%;\n  display: flex;\n  justify-content: top;\n  flex-direction: column;\n  transition: all .15s ease-in;\n  overflow: hidden; }\n\n#sessionize .sz-session__title {\n  font-size: 16px;\n  line-height: 1.5;\n  font-weight: bold;\n  transition: all .15s ease-in; }\n\n.sz-session--grid #sessionize .sz-session__title {\n  font-size: 14px;\n  line-height: 20px;\n  max-height: 60px;\n  overflow: hidden; }\n\n#sessionize .sz-session__speakers {\n  list-style: none;\n  margin: 0;\n  padding: 0; }\n\n#sessionize .sz-session__speakers:after {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n#sessionize .sz-session__speakers li {\n  display: inline-block;\n  margin-right: .5em;\n  font-size: 12px;\n  line-height: 1.5;\n  font-weight: bold; }\n\n#sessionize .sz-session__tags {\n  list-style: none;\n  margin: 0;\n  padding: 0; }\n\n#sessionize .sz-session__tags:empty {\n  display: none; }\n\n#sessionize .sz-session__tags li {\n  display: inline-block;\n  margin-right: .125em;\n  font-size: 12px;\n  line-height: 1.5;\n  font-weight: bold;\n  padding: 0 .5em;\n  background-color: rgba(17, 17, 17, 0.1);\n  border-radius: 2px; }\n\n#sessionize .sz-group-tags ~ .sz-group-tags {\n  display: none; }\n\n#sessionize .sz-session__room {\n  display: inline-block;\n  padding: 4px 8px;\n  font-size: 12px;\n  font-weight: bold;\n  text-transform: uppercase;\n  color: #111;\n  background-color: #fff;\n  border-radius: 2px;\n  transition: all .15s ease-in; }\n\n#sessionize .sz-session__time {\n  display: inline-block;\n  font-size: 12px;\n  line-height: 1.5;\n  text-transform: uppercase;\n  opacity: .6; }\n\n#sessionize .sz-session__meta-group {\n  margin-bottom: 4px; }\n\n#sessionize .sz-session--plenum .sz-session__card {\n  justify-content: center; }\n\n#sessionize .sz-day__title {\n  padding: 12px 4px;\n  font-size: 32px;\n  text-align: center; }\n\n#sessionize .sz-grid .sz-day__container {\n  position: relative;\n  padding-left: 64px;\n  padding-right: 64px;\n  padding-top: 48px;\n  padding-bottom: 48px;\n  display: flex;\n  flex-direction: row;\n  overflow-x: auto;\n  overflow-y: hidden; }\n\n@media (min-width: 48em) {\n  #sessionize .sz-grid .sz-day__container {\n    min-width: 900px; } }\n\n#sessionize .sz-grid .sz-time {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  margin-top: 48px; }\n\n#sessionize .sz-grid .sz-time ol {\n  list-style: none;\n  margin: 0;\n  padding: 0; }\n\n#sessionize .sz-grid .sz-time li {\n  border-top: 1px dotted rgba(17, 17, 17, 0.2);\n  height: 96px;\n  font-size: 12px;\n  line-height: 1.5;\n  text-transform: uppercase;\n  text-align: left; }\n\n#sessionize .sz-grid .sz-time__value {\n  padding: 4px 0;\n  display: block; }\n\n#sessionize .sz-grid .sz-track {\n  position: relative;\n  flex-grow: 1;\n  width: 20%;\n  min-width: 240px; }\n\n#sessionize .sz-grid .sz-track__title {\n  position: absolute;\n  bottom: 100%;\n  left: 0;\n  width: 100%;\n  padding: 12px 4px;\n  font-size: 18px;\n  line-height: 24px;\n  font-weight: bold;\n  text-align: center;\n  display: inline-block;\n  max-width: 100%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  word-wrap: normal; }\n\n#sessionize .sz-grid .sz-track__container {\n  padding: 0 4px;\n  position: relative; }\n\n#sessionize .sz-grid .sz-session--grid {\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  position: absolute;\n  left: 0;\n  width: 100%;\n  z-index: 200;\n  border-radius: 2px; }\n\n#sessionize .sz-grid .sz-session--grid:hover {\n  z-index: 300;\n  background-color: #fff; }\n\n#sessionize .sz-grid .sz-session__card {\n  padding: 12px;\n  border-top: 3px solid transparent;\n  border-top-color: #a5416f;\n  color: #EEE;\n  background: #a5416f;\n  border-radius: 2px;\n  overflow: hidden; }\n\n#sessionize .sz-grid .sz-session__card .sz-session__tags {\n  margin-top: 4px;\n  height: 18px;\n  overflow: hidden; }\n\n#sessionize .sz-grid .sz-session__card .sz-session__tags li {\n  vertical-align: top; }\n\n#sessionize .sz-grid .sz-session__card:hover {\n  background: #803356;\n  border-top-color: #4a1d31;\n  box-shadow: 0 0.5em 2.5em 0 rgba(0, 0, 0, 0.75); }\n\n#sessionize .sz-grid .sz-session__card a:hover, #sessionize .sz-grid .sz-session__card a:focus, #sessionize .sz-grid .sz-session__card a:active {\n  box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.5); }\n\n#sessionize .sz-grid .sz-session--service {\n  z-index: 100; }\n\n#sessionize .sz-grid .sz-session--service .sz-session__card {\n  border-top-color: #843458;\n  background: #843458; }\n\n#sessionize .sz-grid .sz-session--service .sz-session__card:hover {\n  background: #5f2640;\n  border-top-color: #29101b; }\n\n#sessionize .sz-grid .sz-session--plenum .sz-session__card {\n  text-align: center; }\n\n#sessionize .sz-grid .sz-session--plenum .sz-session__title {\n  overflow: visible;\n  font-size: 24px;\n  line-height: 32px; }\n\n#sessionize .sz-sessions--list {\n  list-style: none;\n  margin: 0;\n  padding: 0; }\n\n#sessionize .sz-sessions--list .sz-session.sz-session--full {\n  margin-top: 8px;\n  padding: 16px;\n  border: 1px solid rgba(17, 17, 17, 0.1);\n  border-radius: 4px; }\n\n@media (min-width: 37.5em) {\n  #sessionize .sz-sessions--list .sz-session.sz-session--full {\n    padding: 24px; } }\n\n@media (min-width: 37.5em) {\n  #sessionize .sz-sessions--list .sz-session.sz-session--full {\n    margin-top: 16px; } }\n\n#sessionize .sz-sessions--list .sz-session.sz-session--full:first-child {\n  margin-top: 0; }\n\n#sessionize .sz-session.sz-session--full {\n  text-align: left; }\n\n#sessionize .sz-session.sz-session--full .sz-session__speakers {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  margin-bottom: 4px; }\n\n#sessionize .sz-session.sz-session--full .sz-session__speakers li {\n  display: inline-block;\n  margin-right: 8px;\n  font-size: 14px;\n  line-height: 1.5;\n  font-weight: bold;\n  color: #a5416f; }\n\n#sessionize .sz-session.sz-session--full .sz-session__title {\n  margin-top: 0;\n  margin-bottom: 4px;\n  font-size: 20px;\n  line-height: 1.5;\n  color: #111; }\n\n#sessionize .sz-session.sz-session--full .sz-session__description {\n  margin-top: 0;\n  margin-bottom: 16px;\n  font-size: 16px;\n  line-height: 1.5; }\n\n#sessionize .sz-session.sz-session--full .sz-session__room {\n  display: inline-block;\n  padding: 2px 8px;\n  font-size: 14px;\n  line-height: 1.5;\n  color: #EEE;\n  background-color: #843458;\n  border-radius: 2px; }\n\n#sessionize .sz-session.sz-session--full .sz-session__time {\n  display: inline-block;\n  padding: 2px 8px;\n  font-size: 14px;\n  line-height: 1.5;\n  text-transform: none;\n  opacity: 1;\n  color: #EEE;\n  background-color: #a5416f;\n  border-radius: 2px; }\n\n#sessionize .sz-session.sz-session--full .sz-session__tags {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  margin-top: 8px; }\n\n#sessionize .sz-session.sz-session--full .sz-session__tags li {\n  display: inline-block;\n  margin-right: .5em;\n  font-size: 12px;\n  line-height: 1.5;\n  font-weight: bold; }\n\n#sessionize .sz-session.sz-session--full .sz-session__questions {\n  margin-top: 8px;\n  font-size: 13px;\n  line-height: 1.5; }\n\n#sessionize .sz-session.sz-session--full .sz-session__questions:empty {\n  display: none; }\n\n#sessionize .sz-session.sz-session--full .sz-session__questions dt, #sessionize .sz-session.sz-session--full .sz-session__questions dd {\n  display: inline-block; }\n\n#sessionize .sz-session.sz-session--full .sz-session__questions dt {\n  color: #111; }\n\n#sessionize .sz-session.sz-session--full .sz-session__questions dd {\n  margin-right: 4px;\n  padding-right: 8px;\n  border-right: 1px solid rgba(17, 17, 17, 0.2);\n  color: rgba(17, 17, 17, 0.6); }\n\n#sessionize .sz-session.sz-session--full .sz-session__questions dd:last-child {\n  border-right: none; }\n\n#sessionize .sz-speakers--wall {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-flow: row wrap; }\n\n#sessionize .sz-speakers--wall .sz-speaker {\n  display: inline-block;\n  flex-grow: 1;\n  width: 256px;\n  padding: 8px;\n  margin-bottom: 16px;\n  text-align: center; }\n\n#sessionize .sz-speakers--list {\n  list-style: none;\n  margin: 0;\n  padding: 0; }\n\n#sessionize .sz-speakers--list .sz-speaker {\n  padding: 16px;\n  border: 1px solid rgba(17, 17, 17, 0.1);\n  border-radius: 4px;\n  margin-top: 8px; }\n\n@media (min-width: 37.5em) {\n  #sessionize .sz-speakers--list .sz-speaker {\n    padding: 24px; } }\n\n#sessionize .sz-speaker__links {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  margin-top: 8px; }\n\n#sessionize .sz-speaker__links li {\n  display: inline-block; }\n\n#sessionize .sz-speaker__links .sz-speaker__link {\n  display: block;\n  padding: 4px;\n  border: 1px solid rgba(17, 17, 17, 0.1);\n  font-size: 20px;\n  line-height: 20px;\n  color: #a5416f;\n  border-radius: 2px;\n  transition: all .15s ease-in; }\n\n#sessionize .sz-speaker__links .sz-speaker__link:hover, #sessionize .sz-speaker__links .sz-speaker__link:focus, #sessionize .sz-speaker__links .sz-speaker__link:active {\n  opacity: 1;\n  color: #EEE;\n  background-color: #843458;\n  box-shadow: none; }\n\n#sessionize .sz-speaker__link-label {\n  position: absolute;\n  left: -10000px;\n  top: auto;\n  width: 1px;\n  height: 1px;\n  overflow: hidden; }\n\n#sessionize .sz-speaker__link-icon {\n  display: inline-block;\n  width: 1em;\n  height: 1em;\n  stroke-width: 0;\n  stroke: currentColor;\n  fill: currentColor;\n  vertical-align: middle; }\n\n#sessionize .sz-speaker.sz-speaker--compact .sz-speaker__photo {\n  width: 128px;\n  height: 128px;\n  margin-left: auto;\n  margin-right: auto;\n  margin-bottom: 16px;\n  border: 4px solid rgba(17, 17, 17, 0.1);\n  border-radius: 50%; }\n\n#sessionize .sz-speaker.sz-speaker--compact .sz-speaker__photo img {\n  display: block;\n  width: 100%;\n  margin: 0 auto;\n  border-radius: 50%; }\n\n#sessionize .sz-speaker.sz-speaker--compact .sz-speaker__photo--placeholder {\n  width: 128px;\n  height: 128px;\n  background-color: #fff;\n  border-left-color: #a5416f;\n  border-top-color: #a5416f;\n  border-right-color: #843458;\n  border-bottom-color: #843458; }\n\n#sessionize .sz-speaker.sz-speaker--compact .sz-speaker__name {\n  margin-bottom: 0;\n  font-size: 20px;\n  line-height: 1.25;\n  font-weight: bold;\n  color: #111; }\n\n#sessionize .sz-speaker.sz-speaker--compact .sz-speaker__tagline {\n  font-size: 14px;\n  line-height: 1.5;\n  font-weight: normal;\n  color: rgba(17, 17, 17, 0.6); }\n\n#sessionize .sz-speaker.sz-speaker--full {\n  text-align: left; }\n\n#sessionize .sz-speaker.sz-speaker--full:after {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n@media (min-width: 37.5em) {\n  #sessionize .sz-speaker.sz-speaker--full {\n    margin-top: 16px; } }\n\n#sessionize .sz-speaker.sz-speaker--full:first-child {\n  margin-top: 0; }\n\n#sessionize .sz-speaker.sz-speaker--full .sz-speaker__photo {\n  float: left;\n  margin-top: 2px;\n  margin-right: 16px;\n  margin-bottom: 8px;\n  max-width: 96px; }\n\n#sessionize .sz-speaker.sz-speaker--full .sz-speaker__photo img {\n  display: block;\n  width: 100%;\n  border-radius: 2px; }\n\n#sessionize .sz-speaker.sz-speaker--full .sz-speaker__photo--placeholder {\n  display: none; }\n\n#sessionize .sz-speaker.sz-speaker--full .sz-speaker__name {\n  margin-bottom: 2px;\n  font-size: 20px;\n  line-height: 1.25;\n  font-weight: bold;\n  color: #a5416f; }\n\n#sessionize .sz-speaker.sz-speaker--full .sz-speaker__tagline {\n  margin-bottom: 2px;\n  font-size: 16px;\n  line-height: 1.5;\n  font-weight: bold;\n  color: #843458; }\n\n#sessionize .sz-speaker.sz-speaker--full .sz-speaker__bio {\n  margin-top: 8px; }\n\n#sessionize .sz-speaker.sz-speaker--full .sz-speaker__sessions {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  margin-top: 8px; }\n\n#sessionize .sz-speaker.sz-speaker--full .sz-speaker__sessions li {\n  position: relative;\n  display: block;\n  padding-left: 16px;\n  font-size: 16px;\n  line-height: 1.5;\n  font-weight: bold; }\n\n#sessionize .sz-speaker.sz-speaker--full .sz-speaker__sessions li:before {\n  position: absolute;\n  top: 10px;\n  left: 0;\n  width: 10px;\n  height: 2px;\n  background-color: #a5416f;\n  content: \"\"; }\n\n#sessionize .sz-gridtable table {\n  max-width: 100%;\n  width: 100%;\n  margin-bottom: 16px;\n  border: none;\n  border-collapse: collapse;\n  border-radius: 4px; }\n\n#sessionize .sz-gridtable th {\n  padding: 8px 16px;\n  font-size: 20px;\n  font-weight: bold;\n  background-color: rgba(17, 17, 17, 0.1); }\n\n#sessionize .sz-gridtable td, #sessionize .sz-gridtable th {\n  width: 1000px;\n  border-bottom: 1px solid rgba(17, 17, 17, 0.1);\n  padding: 16px 24px;\n  vertical-align: top; }\n\n#sessionize .sz-gridtable thead th {\n  background-color: rgba(17, 17, 17, 0.1); }\n\n#sessionize .sz-gridtable tbody th:first-child {\n  width: 1%;\n  white-space: nowrap; }\n\n#sessionize .sz-gridtable .sz-session__title {\n  color: #a5416f; }\n\n#sessionize .sz-gridtable .sz-session--plenum .sz-session__title {\n  color: #843458;\n  font-size: 20px; }\n\n#sessionize .sz-gridtable .sz-session--plenum .sz-session__room {\n  color: #EEE;\n  background-color: #843458; }\n\n#sessionize .sz-gridtable .sz-row-highlight th {\n  color: rgba(17, 17, 17, 0.8); }\n\n#sessionize .sz-gridtable .sz-session__room {\n  color: #EEE;\n  background-color: #a5416f; }\n\n@media (max-width: 47.9375em) {\n  #sessionize .sz-gridtable table {\n    border: none; }\n  #sessionize .sz-gridtable td, #sessionize .sz-gridtable th {\n    display: block;\n    border: none;\n    width: auto;\n    padding: 8px 16px; }\n  #sessionize .sz-gridtable thead {\n    display: none; }\n  #sessionize .sz-gridtable tbody th:first-child {\n    width: 100%; }\n  #sessionize .sz-gridtable tr {\n    margin-bottom: 16px;\n    display: block;\n    border: 1px solid rgba(17, 17, 17, 0.2);\n    border-radius: 2px; }\n  #sessionize .sz-gridtable td[data-room-name]:before {\n    display: block;\n    margin-bottom: 8px;\n    margin-top: -8px;\n    margin-left: -16px;\n    margin-right: -16px;\n    padding: 8px 16px;\n    background-color: rgba(17, 17, 17, 0.2);\n    color: rgba(17, 17, 17, 0.8);\n    font-size: 12px;\n    font-weight: bold;\n    text-transform: uppercase;\n    content: attr(data-room-name); }\n  #sessionize .sz-gridtable .sz-session__room {\n    display: none; }\n  #sessionize .sz-gridtable .sz-row-highlight td {\n    color: rgba(17, 17, 17, 0.8);\n    background-color: transparent; }\n  #sessionize .sz-gridtable .sz-row-highlight td .sz-session__title {\n    color: #843458; }\n  #sessionize .sz-gridtable .sz-session-empty {\n    display: none; } }\n\n#sessionize .sz-tabs {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  position: relative;\n  margin-bottom: 16px;\n  text-align: center; }\n\n#sessionize .sz-tabs__item {\n  display: inline-block;\n  margin: 4px;\n  font-size: 16px;\n  line-height: 20px;\n  font-weight: bold; }\n\n#sessionize .sz-tabs__link {\n  position: relative;\n  display: block;\n  padding: 8px 16px;\n  text-decoration: none;\n  color: rgba(17, 17, 17, 0.6);\n  border-radius: 2px;\n  border: 1px solid rgba(17, 17, 17, 0.1) !important;\n  transition: all .15s ease-in; }\n\n#sessionize .sz-tabs__link:hover, #sessionize .sz-tabs__link:focus, #sessionize .sz-tabs__link:active {\n  color: #EEE;\n  background-color: #a5416f;\n  box-shadow: none !important; }\n\n#sessionize .sz-tabs__item--active {\n  border-color: transparent; }\n\n#sessionize .sz-tabs__item--active .sz-tabs__link {\n  color: #EEE;\n  background-color: #a5416f;\n  box-shadow: none; }\n\n#sessionize .sz-tabs__item--active .sz-tabs__link:hover, #sessionize .sz-tabs__item--active .sz-tabs__link:focus, #sessionize .sz-tabs__item--active .sz-tabs__link:active {\n  color: #EEE;\n  background-color: #a5416f; }\n\n#sessionize .sz-tab-container {\n  display: none; }\n\n#sessionize .sz-tab-container--active {\n  display: block; }\n\n#sessionize .sz-powered-by {\n  position: relative;\n  margin-top: 16px;\n  display: block;\n  font-size: 11px;\n  line-height: 1.5;\n  text-align: center;\n  color: rgba(17, 17, 17, 0.6); }\n\n#sessionize .sz-powered-by span {\n  color: rgba(17, 17, 17, 0.5);\n  font-weight: bold;\n  transition: all .15s ease-in; }\n\n#sessionize .sz-powered-by strong {\n  color: rgba(17, 17, 17, 0.5);\n  font-weight: bold;\n  transition: all .15s ease-in; }\n\n#sessionize .sz-powered-by a {\n  display: inline-block;\n  border: none;\n  color: rgba(17, 17, 17, 0.5);\n  text-decoration: none; }\n\n#sessionize .sz-powered-by a:hover, #sessionize .sz-powered-by a:focus, #sessionize .sz-powered-by a:active {\n  color: rgba(17, 17, 17, 0.5); }\n\n#sessionize .sz-powered-by a:hover span, #sessionize .sz-powered-by a:focus span, #sessionize .sz-powered-by a:active span {\n  color: rgba(17, 17, 17, 0.6); }\n\n#sessionize .sz-powered-by a:hover strong, #sessionize .sz-powered-by a:focus strong, #sessionize .sz-powered-by a:active strong {\n  color: #1ab394 !important; }\n\n#sessionize .sz-modal-container {\n  text-align: center;\n  position: fixed;\n  z-index: 1000;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  overflow-x: hidden;\n  overflow-y: auto;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  align-content: center; }\n\n#sessionize .sz-modal-container.is-hidden {\n  display: none; }\n\n#sessionize .sz-modal-container-inner {\n  max-height: 80%; }\n\n#sessionize .sz-modal-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(221, 221, 221, 0.9); }\n\n#sessionize .sz-modal {\n  position: relative;\n  margin: 24px auto;\n  padding: 16px;\n  max-width: 30em;\n  box-shadow: 0 1em 5em 0 rgba(0, 0, 0, 0.25);\n  border-radius: 4px;\n  background-color: #fff;\n  text-align: left; }\n\n#sessionize .sz-modal__close {\n  position: absolute;\n  top: 0;\n  right: 0;\n  display: block;\n  padding: 8px !important;\n  border: 0;\n  border-left: 1px solid rgba(17, 17, 17, 0.1);\n  border-bottom: 1px solid rgba(17, 17, 17, 0.1);\n  font-size: 16px;\n  line-height: 1;\n  color: rgba(17, 17, 17, 0.8);\n  border-radius: 0;\n  border-bottom-left-radius: 4px;\n  background-color: transparent; }\n\n#sessionize .sz-spinner {\n  width: 40px;\n  height: 40px;\n  margin: 100px auto;\n  background-color: #843458;\n  border-radius: 100%;\n  -webkit-animation: sz-scaleout 1.0s infinite ease-in-out;\n  animation: sz-scaleout 1.0s infinite ease-in-out; }\n\n@-webkit-keyframes sz-scaleout {\n  0% {\n    -webkit-transform: scale(0); }\n  100% {\n    -webkit-transform: scale(1);\n    opacity: 0; } }\n\n@keyframes sz-scaleout {\n  0% {\n    -webkit-transform: scale(0);\n    transform: scale(0); }\n  100% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacity: 0; } }\n\n/* Custom CSS */\n#sessionize h1, #sessionize h2, #sessionize h3, #sessionize h4, #sessionize h5 {\n  text-transform: none; }\n\n#sessionize .ngs-sessions-container > div {\n  float: left; }\n\n#sessionize .sz-spinner-container {\n  width: 100%; }\n  #sessionize .sz-spinner-container .sz-spinner {\n    margin: auto; }\n\n.ngs-refiners {\n  width: 30%; }\n  .ngs-refiners h2 {\n    color: #a5416f; }\n  .ngs-refiners ul.ngs-refiner-group {\n    padding-left: 0; }\n  .ngs-refiners ul.ngs-refiner-group {\n    list-style: none; }\n    .ngs-refiners ul.ngs-refiner-group li {\n      list-style: none;\n      width: 100%; }\n      .ngs-refiners ul.ngs-refiner-group li > div.clickable {\n        cursor: pointer; }\n      .ngs-refiners ul.ngs-refiner-group li > div {\n        display: inline-block;\n        width: 100%; }\n        .ngs-refiners ul.ngs-refiner-group li > div div {\n          float: left; }\n        .ngs-refiners ul.ngs-refiner-group li > div div:first-child {\n          width: 80%; }\n        .ngs-refiners ul.ngs-refiner-group li > div div:last-child {\n          width: 20%;\n          text-align: right;\n          padding-right: 5px; }\n    .ngs-refiners ul.ngs-refiner-group li.selected div {\n      background-color: #EEEEEE; }\n\n.ngs-sessions {\n  width: 70%;\n  padding-left: 25px; }\n  .ngs-sessions .applied-filters > div {\n    float: left; }\n  .ngs-sessions .applied-filters > div > div {\n    float: left;\n    background-color: #EEEEEE;\n    padding: 3px 5px 3px 5px;\n    margin: 0 5px 5px 0; }\n  .ngs-sessions .applied-filters .ngs-clear {\n    background-color: transparent;\n    cursor: pointer;\n    color: #a5416f; }\n  .ngs-sessions .ngs-even {\n    background-color: #EEEEEE; }\n  .ngs-sessions .sz-session {\n    padding: 20px; }\n  .ngs-sessions h3.sz-session__title {\n    color: #a5416f; }\n  .ngs-sessions .ngs-speaker-photos {\n    padding-left: 0; }\n    .ngs-sessions .ngs-speaker-photos li {\n      width: 80px;\n      padding-right: 5px;\n      list-style: none;\n      float: left; }\n  .ngs-sessions .ngs-session-tags-container {\n    display: inline-block; }\n    .ngs-sessions .ngs-session-tags-container > div {\n      float: left; }\n    .ngs-sessions .ngs-session-tags-container .ngs-session-tag {\n      float: left;\n      background-color: rgba(17, 17, 17, 0.1);\n      padding: 3px 5px 3px 5px;\n      margin: 0 5px 5px 0; }\n\n.ngs-modal .ngs-overlay {\n  width: 100%;\n  height: 100%;\n  background-color: #EEEEEE; }\n\n/* Modal Dialog */\n#sessionize .overlay {\n  display: none;\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  background-color: rgba(0, 0, 0, 0.05);\n  z-index: 10; }\n\n#sessionize .modal {\n  display: none;\n  width: 600px;\n  height: 500px;\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  margin-top: -250px;\n  margin-left: -300px;\n  background-color: #FFFFFF;\n  border-radius: 5px;\n  z-index: 11; }\n\n#sessionize .active {\n  display: block; }\n\n#sessionize .modal-header {\n  width: 100%;\n  text-align: right;\n  padding-right: 10px;\n  padding-top: 5px; }\n\n#sessionize .speaker > div {\n  float: left; }\n\n#sessionize .social .links {\n  list-style: none;\n  float: left; }\n", ""]);

// exports


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = "<div id=\"sessionize\" ng-cloak>\r\n\r\n    <div class=\"sz-spinner\" ng-show=\"!vm.initialized\"></div>\r\n\r\n    <div class=\"ngs-sessions-container\" ng-if=\"vm.initialized\">\r\n\r\n\r\n        <div class=\"ngs-refiners\">\r\n\r\n            <h5>Refine results</h5>\r\n\r\n            <div ng-repeat=\"(key, value) in vm.filters\">\r\n\r\n                <ng-sessionize-sessions-refiner vm=\"vm\" refinertype=\"key\" items=\"value\"></ng-sessionize-sessions-refiner>\r\n\r\n            </div>\r\n\r\n        </div>\r\n\r\n\r\n        <div class=\"ngs-sessions\">\r\n\r\n            <div class=\"applied-filters\">\r\n\r\n                <div ng-repeat=\"(key, value) in vm.filters\">\r\n\r\n                    <div ng-repeat=\"item in value | filter:{ selected: true} \" ng-click=\"vm.toggle(item)\">\r\n                        <span ng-bind=\"item.name\"></span>\r\n                        <i class=\"fas fa-times fa-sm\"></i>\r\n                    </div>\r\n\r\n                </div>\r\n                <div class=\"ngs-clear\" ng-show=\"vm.filterCount > 0\" ng-click=\"vm.clearAll()\">Clear all</div>\r\n\r\n            </div>\r\n            <div class=\"clear\"></div>\r\n\r\n            <div>\r\n                <span ng-bind=\"vm.filteredSessions.length\"></span> sessions\r\n            </div>\r\n\r\n            <div class=\"sz-session sz-session--full\" ng-class-even=\"'ngs-even'\" ng-repeat=\"session in vm.filteredSessions\">\r\n\r\n                <h3 class=\"sz-session__title\" ng-bind=\"session.title\"></h3>\r\n\r\n                <div>\r\n                    <ul class=\"sz-session__speakers\">\r\n                        <li class=\"sz-session__speaker\" ng-repeat=\"speaker in session.speakers\">\r\n                            <a ng-bind=\"speaker.name\" ng-click=\"vm.speakerModal(speaker)\"></a>\r\n                        </li>\r\n                    </ul>\r\n\r\n                    <ul class=\"ngs-speaker-photos\">\r\n                        <li ng-repeat=\"speaker in session.speakers\">\r\n                            <img ng-src=\"{{ vm.getSpeakerPhoto(speaker.id) }}\"/>\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n                <div class=\"clear\"></div>\r\n\r\n                <div>\r\n                    <p class=\"sz-session__description\" ng-bind=\"session.description\"></p>\r\n                </div>\r\n\r\n                <div class=\"ngs-session-tags-container\">\r\n                    <div class=\"ngs-session-tags\" ng-repeat=\"category in session.categories\">\r\n                        <div class=\"ngs-session-tag\" ng-repeat=\"item in category.categoryItems\" ng-bind=\"item.name\"></div>\r\n                    </div>\r\n                    <div class=\"clear\"></div>\r\n                </div>\r\n\r\n            </div>\r\n\r\n\r\n            <ng-sessionize-speaker-modal showmodal=\"vm.showModal\" speaker=\"vm.selectedSpeaker\"></ng-sessionize-speaker-modal>\r\n\r\n\r\n        </div>\r\n\r\n    </div>\r\n\r\n\r\n</div>";

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = "<h2 ng-bind=\"$ctrl.refinertype\"></h2>\r\n\r\n<ul class=\"ngs-refiner-group\">\r\n\r\n    <li ng-class=\"{ 'selected': item.selected }\" ng-repeat=\"item in $ctrl.items | orderBy: '-count'\">\r\n\r\n        <div class=\"clickable\" ng-if=\"item.countFiltered > 0\"  ng-click=\"$ctrl.vm.toggle(item)\">\r\n\r\n            <div ng-bind=\"item.name\"></div>\r\n            <div ng-if=\"!item.selected\" ng-bind=\"item.countFiltered\"></div>\r\n            <div ng-if=\"item.selected\">\r\n                <i class=\"fas fa-times fa-sm\"></i>\r\n            </div>\r\n\r\n        </div>\r\n\r\n        <div ng-if=\"item.countFiltered === 0\">\r\n\r\n            <div ng-bind=\"item.name\"></div>\r\n            <div ng-if=\"!item.selected\" ng-bind=\"item.countFiltered\"></div>\r\n            <div ng-if=\"item.selected\">\r\n                <i class=\"fas fa-times fa-sm\"></i>\r\n            </div>\r\n\r\n        </div>\r\n\r\n    </li>\r\n\r\n</ul>\r\n";

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = "<div class=\"overlay\" ng-class=\"{'active': $ctrl.showmodal}\" ng-click=\"$ctrl.closeModal()\"></div>\r\n\r\n\r\n<div class=\"modal\" ng-class=\"{'active': $ctrl.showmodal}\">\r\n\r\n    <div class=\"modal-header\" ng-click=\"$ctrl.closeModal()\">X</div>\r\n\r\n    <div class=\"speaker\">\r\n\r\n        <div>\r\n            <img ng-src=\"{{ $ctrl.speaker.profilePicture }}\"/>\r\n        </div>\r\n\r\n        <div>\r\n            <div>\r\n                <div ng-bind=\"$ctrl.speaker.name\"></div>\r\n                <div ng-bind=\"$ctrl.speaker.tagLine\"></div>\r\n            </div>\r\n            <div class=\"social\">\r\n                <ul class=\"links\" ng-repeat=\"link in $ctrl.speaker.links\">\r\n                    <li><a href=\"{{ link.url }}\" ng-bind=\"link.title\" target=\"_blank\"></a></li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n\r\n    <div ng-bind=\"$ctrl.speaker.bio\"></div>\r\n\r\n    <ul ng-repeat=\"session in $ctrl.speaker.sessions\">\r\n        <li ng-bind=\"session.name\"></li>\r\n    </ul>\r\n\r\n</div>\r\n\r\n<!--\r\n\r\n{\r\n\"id\": \"adb8c574-f7a7-4f6a-af3e-9a7072c92c27\",\r\n\"firstName\": \"Agnes\",\r\n\"lastName\": \"Molnar\",\r\n\"fullName\": \"Agnes Molnar\",\r\n\"bio\": \"Agnes Molnar is CEO and Managing Consultant of Search Explained, recognized Information Architecture and Search Expert. She has worked for various companies throughout the world, architecting and implementing dozens of SharePoint and FAST Search implementations for both commercial and government organizations. Since 2008, Agnes has been awarded with the Microsoft Most Valuable Professional (MVP) Award, for actively sharing her technical expertise. She is a regular speaker at technical conferences and workshops around the globe. She has also co-authored several books and white papers. She also maintains her passion and dedication on the subject through her blog, https://SearchExplained.com, where she shares troubleshooting tips, best practices, and other useful resources in Information Architecture and Enterprise Search with a light and wholesome approach.\",\r\n\"tagLine\": \"Managing Consultant, Search Explained, Microsoft MVP, Hungary\",\r\n\"profilePicture\": \"https://sessionize.com/image?f=2aab5eeac7a080010657102bdfce2f1e,200,200,True,False,74-f7a7-4f6a-af3e-9a7072c92c27.ac04a9ec-8be2-4f26-aac1-3672fc4ccfb5.JPG\",\r\n\"sessions\": [\r\n{\r\n\"id\": 18877,\r\n\"name\": \"\\\"Quick win\\\" features vs. long term strategy in Search\"\r\n},\r\n{\r\n\"id\": 33664,\r\n\"name\": \"Enterprise Search PowerClass\"\r\n}\r\n],\r\n\"isTopSpeaker\": false,\r\n\"links\": [\r\n{\r\n\"title\": \"Twitter\",\r\n\"url\": \"http://twitter.com/SearchExplained\",\r\n\"linkType\": \"Twitter\"\r\n},\r\n{\r\n\"title\": \"Blog\",\r\n\"url\": \"https://SearchExplained.com\",\r\n\"linkType\": \"Blog\"\r\n}\r\n]\r\n},\r\n\r\n-->";

/***/ }),
/* 12 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module("ngSessionizeService", [])

  .service("ngSessionizeService", ["$q", "$http", "$rootScope", "$filter",
	  function ($q, $http, $rootScope, $filter) {

		  var self = this;

		  self.ngSessionize = {};
		  self.ngSessionize.initialized = false;

		  self.getSessions = function () {

			  var deferred = $q.defer();

			  $http({
				  method: "GET",
				  url: "https://sessionize.com/api/v2/57c0xuih/view/sessions"
			  }).then(function (response) {

				  self.ngSessionize.sessions = response.data[0].sessions;

				  deferred.resolve();

			  });

			  return deferred.promise;
		  };

		  self.getSpeakers = function () {

			  var deferred = $q.defer();

			  $http({
				  method: "GET",
				  url: "https://sessionize.com/api/v2/57c0xuih/view/speakers"
			  }).then(function (response) {

				  self.ngSessionize.speakers = response.data;

				  deferred.resolve();

			  });

			  return deferred.promise;
		  };

		  self.initNgSessionize = function () {

			  var deferred = $q.defer();

			  var p = [];

			  p.push(self.getSpeakers());
			  p.push(self.getSessions());

			  $q.all(p).then(function () {

				  deferred.resolve();

			  });

			  return deferred.promise;

		  };

	  }
  ]);

/***/ })
/******/ ]);
//# sourceMappingURL=ngSessionize.js.map