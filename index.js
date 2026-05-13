const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

app.use(cors())
app.use(express.json())



// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/tienda')
.then(() => console.log('Conectado a MongoDB'))
.catch(error => console.log('Error de conexión:', error))


const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  categoria: { type: String, required: true },
  stock: { type: Number, default: 0 }
})

const Producto = mongoose.model('Producto', productoSchema)

app.get('/productos', async function(req, res) {
  try {
    const productos = await Producto.find()
    res.json(productos)
  } catch(error) {
    res.status(500).json({ error: 'Error al obtener productos' })
  }
})

app.get('/productos/:id', async function(req, res) {
  try {
    const productos = await Producto.findById(req.params.id)
    if(!producto){
      res.status(404).json({error:'Producto no encontrado'})
      return
    }

    res.json(productos)
  } catch(error) {
    res.status(500).json({ error: 'Error al obtener productos' })
  }
})

app.get('/productos', async function(req, res) {
  try {
    const productos = await Producto.findOne(req.query.categoria)
    if(!categoria){
      res.status(404).json({error:'Categoria no encontrada'})
    }
    
    res.json(productos)
  } catch(error) {
    res.status(500).json({ error: 'Error al obtener productos' })
  }
})
app.post('/productos', async function(req, res) {
  try {
    const productos = await new Producto().sava()
    res.json(productos)
  } catch(error) {
    res.status(500).json({ error: 'Error al obtener productos' })
  }
})

app.put('/productos/:id', async function(req, res) {
  try {
    const productos = await Producto.findByIdAndUpdate()
    res.json(productos)
  } catch(error) {
    res.status(500).json({ error: 'Error al obtener productos' })
  }
})

app.delete('/productos/:id', async function(req, res) {
  try {
    const productos = await Producto.findByIdAndDelete()
    res.json(productos)
  } catch(error) {
    res.status(500).json({ error: 'Error al obtener productos' })
  }
})

app.listen(3000, function() {
  console.log('Servidor corriendo en http://localhost:3000')
})

