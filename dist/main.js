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
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

eval("// JS Entry File\nconsole.log('Hello');\nconst Sprite = __webpack_require__(/*! ./sprite.js */ \"./src/sprite.js\");\n\n//Create Canvas\nconst canvas = document.getElementById('canvas');\nconst ctx = canvas.getContext(\"2d\");\nctx.fillRect(0, 0, canvas.width, canvas.height);\n\n//Create Variables\nconst map = new Image();\nmap.src = '../img/tilemap2_rough.png';\nconst james = new Image();\njames.src = '../img/james_sprites.png';\nlet james_width = james.width * 2;\nlet james_height = james.height * 2;\n\n//map.onload or window.onload? Use window.onload if u want to load with window, vs when map loads\n// window.onload = function() { //map png in window on canvas when map loads\n//   // ctx.drawImage(map, -1000, -700);\n//   ctx.drawImage(map,0 ,0);\n//   ctx.drawImage(james, \n//     0,0,\n//     16,32, //first 4 args are cropping sprite\n//     canvas.width/2-james_width/2,\n//     canvas.height/2-james_height/2, //where on canvas we place james, from the top left corner\n//     32,\n//     64); //how big james is\n// }\n\nconst background = new Sprite([0, 0], map);\nconst keys = {\n  w: {\n    pressed: false\n  },\n  a: {\n    pressed: false\n  },\n  s: {\n    pressed: false\n  },\n  d: {\n    pressed: false\n  }\n};\nfunction animate() {\n  //animates screen. will run infinietly and 'refresh' screen\n  window.requestAnimationFrame(animate);\n  ctx.drawImage(map, background.pos[0], background.pos[1]);\n  ctx.drawImage(james, 0, 0, 16, 32,\n  //first 4 args are cropping sprite\n  canvas.width / 2 - james_width / 2, canvas.height / 2 - james_height / 2,\n  //where on canvas we place james, from the top left corner\n  32, 64); //how big james is\n  console.log(keys);\n  //moving background with WASD\n  if (keys.w.pressed && lastkey === 'w') background.pos[1] += 8;else if (keys.s.pressed && lastkey === 's') background.pos[1] -= 8;else if (keys.a.pressed && lastkey === 'a') background.pos[0] += 8;else if (keys.d.pressed && lastkey === 'd') background.pos[0] -= 8;\n}\nanimate();\nlet lastkey = ''; //this is a bit redundant, but it helps tidy up wasd in case multiple keys are pressed down at once\nwindow.addEventListener(\"keydown\", e => {\n  //whenever a key is pressed, will update keys hash\n  switch (e.key) {\n    case 'w':\n      keys.w.pressed = true;\n      lastkey = 'w';\n      break;\n    case 'a':\n      keys.a.pressed = true;\n      lastkey = 'a';\n      break;\n    case 's':\n      keys.s.pressed = true;\n      lastkey = 's';\n      break;\n    case 'd':\n      keys.d.pressed = true;\n      lastkey = 'd';\n      break;\n  }\n});\nwindow.addEventListener(\"keyup\", e => {\n  //whenever a key is not pressed, will update keys hash\n  switch (e.key) {\n    case 'w':\n      keys.w.pressed = false;\n      break;\n    case 'a':\n      keys.a.pressed = false;\n      break;\n    case 's':\n      keys.s.pressed = false;\n      break;\n    case 'd':\n      keys.d.pressed = false;\n      break;\n  }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YWNrOi8vbXlqc3AvLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBKUyBFbnRyeSBGaWxlXG5jb25zb2xlLmxvZygnSGVsbG8nKTtcbmNvbnN0IFNwcml0ZSA9IHJlcXVpcmUoXCIuL3Nwcml0ZS5qc1wiKTtcblxuLy9DcmVhdGUgQ2FudmFzXG5jb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyk7IFxuY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbmN0eC5maWxsUmVjdCgwLDAsY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblxuLy9DcmVhdGUgVmFyaWFibGVzXG5jb25zdCBtYXAgPSBuZXcgSW1hZ2UoKTtcbm1hcC5zcmMgPSAnLi4vaW1nL3RpbGVtYXAyX3JvdWdoLnBuZyc7XG5jb25zdCBqYW1lcyA9IG5ldyBJbWFnZSgpO1xuamFtZXMuc3JjID0gJy4uL2ltZy9qYW1lc19zcHJpdGVzLnBuZyc7XG5sZXQgamFtZXNfd2lkdGggPSBqYW1lcy53aWR0aCoyXG5sZXQgamFtZXNfaGVpZ2h0ID0gamFtZXMuaGVpZ2h0KjJcblxuXG4vL21hcC5vbmxvYWQgb3Igd2luZG93Lm9ubG9hZD8gVXNlIHdpbmRvdy5vbmxvYWQgaWYgdSB3YW50IHRvIGxvYWQgd2l0aCB3aW5kb3csIHZzIHdoZW4gbWFwIGxvYWRzXG4vLyB3aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7IC8vbWFwIHBuZyBpbiB3aW5kb3cgb24gY2FudmFzIHdoZW4gbWFwIGxvYWRzXG4vLyAgIC8vIGN0eC5kcmF3SW1hZ2UobWFwLCAtMTAwMCwgLTcwMCk7XG4vLyAgIGN0eC5kcmF3SW1hZ2UobWFwLDAgLDApO1xuLy8gICBjdHguZHJhd0ltYWdlKGphbWVzLCBcbi8vICAgICAwLDAsXG4vLyAgICAgMTYsMzIsIC8vZmlyc3QgNCBhcmdzIGFyZSBjcm9wcGluZyBzcHJpdGVcbi8vICAgICBjYW52YXMud2lkdGgvMi1qYW1lc193aWR0aC8yLFxuLy8gICAgIGNhbnZhcy5oZWlnaHQvMi1qYW1lc19oZWlnaHQvMiwgLy93aGVyZSBvbiBjYW52YXMgd2UgcGxhY2UgamFtZXMsIGZyb20gdGhlIHRvcCBsZWZ0IGNvcm5lclxuLy8gICAgIDMyLFxuLy8gICAgIDY0KTsgLy9ob3cgYmlnIGphbWVzIGlzXG4vLyB9XG5cblxuY29uc3QgYmFja2dyb3VuZCA9IG5ldyBTcHJpdGUoWzAsMF0sIG1hcCk7XG5cbmNvbnN0IGtleXMgPSB7XG4gIHc6eyBwcmVzc2VkOiBmYWxzZX0sXG4gIGE6eyBwcmVzc2VkOiBmYWxzZX0sXG4gIHM6eyBwcmVzc2VkOiBmYWxzZX0sXG4gIGQ6eyBwcmVzc2VkOiBmYWxzZX0sXG59XG5cbmZ1bmN0aW9uIGFuaW1hdGUoKSB7IC8vYW5pbWF0ZXMgc2NyZWVuLiB3aWxsIHJ1biBpbmZpbmlldGx5IGFuZCAncmVmcmVzaCcgc2NyZWVuXG4gIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XG4gIGN0eC5kcmF3SW1hZ2UobWFwLCBiYWNrZ3JvdW5kLnBvc1swXSAsYmFja2dyb3VuZC5wb3NbMV0pO1xuICBjdHguZHJhd0ltYWdlKGphbWVzLCBcbiAgICAwLDAsXG4gICAgMTYsMzIsIC8vZmlyc3QgNCBhcmdzIGFyZSBjcm9wcGluZyBzcHJpdGVcbiAgICBjYW52YXMud2lkdGgvMi1qYW1lc193aWR0aC8yLFxuICAgIGNhbnZhcy5oZWlnaHQvMi1qYW1lc19oZWlnaHQvMiwgLy93aGVyZSBvbiBjYW52YXMgd2UgcGxhY2UgamFtZXMsIGZyb20gdGhlIHRvcCBsZWZ0IGNvcm5lclxuICAgIDMyLFxuICAgIDY0KTsgLy9ob3cgYmlnIGphbWVzIGlzXG4gICAgY29uc29sZS5sb2coa2V5cykgXG4gICAgLy9tb3ZpbmcgYmFja2dyb3VuZCB3aXRoIFdBU0RcbiAgICBpZiAoa2V5cy53LnByZXNzZWQgJiYgbGFzdGtleT09PSd3JykgYmFja2dyb3VuZC5wb3NbMV0rPThcbiAgICBlbHNlIGlmKGtleXMucy5wcmVzc2VkICYmIGxhc3RrZXk9PT0ncycpYmFja2dyb3VuZC5wb3NbMV0tPThcbiAgICBlbHNlIGlmKGtleXMuYS5wcmVzc2VkICYmIGxhc3RrZXk9PT0nYScpYmFja2dyb3VuZC5wb3NbMF0rPThcbiAgICBlbHNlIGlmKGtleXMuZC5wcmVzc2VkICYmIGxhc3RrZXk9PT0nZCcpYmFja2dyb3VuZC5wb3NbMF0tPThcbiAgICB9XG5hbmltYXRlKCk7XG5cblxubGV0IGxhc3RrZXkgPSAnJzsgLy90aGlzIGlzIGEgYml0IHJlZHVuZGFudCwgYnV0IGl0IGhlbHBzIHRpZHkgdXAgd2FzZCBpbiBjYXNlIG11bHRpcGxlIGtleXMgYXJlIHByZXNzZWQgZG93biBhdCBvbmNlXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGUpPT57IC8vd2hlbmV2ZXIgYSBrZXkgaXMgcHJlc3NlZCwgd2lsbCB1cGRhdGUga2V5cyBoYXNoXG4gIHN3aXRjaChlLmtleSl7XG4gICAgY2FzZSAndyc6IFxuICAgICAga2V5cy53LnByZXNzZWQgPSB0cnVlXG4gICAgICBsYXN0a2V5ID0gJ3cnXG4gICAgICBicmVhaztcbiAgICBjYXNlICdhJzogXG4gICAgICBrZXlzLmEucHJlc3NlZCA9IHRydWVcbiAgICAgIGxhc3RrZXkgPSAnYSdcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3MnOiBcbiAgICAgIGtleXMucy5wcmVzc2VkID0gdHJ1ZVxuICAgICAgbGFzdGtleSA9ICdzJ1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnZCc6IFxuICAgICAga2V5cy5kLnByZXNzZWQgPSB0cnVlXG4gICAgICBsYXN0a2V5ID0gJ2QnXG4gICAgICBicmVhaztcbiAgfVxufSlcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGUpPT57IC8vd2hlbmV2ZXIgYSBrZXkgaXMgbm90IHByZXNzZWQsIHdpbGwgdXBkYXRlIGtleXMgaGFzaFxuICBzd2l0Y2goZS5rZXkpe1xuICAgIGNhc2UgJ3cnOiBcbiAgICAgIGtleXMudy5wcmVzc2VkID0gZmFsc2VcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2EnOiBcbiAgICAgIGtleXMuYS5wcmVzc2VkID0gZmFsc2VcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3MnOiBcbiAgICAgIGtleXMucy5wcmVzc2VkID0gZmFsc2VcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2QnOiBcbiAgICAgIGtleXMuZC5wcmVzc2VkID0gZmFsc2VcbiAgICAgIGJyZWFrO1xuICB9XG59KSJdLCJuYW1lcyI6WyJjb25zb2xlIiwibG9nIiwiU3ByaXRlIiwicmVxdWlyZSIsImNhbnZhcyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjdHgiLCJnZXRDb250ZXh0IiwiZmlsbFJlY3QiLCJ3aWR0aCIsImhlaWdodCIsIm1hcCIsIkltYWdlIiwic3JjIiwiamFtZXMiLCJqYW1lc193aWR0aCIsImphbWVzX2hlaWdodCIsImJhY2tncm91bmQiLCJrZXlzIiwidyIsInByZXNzZWQiLCJhIiwicyIsImQiLCJhbmltYXRlIiwid2luZG93IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiZHJhd0ltYWdlIiwicG9zIiwibGFzdGtleSIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwia2V5Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/sprite.js":
/*!***********************!*\
  !*** ./src/sprite.js ***!
  \***********************/
/***/ (function(module) {

eval("class Sprite {\n  constructor(pos, image) {\n    this.pos = pos; //[x,y]\n    this.image = image;\n  }\n  // draw(){//draw image of sprite\n  //   //helps keep it dry, but i might want to remove this and do it manually bc some sprites require more args\n  //   ctx.drawImage(this.image, this.pos[0], this.pos[1])\n  // }\n}\n\nmodule.exports = Sprite;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc3ByaXRlLmpzLmpzIiwibmFtZXMiOlsiU3ByaXRlIiwiY29uc3RydWN0b3IiLCJwb3MiLCJpbWFnZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2VicGFjazovL215anNwLy4vc3JjL3Nwcml0ZS5qcz84ODMzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFNwcml0ZXtcbiAgY29uc3RydWN0b3IocG9zLCBpbWFnZSkge1xuICAgIHRoaXMucG9zID0gcG9zIC8vW3gseV1cbiAgICB0aGlzLmltYWdlPWltYWdlXG4gIH1cbiAgLy8gZHJhdygpey8vZHJhdyBpbWFnZSBvZiBzcHJpdGVcbiAgLy8gICAvL2hlbHBzIGtlZXAgaXQgZHJ5LCBidXQgaSBtaWdodCB3YW50IHRvIHJlbW92ZSB0aGlzIGFuZCBkbyBpdCBtYW51YWxseSBiYyBzb21lIHNwcml0ZXMgcmVxdWlyZSBtb3JlIGFyZ3NcbiAgLy8gICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMucG9zWzBdLCB0aGlzLnBvc1sxXSlcbiAgLy8gfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNwcml0ZTsiXSwibWFwcGluZ3MiOiJBQUFBLE1BQU1BLE1BQU07RUFDVkMsV0FBVyxDQUFDQyxHQUFHLEVBQUVDLEtBQUssRUFBRTtJQUN0QixJQUFJLENBQUNELEdBQUcsR0FBR0EsR0FBRyxFQUFDO0lBQ2YsSUFBSSxDQUFDQyxLQUFLLEdBQUNBLEtBQUs7RUFDbEI7RUFDQTtFQUNBO0VBQ0E7RUFDQTtBQUNGOztBQUVBQyxNQUFNLENBQUNDLE9BQU8sR0FBR0wsTUFBTSJ9\n//# sourceURL=webpack-internal:///./src/sprite.js\n");

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
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
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
/******/ 	__webpack_require__("./src/index.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.scss");
/******/ 	
/******/ })()
;