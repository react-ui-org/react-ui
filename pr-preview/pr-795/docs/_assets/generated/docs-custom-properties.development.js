/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(globalThis, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/docsCustomProperties.ts"
/*!*************************************!*\
  !*** ./src/docsCustomProperties.ts ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _theme_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./theme.scss */ \"./src/theme.scss\");\n// This is needed to generate CSS file containing only CSS custom property definitions\n// This file is needed to make custom property values accessible in the documentation\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZG9jc0N1c3RvbVByb3BlcnRpZXMudHMiLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQHJlYWN0LXVpLW9yZy9yZWFjdC11aS8uL3NyYy9kb2NzQ3VzdG9tUHJvcGVydGllcy50cz9iM2VhIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoaXMgaXMgbmVlZGVkIHRvIGdlbmVyYXRlIENTUyBmaWxlIGNvbnRhaW5pbmcgb25seSBDU1MgY3VzdG9tIHByb3BlcnR5IGRlZmluaXRpb25zXG4vLyBUaGlzIGZpbGUgaXMgbmVlZGVkIHRvIG1ha2UgY3VzdG9tIHByb3BlcnR5IHZhbHVlcyBhY2Nlc3NpYmxlIGluIHRoZSBkb2N1bWVudGF0aW9uXG5pbXBvcnQgJy4vdGhlbWUuc2Nzcyc7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/docsCustomProperties.ts\n\n}");

/***/ },

/***/ "./src/theme.scss"
/*!************************!*\
  !*** ./src/theme.scss ***!
  \************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdGhlbWUuc2NzcyIsIm1hcHBpbmdzIjoiO0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AcmVhY3QtdWktb3JnL3JlYWN0LXVpLy4vc3JjL3RoZW1lLnNjc3M/MWU1YyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/theme.scss\n\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	let __webpack_exports__ = __webpack_require__("./src/docsCustomProperties.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});