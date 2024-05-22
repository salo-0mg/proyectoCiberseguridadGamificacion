"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _package = _interopRequireDefault(require("../package.json"));
var _initialSetup = require("./libs/initialSetup.js");
var _products = _interopRequireDefault(require("./routes/products.routes"));
var _auth = _interopRequireDefault(require("./routes/auth.routes"));
var _user = _interopRequireDefault(require("./routes/user.routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
(0, _initialSetup.createRoles)();
var path = require('path');
app.set('pkg', _package["default"]);
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"]["static"](path.join(__dirname, 'public')));
app.use(_express["default"].json());
app.use('/api/products', _products["default"]); // products
app.use('/api/auth', _auth["default"]); // auth
app.use('/api/user', _user["default"]); // user
var _default = exports["default"] = app;