const express = require("express");
const routerApi = require('./routes')


const app = express();
const port = 4000;

routerApi(app);


app.get('/', (req, res)=>{
  res.send('Hola mi server en Express');
});

app.get('/new-rute', (req, res)=>{
  res.send('Hola Soy new rute');
});

app.listen(port, ()=>{
  console.log('Mi port' , port);
});
