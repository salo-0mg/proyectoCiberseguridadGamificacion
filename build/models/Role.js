"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ROLES = void 0;
var _mongoose = require("mongoose");
var ROLES = exports.ROLES = ["user", "admin"];
var roleSchema = new _mongoose.Schema({
  name: String
}, {
  versionKey: false
});
var _default = exports["default"] = (0, _mongoose.model)("Role", roleSchema);