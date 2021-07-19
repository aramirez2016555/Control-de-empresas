'use strict'
var Empleado = require("../modelos/empleados.model");
var bcrypt = require('bcrypt-nodejs');
var jwt = require("../servicios/jwt");

function registrarEmpresa(req, res) {
    var usuarioModel = new Usuario();
    var params = req.body;
    if (params.nombre && params.password) {
        usuarioModel.nombre = params.nombre;
        usuarioModel.rol = 'ROL_EMPRESA';
        Usuario.find(
            { nombre: usuarioModel.nombre }
        ).exec((err, usuariosEncontrados) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion de Empresas' });
            if (usuariosEncontrados && usuariosEncontrados.length >= 1) {
                return res.status(500).send({ mensaje: 'La empresa ya existe' });
            } else {
                bcrypt.hash(params.password, null, null, (err, passwordEncriptada) => {
                    usuarioModel.password = passwordEncriptada;

                    usuarioModel.save((err, usuarioGuardado) => {

                        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de Guardar Empresa' });

                        if (usuarioGuardado) {
                            res.status(200).send({ usuarioGuardado })
                        } else {
                            res.status(404).send({ mensaje: 'No se ha podido registrar la empresa' })
                        }
                    })
                })
            }
        })

    }
}