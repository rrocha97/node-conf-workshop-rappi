const {
  DB_CONNECTION,
  MAX_CONNECTION_POOLSIZE,
  S3_BUCKET,
  S3_ACCESS,
  S3_SECRET,
  PORT
} = process.env;

module.exports = {
  PORT,
  DB_CONNECTION,
  pg: {
    client: 'pg',
    connection: DB_CONNECTION,
    pool: { min: 1, max: parseInt(MAX_CONNECTION_POOLSIZE, 10) || 5 },
    acquireConnectionTimeout: 5000,
  },
  s3: {
    bucket: S3_BUCKET,
    accessKeyId: S3_ACCESS,
    secretAccessKey: S3_SECRET,
  },
};