/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(192);


/***/ },

/***/ 86:
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  PORT: 8085,
	  HOST: 'localhost',
	  WEBPACK_SOCKET_PATH: '/__webpack'
	};

/***/ },

/***/ 192:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var serverConf = __webpack_require__(86);

	var PORT = serverConf.PORT,
	    HOST = serverConf.HOST,
	    WEBPACK_SOCKET_PATH = serverConf.WEBPACK_SOCKET_PATH;


	var exampleSocket = new WebSocket('ws://' + HOST + ':' + PORT + WEBPACK_SOCKET_PATH, 'webpackEvents');

	exampleSocket.onmessage = function (event) {
	  if (event.data === 'webpack:reload') {
	    window.location.reload();
	  }
	};

/***/ }

/******/ });