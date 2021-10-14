const express = require('express');
const app = express();
const _ = require('underscore');
const Personal = require('../models/personal');
app.get('/personal', (req, res) => {
    Personal.find({ Estado: true })
        .exec((err, pesonals) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: pesonals.length,
                pesonals
            })
        });
});
app.post('/personal', (req, res) => {
    let body = req.body;

    let personal = new Personal({
        Nombre: body.Nombre,
        Usuario: body.Usuario,
        correo: body.correo,
        contraseña: body.contraseña,
        role1:body.role1
    });

    personal.save((err, personalDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            personalDB
        });
    });
});

app.put('/personal/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['Nombre', 'Usuario','correo', 'contraseña', 'role']);

    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, personalDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } else {
            return res.status(200).json({
                ok: true,
                personalDB
            });
        }
    });
});
app.delete('/producto/:id', (req, res) => {
    let id = req.params.id; 
    
    Personal.findByIdAndUpdate(id, { Estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            resp
        });
    });
});


module.exports = app;
