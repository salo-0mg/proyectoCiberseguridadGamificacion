"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setUserSpamScore = exports.setUserPhishingScore = exports.getUserInfo = exports.getAdminInfo = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _User = _interopRequireDefault(require("../models/User"));
var _Score = _interopRequireDefault(require("../models/Score"));
var _config = _interopRequireDefault(require("../config"));
var _Role = _interopRequireDefault(require("../models/Role"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var getUserInfo = exports.getUserInfo = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var token, decoded, userId, user, userScores, maxScoreSpam, maxScorePhishing, avgScoreSpam, avgScorePhishing, scoreCountSpam, scoreCountPhishing, scoresSpam, scoresPhishing, scoreSpam, scorePhishing, sumSpam, sumPhishing;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          token = req.headers["x-access-token"];
          if (token) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return", res.status(403).json({
            message: "No se proporcionó el token"
          }));
        case 4:
          decoded = _jsonwebtoken["default"].verify(token, _config["default"].SECRET);
          userId = decoded.id; // Obtener la información básica del usuario
          _context.next = 8;
          return _User["default"].findById(userId, 'name lastname email birthDate');
        case 8:
          user = _context.sent;
          if (user) {
            _context.next = 11;
            break;
          }
          return _context.abrupt("return", res.status(404).json({
            message: "Usuario no encontrado"
          }));
        case 11:
          _context.next = 13;
          return _Score["default"].findOne({
            userId: userId
          });
        case 13:
          userScores = _context.sent;
          maxScoreSpam = 0;
          maxScorePhishing = 0;
          if (userScores) {
            maxScoreSpam = Math.max.apply(Math, _toConsumableArray(userScores.scoreSpam));
            maxScorePhishing = Math.max.apply(Math, _toConsumableArray(userScores.scorePhishing));
          }

          // Obtener el puntaje promedio de Spam y Phishing del usuario
          avgScoreSpam = 0;
          avgScorePhishing = 0;
          scoreCountSpam = 0;
          scoreCountPhishing = 0;
          scoresSpam = userScores.scoreSpam;
          scoresPhishing = userScores.scorePhishing;
          if (userScores) {
            scoreSpam = userScores.scoreSpam, scorePhishing = userScores.scorePhishing;
            sumSpam = scoreSpam.reduce(function (acc, val) {
              return acc + val;
            }, 0);
            sumPhishing = scorePhishing.reduce(function (acc, val) {
              return acc + val;
            }, 0);
            scoreCountSpam = scoreSpam.length;
            scoreCountPhishing = scorePhishing.length;
            avgScoreSpam = (scoreSpam.length > 0 ? sumSpam / scoreSpam.length : 0).toFixed(2);
            avgScorePhishing = (scorePhishing.length > 0 ? sumPhishing / scorePhishing.length : 0).toFixed(2);
          }
          res.status(200).json({
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            birthDate: user.birthDate,
            scoresSpam: scoresSpam,
            scoresPhishing: scoresPhishing,
            maxScoreSpam: maxScoreSpam,
            maxScorePhishing: maxScorePhishing,
            avgScoreSpam: avgScoreSpam,
            avgScorePhishing: avgScorePhishing,
            scoreCountSpam: scoreCountSpam,
            scoreCountPhishing: scoreCountPhishing
          });
          _context.next = 31;
          break;
        case 27:
          _context.prev = 27;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).json({
            message: "Error al obtener la información del usuario"
          });
        case 31:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 27]]);
  }));
  return function getUserInfo(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var setUserSpamScore = exports.setUserSpamScore = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var token, decoded, userId, score, existingScore, newScore;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          token = req.headers["x-access-token"];
          if (token) {
            _context2.next = 4;
            break;
          }
          return _context2.abrupt("return", res.status(403).json({
            message: "No se proporcionó el token"
          }));
        case 4:
          decoded = _jsonwebtoken["default"].verify(token, _config["default"].SECRET);
          userId = decoded.id;
          score = req.body.score; // Solo necesitas recibir el puntaje del cuerpo de la solicitud
          _context2.next = 9;
          return _Score["default"].findOne({
            userId: userId
          });
        case 9:
          existingScore = _context2.sent;
          if (existingScore) {
            _context2.next = 16;
            break;
          }
          // Si no existe un puntaje para este usuario, crea uno nuevo
          newScore = new _Score["default"]({
            userId: userId,
            scoreSpam: [score] // Guarda el puntaje de Spam como un arreglo de números
          });
          _context2.next = 14;
          return newScore.save();
        case 14:
          _context2.next = 19;
          break;
        case 16:
          // Si ya existe un puntaje, añade el nuevo puntaje de Spam al arreglo existente
          existingScore.scoreSpam.push(score);
          _context2.next = 19;
          return existingScore.save();
        case 19:
          res.status(200).json({
            message: 'Puntaje de Spam añadido correctamente'
          });
          _context2.next = 28;
          break;
        case 22:
          _context2.prev = 22;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          if (!(_context2.t0.name === 'JsonWebTokenError')) {
            _context2.next = 27;
            break;
          }
          return _context2.abrupt("return", res.status(403).json({
            message: 'Token inválido'
          }));
        case 27:
          res.status(500).json({
            message: 'Error al añadir puntaje de Spam'
          });
        case 28:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 22]]);
  }));
  return function setUserSpamScore(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var setUserPhishingScore = exports.setUserPhishingScore = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var token, decoded, userId, score, existingScore, newScore;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          token = req.headers["x-access-token"];
          if (token) {
            _context3.next = 4;
            break;
          }
          return _context3.abrupt("return", res.status(403).json({
            message: "No se proporcionó el token"
          }));
        case 4:
          decoded = _jsonwebtoken["default"].verify(token, _config["default"].SECRET);
          userId = decoded.id;
          score = req.body.score; // Solo necesitas recibir el puntaje del cuerpo de la solicitud
          _context3.next = 9;
          return _Score["default"].findOne({
            userId: userId
          });
        case 9:
          existingScore = _context3.sent;
          if (existingScore) {
            _context3.next = 16;
            break;
          }
          // Si no existe un puntaje para este usuario, crea uno nuevo
          newScore = new _Score["default"]({
            userId: userId,
            scorePhishing: [score] // Guarda el puntaje de Spam como un arreglo de números
          });
          _context3.next = 14;
          return newScore.save();
        case 14:
          _context3.next = 19;
          break;
        case 16:
          // Si ya existe un puntaje, añade el nuevo puntaje de Spam al arreglo existente
          existingScore.scorePhishing.push(score);
          _context3.next = 19;
          return existingScore.save();
        case 19:
          res.status(200).json({
            message: 'Puntaje de Phishing añadido correctamente'
          });
          _context3.next = 28;
          break;
        case 22:
          _context3.prev = 22;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          if (!(_context3.t0.name === 'JsonWebTokenError')) {
            _context3.next = 27;
            break;
          }
          return _context3.abrupt("return", res.status(403).json({
            message: 'Token inválido'
          }));
        case 27:
          res.status(500).json({
            message: 'Error al añadir puntaje de Spam'
          });
        case 28:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 22]]);
  }));
  return function setUserPhishingScore(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var getAdminInfo = exports.getAdminInfo = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var token, decoded, adminId, adminUser, roles, isAdmin, userAdmin, users, totalSpamScores, totalPhishingScores, totalUsers, userSpamScores, userPhishingScores, _iterator, _step, user, userScores, scoreSpam, scorePhishing, avgScoreSpam, avgScorePhishing, avgUsersSpamScore, avgUsersPhishingScore;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          token = req.headers["x-access-token"];
          if (token) {
            _context4.next = 4;
            break;
          }
          return _context4.abrupt("return", res.status(403).json({
            message: "No se proporcionó el token"
          }));
        case 4:
          decoded = _jsonwebtoken["default"].verify(token, _config["default"].SECRET);
          adminId = decoded.id; // Verificar si el usuario es admin
          _context4.next = 8;
          return _User["default"].findById(adminId);
        case 8:
          adminUser = _context4.sent;
          if (adminUser) {
            _context4.next = 11;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: "Admin no encontrado"
          }));
        case 11:
          _context4.next = 13;
          return _Role["default"].find({
            _id: {
              $in: adminUser.roles
            }
          });
        case 13:
          roles = _context4.sent;
          isAdmin = roles.some(function (role) {
            return role.name === "admin";
          });
          if (isAdmin) {
            _context4.next = 17;
            break;
          }
          return _context4.abrupt("return", res.status(403).json({
            message: "Requiere un rol con más privilegios"
          }));
        case 17:
          _context4.next = 19;
          return _User["default"].findById(adminId, 'name lastname email birthDate');
        case 19:
          userAdmin = _context4.sent;
          _context4.next = 22;
          return _User["default"].find();
        case 22:
          users = _context4.sent;
          totalSpamScores = 0;
          totalPhishingScores = 0;
          totalUsers = 0;
          userSpamScores = [];
          userPhishingScores = [];
          _iterator = _createForOfIteratorHelper(users);
          _context4.prev = 29;
          _iterator.s();
        case 31:
          if ((_step = _iterator.n()).done) {
            _context4.next = 39;
            break;
          }
          user = _step.value;
          _context4.next = 35;
          return _Score["default"].findOne({
            userId: user._id
          });
        case 35:
          userScores = _context4.sent;
          if (userScores) {
            scoreSpam = userScores.scoreSpam, scorePhishing = userScores.scorePhishing;
            avgScoreSpam = scoreSpam.reduce(function (acc, val) {
              return acc + val;
            }, 0) / scoreSpam.length || 0;
            avgScorePhishing = scorePhishing.reduce(function (acc, val) {
              return acc + val;
            }, 0) / scorePhishing.length || 0;
            userSpamScores.push(avgScoreSpam.toFixed(2));
            userPhishingScores.push(avgScorePhishing.toFixed(2));
            totalSpamScores += avgScoreSpam;
            totalPhishingScores += avgScorePhishing;
            totalUsers++;
          }
        case 37:
          _context4.next = 31;
          break;
        case 39:
          _context4.next = 44;
          break;
        case 41:
          _context4.prev = 41;
          _context4.t0 = _context4["catch"](29);
          _iterator.e(_context4.t0);
        case 44:
          _context4.prev = 44;
          _iterator.f();
          return _context4.finish(44);
        case 47:
          avgUsersSpamScore = (totalUsers > 0 ? totalSpamScores / totalUsers : 0).toFixed(2);
          avgUsersPhishingScore = (totalUsers > 0 ? totalPhishingScores / totalUsers : 0).toFixed(2);
          res.status(200).json({
            name: userAdmin.name,
            lastname: userAdmin.lastname,
            email: userAdmin.email,
            birthDate: userAdmin.birthDate,
            avgUsersSpamScore: avgUsersSpamScore,
            avgUsersPhishingScore: avgUsersPhishingScore,
            userSpamScores: userSpamScores,
            userPhishingScores: userPhishingScores
          });
          _context4.next = 56;
          break;
        case 52:
          _context4.prev = 52;
          _context4.t1 = _context4["catch"](0);
          console.error(_context4.t1);
          res.status(500).json({
            message: "Error al obtener la información del administrador"
          });
        case 56:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 52], [29, 41, 44, 47]]);
  }));
  return function getAdminInfo(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();