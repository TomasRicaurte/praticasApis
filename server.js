const { json } = require("body-parser");
const express = require("express");
const { join } = require("path");
const app = express()
const port = 8000

const usuarios = [
    { id: 1, nombre: 'Alejandra', celular: "3168067141", correo: "alejandra@gmail.com"},
    { id: 2, nombre: 'Maria', celular: "3122677787", correo: "maria@gmail.com"}
];

const productos = [];
const ecommers = 'E-comerce'
app.use(json())

const  validacionMethodsHTTP = (req, res, next) => {
    const validarMethods = ["GET", "POST"]

    if (!validarMethods.includes(req.method)) {
        return res.status(405).json({error: "Metodo HTTP no valido."})
    }
    next()
};

app.use(validacionMethodsHTTP)

app.get("/", (req, res)=>{
    res.send(`Esta es la Ruta raiz del ${ecommers}`)
})

app.get ('/usuarios', (req, res)=>{
    res.json(usuarios)
})

app.post('/usuarios',(req,res) =>{
const {username,password} = req.body;
if(username ==="hemberto" && password === 123 ){
  
return res.json('usuario autenticado')

}else{
    return res.json({error: "Usuario no autorizado"})
}
}) 

app.post('/productos' , (req, res)=>{
    const productoNuevo = req.body;
    productos.push(productoNuevo);
    res.json({message: "producto nuevo agregado"})
})

app.get ('/productos', (req, res)=>{
    res.json(productos)
})

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
 });

 app.get ('/usuarios/:nombre', (req, res)=>{
    const nombreaBuscar = req.params.nombre;

    const buscarNombre = usuarios.find ((usuarios)=> usuarios.nombre === nombreaBuscar);
    
    if (buscarNombre){

        res.json(buscarNombre);
    }else{
        res.json ({error: "no encontrado"})
    }
    
 });