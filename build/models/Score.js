"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var scoreSchema = new _mongoose.Schema({
  userId: {
    ref: "User",
    type: _mongoose.Schema.Types.ObjectId,
    unique: true,
    required: true
  },
  scoreSpam: [Number],
  scorePhishing: [Number]
}, {
  timestamps: true,
  versionKey: false
});
var _default = exports["default"] = (0, _mongoose.model)("Score", scoreSchema);