const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter');
const categoriesRouter = require('./categoriesRouter')

function routerApi(app){
  app.use('/api/products', productsRouter);
  app.use('/api/categories', categoriesRouter);
  app.use('/api/users', usersRouter);
}

module.exports = routerApi;
