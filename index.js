const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) =>{
    res.json({message: "Welcome to BarangAPI"});
});

require("./app/routes/barang.routes")(app);

const port = 8080;
app.listen(port, function (){
    console.log(`ExpressJS server running on ${port}`);
})