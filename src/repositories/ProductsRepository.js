const ProductsRepository = module.exports;
const { db } = require('../utils/Database');

ProductsRepository.insert = data => db('products').insert(data);

ProductsRepository.getProducts = (quantity) => db('products').select('*')
  .orderBy('id', 'desc')
  .limit(quantity);
