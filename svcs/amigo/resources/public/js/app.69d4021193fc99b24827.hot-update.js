webpackHotUpdate("app",{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Scoreboard.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Scoreboard.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom.iterable */ \"./node_modules/core-js/modules/web.dom.iterable.js\");\n/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es6.regexp.split */ \"./node_modules/core-js/modules/es6.regexp.split.js\");\n/* harmony import */ var core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es6.regexp.replace */ \"./node_modules/core-js/modules/es6.regexp.replace.js\");\n/* harmony import */ var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _TeamRow_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TeamRow.vue */ \"./src/components/TeamRow.vue\");\n\n\n\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n/* eslint-disable */\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'scoreboard',\n  data: function data() {\n    return {\n      teams: [],\n      challenges: []\n    };\n  },\n  created: function created() {\n    var url = new URL('/scores', window.location.href);\n    url.protocol = url.protocol.replace('http', 'ws');\n    this.connectToWS(url.href);\n  },\n  methods: {\n    connectToWS: function connectToWS(url) {\n      var self = this;\n      ws = new WebSocket(url);\n      ws.onmessage = self.receiveMsg;\n\n      ws.onclose = function () {\n        setTimeout(function () {\n          self.connectToWS(url);\n        }, 3000);\n      };\n    },\n    receiveMsg: function receiveMsg(evt) {\n      var messages = evt.data.split('\\n');\n\n      for (var i = 0; i < messages.length; i++) {\n        var msg = messages[i];\n        var json = JSON.parse(msg);\n\n        switch (json.msg) {\n          case \"challenges\":\n            self.challenges = json.values;\n            break;\n\n          case \"teams\":\n            self.teams = json.values;\n            console.log(self.teams);\n            break;\n        }\n      }\n    }\n  },\n  components: {\n    TeamRow: _TeamRow_vue__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n  }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvY2FjaGUtbG9hZGVyL2Rpc3QvY2pzLmpzPyEuL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4vbm9kZV9tb2R1bGVzL2NhY2hlLWxvYWRlci9kaXN0L2Nqcy5qcz8hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/IS4vc3JjL2NvbXBvbmVudHMvU2NvcmVib2FyZC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL1Njb3JlYm9hcmQudnVlP2U3MWEiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuPHRhYmxlIGNsYXNzPVwidGFibGUgY2VudGVyYm94IGlzLXN0cmlwZWRcIj5cbiAgPHRoZWFkPlxuICAgIDx0cj5cbiAgICAgIDx0aD48L3RoPlxuICAgICAgPHRoPlRlYW08L3RoPlxuICAgICAgPHRoIHYtZm9yPVwiY2hhbCBpbiBjaGFsbGVuZ2VzXCIgdi1iaW5kOmtleT1cImNoYWwudGFnXCI+PGFiYnIgOnRpdGxlPVwiY2hhbC5uYW1lXCI+e3sgY2hhbC50YWcgfX08L2FiYnI+PC90aD5cbiAgICA8L3RyPlxuICA8L3RoZWFkPlxuICA8dGJvZHk+XG4gICAgPHRlYW0tcm93IHYtZm9yPVwiKHRlYW0sIGluZGV4KSBpbiB0ZWFtc1wiIHYtYmluZDprZXk9XCJ0ZWFtLmlkXCIgOm5hbWU9XCJ0ZWFtLm5hbWVcIiA6Y29tcGxldGlvbnM9XCJ0ZWFtLmNvbXBsZXRpb25zXCIgOnBvcz1cImluZGV4ICsgMVwiPjwvdGVhbS1yb3c+XG4gIDwvdGJvZHk+XG48L3RhYmxlPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBUZWFtUm93IGZyb20gJy4vVGVhbVJvdy52dWUnXG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzY29yZWJvYXJkJyxcbiAgZGF0YTogKCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICB0ZWFtczogW10sXG4gICAgICBjaGFsbGVuZ2VzOiBbXSxcbiAgICB9XG4gIH0sXG4gIGNyZWF0ZWQ6IGZ1bmN0aW9uKCkge1xuICAgIHZhciB1cmwgPSBuZXcgVVJMKCcvc2NvcmVzJywgd2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgIHVybC5wcm90b2NvbCA9IHVybC5wcm90b2NvbC5yZXBsYWNlKCdodHRwJywgJ3dzJyk7XG4gICAgdGhpcy5jb25uZWN0VG9XUyh1cmwuaHJlZik7XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBjb25uZWN0VG9XUzogZnVuY3Rpb24odXJsKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICB3cyA9IG5ldyBXZWJTb2NrZXQodXJsKTtcbiAgICAgIHdzLm9ubWVzc2FnZSA9IHNlbGYucmVjZWl2ZU1zZ1xuICAgICAgd3Mub25jbG9zZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtzZWxmLmNvbm5lY3RUb1dTKHVybCl9LCAzMDAwKTtcbiAgICAgIH07XG4gICAgfSxcbiAgICByZWNlaXZlTXNnOiBmdW5jdGlvbihldnQpIHtcblx0dmFyIG1lc3NhZ2VzID0gZXZ0LmRhdGEuc3BsaXQoJ1xcbicpO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IG1lc3NhZ2VzLmxlbmd0aDsgaSsrKSB7XG5cdCAgY29uc3QgbXNnID0gbWVzc2FnZXNbaV07XG5cdCAgY29uc3QganNvbiA9IEpTT04ucGFyc2UobXNnKTtcblx0ICBzd2l0Y2ggKGpzb24ubXNnKSB7XG5cdCAgY2FzZSBcImNoYWxsZW5nZXNcIjpcblx0ICAgIHNlbGYuY2hhbGxlbmdlcyA9IGpzb24udmFsdWVzO1xuXHQgICAgYnJlYWs7XG5cdCAgY2FzZSBcInRlYW1zXCI6XG5cdCAgICBzZWxmLnRlYW1zID0ganNvbi52YWx1ZXM7XG5cdCAgICBjb25zb2xlLmxvZyhzZWxmLnRlYW1zKTtcblx0ICAgIGJyZWFrO1xuXHQgIH1cblx0fVxuICAgIH0sXG4gIH0sXG4gIGNvbXBvbmVudHM6IHtcbiAgICBUZWFtUm93LFxuICB9XG59XG48L3NjcmlwdD5cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBU0E7QUFDQTtBQXhCQTtBQTBCQTtBQUNBO0FBREE7QUF2Q0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Scoreboard.vue?vue&type=script&lang=js&\n");

/***/ })

})