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
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();

// Inicializar roles
(0, _initialSetup.createRoles)();

// Configurar variables de la aplicación
app.set('pkg', _package["default"]);

// Middlewares
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());

// Configurar carpeta de archivos estáticos
var staticPath = _path["default"].join(__dirname, '..', 'public');
app.use(_express["default"]["static"](staticPath));

// Rutas
app.use('/api/products', _products["default"]);
app.use('/api/auth', _auth["default"]);
app.use('/api/user', _user["default"]);

// Ruta raíz para manejar solicitudes a "/"
app.get('/', function (req, res) {
  res.sendFile(_path["default"].join(staticPath, 'index.html'));
});

// Obtener el puerto del entorno o usar el puerto 5000 por defecto
var port = process.env.PORT || 5000;

// Iniciar el servidor
app.listen(port, function () {
  console.log("Server listening on port: ".concat(port));
});
var _default = exports["default"] = app;