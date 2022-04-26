const { response } = require("express");
const express = require("express");
const ProductsServices = require('./../services/productSevice')


const router = express.Router();
const service = new ProductsServices();


router.get('/', async (req, res)=>{
  const products = await service.find();
  res.json(products);
});

router.get('/filter', (req, res)=> {
  res.send('Yo soy un filter')
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
  const product = await service.findOne(id);
  if(!product){
    res.status(404).json({
      message: `El producto con id ${id} no existe`
    });
  } else {
    res.status(200).json({
      product
    });
  }
  } catch (error) {
    next(error)
  }
});


router.post('/', async(req, res)=>{
  try {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json({newProduct
  })
  } catch (error) {
    res.status(406).json({
      message: error.message
    });
  }
});

router.patch('/:id', async (req, res)=>{
  try {
    const {id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product)
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
});

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
