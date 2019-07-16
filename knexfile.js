const assert = require('assert');
const { DB_CONNECTION: connection } = require('./config');

assert(connection, 'DB_CONNECTION must be provided');

module.exports = {
  client: 'pg',
  connection,
  migration: {
    directory: './migrations',
    tableName: 'migrations',
  },
};