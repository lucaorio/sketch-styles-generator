var that = this
function __skpm_run(key, context) {
  that.context = context

  var exports = /******/ (function(modules) {
    // webpackBootstrap
    /******/ // The module cache
    /******/ var installedModules = {} // The require function
    /******/
    /******/ /******/ function __webpack_require__(moduleId) {
      /******/
      /******/ // Check if module is in cache
      /******/ if (installedModules[moduleId]) {
        /******/ return installedModules[moduleId].exports
        /******/
      } // Create a new module (and put it into the cache)
      /******/ /******/ var module = (installedModules[moduleId] = {
        /******/ i: moduleId,
        /******/ l: false,
        /******/ exports: {},
        /******/
      }) // Execute the module function
      /******/
      /******/ /******/ modules[moduleId].call(
        module.exports,
        module,
        module.exports,
        __webpack_require__
      ) // Flag the module as loaded
      /******/
      /******/ /******/ module.l = true // Return the exports of the module
      /******/
      /******/ /******/ return module.exports
      /******/
    } // expose the modules object (__webpack_modules__)
    /******/
    /******/
    /******/ /******/ __webpack_require__.m = modules // expose the module cache
    /******/
    /******/ /******/ __webpack_require__.c = installedModules // define getter function for harmony exports
    /******/
    /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
      /******/ if (!__webpack_require__.o(exports, name)) {
        /******/ Object.defineProperty(exports, name, {
          /******/ configurable: false,
          /******/ enumerable: true,
          /******/ get: getter,
          /******/
        })
        /******/
      }
      /******/
    } // getDefaultExport function for compatibility with non-harmony modules
    /******/
    /******/ /******/ __webpack_require__.n = function(module) {
      /******/ var getter =
        module && module.__esModule
          ? /******/ function getDefault() {
              return module['default']
            }
          : /******/ function getModuleExports() {
              return module
            }
      /******/ __webpack_require__.d(getter, 'a', getter)
      /******/ return getter
      /******/
    } // Object.prototype.hasOwnProperty.call
    /******/
    /******/ /******/ __webpack_require__.o = function(object, property) {
      return Object.prototype.hasOwnProperty.call(object, property)
    } // __webpack_public_path__
    /******/
    /******/ /******/ __webpack_require__.p = '' // Load entry module and return exports
    /******/
    /******/ /******/ return __webpack_require__((__webpack_require__.s = 0))
    /******/
  })(
    /************************************************************************/
    /******/ [
      /* 0 */
      /***/ function(module, exports, __webpack_require__) {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true,
        })
        // main
        var generate = function generate(ctx) {
          var doc = ctx.document
          var sel = ctx.api().selectedDocument.selectedLayers
          var lyrStyles = doc.documentData().layerStyles()
          var txtStyles = doc.documentData().layerTextStyles()

          var count = {
            created: 0,
            updated: 0,
          }

          if (sel.isEmpty) {
            exit(doc, 'No layer(s) selected!')
          } else {
            iterate(sel, 'isShape', lyrStyles, count)
            iterate(sel, 'isText', txtStyles, count)
            exit(
              doc,
              'Styles Created: ' +
                count.created +
                ' / Updated: ' +
                count.updated
            )
          }
        }

        // iterate on selected layers
        var iterate = function iterate(sel, filter, styles, count) {
          sel.iterateWithFilter(filter, function(layer) {
            var name = layer.sketchObject.name()
            var style = layer.sketchObject.style()
            var cleanObj = existing(styles)
            var exist = compare(name, cleanObj)

            if (exist) update(style, cleanObj[name], styles, count)
            else create(name, style, styles, count)
          })
        }

        // creates a decent object for existing styles
        var existing = function existing(styles) {
          var cleanObj = {}

          for (var i = 0; i < styles.numberOfSharedStyles(); i++) {
            var entry = styles.objects().objectAtIndex(i)
            cleanObj[entry.name()] = entry
          }

          return cleanObj
        }

        // compare layer name to styles object
        var compare = function compare(name, styles) {
          return Object.keys(styles).find(function(x) {
            return x == name
          })
        }

        // create new layer style
        var create = function create(name, style, styles, count) {
          if (styles.addSharedStyleWithName_firstInstance) {
            styles.addSharedStyleWithName_firstInstance(name, style)
          } else {
            var s = MSSharedStyle.alloc().initWithName_firstInstance(
              name,
              style
            )
            styles.addSharedObject(s)
          }
          count.created++
        }

        // update existing layer style, syncronize the instances
        var update = function update(style, pointer, styles, count) {
          if (styles.updateValueOfSharedObject_byCopyingInstance) {
            styles.updateValueOfSharedObject_byCopyingInstance(pointer, style)
            styles.synchroniseInstancesOfSharedObject_withInstance(
              pointer,
              style
            )
          } else {
            pointer.updateToMatch(style)
            pointer.resetReferencingInstances()
          }
          count.updated++
        }

        // exit and print message
        var exit = function exit(doc, msg) {
          doc.showMessage(msg)
          doc.reloadInspector()
        }

        exports['default'] = generate

        /***/
      },
      /******/
    ]
  )
  if (key === 'default' && typeof exports === 'function') {
    exports(context)
  } else {
    exports[key](context)
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')
