/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function() {

eval("// JS Entry File\nconsole.log('Hello');\nconst canvas = document.getElementById('canvas');\nconst ctx = canvas.getContext(\"2d\");\n// canvas.width = 1200;\n// canvas.height = 800;\nctx.fillRect(0, 0, canvas.width, canvas.height);\nconst map = new Image();\nmap.src = '../img/tilemap2_rough.png';\n//map.onload or window.onload? Use window.onload if u want to load with window, when map loads\nmap.onload = function () {\n  //map png in window on canvas when map loads\n  ctx.drawImage(map, -1000, -700);\n};\nconsole.log(map);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJuYW1lcyI6WyJjb25zb2xlIiwibG9nIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImN0eCIsImdldENvbnRleHQiLCJmaWxsUmVjdCIsIndpZHRoIiwiaGVpZ2h0IiwibWFwIiwiSW1hZ2UiLCJzcmMiLCJvbmxvYWQiLCJkcmF3SW1hZ2UiXSwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2VicGFjazovL215anNwLy4vc3JjL2luZGV4LmpzP2I2MzUiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gSlMgRW50cnkgRmlsZVxuY29uc29sZS5sb2coJ0hlbGxvJyk7XG5jb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyk7XG5jb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuLy8gY2FudmFzLndpZHRoID0gMTIwMDtcbi8vIGNhbnZhcy5oZWlnaHQgPSA4MDA7XG5jdHguZmlsbFJlY3QoMCwwLGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cbmNvbnN0IG1hcCA9IG5ldyBJbWFnZSgpO1xubWFwLnNyYyA9ICcuLi9pbWcvdGlsZW1hcDJfcm91Z2gucG5nJztcbi8vbWFwLm9ubG9hZCBvciB3aW5kb3cub25sb2FkPyBVc2Ugd2luZG93Lm9ubG9hZCBpZiB1IHdhbnQgdG8gbG9hZCB3aXRoIHdpbmRvdywgd2hlbiBtYXAgbG9hZHNcbm1hcC5vbmxvYWQgPSBmdW5jdGlvbigpIHsgLy9tYXAgcG5nIGluIHdpbmRvdyBvbiBjYW52YXMgd2hlbiBtYXAgbG9hZHNcbiAgY3R4LmRyYXdJbWFnZShtYXAsIC0xMDAwLCAtNzAwKTtcbn1cbmNvbnNvbGUubG9nKG1hcClcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQUEsT0FBTyxDQUFDQyxHQUFHLENBQUMsT0FBTyxDQUFDO0FBQ3BCLE1BQU1DLE1BQU0sR0FBR0MsUUFBUSxDQUFDQyxjQUFjLENBQUMsUUFBUSxDQUFDO0FBQ2hELE1BQU1DLEdBQUcsR0FBR0gsTUFBTSxDQUFDSSxVQUFVLENBQUMsSUFBSSxDQUFDO0FBQ25DO0FBQ0E7QUFDQUQsR0FBRyxDQUFDRSxRQUFRLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQ0wsTUFBTSxDQUFDTSxLQUFLLEVBQUVOLE1BQU0sQ0FBQ08sTUFBTSxDQUFDO0FBRTdDLE1BQU1DLEdBQUcsR0FBRyxJQUFJQyxLQUFLLEVBQUU7QUFDdkJELEdBQUcsQ0FBQ0UsR0FBRyxHQUFHLDJCQUEyQjtBQUNyQztBQUNBRixHQUFHLENBQUNHLE1BQU0sR0FBRyxZQUFXO0VBQUU7RUFDeEJSLEdBQUcsQ0FBQ1MsU0FBUyxDQUFDSixHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUM7QUFDakMsQ0FBQztBQUNEVixPQUFPLENBQUNDLEdBQUcsQ0FBQ1MsR0FBRyxDQUFDIn0=\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguc2Nzcy5qcyIsIm1hcHBpbmdzIjoiO0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teWpzcC8uL3NyYy9pbmRleC5zY3NzPzk3NDUiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/index.scss\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	__webpack_modules__["./src/index.js"](0, {}, __webpack_require__);
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.scss"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;