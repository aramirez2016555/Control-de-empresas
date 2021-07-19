'use strict'

var express = require("express");
var UsuarioControlador = require("../controladores/usuario.controlador");
var md_autorizacion = require("../middlewares/authenticated.js");
var api = express.Router()

api.post("/registrarEmpresa", UsuarioControlador.registrarEmpresa);
api.post("/login", UsuarioControlador.login);
api.put('/editarEmpresa/:id', md_autorizacion.ensureAuth, UsuarioControlador.editarEmpresa);
api.put("/eliminarEmpresa/:id", md_autorizacion.ensureAuth, UsuarioControlador.eliminarEmpresa);

module.exports = api;