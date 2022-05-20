const { response } = require("express");
const express = require("express");
const ProductsServices = require('../services/product.sevice')
const validatorHandler = require('../middlewares/validator.handler')
const {
  createProductSchemas,
  updateProductSchemas,
  getProductSchemas
} = require('../schemas/product.schema')

const router = express.Router();
const service = new ProductsServices();


router.get('/', async (req, res)=>{
  const products = await service.find();
  res.json(products);
});

router.get('/filter', (req, res)=> {
  res.send('Yo soy un filter')
})

router.get('/:id',
  validatorHandler(getProductSchemas, 'paramas'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);

    } catch (error) {
      next(error)
    }
  }
);


router.post('/',
  validatorHandler(createProductSchemas, 'body'),
  async(req, res)=>{

    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json({newProduct})

  }
);

router.patch('/:id',
  validatorHandler(getProductSchemas, 'params'),
  validatorHandler(updateProductSchemas, 'body'),
  async (req, res, next)=>{
    try {
      const {id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product)
    } catch (error) {
      next(error)
    }
  }
);

router.put('/:id', (req, res)=>{
  const {id } = req.params;
  const body =  req.body;
  res.json({
    Message: 'Update',
    data: body,
    id,
  })
});

router.delete('/:id',async(req, res)=>{
  try {
    const { id } = req.params;
    const rta = await service.delete(id)
    res.json(rta)
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
});


module.exports = router;
