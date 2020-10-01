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

app.use(function(req, res, next) { //para evitar el error CORS
    res.header("Access-Control-Allow-Origin", "*"); //permite hacer peticiones desde todos los orígenes
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); //permite peticiones con las cabeceras enumeradas
    // res.header("Access-Control-Allow-Methods", "GET, POST");
    next();
});

app.get('/', async(req, res) => {
    try {
        const db = await conn;
        const [products] = await db.execute('SELECT * FROM products');
        console.log(products)
        res.send({
            products
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: 'There was a problem trying to get the products'
        });
    }
});

app.post('/', (req, res) => {
    conn.then(db => {
            return db.query(`
        INSERT INTO products (name,price,image_path) 
        VALUES('${req.body.name}',${req.body.price},'${req.body.image_path}')`)
        })
        .then(() => res.status(201).send(req.body))
        .catch(error => {
            console.error(error);
            res.status(500).send({
                message: 'There was a problem trying to create the product'
            });
        });

});

app.put('/:id', async(req, res) => {
    try {
        const db = await conn;
        await db.execute(`
            UPDATE products 
            SET name = ?, price = ?, image_path = ?
            WHERE id = ?`, [req.body.name, req.body.price, req.body.image_path, req.params.id]);
        res.send({
            message: 'Product successfully updated'
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: 'There was a problem trying to update the product'
        });
    }
});
app.delete('/:id', (req, res) => {
    conn.then(db => db.execute(`DELETE FROM products WHERE id = ?`, [req.params.id]))
        .then(() => res.send({
            message: 'Product successfully removed'
        }))
        .catch(error => {
            console.error(error);
            res.status(500).send({
                message: 'There was a problem trying to remove the product'
            });
        })
});
app.listen(PORT, () => console.log('server running on port: ' + PORT));