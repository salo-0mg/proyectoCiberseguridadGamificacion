"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
var _config = _interopRequireDefault(require("./config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_mongoose["default"].connect(_config["default"].MONGO_CONNECT).then(function (db) {
  return console.log('Conected to MongoDB');
})["catch"](function (error) {
  return console.log(error);
});