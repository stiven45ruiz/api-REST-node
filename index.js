const express = require("express");
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

const whiteList = [
  'http://localhost:8080',
  'https://myapp.com'
];
const options = {
  origin: (origin, callback)=>{
    if (whiteList.includes(origin) || !origin){
      callback(null, true)
    }else{
      callback(new Error('no permitido'))
    }
  }
}
app.use(cors(options))

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
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
