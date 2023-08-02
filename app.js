const express = require('express');
const app = express();
const sendEmail = require('./ses_email')

const port = 3000;

app.get("/", (req, res)=>{
    sendEmail()
    res.send("Bienvenido")
})

app.listen(port, ()=>{
    console.log(`Corriendo en el puerto ${port}`);
})