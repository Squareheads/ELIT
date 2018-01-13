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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _electron = __webpack_require__(1);

let mainWindow;
function onReady() {
    mainWindow = new _electron.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            webSecurity: false
        }
    });
    mainWindow.setTitle(__webpack_require__(2).name);
    const fileName = `file://${__dirname}/index.html`;
    mainWindow.loadURL(fileName);
    mainWindow.on('close', () => _electron.app.quit());
    // mainWindow.webContents.openDevTools()
}
_electron.app.on('ready', () => onReady());
_electron.app.on('window-all-closed', () => _electron.app.quit());
_electron.app.on('browser-window-created', function (_e, window) {
    window.setMenu(null);
});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {"name":"intel","version":"1.0.0","description":"Eve Online Local Intel Tool","main":"dist/main.js","repository":"git@github.com:Squareheads/intel.git","author":"Owen Worley","license":"MIT","devDependencies":{"@types/chai":"^4.0.8","@types/electron":"^1.6.10","@types/material-ui":"^0.18.5","@types/mocha":"^2.2.44","@types/mockery":"^1.4.29","@types/node":"^8.0.53","@types/react":"^16.0.25","@types/react-dom":"^16.0.3","@types/request":"^2.0.8","@types/request-promise-native":"^1.0.10","@types/sinon":"^4.1.0","@types/url-parse":"^1.1.0","@types/x2js":"^3.1.0","babel-core":"^6.26.0","babel-jest":"^21.2.0","babel-loader":"^7.1.2","babel-plugin-add-module-exports":"^0.2.1","babel-plugin-transform-runtime":"^6.0.0","babel-preset-env":"^1.6.1","babel-preset-es2015":"^6.24.1","babel-preset-es2015-node":"^6.1.1","babel-preset-es2015-node5":"^1.2.0","babel-preset-react":"^6.24.1","babel-preset-stage-3":"^6.24.1","chai":"^4.1.2","electron":"^1.7.9","electron-builder":"^19.46.9","html-webpack-plugin":"^2.30.1","ignore-styles":"^5.0.1","mocha":"^4.0.1","mockery":"^2.1.0","node-noop":"^1.0.0","nyc":"^11.3.0","sinon":"^4.1.3","standard":"^10.0.3","standard-loader":"^6.0.1","ts-loader":"^3.1.1","ts-mockito":"^2.2.7","ts-node":"^3.3.0","tslint":"^5.8.0","tslint-config-standard":"^7.0.0","tslint-loader":"^3.5.3","typescript":"^2.6.2","webpack":"^3.8.1"},"scripts":{"build":"webpack --config webpack.config.js","prestart":"yarn run build","start":"electron .","test":"set TS_NODE_PROJECT=tsconfig.test.json&&mocha","pack":"electron-builder --dir","dist":"electron-builder"},"dependencies":{"dexie":"2","eve-online-esi":"^1.0.0","material-ui":"^0.20.0","material-ui-image":"^2.1.1","querystringify":"^1.0.0","react":"^16.2.0","react-dom":"^16.2.0","react-electron-web-view":"^2.0.1","request":"^2.83.0","request-promise-native":"^1.0.5","ts-jest":"^21.2.4","typescript-collections":"^1.2.5","url-parse":"^1.2.0","x2js":"^3.1.1"},"build":{"appId":"io.squareheads.eve-intel","files":"./dist/**/*","directories":{"output":"packaged"},"mac":{"category":"public.app-category.utilities"}},"peerDependencies":{}}

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZWRhNWJjODEzYzY2ZTg4ZjRlM2IiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4udHN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcImVsZWN0cm9uXCIiLCJ3ZWJwYWNrOi8vLy4vcGFja2FnZS5qc29uIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQzdENkM7O0FBRzdDLElBQXNDO0FBRXRDO0FBQ1k7QUFDSCxlQUFLO0FBQ0osZ0JBQUs7QUFDRztBQUNELHlCQUViO0FBSGdCO0FBSGEsS0FBRDtBQU9wQixlQUFTLFNBQVEsb0JBQW1CLEdBQU07QUFFcEQsVUFBaUIscUJBQW1CLFNBQWE7QUFDdkMsZUFBUSxRQUFVO0FBQ2xCLGVBQUcsR0FBUSxTQUFPLE1BQUksY0FBUTtBQUUxQztBQUFDO0FBRUUsY0FBRyxHQUFRLFNBQU8sTUFBVztBQUM3QixjQUFHLEdBQW9CLHFCQUFPLE1BQUksY0FBUTtBQUMxQyxjQUFHLEdBQXlCLDBCQUFDLFVBQVcsSUFBUTtBQUMzQyxXQUFRLFFBQ2hCO0FBQUUsRzs7Ozs7O0FDekJGLHFDOzs7Ozs7QUNBQSxrQkFBa0IsaU5BQWlOLDZuQ0FBNm5DLFlBQVksK01BQStNLGlCQUFpQixpVkFBaVYsVUFBVSx3RUFBd0Usb0JBQW9CLFFBQVEsNENBQTRDLHVCIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlZGE1YmM4MTNjNjZlODhmNGUzYiIsImltcG9ydCB7IGFwcCwgQnJvd3NlcldpbmRvdyB9IGZyb20gJ2VsZWN0cm9uJ1xyXG5cclxuZGVjbGFyZSB2YXIgX19kaXJuYW1lOiBzdHJpbmdcclxubGV0IG1haW5XaW5kb3c6IEVsZWN0cm9uLkJyb3dzZXJXaW5kb3dcclxuXHJcbmZ1bmN0aW9uIG9uUmVhZHkoKSB7XHJcbiAgbWFpbldpbmRvdyA9IG5ldyBCcm93c2VyV2luZG93KHtcclxuICAgIHdpZHRoOiA4MDAsXHJcbiAgICBoZWlnaHQ6IDYwMCxcclxuICAgIHdlYlByZWZlcmVuY2VzOiB7XHJcbiAgICAgIHdlYlNlY3VyaXR5OiBmYWxzZVxyXG4gICAgfVxyXG4gIH0pXHJcbiAgbWFpbldpbmRvdy5zZXRUaXRsZShyZXF1aXJlKCcuLi9wYWNrYWdlLmpzb24nKS5uYW1lKVxyXG5cclxuICBjb25zdCBmaWxlTmFtZSA9IGBmaWxlOi8vJHtfX2Rpcm5hbWV9L2luZGV4Lmh0bWxgXHJcbiAgbWFpbldpbmRvdy5sb2FkVVJMKGZpbGVOYW1lKVxyXG4gIG1haW5XaW5kb3cub24oJ2Nsb3NlJywgKCkgPT4gYXBwLnF1aXQoKSlcclxuICAvLyBtYWluV2luZG93LndlYkNvbnRlbnRzLm9wZW5EZXZUb29scygpXHJcbn1cclxuXHJcbmFwcC5vbigncmVhZHknLCAoKSA9PiBvblJlYWR5KCkpXHJcbmFwcC5vbignd2luZG93LWFsbC1jbG9zZWQnLCAoKSA9PiBhcHAucXVpdCgpKVxyXG5hcHAub24oJ2Jyb3dzZXItd2luZG93LWNyZWF0ZWQnLGZ1bmN0aW9uKF9lLCB3aW5kb3cpIHtcclxuICB3aW5kb3cuc2V0TWVudShudWxsKVxyXG59KVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFpbi50c3giLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJlbGVjdHJvblwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImVsZWN0cm9uXCJcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7XCJuYW1lXCI6XCJpbnRlbFwiLFwidmVyc2lvblwiOlwiMS4wLjBcIixcImRlc2NyaXB0aW9uXCI6XCJFdmUgT25saW5lIExvY2FsIEludGVsIFRvb2xcIixcIm1haW5cIjpcImRpc3QvbWFpbi5qc1wiLFwicmVwb3NpdG9yeVwiOlwiZ2l0QGdpdGh1Yi5jb206U3F1YXJlaGVhZHMvaW50ZWwuZ2l0XCIsXCJhdXRob3JcIjpcIk93ZW4gV29ybGV5XCIsXCJsaWNlbnNlXCI6XCJNSVRcIixcImRldkRlcGVuZGVuY2llc1wiOntcIkB0eXBlcy9jaGFpXCI6XCJeNC4wLjhcIixcIkB0eXBlcy9lbGVjdHJvblwiOlwiXjEuNi4xMFwiLFwiQHR5cGVzL21hdGVyaWFsLXVpXCI6XCJeMC4xOC41XCIsXCJAdHlwZXMvbW9jaGFcIjpcIl4yLjIuNDRcIixcIkB0eXBlcy9tb2NrZXJ5XCI6XCJeMS40LjI5XCIsXCJAdHlwZXMvbm9kZVwiOlwiXjguMC41M1wiLFwiQHR5cGVzL3JlYWN0XCI6XCJeMTYuMC4yNVwiLFwiQHR5cGVzL3JlYWN0LWRvbVwiOlwiXjE2LjAuM1wiLFwiQHR5cGVzL3JlcXVlc3RcIjpcIl4yLjAuOFwiLFwiQHR5cGVzL3JlcXVlc3QtcHJvbWlzZS1uYXRpdmVcIjpcIl4xLjAuMTBcIixcIkB0eXBlcy9zaW5vblwiOlwiXjQuMS4wXCIsXCJAdHlwZXMvdXJsLXBhcnNlXCI6XCJeMS4xLjBcIixcIkB0eXBlcy94MmpzXCI6XCJeMy4xLjBcIixcImJhYmVsLWNvcmVcIjpcIl42LjI2LjBcIixcImJhYmVsLWplc3RcIjpcIl4yMS4yLjBcIixcImJhYmVsLWxvYWRlclwiOlwiXjcuMS4yXCIsXCJiYWJlbC1wbHVnaW4tYWRkLW1vZHVsZS1leHBvcnRzXCI6XCJeMC4yLjFcIixcImJhYmVsLXBsdWdpbi10cmFuc2Zvcm0tcnVudGltZVwiOlwiXjYuMC4wXCIsXCJiYWJlbC1wcmVzZXQtZW52XCI6XCJeMS42LjFcIixcImJhYmVsLXByZXNldC1lczIwMTVcIjpcIl42LjI0LjFcIixcImJhYmVsLXByZXNldC1lczIwMTUtbm9kZVwiOlwiXjYuMS4xXCIsXCJiYWJlbC1wcmVzZXQtZXMyMDE1LW5vZGU1XCI6XCJeMS4yLjBcIixcImJhYmVsLXByZXNldC1yZWFjdFwiOlwiXjYuMjQuMVwiLFwiYmFiZWwtcHJlc2V0LXN0YWdlLTNcIjpcIl42LjI0LjFcIixcImNoYWlcIjpcIl40LjEuMlwiLFwiZWxlY3Ryb25cIjpcIl4xLjcuOVwiLFwiZWxlY3Ryb24tYnVpbGRlclwiOlwiXjE5LjQ2LjlcIixcImh0bWwtd2VicGFjay1wbHVnaW5cIjpcIl4yLjMwLjFcIixcImlnbm9yZS1zdHlsZXNcIjpcIl41LjAuMVwiLFwibW9jaGFcIjpcIl40LjAuMVwiLFwibW9ja2VyeVwiOlwiXjIuMS4wXCIsXCJub2RlLW5vb3BcIjpcIl4xLjAuMFwiLFwibnljXCI6XCJeMTEuMy4wXCIsXCJzaW5vblwiOlwiXjQuMS4zXCIsXCJzdGFuZGFyZFwiOlwiXjEwLjAuM1wiLFwic3RhbmRhcmQtbG9hZGVyXCI6XCJeNi4wLjFcIixcInRzLWxvYWRlclwiOlwiXjMuMS4xXCIsXCJ0cy1tb2NraXRvXCI6XCJeMi4yLjdcIixcInRzLW5vZGVcIjpcIl4zLjMuMFwiLFwidHNsaW50XCI6XCJeNS44LjBcIixcInRzbGludC1jb25maWctc3RhbmRhcmRcIjpcIl43LjAuMFwiLFwidHNsaW50LWxvYWRlclwiOlwiXjMuNS4zXCIsXCJ0eXBlc2NyaXB0XCI6XCJeMi42LjJcIixcIndlYnBhY2tcIjpcIl4zLjguMVwifSxcInNjcmlwdHNcIjp7XCJidWlsZFwiOlwid2VicGFjayAtLWNvbmZpZyB3ZWJwYWNrLmNvbmZpZy5qc1wiLFwicHJlc3RhcnRcIjpcInlhcm4gcnVuIGJ1aWxkXCIsXCJzdGFydFwiOlwiZWxlY3Ryb24gLlwiLFwidGVzdFwiOlwic2V0IFRTX05PREVfUFJPSkVDVD10c2NvbmZpZy50ZXN0Lmpzb24mJm1vY2hhXCIsXCJwYWNrXCI6XCJlbGVjdHJvbi1idWlsZGVyIC0tZGlyXCIsXCJkaXN0XCI6XCJlbGVjdHJvbi1idWlsZGVyXCJ9LFwiZGVwZW5kZW5jaWVzXCI6e1wiZGV4aWVcIjpcIjJcIixcImV2ZS1vbmxpbmUtZXNpXCI6XCJeMS4wLjBcIixcIm1hdGVyaWFsLXVpXCI6XCJeMC4yMC4wXCIsXCJtYXRlcmlhbC11aS1pbWFnZVwiOlwiXjIuMS4xXCIsXCJxdWVyeXN0cmluZ2lmeVwiOlwiXjEuMC4wXCIsXCJyZWFjdFwiOlwiXjE2LjIuMFwiLFwicmVhY3QtZG9tXCI6XCJeMTYuMi4wXCIsXCJyZWFjdC1lbGVjdHJvbi13ZWItdmlld1wiOlwiXjIuMC4xXCIsXCJyZXF1ZXN0XCI6XCJeMi44My4wXCIsXCJyZXF1ZXN0LXByb21pc2UtbmF0aXZlXCI6XCJeMS4wLjVcIixcInRzLWplc3RcIjpcIl4yMS4yLjRcIixcInR5cGVzY3JpcHQtY29sbGVjdGlvbnNcIjpcIl4xLjIuNVwiLFwidXJsLXBhcnNlXCI6XCJeMS4yLjBcIixcIngyanNcIjpcIl4zLjEuMVwifSxcImJ1aWxkXCI6e1wiYXBwSWRcIjpcImlvLnNxdWFyZWhlYWRzLmV2ZS1pbnRlbFwiLFwiZmlsZXNcIjpcIi4vZGlzdC8qKi8qXCIsXCJkaXJlY3Rvcmllc1wiOntcIm91dHB1dFwiOlwicGFja2FnZWRcIn0sXCJtYWNcIjp7XCJjYXRlZ29yeVwiOlwicHVibGljLmFwcC1jYXRlZ29yeS51dGlsaXRpZXNcIn19LFwicGVlckRlcGVuZGVuY2llc1wiOnt9fVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcGFja2FnZS5qc29uXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=