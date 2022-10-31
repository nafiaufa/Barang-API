const Barang = require('../models/product.model.js');

exports.create = (req, res) =>{
    if(!req.body){
        res.status(400).send({
            message: 'Content cannot be empty'
        });
    }
    const barang = new Barang({
        nama: req.body.nama,
        keterangan: req.body.keterangan,
        harga: req.body.harga
    });

    Barang.create(barang, (err, data) =>{
        if(err){
            res.status(500).send({
                message: err.message || "Some error occurred"
            })
        }else{
            res.send(data)
        }
    });
}

exports.findAll = (req, res) => {
    Barang.findAll((err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Some error occurred"
            })
        }else{
            res.send(data)
        }
    })
}

exports.findById = (req, res) => {
    Barang.findById(req.params.barangId, (err, data) => {
        if(err){
            if(err.kind === 'not_found'){
                res.status(400).send({
                    message: `Not found barang with id ${req.params.barangId}`
                })
            }else{
                res.status(500).send({
                    message: `error retriving barang with id ${req.params.barangId}`
                })
            }
        }else{
            res.send(data);
        }
    })
}

exports.remove = (req, res) => {
    Barang.removeById(req.params.barangId, (err, data) =>{
        if(err){
            if(err.kind === "not_found"){
                res.status(400).send({
                    message: `Error retrieving barang with id ${req.params.barangId}`
                })
            }else{
                res.status(500).send({
                    message: `Could not delete barang with id ${req.params.barangId}`
                })
            }
        }else{
            res.send(data);
        }
    })
}

exports.update = (req, res) => {
    if(!req.body){
        res.status(400).send({
            message: 'Content cannot be empty'
        });
    }

    Barang.updateById(req.params.barangId, new Barang(req.body), (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(400).send({
                    message: `Error retrieving barang with id ${req.params.barangId}`
                })
            }else{
                res.status(500).send({
                    message: `Could not Updating barang with id ${req.params.barangId}`
                })
            }
        }else{
            res.send(data);
        }
    })
}