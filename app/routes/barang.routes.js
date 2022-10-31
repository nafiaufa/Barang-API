const barang = require("../controllers/product.controller");
module.exports = app => {
    const barang = require('../controllers/product.controller')

    app.post("/barang", barang.create)
    app.get("/barang", barang.findAll)
    app.get("/barang/:barangId", barang.findById)
    app.put("/barang/:barangId", barang.update)
    app.delete("/barang/:barangId", barang.remove)
}