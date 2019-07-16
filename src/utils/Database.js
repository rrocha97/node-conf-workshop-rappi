const Database = module.exports;

const knex = require('knex');
const { pg } = require('../../config');

Database.db = knex(pg);