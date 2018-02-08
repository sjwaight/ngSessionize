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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);
__webpack_require__(10);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(8)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/index.js!./ecs.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/index.js!./ecs.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(9);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module("ecs")

  .component("sessionizeSessionsFilter", {
	  template: __webpack_require__(7),
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

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_ecs_scss__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_ecs_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__scss_ecs_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__services__);


// Branding




var ecs = angular.module("ecs", [
	"ngRoute",
	"angular.filter",
	"ecsService"
])

  .config(function ($routeProvider, $httpProvider, $locationProvider) {

	  $locationProvider.html5Mode({
		  enabled: true,
		  requireBase: true
	  }).hashPrefix("!");

	  $routeProvider

		.when("/", {
			template: "<sessionize-sessions-filter></sessionize-sessions-filter>",
			component: "ecs"
		})

		.otherwise({
			redirectTo: "/"
		});

  });

ecs.init = function () {
	angular.bootstrap(document, ["ecs"]);
};

__webpack_require__(0);

/***/ }),
/* 5 */
/***/ (function(module, exports) {

throw new Error("Module build failed: \r\n$color-purple: $color-purple;\r\n              ^\r\n      Undefined variable: \"$color-purple\".\r\n      in D:\\WebstormProjects\\ECS\\scss\\ecs.scss (line 1, column 16)");

/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, exports) {

module.exports = "<div id=\"sessionize\">\r\n\r\n    <div class=\"ecs-refiners\">\r\n\r\n        <h5>Refine results</h5>\r\n\r\n\r\n        <sessionize-sessions-refiner vm=\"vm\" type=\"formats\" items=\"vm.formats\"></sessionize-sessions-refiner>\r\n        <sessionize-sessions-refiner vm=\"vm\" type=\"tracks\" items=\"vm.tracks\"></sessionize-sessions-refiner>\r\n        <sessionize-sessions-refiner vm=\"vm\" type=\"levels\" items=\"vm.levels\"></sessionize-sessions-refiner>\r\n        <sessionize-sessions-refiner vm=\"vm\" type=\"tags\" items=\"vm.tags\"></sessionize-sessions-refiner>\r\n<!--\r\n        <h2>Format</h2>\r\n        <ul class=\"ecs-refiner-group\">\r\n            <li ng-repeat=\"item in vm.formats | orderBy: '-item.count'\">\r\n                <div ng-bind=\"item.name\"></div>\r\n                <div ng-bind=\"item.count\"></div>\r\n            </li>\r\n        </ul>\r\n\r\n        <h2>Track</h2>\r\n        <ul class=\"ecs-refiner-group\">\r\n            <li ng-repeat=\"item in vm.tracks | orderBy: '-item.count'\">\r\n                <div ng-bind=\"item.name\"></div>\r\n                <div ng-bind=\"item.count\"></div>\r\n            </li>\r\n        </ul>\r\n\r\n        <h2>Level</h2>\r\n        <ul class=\"ecs-refiner-group\">\r\n            <li ng-repeat=\"item in vm.levels | orderBy: '-item.count'\">\r\n                <div ng-bind=\"item.name\"></div>\r\n                <div ng-bind=\"item.count\"></div>\r\n            </li>\r\n        </ul>\r\n\r\n        <h2>Tag</h2>\r\n        <ul class=\"ecs-refiner-group\">\r\n            <li ng-repeat=\"item in vm.tags | orderBy: '-item.count'\">\r\n                <div ng-bind=\"item.name\"></div>\r\n                <div ng-bind=\"item.count\"></div>\r\n            </li>\r\n        </ul>\r\n-->\r\n    </div>\r\n\r\n\r\n    <div class=\"ecs-sessions\">\r\n\r\n        <h1>Session Catalog</h1>\r\n\r\n        <span ng-bind=\"vm.data.sessions.length\"></span> sessions\r\n\r\n        <div ng-repeat=\"session in vm.data.sessions\">\r\n\r\n            <h3 class=\"sz-session__title\" ng-bind=\"session.title\"></h3>\r\n\r\n            <ul class=\"sz-session__speakers\">\r\n                <li class=\"sz-session__speaker\" ng-repeat=\"speaker in session.speakers\" ng-bind=\"speaker.name\"></li>\r\n            </ul>\r\n\r\n            <p class=\"sz-session__description\" ng-bind=\"session.description\"></p>\r\n\r\n            <div class=\"ecs-session-tags\" ng-repeat=\"category in session.categories\">\r\n                <div class=\"sz-session__tags\" ng-repeat=\"item in category.categoryItems\" ng-bind=\"item.name\"></div>\r\n            </div>\r\n\r\n        </div>\r\n\r\n    </div>\r\n\r\n\r\n</div>";

/***/ }),
/* 8 */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

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

		    	self.ecs.sessions = response.data[0].sessions;

		    	deferred.resolve();

		    });

		  	return deferred.promise;

		  }

	  }
  ]);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module("ecs")

  .component("sessionizeSessionsRefiner", {
	  template: __webpack_require__(11),
	  controller: "sessionizeSessionsRefinerController",
	  controllerAs: "vm",

	  restrict: "E",
	  bindings: {
		  vm: "=",
		  type: "=",
		  items: "="
	  },

  })

  .controller("sessionizeSessionsRefinerController", ["$sce", "$q", "$filter", "$location", "ecsService",
	  function ($sce, $q, $filter, $location, ecsService) {

		  var vm = this;

		  vm.data = ecsService.ecs;

		  vm.initialized = false;

		  vm.toggle = function(item) {

		  	vm.vm.filters[type].push(item);

		  };

		  vm.$onInit = function () {

		  };

	  }
  ]);

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = "<h2 ng-bind=\"vm.type\"></h2>\r\n<ul class=\"ecs-refiner-group\">\r\n    <li ng-repeat=\"item in vm.items | orderBy: '-count'\" ng-click=\"vm.toggle(item)\">\r\n        <div ng-bind=\"item.name\"></div>\r\n        <div ng-bind=\"item.count\"></div>\r\n    </li>\r\n</ul>\r\n";

/***/ })
/******/ ]);
//# sourceMappingURL=ecs.js.map