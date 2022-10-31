const sql = require('./db.js');

const Barang = function(barang){
    this.nama = barang.nama,
    this.keterangan = barang.keterangan,
    this.harga = barang.harga
}

Barang.create = (newBarang, result) =>{
    sql.query("INSERT INTO tbl_barang SET ?", newBarang, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Created a new Barang",{id: res.insertId, ...newBarang});
        result(null, {id: res.insertId, ...newBarang});
    })
}

Barang.findAll = (result) =>{
    sql.query("SELECT * FROM tbl_barang", (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("list of barang: ", res);
        result(null, res)
    });
}

Barang.findById = (barangId, result) => {
    sql.query(`SELECT * FROM tbl_barang WHERE id=${barangId}`, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("Barang found", res[0]);
            result(null, res[0]);
            return;
        }
        result({kind:"not_found"}, null)
    })
}

Barang.removeById = (barangId, result) => {
    sql.query("DELETE FROM tbl_barang WHERE id=?", barangId, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(res.affectedRows == 0){
            result({kind:"not_found"}, null);
            return;
        }
        console.log("deleted barang with id: ", barangId);
        result(null, res);

    });
}

Barang.updateById = (barangId, barang, result) =>{
    sql.query("UPDATE tbl_barang SET nama=?, keterangan=?, harga=? WHERE id=?",
        [barang.nama, barang.keterangan, barang.harga, barangId], (err, res)=>{
            if(err){
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if(res.affectedRows == 0){
                result({kind:"not_found"}, null);
                return;
            }
            console.log("updated barang: ",{id : barangId, ...barang});
            result(null, {id : barangId, ...barang});
        })
}



module.exports = Barang;