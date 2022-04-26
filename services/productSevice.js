const faker = require('faker');

class ProductsServices{

  constructor(){
    this.products = [];
    this.generate();
  }
  async generate(){
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
      });
    }
  }

  async create(product_name, price, image){
    if(product_name || price || image === undefined){
      throw new Error('There is something missing');
    }
    const newProduct = {
      id: faker.datatype.uuid(),
      ...product_name,
      ...price,
      ...image
    }
    this.products.push(newProduct);
    return newProduct;
  }

  find(id){
    return new Promise((resolve, reject)=> {
      setTimeout(()=>{
        resolve(this.products);
      }, 5000);
    });
    return this.products;
  }

  async findOne(id){
    const name = this.getTotal();
    return this.products.find(item => item.id === id)
  }

  async update(id, changes){
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1){
      throw new Error('product not found');
    }
    const product = this.products[index]
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }

  async delete(id){
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1){
      throw new Error('product not exist');
    }
    this.products.splice(index, 1);
    return { message: `El producto con id ${id} se elimino` }
  }
}

module.exports = ProductsServices;
