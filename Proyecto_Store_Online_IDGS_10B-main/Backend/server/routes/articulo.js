const express = require('express');
const app = express();
const _ = require('underscore');
const Articulo = require('../models/articulo');
app.get('/articulo', (req, res) => {
    Articulo.find({ Estado: true })
        .exec((err, articulos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: articulos.length,
                articulos
            })
        });
});
app.post('/articulo', (req, res) => {
    let body = req.body;

    let articulo = new Articulo({
        Nombre:body.Nombre,
        Descripcion:body.Descripcion,
        Precio:body.Precio,
        Img:body.Img
    });

    articulo.save((err, articuloDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            articuloDB
        });
    });
});
app.get('/articulo/:id', (req, res) => {
    let id=req.params.id
    Articulo.findById(id)
        .exec((err, articulos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: articulos.length,
                articulos
            })
        });
});
app.put('/articulo/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['Nombre', 'Descripcion', 'Precio','Img']);

    Articulo.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, articuloDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } else {
            return res.status(200).json({
                ok: true,
                articuloDB
            });
        }
    });
});
app.delete('/articulo/:id', (req, res) => {
    let id = req.params.id; 
    
    Articulo.findByIdAndUpdate(id, { Estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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
