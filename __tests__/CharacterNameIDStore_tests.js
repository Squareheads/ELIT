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


var _CharacterNameIDStore = __webpack_require__(1);

class MockDatabase {
    transaction(type, characters, _func) {
        this.capturedType = type;
        this.capturedCharacters = characters;
        const thing = {
            catch: function () {
                console.log('do nothing');
            }
        };
        return thing;
    }
} /// <reference types="jest" />

const database = new MockDatabase();
const store = new _CharacterNameIDStore.CharacterNameIDStore(database);
console.log(store);
describe('ChracterNameIDStore', () => {
    test('calling store starts transaction', () => {
        store.store([]);
        expect(database.capturedType).toBe('rw');
    });
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class CharacterNameIDStore {
    constructor(database) {
        this.database = database;
    }
    store(characters) {
        this.database.transaction('rw', this.database.characters, () => __awaiter(this, void 0, void 0, function* () {
            let storable = { id: 0, name: 'name' };
            try {
                yield this.database.characters.add(storable);
            } catch (e) {
                console.log('error storing character name ids ' + e);
            }
        })).catch(reason => {
            console.log('error storing character name ids: ' + reason);
        });
    }
    getCharacters(IDs) {
        console.log('get characters for IDs ' + IDs);
        return new Promise(resolve => {
            resolve([]);
        });
    }
}
exports.CharacterNameIDStore = CharacterNameIDStore;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODMzNGVmNzkxMThiYjM3NWQ1Y2YiLCJ3ZWJwYWNrOi8vLy4vdGVzdHMvZ3VpL0NoYXJhY3Rlck5hbWVJRFN0b3JlX3Rlc3RzLnRzIiwid2VicGFjazovLy8uL3NyYy9DaGFyYWN0ZXJOYW1lSURTdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUM1RHFFOztBQUVyRTtBQUlhLGdCQUFhLE1BQWlCLFlBQW9CO0FBQ3ZELGFBQWEsZUFBTztBQUNwQixhQUFtQixxQkFBYTtBQUVwQyxjQUFXO0FBQ0osbUJBQUU7QUFBb0Isd0JBQUksSUFBZTtBQUMvQztBQUZhO0FBSVIsZUFDUjtBQUNEO0VBakI2Qjs7QUFtQjlCLE1BQWMsV0FBRyxJQUFrQjtBQUNuQyxNQUFXLFFBQTJCLCtDQUFVO0FBRXpDLFFBQUksSUFBTztBQUNWLFNBQXNCLHVCQUFPO0FBQy9CLFNBQW1DLG9DQUFPO0FBQ3ZDLGNBQU0sTUFBSTtBQUNULGVBQVMsU0FBYyxjQUFLLEtBRXBDO0FBQ0Y7QUFBRSxHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVCSTs7QUFJSixnQkFBOEM7QUFDeEMsYUFBUyxXQUNmO0FBQUM7QUFFSSxVQUF1QztBQUNuQyxnQkFBSSxJQUFvQixzQkFBYztBQUN6QyxhQUFTLFNBQVksWUFBSyxNQUFNLEtBQVMsU0FBVyxZQUFZO0FBQ2xFLGdCQUFZLFdBQTZCLEVBQUksSUFBRyxHQUFNLE1BQVU7QUFDaEUsZ0JBQUs7QUFDSCxzQkFBVSxLQUFTLFNBQVcsV0FBSSxJQUNwQztBQUFDLGNBQU8sT0FBRyxHQUFFO0FBQ0osd0JBQUksSUFBb0Msc0NBQ2pEO0FBQ0Y7QUFBRSxZQUFNLE1BQWlCLE1BQWhCO0FBQ0Esb0JBQUksSUFBcUMsdUNBQ2xEO0FBQ0Y7QUFBQztBQUVZLGtCQUFjO0FBQ2xCLGdCQUFJLElBQTBCLDRCQUFPO0FBQ3RDLG1CQUFZLFFBQW1DLE9BQVo7QUFDaEMsb0JBQ1Q7QUFDRixTQUhTO0FBSVYiLCJmaWxlIjoiQ2hhcmFjdGVyTmFtZUlEU3RvcmVfdGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA4MzM0ZWY3OTExOGJiMzc1ZDVjZiIsIi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwiamVzdFwiIC8+XG5pbXBvcnQgeyBDaGFyYWN0ZXJOYW1lSURTdG9yZSB9IGZyb20gJy4uLy4uL3NyYy9DaGFyYWN0ZXJOYW1lSURTdG9yZSdcblxuY2xhc3MgTW9ja0RhdGFiYXNlIGltcGxlbWVudHMgSUNoYXJhY3Rlck5hbWVJRERhdGFiYXNlIHtcbiAgY2FwdHVyZWRUeXBlOiBzdHJpbmdcbiAgY2FwdHVyZWRDaGFyYWN0ZXJzOiBhbnlcbiAgY2hhcmFjdGVyczogYW55XG4gIHRyYW5zYWN0aW9uKHR5cGU6IHN0cmluZywgY2hhcmFjdGVyczogYW55LCBfZnVuYzogKCgpID0+IGFueSkpIHtcbiAgICB0aGlzLmNhcHR1cmVkVHlwZSA9IHR5cGVcbiAgICB0aGlzLmNhcHR1cmVkQ2hhcmFjdGVycyA9IGNoYXJhY3RlcnNcblxuICAgIGNvbnN0IHRoaW5nID0ge1xuICAgICAgY2F0Y2g6IGZ1bmN0aW9uKCkgeyBjb25zb2xlLmxvZygnZG8gbm90aGluZycpIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpbmdcbiAgfVxufVxuXG5jb25zdCBkYXRhYmFzZSA9IG5ldyBNb2NrRGF0YWJhc2UoKVxuY29uc3Qgc3RvcmUgPSBuZXcgQ2hhcmFjdGVyTmFtZUlEU3RvcmUoZGF0YWJhc2UpXG5cbmNvbnNvbGUubG9nKHN0b3JlKVxuZGVzY3JpYmUoJ0NocmFjdGVyTmFtZUlEU3RvcmUnLCAoKSA9PiB7XG4gIHRlc3QoJ2NhbGxpbmcgc3RvcmUgc3RhcnRzIHRyYW5zYWN0aW9uJywgKCkgPT4ge1xuICAgIHN0b3JlLnN0b3JlKFtdKVxuICAgIGV4cGVjdChkYXRhYmFzZS5jYXB0dXJlZFR5cGUpLnRvQmUoJ3J3JylcblxuICB9KVxufSlcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyPz9yZWYtLTIhLi90ZXN0cy9ndWkvQ2hhcmFjdGVyTmFtZUlEU3RvcmVfdGVzdHMudHMiLCJcbmV4cG9ydCBjbGFzcyBDaGFyYWN0ZXJOYW1lSURTdG9yZSBpbXBsZW1lbnRzIElDaGFyYWN0ZXJOYW1lSURTdG9yZSB7XG5cbiAgZGF0YWJhc2U6IElDaGFyYWN0ZXJOYW1lSUREYXRhYmFzZVxuXG4gIGNvbnN0cnVjdG9yKGRhdGFiYXNlOiBJQ2hhcmFjdGVyTmFtZUlERGF0YWJhc2UpIHtcbiAgICB0aGlzLmRhdGFiYXNlID0gZGF0YWJhc2VcbiAgfVxuXG4gIHN0b3JlKGNoYXJhY3RlcnM6IElDaGFyYWN0ZXJOYW1lSURTdG9yYWJsZVtdKSB7XG4gICAgY29uc29sZS5sb2coJ3N0b3JlIGNoYXJhY3RlcnMgJyArIGNoYXJhY3RlcnMpXG4gICAgdGhpcy5kYXRhYmFzZS50cmFuc2FjdGlvbigncncnLCB0aGlzLmRhdGFiYXNlLmNoYXJhY3RlcnMsIGFzeW5jKCkgPT4ge1xuICAgICAgbGV0IHN0b3JhYmxlOiBJQ2hhcmFjdGVyTmFtZUlEU3RvcmFibGUgPSB7IGlkOiAwLCBuYW1lOiAnbmFtZScgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgdGhpcy5kYXRhYmFzZS5jaGFyYWN0ZXJzLmFkZChzdG9yYWJsZSlcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yIHN0b3JpbmcgY2hhcmFjdGVyIG5hbWUgaWRzICcgKyBlKVxuICAgICAgfVxuICAgIH0pLmNhdGNoKChyZWFzb246IGFueSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ2Vycm9yIHN0b3JpbmcgY2hhcmFjdGVyIG5hbWUgaWRzOiAnICsgcmVhc29uKVxuICAgIH0pXG4gIH1cblxuICBnZXRDaGFyYWN0ZXJzKElEczogbnVtYmVyW10pOiBQcm9taXNlIDwgSUNoYXJhY3Rlck5hbWVJRFN0b3JhYmxlW10gPiB7XG4gICAgY29uc29sZS5sb2coJ2dldCBjaGFyYWN0ZXJzIGZvciBJRHMgJyArIElEcylcbiAgICByZXR1cm4gbmV3IFByb21pc2U8SVJlc29sdmVkQ2hhcmFjdGVyW10+KChyZXNvbHZlKSA9PiB7XG4gICAgICByZXNvbHZlKFtdKVxuICAgIH0pXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyPz9yZWYtLTIhLi9zcmMvQ2hhcmFjdGVyTmFtZUlEU3RvcmUudHMiXSwic291cmNlUm9vdCI6IiJ9