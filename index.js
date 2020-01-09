'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000

var prodId = 0
var insId = 0

var productos = [{ "id": 1, "nombre": "monitor", "cant": 12 },
{ "id": 2, "nombre": "CPU", "cant": 3 }, { "id": 3, "nombre": "teclado", "cant": 20 }]

var insumos = [{ "id": 1, "nombre": "tinta 952", "cant": 6 },
{ "id": 2, "nombre": "papel A4", "cant": 5 }]

// Productos get by ID
function getProd(prodId) {
    return productos.find(
        function (prod) {
            return prod.id == prodId;
        }
    )
}
//insumos get by ID
function getIns(insId) {
    return insumos.find(
        function (ins) {
            return ins.id == insId;
        }
    )
}
// Productos get by NAME
function getProdByName(prodNombre) {
    return productos.find(
        function (prod) {
            return prod.nombre == prodNombre;
        }
    )
}
// Insumos get by NAME
function getInsByName(insNombre) {
    return insumos.find(
        function (ins) {
            return ins.nombre == insNombre;
        }
    )
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// QUERY PARAM PRODUCTO
//  si la query se hace por ID, Nombre se envia toda la informacion relacionada 
// al dato del provider, si no se envian todos los datos
// queryParam, ex. http://localhost:3000/api/producto?id=1
app.get('/api/producto', (req, res) => {
    if (req.query.id) {
        var result = getProd(req.query.id);
        if (result) {
            res.status(200).send(result)
        } else {
            res.status(200).send({ mensaje: 'Producto no encontrado' })
        }
    } else if (req.query.nombre) {
        var result = getProdByName(req.query.nombre);
        if (result) {
            res.status(200).send(result)
        } else {
            res.status(200).send({ mensaje: 'Producto no encontrado' })
        }
    } else {
        res.status(200).send({ productos: productos })
    }
})

// PATH PARAM PRODUCTO
//  si se solicita el ID, Nombre se envia toda la informacion relacionada 
// al dato del provider
//pathParam en productos por ID, ej. http://localhost:3000/api/producto/1
app.get('/api/producto/:id', (req, res) => {
    var result = getProd(req.params.id);
    if (result) {
        res.status(200).send(result)

    } else {
        res.status(200).send({ mensaje: 'Producto no encontrado' })
    }
    console.log(insumos)
})

// PATH PARAM PRODUCTO
//  si se solicita el Nombre se envia toda la informacion relacionada 
// al dato del provider
//pathParam en productos por ID, ej. http://localhost:3000/api/producto/1
app.get('/api/producto/:nombre', (req, res) => {
    var result = getProdByName(req.params.nombre);
    if (result) {
        res.status(200).send(result)
    } else {
        res.status(200).send({ mensaje: 'Producto no encontrado' })
    }
    console.log(productos)
})

// Post, solicitamos agregar un producto por medio del body del mensaje
app.post('/api/producto', (req, res) => {
    var result = getProd(req.body.id)
    if (result) {
        // si el producto ya existe no lo agrega y le avisa al usuario
        res.status(200).send({ mensaje: "Error en su solicitud: El producto ya se encuentra almacenado" })
    } else {
        // si el producto no exite lo agrega y avisa que se agrego correctamente
        productos.push(req.body);
        console.log(productos);
        res.status(201).send({ mesaje: 'El producto se ha agregado' })
    }
})

app.put('/api/producto/:productoId', (req, res) => { })

app.delete('/api/producto/:productoId', (req, res) => { })

//queryParam, ex. http://localhost:3000/api/insumo?id=1
app.get('/api/insumo', (req, res) => {
    if (req.query.id) {
        var result = getIns(req.query.id);
        if (result) {
            res.status(200).send(result)
        } else {
            res.status(200).send({ mensaje: 'Insumo no encontrado' })
        }
    } else if (req.query.nombre) {
        var result = getInsByName(req.query.nombre);
        if (result) {
            res.status(200).send(result)
        } else {
            res.status(200).send({ mensaje: 'Insumo no encontrado' })
        }
    } else {
        res.status(200).send({ insumos: insumos })
    }
})

//pathParam en insumos por Nombre, ej. http://localhost:3000/api/insumo/tinta 952
app.get('/api/insumo/:nombre', (req, res) => {
    var result = getInsByName(req.params.nombre);
    if (result) {
        res.status(200).send(result)
    } else {
        res.status(200).send({ mensaje: 'Insumo no encontrado' })
    }
})

//pathParam en insumos por ID, ej.  http://localhost:3000/api/insumo/1
app.get('/api/insumo/:id', (req, res) => {
    var result = getIns(req.params.id);
    if (result) {
        res.status(200).send(result)
    } else {
        res.status(200).send({ mensaje: 'Insumo no encontrado' })
    }
})

app.post('/api/insumo', (req, res) => {
    var result = getIns(req.body.id)
    if (result) {
        // si el insumo ya existe entonces no lo agrega y avisa al usuario
        res.status(400).send({ mensaje: "Error en su solicitud: Todos los campos deben ser completados" })
    } else {
        // si el insumo no existe lo agrega
        insumos.push(req.body);
        console.log(insumos);
        res.status(200).send({ mesaje: 'El insumo se ha agregado' })
    }
})

app.put('/api/insumo', (req, res) => { })

app.delete('/api/insumo', (req, res) => { })

app.listen(port, () => {
    console.log(`API REST corriendo en http://localhost:${port}`)
})
