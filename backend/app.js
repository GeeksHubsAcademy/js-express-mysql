const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const PORT = 3000;

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'db',
})

app.use(express.json()); //para evitar que el req.body sea undefined

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
});

app.get('/', async(req, res) => {
    try {
        const db = await conn;
        const [products] = await db.execute('SELECT * FROM products');
        res.send({
            products
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'There was a problem trying to get the products' })
    }
})

app.post('/', (req, res) => {
    conn.then(db => {
            return db.query(`
        INSERT INTO products (name,price,image_path) 
        VALUES('${req.body.name}',${req.body.price},'${req.body.image_path}')`)
        })
        .then(() => res.status(201).send(req.body))
        .catch(error => {
            console.error(error);
            res.status(500).send({ message: 'There was a problem trying to create the product' })
        })

})

app.listen(PORT, () => console.log('server running on port: ' + PORT))