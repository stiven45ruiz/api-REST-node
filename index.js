const express = require("express");
const routerApi = require('./routes');

const { logErrors, errorHandler } = require('./middlewares/error.handler');

const app = express();
const port = 4000;

app.use(express.json());

routerApi(app);

app.use(logErrors);
app.use(errorHandler);




app.get('/', (req, res)=>{
  res.send('Hola mi server en Express');
});

app.get('/new-rute', (req, res)=>{
  res.send('Hola Soy new rute');
});

app.listen(port, ()=>{
  console.log('Your port is:' , port);
});
