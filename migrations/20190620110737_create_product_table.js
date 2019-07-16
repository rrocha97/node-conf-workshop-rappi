exports.up = knex => knex.schema.createTable('products', (table) => {
  table.increments('id');
  table.string('name');
  table.string('description', 512);
  table.string('image');
  table.string('label');
  table.string('type');
  table.integer('quantity');
  table.string('trademark');
  table.integer('price');
});

exports.down = knex => knex.schema.dropTable('products');