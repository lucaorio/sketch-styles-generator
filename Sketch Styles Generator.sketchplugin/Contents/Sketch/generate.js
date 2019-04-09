var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

// sync layer style with shared style
exports["default"] = function (sharedStyle, layer) {
  layer.sharedStyle = sharedStyle;
  layer.style.syncWithSharedStyle(sharedStyle);
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

// check if a layer is a shape, or a text one
exports['default'] = function (layer) {
  return layer.type === 'ShapePath';
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sketch = __webpack_require__(3);

var _sketch2 = _interopRequireDefault(_sketch);

var _createStyle = __webpack_require__(4);

var _createStyle2 = _interopRequireDefault(_createStyle);

var _syncLayerToShared = __webpack_require__(0);

var _syncLayerToShared2 = _interopRequireDefault(_syncLayerToShared);

var _syncSharedToLayer = __webpack_require__(5);

var _syncSharedToLayer2 = _interopRequireDefault(_syncSharedToLayer);

var _renameSharedStyle = __webpack_require__(6);

var _renameSharedStyle2 = _interopRequireDefault(_renameSharedStyle);

var _cleanArray = __webpack_require__(7);

var _cleanArray2 = _interopRequireDefault(_cleanArray);

var _isShape = __webpack_require__(1);

var _isShape2 = _interopRequireDefault(_isShape);

var _isUnsynced = __webpack_require__(9);

var _isUnsynced2 = _interopRequireDefault(_isUnsynced);

var _getSharedStyleByID = __webpack_require__(10);

var _getSharedStyleByID2 = _interopRequireDefault(_getSharedStyleByID);

var _getSharedStyleByName = __webpack_require__(11);

var _getSharedStyleByName2 = _interopRequireDefault(_getSharedStyleByName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// main constants definition, and selection check
var generate = function generate() {
  var document = _sketch2['default'].getSelectedDocument();
  var selection = document.selectedLayers;
  var layers = (0, _cleanArray2['default'])(selection.layers);

  var counter = {
    created: 0,
    applied: 0,
    renamed: 0,
    synced: 0,
    syncedrenamed: 0
  };

  if (selection.isEmpty || !layers.length) {
    _sketch2['default'].UI.message('No applicable layer(s) selected!');
  } else {
    var layerStyles = document.sharedLayerStyles;
    var textStyles = document.sharedTextStyles;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = layers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var layer = _step.value;

        var sharedStyles = (0, _isShape2['default'])(layer) ? layerStyles : textStyles;
        var styled = (0, _getSharedStyleByID2['default'])(sharedStyles, layer.sharedStyleId);
        var matched = (0, _getSharedStyleByName2['default'])(sharedStyles, layer.name);
        var unsynced = (0, _isUnsynced2['default'])(sharedStyles, styled, layer);

        // no shared style / no sync / no matching name
        if (!styled && !unsynced && !matched) {
          (0, _createStyle2['default'])(sharedStyles, layer);
          counter.created++;
        }

        // no shared style / no sync / yes matching name
        else if (!styled && !unsynced && matched) {
            (0, _syncLayerToShared2['default'])(matched, layer);
            counter.applied++;
          }

          // yes shared style / yes sync / no matching name
          else if (styled && !unsynced && !matched) {
              (0, _renameSharedStyle2['default'])(styled, layer);
              counter.renamed++;
            }

            // yes shared style / no sync / yes matching name
            else if (styled && unsynced && matched) {
                (0, _syncSharedToLayer2['default'])(unsynced, layer);
                counter.synced++;
              }

              // yes shared style / no sync / no matching name
              else if (styled && unsynced && !matched) {
                  (0, _syncSharedToLayer2['default'])(unsynced, layer);
                  (0, _renameSharedStyle2['default'])(unsynced, layer);
                  counter.syncedrenamed++;
                }
      }

      // log the counter
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    _sketch2['default'].UI.alert('Shared Styles Recap', '\n      - Created: ' + String(counter.created) + '\n\n      - Applied: ' + String(counter.applied) + '\n\n      - Renamed: ' + String(counter.renamed) + '\n\n      - Synced: ' + String(counter.synced) + '\n\n      - Renamed & Synced: ' + String(counter.syncedrenamed) + '\n      ');
  }
};

exports['default'] = generate;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _syncLayerToShared = __webpack_require__(0);

var _syncLayerToShared2 = _interopRequireDefault(_syncLayerToShared);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } // create new (text/layer) shared style


exports['default'] = function (sharedStyles, layer) {
  sharedStyles.push({ name: layer.name, style: layer.style });
  var sharedStyle = [].concat(_toConsumableArray(sharedStyles)).pop();
  (0, _syncLayerToShared2['default'])(sharedStyle, layer);
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

// sync shared style with layer style, and update all instances
exports["default"] = function (sharedStyle, layer) {
  sharedStyle.style = layer.style;
  var layers = sharedStyle.getAllInstancesLayers();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = layers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _layer = _step.value;
      _layer.style.syncWithSharedStyle(sharedStyle);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"]) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

// sync shared style name with layer name
exports["default"] = function (sharedStyle, layer) {
  return sharedStyle.name = layer.name;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isShape = __webpack_require__(1);

var _isShape2 = _interopRequireDefault(_isShape);

var _isText = __webpack_require__(8);

var _isText2 = _interopRequireDefault(_isText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// return an array with just shape, or text layers
exports['default'] = function (layers) {
  return layers.filter(function (layer) {
    return (0, _isShape2['default'])(layer) || (0, _isText2['default'])(layer);
  });
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

// check if a layer is a text
exports['default'] = function (layer) {
  return layer.type === 'Text';
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

// check if a layer is out of sync with the main shared style (and return it)
exports["default"] = function (sharedStyles, styled, layer) {
  var unsynced = styled && layer.style.isOutOfSyncWithSharedStyle(styled);
  return unsynced ? styled : false;
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

// get a shared style by specifying its ID
exports["default"] = function (sharedStyles, id) {
  return sharedStyles.filter(function (style) {
    return style.id === id;
  })[0];
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

// get a shared style by specifying its name
exports["default"] = function (sharedStyles, name) {
  return sharedStyles.filter(function (style) {
    return style.name === name;
  })[0];
};

/***/ })
/******/ ]);
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')
